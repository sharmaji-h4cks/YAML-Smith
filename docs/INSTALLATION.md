# Installation Guide

This comprehensive guide covers all installation methods for **YAML Smith** from development setup to production deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Installation](#development-installation)
3. [Docker Installation](#docker-installation)
4. [Production Installation](#production-installation)
5. [Verification](#verification)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)
8. [Upgrading](#upgrading)
9. [Uninstallation](#uninstallation)

## Prerequisites

### Required Software

| Software | Minimum Version | Recommended Version | Purpose |
|----------|----------------|---------------------|---------|
| **Node.js** | 18.0.0 | 20.10.0 | Runtime environment |
| **npm** | 9.0.0 | 10.2.0 | Package manager |
| **Git** | 2.30.0 | 2.43.0 | Version control |

### Optional Software

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| **Docker** | 20.10.0 | Container runtime |
| **Docker Compose** | 2.0.0 | Multi-container orchestration |
| **kubectl** | 1.25.0 | Kubernetes CLI (for K8s deployment) |
| **Helm** | 3.10.0 | Kubernetes package manager (for Helm deployment) |

### System Requirements

#### Development Environment
- **CPU**: 2 cores minimum, 4 cores recommended
- **RAM**: 4 GB minimum, 8 GB recommended
- **Disk Space**: 2 GB free space
- **Operating System**:
  - macOS 11.0+
  - Linux (Ubuntu 20.04+, Debian 11+, RHEL 8+)
  - Windows 10/11 with WSL2

#### Production Environment
- **CPU**: 4 cores minimum, 8 cores recommended
- **RAM**: 8 GB minimum, 16 GB recommended
- **Disk Space**: 10 GB free space
- **Operating System**:
  - Linux (production-ready kernel)
  - Container platform (Docker, Kubernetes)

### Network Requirements

- **Outbound**: Internet access for package downloads
- **Inbound Ports**:
  - `3002` - Backend API (configurable)
  - `5174` - Frontend dev server (development only)
  - `80/443` - HTTP/HTTPS (production)

## Development Installation

### Step 1: Install Prerequisites

#### macOS

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm
brew install node@20

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x

# Install Git (usually pre-installed)
brew install git
```

#### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x

# Install Git
sudo apt install git
```

#### RHEL/CentOS/Fedora

```bash
# Install Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version

# Install Git
sudo yum install git
```

#### Windows

1. **Download Node.js installer** from [nodejs.org](https://nodejs.org/)
2. **Run installer** and follow prompts
3. **Install Git** from [git-scm.com](https://git-scm.com/)
4. **Open PowerShell or Git Bash** for following commands

### Step 2: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/devops-forge.git
cd devops-forge

# Verify repository structure
ls -la
```

Expected output:
```
drwxr-xr-x   backend/
drwxr-xr-x   frontend/
drwxr-xr-x   docs/
-rw-r--r--   docker-compose.yml
-rw-r--r--   package.json
-rw-r--r--   README.md
```

### Step 3: Install Dependencies

```bash
# Install all workspace dependencies
npm install

# This installs dependencies for:
# - Root workspace
# - Backend
# - Frontend
```

**Expected output:**
```
added 1243 packages, and audited 1244 packages in 45s
found 0 vulnerabilities
```

### Step 4: Configure Environment Variables

#### Backend Configuration

```bash
# Navigate to backend directory
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file
nano .env  # or use your preferred editor
```

**Backend `.env` configuration:**

```bash
# Server Configuration
PORT=3002
NODE_ENV=development
HOST=0.0.0.0

# CORS Configuration
CORS_ORIGIN=http://localhost:5174

# API Configuration
API_PREFIX=/api
API_VERSION=v1

# Logging
LOG_LEVEL=debug
LOG_FORMAT=json

# Rate Limiting (requests per minute)
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100

# Security
HELMET_ENABLED=true
```

#### Frontend Configuration

```bash
# Navigate to frontend directory
cd ../frontend

# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

**Frontend `.env` configuration:**

```bash
# API Configuration
VITE_API_URL=http://localhost:3002/api

# Application Configuration
VITE_APP_NAME="YAML Smith"
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DARK_MODE=true

# Development
VITE_DEV_PORT=5174
```

### Step 5: Start Development Servers

#### Option 1: Start All Services (Recommended)

```bash
# From project root
npm run dev
```

This starts both frontend and backend concurrently.

**Expected output:**
```
> devops-forge@1.0.0 dev
> concurrently "npm run dev:backend" "npm run dev:frontend"

[0]
[0] > backend@1.0.0 dev
[0] > nodemon src/index.ts
[0]
[0] [nodemon] starting `ts-node src/index.ts`
[0] Server listening on http://localhost:3002
[1]
[1] > frontend@1.0.0 dev
[1] > vite
[1]
[1]   VITE v5.0.0  ready in 845 ms
[1]
[1]   ➜  Local:   http://localhost:5174/
[1]   ➜  Network: use --host to expose
```

#### Option 2: Start Services Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Verify Installation

Open your browser and navigate to:
- **Frontend**: http://localhost:5174
- **Backend Health Check**: http://localhost:3002/health

Expected health check response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "services": {
    "api": "healthy"
  }
}
```

## Docker Installation

### Prerequisites

```bash
# Install Docker
# macOS
brew install --cask docker

# Ubuntu
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Quick Start with Docker Compose

#### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/devops-forge.git
cd devops-forge
```

#### Step 2: Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Edit if needed
nano .env
```

**Docker `.env` configuration:**

```bash
# Application
NODE_ENV=production
API_PORT=3002
FRONTEND_PORT=80

# API URL (used by frontend)
VITE_API_URL=http://localhost/api

# CORS
CORS_ORIGIN=http://localhost
```

#### Step 3: Build and Start Containers

```bash
# Build images
docker-compose build

# Start services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

**Expected output:**
```
Creating network "devops-forge_default" with the default driver
Creating devops-forge_backend_1  ... done
Creating devops-forge_frontend_1 ... done
Creating devops-forge_nginx_1    ... done
```

#### Step 4: Verify Installation

```bash
# Check running containers
docker-compose ps

# Test health endpoint
curl http://localhost/health

# Access application
open http://localhost
```

### Docker Commands Reference

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f [service-name]

# Execute command in container
docker-compose exec backend sh
docker-compose exec frontend sh

# Rebuild images
docker-compose build --no-cache

# Scale services
docker-compose up -d --scale backend=3

# Remove all containers and volumes
docker-compose down -v
```

## Production Installation

### Architecture Options

#### Option 1: Docker Compose (Small-Medium Scale)

Best for:
- Small teams (< 10 users)
- Single-server deployments
- Development/staging environments

#### Option 2: Kubernetes (Medium-Large Scale)

Best for:
- Enterprise deployments
- High availability requirements
- Auto-scaling needs
- Multi-region deployments

#### Option 3: Cloud Platforms (Managed Services)

Best for:
- Quick deployment
- Minimal infrastructure management
- Built-in scaling and monitoring

### Production Docker Compose Setup

#### Step 1: Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

#### Step 2: Clone and Configure

```bash
# Create application directory
sudo mkdir -p /opt/devops-forge
cd /opt/devops-forge

# Clone repository
git clone https://github.com/yourusername/devops-forge.git .

# Set up environment
cp .env.example .env
nano .env
```

**Production `.env`:**

```bash
NODE_ENV=production
API_PORT=3002
FRONTEND_PORT=80

# Use your domain
VITE_API_URL=https://api.yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Security
HELMET_ENABLED=true
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

#### Step 3: SSL/TLS Configuration

```bash
# Create SSL certificate directory
mkdir -p ./nginx/ssl

# Option 1: Let's Encrypt (Recommended)
sudo apt install certbot
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./nginx/ssl/

# Option 2: Self-signed certificate (Development only)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./nginx/ssl/privkey.pem \
  -out ./nginx/ssl/fullchain.pem
```

#### Step 4: Update nginx Configuration

Create `nginx/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:3002;
    }

    server {
        listen 80;
        server_name yourdomain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Frontend
        location / {
            root /usr/share/nginx/html;
            try_files $uri $uri/ /index.html;
        }

        # API
        location /api/ {
            proxy_pass http://backend/api/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://backend/health;
        }
    }
}
```

#### Step 5: Deploy Application

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
docker-compose ps
curl https://yourdomain.com/health
```

#### Step 6: Set up Systemd Service (Auto-start)

Create `/etc/systemd/system/devops-forge.service`:

```ini
[Unit]
Description=YAML Smith
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/devops-forge
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

**Enable and start service:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable devops-forge
sudo systemctl start devops-forge
sudo systemctl status devops-forge
```

### Kubernetes Production Setup

#### Step 1: Create Kubernetes Manifests

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete Kubernetes deployment guide.

#### Quick Kubernetes Deployment:

```bash
# Apply namespace
kubectl create namespace devops-forge

# Apply secrets
kubectl create secret generic devops-forge-secrets \
  --from-literal=api-key=your-api-key \
  --namespace devops-forge

# Apply manifests
kubectl apply -f k8s/ --namespace devops-forge

# Verify deployment
kubectl get pods -n devops-forge
kubectl get services -n devops-forge
kubectl get ingress -n devops-forge
```

## Verification

### Health Checks

```bash
# Backend health check
curl http://localhost:3002/health

# Expected response
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Functional Tests

```bash
# Test Kubernetes manifest generation
curl -X POST http://localhost:3002/api/manifest/generate \
  -H "Content-Type: application/json" \
  -d '{
    "resourceType": "Deployment",
    "deployment": {
      "metadata": { "name": "test" },
      "replicas": 1,
      "containers": [{
        "name": "test",
        "image": "nginx:latest"
      }]
    }
  }'

# Test Dockerfile generation
curl -X POST http://localhost:3002/api/dockerfile/generate \
  -H "Content-Type: application/json" \
  -d '{
    "language": "nodejs",
    "projectName": "test-app"
  }'
```

### Performance Tests

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Load test
ab -n 1000 -c 10 http://localhost:3002/health

# Expected: < 100ms average response time
```

## Configuration

### Environment Variables Reference

#### Backend Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3002 | Server port |
| `NODE_ENV` | development | Environment (development/production) |
| `HOST` | 0.0.0.0 | Bind address |
| `CORS_ORIGIN` | * | CORS allowed origin |
| `API_PREFIX` | /api | API route prefix |
| `LOG_LEVEL` | info | Logging level |
| `RATE_LIMIT_MAX` | 100 | Rate limit (requests/minute) |

#### Frontend Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | http://localhost:3002/api | Backend API URL |
| `VITE_APP_NAME` | YAML Smith | Application name |
| `VITE_ENABLE_DARK_MODE` | true | Dark mode toggle |

### Advanced Configuration

#### Database Integration (Future)

```bash
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/devopsforge
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis Cache
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600
```

#### External Services

```bash
# Monitoring
PROMETHEUS_ENABLED=true
PROMETHEUS_PORT=9090

# Logging
ELASTICSEARCH_URL=http://localhost:9200
LOGSTASH_HOST=localhost:5000
```

## Troubleshooting

### Common Installation Issues

#### Issue: npm install fails

**Symptoms:**
```
npm ERR! code EACCES
npm ERR! syscall access
```

**Solution:**
```bash
# Fix permissions
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ./node_modules

# Or use nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

#### Issue: Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3002
```

**Solution:**
```bash
# Find process using port
lsof -i :3002

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3003
```

#### Issue: Docker build fails

**Symptoms:**
```
ERROR [internal] load metadata for docker.io/library/node:20-alpine
```

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Docker daemon
sudo systemctl status docker
```

#### Issue: Frontend can't connect to backend

**Symptoms:**
- Network errors in browser console
- CORS errors

**Solution:**
```bash
# Check backend is running
curl http://localhost:3002/health

# Verify CORS configuration
# In backend/.env
CORS_ORIGIN=http://localhost:5174

# In frontend/.env
VITE_API_URL=http://localhost:3002/api

# Restart both services
npm run dev
```

### Logs and Debugging

```bash
# Backend logs
cd backend
npm run dev  # Development with hot reload

# Frontend logs
cd frontend
npm run dev

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Production logs
sudo journalctl -u devops-forge -f
```

## Upgrading

### From Version 1.x to 1.y

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild
npm run build

# Restart services
docker-compose down
docker-compose up -d
```

### Database Migrations (Future)

```bash
# Run migrations
npm run migrate

# Rollback migration
npm run migrate:rollback
```

## Uninstallation

### Development Environment

```bash
# Remove node modules
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
rm package-lock.json

# Remove build artifacts
rm -rf frontend/dist
rm -rf backend/dist

# Remove entire directory
cd ..
rm -rf devops-forge
```

### Docker Environment

```bash
# Stop and remove containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove images
docker rmi devops-forge-backend
docker rmi devops-forge-frontend

# Clean Docker system
docker system prune -a
```

### Production Environment

```bash
# Stop systemd service
sudo systemctl stop devops-forge
sudo systemctl disable devops-forge

# Remove service file
sudo rm /etc/systemd/system/devops-forge.service
sudo systemctl daemon-reload

# Remove application
sudo rm -rf /opt/devops-forge

# Remove Docker images
docker-compose down -v
docker system prune -a
```

## Next Steps

- [Production Deployment](./DEPLOYMENT.md)
- [API Documentation](./API.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Contributing Guide](../CONTRIBUTING.md)

---

**Need Help?**
- 📖 [Documentation](../README.md)
- 🐛 [GitHub Issues](https://github.com/yourusername/devops-forge/issues)
- 💬 [Discussions](https://github.com/yourusername/devops-forge/discussions)
