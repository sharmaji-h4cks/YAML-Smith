# Production Deployment Guide

This guide covers production deployment strategies for **YAML Smith** across various platforms and environments.

## Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Docker Compose Deployment](#docker-compose-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Cloud Platform Deployments](#cloud-platform-deployments)
5. [Load Balancing & High Availability](#load-balancing--high-availability)
6. [Monitoring & Observability](#monitoring--observability)
7. [Security Hardening](#security-hardening)
8. [Backup & Disaster Recovery](#backup--disaster-recovery)
9. [CI/CD Integration](#cicd-integration)
10. [Performance Optimization](#performance-optimization)

## Deployment Overview

### Architecture Patterns

#### Single Server (Small Scale)
- **Use Case**: Small teams, POC, staging
- **Components**: Frontend, Backend, nginx on one server
- **Scaling**: Vertical (upgrade server resources)
- **HA**: None (single point of failure)
- **Cost**: $10-50/month

#### Multi-Server (Medium Scale)
- **Use Case**: Growing teams, production
- **Components**: Separate frontend and backend servers
- **Scaling**: Horizontal (add more servers)
- **HA**: Load balancer + multiple replicas
- **Cost**: $100-500/month

#### Container Orchestration (Enterprise Scale)
- **Use Case**: Large enterprises, high traffic
- **Components**: Kubernetes cluster with auto-scaling
- **Scaling**: Auto-scaling based on metrics
- **HA**: Built-in redundancy and failover
- **Cost**: $500-5000+/month

### Deployment Checklist

- [ ] Domain name and DNS configured
- [ ] SSL/TLS certificates obtained
- [ ] Environment variables configured
- [ ] Secrets management setup
- [ ] Database backups configured (if applicable)
- [ ] Monitoring and logging enabled
- [ ] Security hardening applied
- [ ] Health checks configured
- [ ] Backup and recovery tested
- [ ] CI/CD pipeline setup

## Docker Compose Deployment

### Production Docker Compose Setup

#### 1. Create docker-compose.prod.yml

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: production
    container_name: devops-forge-backend
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=3002
      - CORS_ORIGIN=${CORS_ORIGIN}
      - LOG_LEVEL=info
    expose:
      - "3002"
    networks:
      - devops-forge-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3002/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
      args:
        - VITE_API_URL=${VITE_API_URL}
    container_name: devops-forge-frontend
    restart: always
    expose:
      - "80"
    networks:
      - devops-forge-network
    depends_on:
      backend:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 128M

  nginx:
    image: nginx:alpine
    container_name: devops-forge-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
    networks:
      - devops-forge-network
    depends_on:
      - backend
      - frontend
    healthcheck:
      test: ["CMD", "nginx", "-t"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  devops-forge-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16

volumes:
  nginx-logs:
```

#### 2. Create Production nginx Configuration

Create `nginx/nginx.conf`:

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 2048;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 10M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/rss+xml font/truetype font/opentype
               application/vnd.ms-fontobject image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general_limit:10m rate=50r/s;

    # Backend upstream
    upstream backend {
        least_conn;
        server backend:3002 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    # Frontend upstream
    upstream frontend {
        server frontend:80;
        keepalive 16;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        # ACME challenge for Let's Encrypt
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        # Redirect all other traffic to HTTPS
        location / {
            return 301 https://$server_name$request_uri;
        }
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        # SSL configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;
        ssl_session_tickets off;

        # Modern SSL configuration
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;

        # OCSP stapling
        ssl_stapling on;
        ssl_stapling_verify on;
        resolver 8.8.8.8 8.8.4.4 valid=300s;
        resolver_timeout 5s;

        # Security headers
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;

        # API endpoints
        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;

            proxy_pass http://backend/api/;
            proxy_http_version 1.1;

            # Headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Port $server_port;

            # WebSocket support
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;

            # Buffering
            proxy_buffering on;
            proxy_buffer_size 4k;
            proxy_buffers 8 4k;

            # Cache
            proxy_cache_bypass $http_upgrade;
        }

        # Health check endpoint
        location /health {
            proxy_pass http://backend/health;
            access_log off;
        }

        # Frontend application
        location / {
            limit_req zone=general_limit burst=100 nodelay;

            proxy_pass http://frontend/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Cache static assets
            location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
                proxy_pass http://frontend;
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
        }

        # Error pages
        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```

#### 3. Deploy with Docker Compose

```bash
# Set environment variables
export CORS_ORIGIN=https://yourdomain.com
export VITE_API_URL=https://yourdomain.com/api

# Build and start
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Verify deployment
curl https://yourdomain.com/health
```

#### 4. Set Up Auto-Start

Create systemd service at `/etc/systemd/system/devops-forge.service`:

```ini
[Unit]
Description=YAML Smith Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/devops-forge
Environment="CORS_ORIGIN=https://yourdomain.com"
Environment="VITE_API_URL=https://yourdomain.com/api"
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
ExecReload=/usr/local/bin/docker-compose -f docker-compose.prod.yml restart
TimeoutStartSec=180

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable devops-forge
sudo systemctl start devops-forge
sudo systemctl status devops-forge
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (v1.25+)
- kubectl configured
- Ingress controller (nginx, traefik)
- cert-manager (for TLS)

### 1. Create Namespace

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: devops-forge
  labels:
    name: devops-forge
    environment: production
```

```bash
kubectl apply -f k8s/namespace.yaml
```

### 2. Create ConfigMap

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: devops-forge-config
  namespace: devops-forge
data:
  NODE_ENV: "production"
  PORT: "3002"
  API_PREFIX: "/api"
  LOG_LEVEL: "info"
  LOG_FORMAT: "json"
```

### 3. Create Secrets

```bash
# Create secrets from literals
kubectl create secret generic devops-forge-secrets \
  --from-literal=api-key=your-secret-key \
  --from-literal=database-password=your-db-password \
  --namespace=devops-forge

# Or from file
kubectl create secret generic devops-forge-secrets \
  --from-env-file=.env.production \
  --namespace=devops-forge
```

### 4. Backend Deployment

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-forge-backend
  namespace: devops-forge
  labels:
    app: devops-forge
    component: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devops-forge
      component: backend
  template:
    metadata:
      labels:
        app: devops-forge
        component: backend
    spec:
      containers:
      - name: backend
        image: your-registry/devops-forge-backend:1.0.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3002
          name: http
          protocol: TCP
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: devops-forge-config
              key: NODE_ENV
        - name: PORT
          valueFrom:
            configMapKeyRef:
              name: devops-forge-config
              key: PORT
        envFrom:
        - secretRef:
            name: devops-forge-secrets
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /health
            port: 3002
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /health
            port: 3002
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        securityContext:
          runAsNonRoot: true
          runAsUser: 1001
          readOnlyRootFilesystem: true
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: component
                  operator: In
                  values:
                  - backend
              topologyKey: kubernetes.io/hostname
```

### 5. Backend Service

```yaml
# k8s/backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: devops-forge-backend
  namespace: devops-forge
  labels:
    app: devops-forge
    component: backend
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 3002
    protocol: TCP
    name: http
  selector:
    app: devops-forge
    component: backend
```

### 6. Frontend Deployment

```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-forge-frontend
  namespace: devops-forge
  labels:
    app: devops-forge
    component: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: devops-forge
      component: frontend
  template:
    metadata:
      labels:
        app: devops-forge
        component: frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/devops-forge-frontend:1.0.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
          name: http
          protocol: TCP
        resources:
          requests:
            cpu: 50m
            memory: 128Mi
          limits:
            cpu: 200m
            memory: 256Mi
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
        securityContext:
          runAsNonRoot: true
          runAsUser: 101
          readOnlyRootFilesystem: true
          allowPrivilegeEscalation: false
```

### 7. Frontend Service

```yaml
# k8s/frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: devops-forge-frontend
  namespace: devops-forge
  labels:
    app: devops-forge
    component: frontend
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
    app: devops-forge
    component: frontend
```

### 8. Ingress

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: devops-forge-ingress
  namespace: devops-forge
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - devopsforge.com
    - www.devopsforge.com
    secretName: devops-forge-tls
  rules:
  - host: devopsforge.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: devops-forge-backend
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: devops-forge-frontend
            port:
              number: 80
```

### 9. HorizontalPodAutoscaler

```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: devops-forge-backend-hpa
  namespace: devops-forge
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: devops-forge-backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: devops-forge-frontend-hpa
  namespace: devops-forge
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: devops-forge-frontend
  minReplicas: 2
  maxReplicas: 6
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### 10. PodDisruptionBudget

```yaml
# k8s/pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: devops-forge-backend-pdb
  namespace: devops-forge
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: devops-forge
      component: backend
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: devops-forge-frontend-pdb
  namespace: devops-forge
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: devops-forge
      component: frontend
```

### 11. Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f k8s/

# Verify deployment
kubectl get all -n devops-forge

# Check pods
kubectl get pods -n devops-forge

# Check services
kubectl get svc -n devops-forge

# Check ingress
kubectl get ingress -n devops-forge

# View logs
kubectl logs -f deployment/devops-forge-backend -n devops-forge
kubectl logs -f deployment/devops-forge-frontend -n devops-forge
```

### 12. Helm Chart Deployment (Alternative)

Create a Helm chart for easier management:

```bash
# Create Helm chart
helm create devops-forge-chart

# Install
helm install devops-forge ./devops-forge-chart \
  --namespace devops-forge \
  --create-namespace \
  --set image.tag=1.0.0 \
  --set ingress.hosts[0].host=devopsforge.com

# Upgrade
helm upgrade devops-forge ./devops-forge-chart \
  --namespace devops-forge \
  --set image.tag=1.1.0

# Rollback
helm rollback devops-forge 1 -n devops-forge
```

## Cloud Platform Deployments

### AWS Deployment

#### Option 1: AWS ECS (Elastic Container Service)

```bash
# Install AWS CLI
aws configure

# Create ECR repositories
aws ecr create-repository --repository-name devops-forge-backend
aws ecr create-repository --repository-name devops-forge-frontend

# Build and push images
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker build -t devops-forge-backend ./backend
docker tag devops-forge-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/devops-forge-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/devops-forge-backend:latest

# Create ECS cluster
aws ecs create-cluster --cluster-name devops-forge-cluster

# Create task definition
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json

# Create service
aws ecs create-service \
  --cluster devops-forge-cluster \
  --service-name devops-forge-service \
  --task-definition devops-forge-task \
  --desired-count 2 \
  --launch-type FARGATE
```

#### Option 2: AWS EKS (Elastic Kubernetes Service)

```bash
# Install eksctl
brew install eksctl

# Create EKS cluster
eksctl create cluster \
  --name devops-forge-cluster \
  --version 1.28 \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 5 \
  --managed

# Configure kubectl
aws eks update-kubeconfig --name devops-forge-cluster --region us-east-1

# Deploy application
kubectl apply -f k8s/
```

### Azure Deployment (AKS)

```bash
# Install Azure CLI
brew install azure-cli
az login

# Create resource group
az group create --name devops-forge-rg --location eastus

# Create AKS cluster
az aks create \
  --resource-group devops-forge-rg \
  --name devops-forge-aks \
  --node-count 3 \
  --node-vm-size Standard_D2s_v3 \
  --enable-managed-identity \
  --generate-ssh-keys

# Configure kubectl
az aks get-credentials --resource-group devops-forge-rg --name devops-forge-aks

# Deploy application
kubectl apply -f k8s/
```

### GCP Deployment (GKE)

```bash
# Install gcloud CLI
brew install google-cloud-sdk
gcloud init

# Create GKE cluster
gcloud container clusters create devops-forge-cluster \
  --num-nodes=3 \
  --machine-type=n1-standard-2 \
  --region=us-central1 \
  --enable-autoscaling \
  --min-nodes=2 \
  --max-nodes=5

# Configure kubectl
gcloud container clusters get-credentials devops-forge-cluster --region=us-central1

# Deploy application
kubectl apply -f k8s/
```

### DigitalOcean Deployment

```bash
# Install doctl
brew install doctl
doctl auth init

# Create Kubernetes cluster
doctl kubernetes cluster create devops-forge-cluster \
  --region nyc1 \
  --size s-2vcpu-4gb \
  --count 3

# Configure kubectl
doctl kubernetes cluster kubeconfig save devops-forge-cluster

# Deploy application
kubectl apply -f k8s/
```

## Load Balancing & High Availability

### nginx Load Balancer Configuration

```nginx
upstream backend_servers {
    least_conn;
    server backend1:3002 max_fails=3 fail_timeout=30s weight=1;
    server backend2:3002 max_fails=3 fail_timeout=30s weight=1;
    server backend3:3002 max_fails=3 fail_timeout=30s weight=1;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name devopsforge.com;

    location /api/ {
        proxy_pass http://backend_servers/api/;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
        proxy_connect_timeout 2s;
        proxy_read_timeout 60s;
    }
}
```

### Health Checks

```bash
# Kubernetes health check
kubectl get pods -n devops-forge -o wide

# Manual health check
while true; do
  curl -s https://devopsforge.com/health | jq .
  sleep 5
done
```

## Monitoring & Observability

### Prometheus & Grafana Setup

```yaml
# k8s/monitoring/servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: devops-forge-backend
  namespace: devops-forge
spec:
  selector:
    matchLabels:
      app: devops-forge
      component: backend
  endpoints:
  - port: metrics
    interval: 30s
```

### Logging with ELK Stack

```yaml
# k8s/logging/filebeat.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: filebeat-config
  namespace: devops-forge
data:
  filebeat.yml: |
    filebeat.inputs:
    - type: container
      paths:
        - /var/log/containers/devops-forge*.log
    output.elasticsearch:
      hosts: ['${ELASTICSEARCH_HOST:elasticsearch}:${ELASTICSEARCH_PORT:9200}']
```

## Security Hardening

### Network Policies

```yaml
# k8s/security/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: devops-forge-network-policy
  namespace: devops-forge
spec:
  podSelector:
    matchLabels:
      app: devops-forge
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: devops-forge
    ports:
    - protocol: TCP
      port: 3002
  egress:
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 443
```

### RBAC Configuration

```yaml
# k8s/security/rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: devops-forge-sa
  namespace: devops-forge
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: devops-forge-role
  namespace: devops-forge
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: devops-forge-rolebinding
  namespace: devops-forge
subjects:
- kind: ServiceAccount
  name: devops-forge-sa
  namespace: devops-forge
roleRef:
  kind: Role
  name: devops-forge-role
  apiGroup: rbac.authorization.k8s.io
```

## Backup & Disaster Recovery

### Automated Backups

```bash
# Backup script
#!/bin/bash
BACKUP_DIR="/backups/devops-forge/$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup Kubernetes resources
kubectl get all -n devops-forge -o yaml > $BACKUP_DIR/k8s-resources.yaml
kubectl get configmap -n devops-forge -o yaml > $BACKUP_DIR/configmaps.yaml
kubectl get secret -n devops-forge -o yaml > $BACKUP_DIR/secrets.yaml

# Backup Docker volumes
docker run --rm -v devops-forge_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/data.tar.gz -C /data .

# Upload to S3
aws s3 sync $BACKUP_DIR s3://devops-forge-backups/$(date +%Y%m%d-%H%M%S)/
```

### Disaster Recovery Plan

1. **Identify Failure**: Monitor alerts, check health endpoints
2. **Assess Impact**: Determine scope (single pod, entire service, infrastructure)
3. **Execute Recovery**:
   ```bash
   # Rollback deployment
   kubectl rollout undo deployment/devops-forge-backend -n devops-forge

   # Or restore from backup
   kubectl apply -f $BACKUP_DIR/k8s-resources.yaml
   ```
4. **Verify Recovery**: Run health checks, test functionality
5. **Post-Mortem**: Document incident, update procedures

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build and Push Docker Images
      run: |
        docker build -t ${{ secrets.REGISTRY }}/backend:${{ github.sha }} ./backend
        docker build -t ${{ secrets.REGISTRY }}/frontend:${{ github.sha }} ./frontend
        docker push ${{ secrets.REGISTRY }}/backend:${{ github.sha }}
        docker push ${{ secrets.REGISTRY }}/frontend:${{ github.sha }}

    - name: Deploy to Kubernetes
      uses: azure/k8s-deploy@v1
      with:
        manifests: |
          k8s/deployment.yaml
          k8s/service.yaml
        images: |
          ${{ secrets.REGISTRY }}/backend:${{ github.sha }}
          ${{ secrets.REGISTRY }}/frontend:${{ github.sha }}
        kubectl-version: 'latest'
```

## Performance Optimization

### Caching Strategy

```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache API responses (selective)
location /api/templates/ {
    proxy_cache api_cache;
    proxy_cache_valid 200 1h;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    add_header X-Cache-Status $upstream_cache_status;
}
```

### CDN Integration

```bash
# CloudFlare CDN
# 1. Update DNS to point to CloudFlare
# 2. Enable caching rules
# 3. Configure SSL/TLS

# AWS CloudFront
aws cloudfront create-distribution \
  --origin-domain-name devopsforge.com \
  --default-root-object index.html
```

---

## Next Steps

- [Monitoring & Alerting](./MONITORING.md)
- [Security Best Practices](./SECURITY.md)
- [Performance Tuning](./PERFORMANCE.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)

**Need Help?**
- 📖 [Documentation](../README.md)
- 🐛 [GitHub Issues](https://github.com/yourusername/devops-forge/issues)
