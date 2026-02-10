# YAML Smith

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000)](https://expressjs.com/)

> Cloud-Native DevOps automation platform that generates production-ready Kubernetes manifests, Dockerfiles, Helm charts, and CI/CD pipelines. Built with enterprise-grade quality standards, security best practices, and modern UI.

![YAML Smith](https://via.placeholder.com/1200x600/d946ef/ffffff?text=YAML+Smith+-+Build+Faster%2C+Deploy+Safer)

## 🚀 Overview

**YAML Smith** is a comprehensive Cloud-Native DevOps automation platform that generates essential DevOps configuration files, helping teams:

- **Build Faster** - Generate complex configurations in minutes instead of hours
- **Deploy Safer** - Follow security best practices and industry standards automatically
- **Scale Better** - Production-ready templates with high availability and observability built-in
- **Learn Continuously** - Real-time validation with warnings and improvement suggestions

## ✨ Features

### 🎯 Four Powerful Generators

#### 1. **Kubernetes Manifest Generator**
- ✅ **7 Resource Types with Complete UI Forms**: Deployment, Service, ConfigMap, Secret, Ingress, PersistentVolumeClaim, HorizontalPodAutoscaler
- ✅ Multi-container support with init containers
- ✅ Health probes (liveness, readiness, startup)
- ✅ Resource limits and requests
- ✅ Security contexts and pod security standards
- ✅ Volume mounts and persistent storage
- ✅ Network policies and service mesh ready
- ✅ **NEW**: Secret management with 7 secret types (Opaque, TLS, basic-auth, SSH, Docker, etc.)
- ✅ **NEW**: PVC configuration with multiple access modes and storage classes
- ✅ **NEW**: HPA with simple CPU-based and advanced custom metrics scaling

#### 2. **Dockerfile Generator**
- ✅ 8 Languages: Node.js, Python, Go, Java, Rust, .NET, PHP, Ruby
- ✅ Multi-stage builds for optimal image size
- ✅ Security-first: Non-root users, distroless images
- ✅ Health checks and environment configuration
- ✅ Build argument and layer caching optimization
- ✅ Auto-generated .dockerignore files
- ✅ Production and development variants

#### 3. **Helm Chart Generator**
- ✅ Complete chart structure (15+ files)
- ✅ Templates: Deployment, Service, Ingress, ConfigMap, Secret
- ✅ Advanced features: HPA, PDB, ServiceMonitor, NetworkPolicy
- ✅ Multi-environment values (dev, staging, production)
- ✅ Helm hooks and tests
- ✅ Chart dependencies and sub-charts
- ✅ NOTES.txt with deployment instructions

#### 4. **CI/CD Pipeline Generator**
- ✅ 5 Platforms: GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps
- ✅ Complete workflows: Build, test, security scanning, deployment
- ✅ Container registry integration (Docker Hub, GCR, ECR, ACR, GHCR)
- ✅ Security scanning: Trivy, Snyk, SonarQube
- ✅ Deployment strategies: kubectl, Helm, Kustomize, GitOps
- ✅ Multi-environment support with approvals
- ✅ Notification integrations (Slack, Teams, Email)

### 🛡️ Security & Best Practices

- **Automated Security** - Non-root users, security contexts, secret management
- **Resource Management** - CPU/memory limits, QoS classes, priority classes
- **High Availability** - Multi-replica deployments, pod disruption budgets, anti-affinity
- **Observability** - Prometheus metrics, structured logging, distributed tracing ready
- **Compliance** - Pod Security Standards, Network Policies, RBAC recommendations

### 🎨 Modern UI/UX

- **Intuitive Forms** - Smart defaults with advanced options
- **Real-Time Preview** - See generated configurations instantly
- **Validation & Suggestions** - Get warnings and improvement recommendations
- **Dark Mode** - Professional dark/light theme support
- **Copy & Download** - One-click export to files
- **Responsive Design** - Works on desktop, tablet, and mobile

## 📦 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Docker** >= 20.10 (optional, for containerized deployment)
- **kubectl** >= 1.25 (optional, for Kubernetes deployment)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/devops-forge.git
cd devops-forge
```

2. **Install dependencies**

```bash
# Install all workspace dependencies
npm install
```

3. **Set up environment variables**

Create environment files from templates:

```bash
# Backend
cd backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env
```

4. **Start development servers**

```bash
# From project root
npm run dev
```

This starts:
- **Frontend**: http://localhost:5174
- **Backend**: http://localhost:3002

### Docker Quick Start

For a production-like environment with Docker:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access the application at: **http://localhost**

## 📖 Usage Guide

### Kubernetes Manifest Generator

#### Creating a Production Deployment

1. **Navigate to Kubernetes tab**
2. **Select "Deployment" resource type**
3. **Configure metadata**:
   ```
   Name: api-service
   Namespace: production
   Labels: app=api, tier=backend
   ```

4. **Configure deployment**:
   - Replicas: `3` (high availability)
   - Strategy: RollingUpdate with maxSurge=1, maxUnavailable=0

5. **Configure container**:
   ```
   Name: api
   Image: myregistry.io/api:v1.2.3
   Port: 8080
   ```

6. **Set resources** (recommended):
   ```
   Requests: CPU=100m, Memory=128Mi
   Limits: CPU=500m, Memory=512Mi
   ```

7. **Add health probes**:
   ```
   Liveness: HTTP GET /health on port 8080
   Readiness: HTTP GET /ready on port 8080
   Startup: HTTP GET /startup on port 8080 (30s timeout)
   ```

8. **Add environment variables**:
   ```
   NODE_ENV=production
   LOG_LEVEL=info
   ```

9. **Click "Generate Manifest"** and download

#### Creating a Service

1. **Select "Service" resource type**
2. **Configure**:
   ```
   Name: api-service
   Type: ClusterIP
   Selector: app=api
   Ports: 80 → 8080
   ```
3. **Generate and download**

#### Creating an Ingress

1. **Select "Ingress" resource type**
2. **Configure**:
   ```
   Name: api-ingress
   Ingress Class: nginx
   Host: api.example.com
   Path: /
   Service: api-service
   Port: 80
   ```
3. **Add TLS** (recommended):
   ```
   Secret: api-tls-cert
   Hosts: api.example.com
   ```
4. **Generate and download**

#### Creating a Secret

1. **Select "Secret" resource type**
2. **Configure metadata**:
   ```
   Name: app-secrets
   Namespace: production
   ```
3. **Select secret type**: Choose from 7 types:
   - **Opaque**: Generic secret (default)
   - **kubernetes.io/tls**: TLS certificates
   - **kubernetes.io/basic-auth**: Username/password
   - **kubernetes.io/dockerconfigjson**: Docker registry credentials
   - **kubernetes.io/ssh-auth**: SSH private keys
   - Others: service-account-token, dockercfg
4. **Add secret data**:
   - Click "Add Entry" to add key-value pairs
   - Example for API keys:
     ```
     API_KEY: your-secret-api-key-here
     DB_PASSWORD: your-database-password
     ```
   - Example for TLS:
     ```
     tls.crt: <certificate content>
     tls.key: <private key content>
     ```
5. **Security Note**: Values are stored as `stringData` in the manifest (visible). For production, use external secret management tools (Sealed Secrets, External Secrets Operator, Vault)
6. **Generate and download**

#### Creating a PersistentVolumeClaim (PVC)

1. **Select "PersistentVolumeClaim" resource type**
2. **Configure metadata**:
   ```
   Name: app-data
   Namespace: production
   ```
3. **Configure storage**:
   - **Storage Size**: `10Gi` (or 1Gi, 100Gi, 1Ti)
   - **Storage Class**: `standard`, `gp2`, `fast`, `ssd` (optional)
4. **Select access modes** (at least one required):
   - ☑️ **ReadWriteOnce (RWO)**: Single node can mount read-write
   - ☐ **ReadOnlyMany (ROX)**: Many nodes can mount read-only
   - ☐ **ReadWriteMany (RWX)**: Many nodes can mount read-write (not supported by all storage classes)
5. **Select volume mode**:
   - ⚪ **Filesystem**: Standard directory mount (default)
   - ⚪ **Block**: Raw block device for databases
6. **Generate and download**

#### Creating a HorizontalPodAutoscaler (HPA)

1. **Select "HorizontalPodAutoscaler" resource type**
2. **Configure metadata**:
   ```
   Name: app-hpa
   Namespace: production
   ```
3. **Configure scale target**:
   - **Target Kind**: Deployment, StatefulSet, or ReplicaSet
   - **Target Name**: `myapp` (must match existing workload)
4. **Set replica limits**:
   - **Min Replicas**: `2` (recommended minimum for HA)
   - **Max Replicas**: `10`
5. **Choose scaling mode**:

   **Simple Mode** (recommended for most use cases):
   - Set **Target CPU Utilization**: `80%`
   - HPA will scale when average CPU exceeds this threshold

   **Advanced Mode** (for custom metrics):
   - Click "Switch to Advanced Mode"
   - Click "Add Metric" to configure custom metrics
   - Configure metric type: Resource (CPU/Memory), Pods, Object, External
   - Set target type: Utilization (%) or AverageValue
   - Example: Scale based on memory usage, custom application metrics, or external metrics

6. **Preview**: "Will scale between 2-10 replicas when CPU > 80%"
7. **Generate and download**

### Dockerfile Generator

#### Creating a Node.js Dockerfile

1. **Navigate to Dockerfile tab**
2. **Select language**: Node.js
3. **Configure project**:
   ```
   Project Name: my-api
   Node Version: 20
   Package Manager: npm
   Start Script: start
   Build Script: build (optional)
   ```

4. **Enable multi-stage build** (recommended)
5. **Configure security**:
   - ✅ Use non-root user
   - ✅ Use distroless image
   - User ID: 1001

6. **Configure optimization**:
   - ✅ Use .dockerignore
   - ✅ Use build cache
   - ✅ Minimize layers

7. **Add health check**:
   ```
   Command: curl -f http://localhost:3000/health
   Interval: 30s
   Timeout: 3s
   Retries: 3
   ```

8. **Generate** and download both Dockerfile and .dockerignore

#### Other Language Examples

**Python FastAPI**:
- Language: Python
- Version: 3.11
- Package Manager: pip
- Requirements File: requirements.txt
- Main File: main.py
- Framework: FastAPI

**Go Application**:
- Language: Go
- Version: 1.21
- Build Command: go build -o app
- Binary Name: app
- Enable CGO: No

### Helm Chart Generator

#### Creating a Complete Helm Chart

1. **Navigate to Helm Chart tab**
2. **Configure chart metadata**:
   ```
   Chart Name: my-app
   Version: 1.0.0
   App Version: 1.0.0
   Description: Production-ready web application
   ```

3. **Configure image**:
   ```
   Repository: myregistry.io/my-app
   Tag: 1.0.0
   Pull Policy: IfNotPresent
   ```

4. **Configure service**:
   ```
   Type: ClusterIP
   Port: 80
   Target Port: 8080
   ```

5. **Enable ingress**:
   ```
   ✅ Enabled
   Host: myapp.example.com
   Path: /
   TLS: ✅ Enabled
   ```

6. **Configure resources**:
   ```
   Requests: CPU=100m, Memory=128Mi
   Limits: CPU=500m, Memory=512Mi
   ```

7. **Enable autoscaling**:
   ```
   ✅ Enabled
   Min Replicas: 2
   Max Replicas: 10
   Target CPU: 80%
   ```

8. **Advanced options**:
   - ✅ ServiceMonitor (Prometheus)
   - ✅ PodDisruptionBudget
   - ✅ NetworkPolicy

9. **Generate** - Downloads complete Helm chart structure

### CI/CD Pipeline Generator

#### Creating a GitHub Actions Pipeline

1. **Navigate to CI/CD tab**
2. **Select platform**: GitHub Actions
3. **Configure project**:
   ```
   Project Name: my-app
   Language: Node.js
   ```

4. **Configure triggers**:
   ```
   Branches: main, develop
   ✅ Pull Requests
   Paths: src/**, .github/workflows/**
   ```

5. **Configure build**:
   ```
   Dockerfile: Dockerfile
   Context: .
   ✅ Use cache
   Platforms: linux/amd64, linux/arm64
   ```

6. **Configure tests**:
   ```
   ✅ Unit Tests: npm test
   ✅ Integration Tests: npm run test:integration
   ✅ Coverage (threshold: 80%)
   ```

7. **Configure security scanning**:
   ```
   ✅ Trivy (HIGH, CRITICAL)
   ✅ Snyk
   ```

8. **Configure registry**:
   ```
   Type: GitHub Container Registry
   Repository: ghcr.io/myorg/my-app
   Tag Strategy: commit-sha
   Additional Tags: latest
   ```

9. **Configure deployment**:
   ```
   Strategy: Helm
   Namespace: production
   Chart: ./helm/my-app
   ```

10. **Generate** - Downloads workflow YAML and README

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐ │
│  │    K8s   │  │ Dockerfile│  │ Helm Chart│  │  CI/CD   │ │
│  │   Form   │  │   Form    │  │   Form    │  │   Form   │ │
│  └─────┬────┘  └─────┬─────┘  └─────┬─────┘  └─────┬────┘ │
│        │             │                │              │       │
│        └─────────────┴────────────────┴──────────────┘       │
│                           │ HTTPS                             │
└───────────────────────────┼───────────────────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────────┐
│                           ▼                                    │
│                    API Gateway (Express)                       │
│                  /api/manifest  /api/dockerfile                │
│                  /api/helm-chart  /api/cicd                    │
│        ┌──────────────┬──────────────┬──────────────┐        │
│        ▼              ▼              ▼              ▼         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   K8s    │  │ Dockerfile│  │   Helm   │  │  CI/CD   │    │
│  │Generator │  │ Generator │  │Generator │  │Generator │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Zod Validation & Schema Enforcement           │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
devops-forge/
├── frontend/                     # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/           # Generator-specific forms
│   │   │   │   ├── DeploymentForm.tsx
│   │   │   │   ├── DockerfileForm.tsx
│   │   │   │   ├── HelmChartForm.tsx
│   │   │   │   └── CICDForm.tsx
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   └── Checkbox.tsx
│   │   │   ├── ManifestForm.tsx
│   │   │   ├── ManifestOutput.tsx
│   │   │   ├── DockerfileOutput.tsx
│   │   │   ├── HelmChartOutput.tsx
│   │   │   └── CICDOutput.tsx
│   │   ├── lib/
│   │   │   ├── api.ts           # API client
│   │   │   └── utils.ts         # Utilities
│   │   ├── App.tsx              # Main application
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Tailwind styles
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   │   ├── manifestController.ts
│   │   │   ├── dockerfileController.ts
│   │   │   ├── helmChartController.ts
│   │   │   └── cicdController.ts
│   │   ├── routes/              # API routes
│   │   │   ├── manifest.ts
│   │   │   ├── dockerfile.ts
│   │   │   ├── helmChart.ts
│   │   │   ├── cicd.ts
│   │   │   └── index.ts
│   │   ├── services/            # Business logic
│   │   │   ├── manifestGenerator.ts      (900+ lines)
│   │   │   ├── dockerfileGenerator.ts    (1100+ lines)
│   │   │   ├── helmChartGenerator.ts     (750+ lines)
│   │   │   └── cicdGenerator.ts          (650+ lines)
│   │   ├── schemas/             # Zod validation schemas
│   │   │   ├── k8sSchemas.ts             (500+ lines)
│   │   │   ├── dockerfileSchemas.ts      (200+ lines)
│   │   │   ├── helmChartSchemas.ts       (250+ lines)
│   │   │   └── cicdSchemas.ts            (240+ lines)
│   │   ├── middleware/          # Express middleware
│   │   │   ├── errorHandler.ts
│   │   │   ├── cors.ts
│   │   │   └── validation.ts
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utilities
│   │   └── index.ts             # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                         # Documentation
│   ├── INSTALLATION.md          # Detailed installation guide
│   ├── DEPLOYMENT.md            # Production deployment guide
│   ├── API.md                   # Complete API reference
│   ├── ARCHITECTURE.md          # Technical architecture
│   └── EXAMPLES.md              # Usage examples
│
├── docker-compose.yml            # Docker Compose configuration
├── .env.example                  # Environment template
├── package.json                  # Root workspace config
├── README.md                     # This file
├── CONTRIBUTING.md               # Contribution guidelines
└── LICENSE                       # MIT License
```

### Technology Stack

#### Frontend
- **React 18.2** - UI framework
- **TypeScript 5.3** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form management
- **Lucide React** - Icon library
- **Axios** - HTTP client

#### Backend
- **Node.js 18+** - Runtime
- **Express 4.18** - Web framework
- **TypeScript 5.3** - Type safety
- **Zod** - Schema validation
- **js-yaml** - YAML processing
- **cors** - CORS middleware
- **helmet** - Security headers

#### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **nginx** - Reverse proxy (production)
- **GitHub Actions** - CI/CD (optional)

## 🔒 Security Best Practices

### Application Security

1. **Input Validation** - All inputs validated with Zod schemas
2. **CORS Configuration** - Strict origin policies
3. **Security Headers** - Helmet.js middleware
4. **No Hardcoded Secrets** - Environment variable configuration
5. **Dependency Scanning** - Regular npm audit

### Generated Configuration Security

1. **Kubernetes**:
   - Non-root security contexts by default
   - Read-only root filesystems
   - Resource limits to prevent DoS
   - Network policies for pod isolation
   - Secret management best practices

2. **Dockerfiles**:
   - Multi-stage builds to minimize attack surface
   - Non-root user execution
   - Distroless base images when possible
   - No hardcoded credentials
   - Minimal layer count

3. **CI/CD Pipelines**:
   - Security scanning with Trivy/Snyk
   - Secret scanning and prevention
   - Code quality checks
   - Image vulnerability scanning
   - Signed commits and artifacts

## 📊 Performance & Scalability

### Frontend Performance
- **Code Splitting** - Lazy loading for optimal bundle size
- **Tree Shaking** - Remove unused code
- **Asset Optimization** - Compressed images and fonts
- **Service Worker** - Offline capability (optional)

### Backend Performance
- **Async/Await** - Non-blocking I/O operations
- **Request Validation** - Early rejection of invalid requests
- **Response Caching** - Cache frequently generated configs
- **Connection Pooling** - Efficient resource usage

### Scalability
- **Stateless Design** - Horizontal scaling ready
- **Container-Native** - Runs in any container orchestrator
- **Resource Limits** - CPU/memory limits defined
- **Health Checks** - Liveness and readiness probes

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Backend unit tests
cd backend && npm test

# Frontend unit tests
cd frontend && npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm test -- --coverage
```

### Test Coverage Goals

- **Unit Tests**: > 80% coverage
- **Integration Tests**: Critical API endpoints
- **E2E Tests**: Complete user workflows

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

### Quick Deploy Options

#### 1. Docker Compose (Recommended for small teams)

```bash
docker-compose up -d
```

#### 2. Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s/

# Or use Helm
helm install devops-forge ./helm/devops-forge
```

#### 3. Cloud Platforms

- **AWS**: ECS, EKS, or Elastic Beanstalk
- **Azure**: AKS or Container Instances
- **GCP**: GKE or Cloud Run
- **DigitalOcean**: Kubernetes or App Platform

### Environment-Specific Configuration

#### Development
```bash
NODE_ENV=development
VITE_API_URL=http://localhost:3002/api
CORS_ORIGIN=http://localhost:5174
```

#### Production
```bash
NODE_ENV=production
VITE_API_URL=https://api.devopsforge.com
CORS_ORIGIN=https://devopsforge.com
```

## 📚 API Documentation

For complete API reference, see [API.md](./docs/API.md)

### Quick API Reference

#### Health Check
```bash
GET /health
Response: { "status": "ok", "timestamp": "..." }
```

#### Generate Kubernetes Manifest
```bash
POST /api/manifest/generate
Content-Type: application/json

{
  "resourceType": "Deployment",
  "deployment": { ... }
}
```

#### Generate Dockerfile
```bash
POST /api/dockerfile/generate
Content-Type: application/json

{
  "language": "nodejs",
  "projectName": "my-app",
  ...
}
```

#### Generate Helm Chart
```bash
POST /api/helm-chart/generate
Content-Type: application/json

{
  "chart": { "name": "my-app", ... },
  "image": { ... },
  ...
}
```

#### Generate CI/CD Pipeline
```bash
POST /api/cicd/generate
Content-Type: application/json

{
  "platform": "github-actions",
  "projectName": "my-app",
  ...
}
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Code of Conduct
- Development setup
- Pull request process
- Coding standards
- Testing requirements

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📋 Roadmap

### Current Version (v1.0)
- [x] Kubernetes manifest generation (7 resources)
- [x] Dockerfile generation (8 languages)
- [x] Helm chart generation
- [x] CI/CD pipeline generation (5 platforms)

### Upcoming Features (v1.1)
- [ ] StatefulSet and DaemonSet support
- [ ] Job and CronJob generators
- [ ] Terraform module generation
- [ ] Kubernetes Operator templates
- [ ] Custom Resource Definition generator

### Future Considerations (v2.0)
- [ ] Template library and marketplace
- [ ] GitOps integration (ArgoCD, Flux)
- [ ] Policy validation (OPA, Kyverno)
- [ ] Cost estimation
- [ ] Multi-cluster deployment
- [ ] AI-powered optimization suggestions

## ❓ Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3002
lsof -i :3002

# Kill process
kill -9 <PID>

# Or change port in backend/.env
PORT=3003
```

#### Docker Build Fails
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### Frontend Can't Connect to Backend
```bash
# Check CORS configuration in backend/.env
CORS_ORIGIN=http://localhost:5174

# Verify backend is running
curl http://localhost:3002/health

# Check frontend API URL in frontend/.env
VITE_API_URL=http://localhost:3002/api
```

#### TypeScript Compilation Errors
```bash
# Clean build artifacts
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Getting Help

- 📖 [Documentation](./docs/)
- 🐛 [GitHub Issues](https://github.com/yourusername/devops-forge/issues)
- 💬 [GitHub Discussions](https://github.com/yourusername/devops-forge/discussions)
- 📧 Email: support@devopsforge.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Open Source Contributors** - For making this possible
- **DevOps Community** - For valuable feedback and support

## 📚 Resources

### Official Documentation
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Helm Documentation](https://helm.sh/docs/)

### Best Practices
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Helm Best Practices](https://helm.sh/docs/chart_best_practices/)
- [12-Factor App](https://12factor.net/)

### Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

---

**Built with ❤️ for the DevOps community**

*Helping DevOps teams build faster, deploy safer, and scale better*

**Created by [Shivanshu Sharma](https://github.com/sharmaji-h4cks)**
