# API Documentation

Complete API reference for **YAML Smith** covering all generators and endpoints.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URLs](#base-urls)
4. [Common Responses](#common-responses)
5. [Kubernetes Manifest API](#kubernetes-manifest-api)
6. [Dockerfile API](#dockerfile-api)
7. [Helm Chart API](#helm-chart-api)
8. [CI/CD Pipeline API](#cicd-pipeline-api)
9. [Error Codes](#error-codes)
10. [Rate Limiting](#rate-limiting)
11. [Webhooks](#webhooks)
12. [SDKs & Client Libraries](#sdks--client-libraries)

## Overview

### API Version

Current Version: **v1**

### Content Type

All requests must include:
```
Content-Type: application/json
```

### Base Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0.0"
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": [ ... ]
  }
}
```

## Authentication

Currently, the API does not require authentication for public access. For production deployments, consider implementing:

- **API Keys**: `X-API-Key` header
- **OAuth 2.0**: Bearer token authentication
- **JWT**: JSON Web Tokens

Example with API key (future):
```bash
curl -H "X-API-Key: your-api-key" \
     -H "Content-Type: application/json" \
     https://api.devopsforge.com/api/manifest/generate
```

## Base URLs

### Development
```
http://localhost:3002/api
```

### Production
```
https://api.devopsforge.com/api
```

### Health Check

**Endpoint:** `GET /health`

**Description:** Check API health status

**Request:**
```bash
curl http://localhost:3002/health
```

**Response:** `200 OK`
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

## Common Responses

### 200 OK
Successful request

### 400 Bad Request
Invalid input data

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "deployment.metadata.name",
        "message": "Name is required"
      }
    ]
  }
}
```

### 500 Internal Server Error
Server error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An internal error occurred"
  }
}
```

## Kubernetes Manifest API

### Generate Manifest

**Endpoint:** `POST /api/manifest/generate`

**Description:** Generate Kubernetes manifest from configuration

**Request Body:**

```json
{
  "resourceType": "Deployment",
  "deployment": {
    "metadata": {
      "name": "api-service",
      "namespace": "production",
      "labels": {
        "app": "api",
        "tier": "backend"
      }
    },
    "replicas": 3,
    "strategy": {
      "type": "RollingUpdate",
      "rollingUpdate": {
        "maxSurge": 1,
        "maxUnavailable": 0
      }
    },
    "containers": [
      {
        "name": "api",
        "image": "myregistry.io/api:v1.2.3",
        "imagePullPolicy": "IfNotPresent",
        "ports": [
          {
            "containerPort": 8080,
            "protocol": "TCP"
          }
        ],
        "env": [
          {
            "name": "NODE_ENV",
            "value": "production"
          }
        ],
        "resources": {
          "requests": {
            "cpu": "100m",
            "memory": "128Mi"
          },
          "limits": {
            "cpu": "500m",
            "memory": "512Mi"
          }
        },
        "livenessProbe": {
          "httpGet": {
            "path": "/health",
            "port": 8080
          },
          "initialDelaySeconds": 30,
          "periodSeconds": 10
        },
        "readinessProbe": {
          "httpGet": {
            "path": "/ready",
            "port": 8080
          },
          "initialDelaySeconds": 10,
          "periodSeconds": 5
        }
      }
    ]
  }
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "manifest": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-service\n  namespace: production\n  labels:\n    app: api\n    tier: backend\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  selector:\n    matchLabels:\n      app: api\n  template:\n    metadata:\n      labels:\n        app: api\n    spec:\n      containers:\n      - name: api\n        image: myregistry.io/api:v1.2.3\n        imagePullPolicy: IfNotPresent\n        ports:\n        - containerPort: 8080\n          protocol: TCP\n        env:\n        - name: NODE_ENV\n          value: production\n        resources:\n          requests:\n            cpu: 100m\n            memory: 128Mi\n          limits:\n            cpu: 500m\n            memory: 512Mi\n        livenessProbe:\n          httpGet:\n            path: /health\n            port: 8080\n          initialDelaySeconds: 30\n          periodSeconds: 10\n        readinessProbe:\n          httpGet:\n            path: /ready\n            port: 8080\n          initialDelaySeconds: 10\n          periodSeconds: 5",
  "metadata": {
    "resourceType": "Deployment",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Validate Manifest

**Endpoint:** `POST /api/manifest/validate`

**Description:** Validate manifest configuration and get warnings/suggestions

**Request Body:** (Same as generate endpoint)

**Response:** `200 OK`

```json
{
  "success": true,
  "valid": true,
  "warnings": [
    "Consider adding a startup probe for better initialization handling"
  ],
  "suggestions": [
    "Add pod anti-affinity for better availability",
    "Consider adding a HorizontalPodAutoscaler for automatic scaling"
  ]
}
```

### Get Templates

**Endpoint:** `GET /api/manifest/templates`

**Description:** Get predefined manifest templates

**Response:** `200 OK`

```json
{
  "success": true,
  "templates": {
    "basic-deployment": {
      "name": "Basic Deployment",
      "description": "Simple deployment with one container",
      "config": { ... }
    },
    "production-deployment": {
      "name": "Production Deployment",
      "description": "Production-ready with probes and resources",
      "config": { ... }
    }
  }
}
```

## Dockerfile API

### Generate Dockerfile

**Endpoint:** `POST /api/dockerfile/generate`

**Description:** Generate Dockerfile for specified language

**Request Body:**

```json
{
  "language": "nodejs",
  "projectName": "my-api",
  "multiStage": {
    "enabled": true,
    "builderStage": "builder",
    "finalStage": "production"
  },
  "nodejsConfig": {
    "version": "20",
    "packageManager": "npm",
    "installDevDependencies": false,
    "buildScript": "build",
    "startScript": "start",
    "useNodeModulesCache": true
  },
  "security": {
    "nonRootUser": true,
    "userId": 1001,
    "userName": "appuser",
    "useDistroless": true,
    "readOnlyRootFilesystem": true
  },
  "optimization": {
    "useDockerignore": true,
    "useBuildCache": true,
    "minimizeLayers": true
  },
  "healthCheck": {
    "enabled": true,
    "command": "curl -f http://localhost:3000/health || exit 1",
    "interval": "30s",
    "timeout": "3s",
    "retries": 3,
    "startPeriod": "40s"
  },
  "environment": {
    "NODE_ENV": "production",
    "PORT": "3000"
  },
  "ports": [3000],
  "workdir": "/app"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "dockerfile": "# Build stage\nFROM node:20-alpine AS builder\n\nWORKDIR /app\n\n# Copy package files\nCOPY package*.json ./\n\n# Install dependencies\nRUN npm ci --only=production\n\n# Copy source code\nCOPY . .\n\n# Build application\nRUN npm run build\n\n# Production stage\nFROM gcr.io/distroless/nodejs20-debian11\n\nWORKDIR /app\n\n# Copy built application\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/package.json ./\n\n# Set environment variables\nENV NODE_ENV=production\nENV PORT=3000\n\n# Create non-root user\nUSER 1001\n\n# Expose port\nEXPOSE 3000\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s --retries=3 --start-period=40s \\\n  CMD [\"curl\", \"-f\", \"http://localhost:3000/health\", \"||\", \"exit\", \"1\"]\n\n# Start application\nCMD [\"node\", \"dist/index.js\"]",
  "dockerignore": "node_modules\nnpm-debug.log\n.git\n.env\n.DS_Store\n*.md\n.vscode\n.idea\ncoverage\n*.test.js\n*.spec.js"
}
```

### Validate Dockerfile

**Endpoint:** `POST /api/dockerfile/validate`

**Description:** Validate Dockerfile configuration

**Request Body:** (Same as generate endpoint)

**Response:** `200 OK`

```json
{
  "success": true,
  "validation": {
    "valid": true,
    "warnings": [
      {
        "severity": "medium",
        "message": "Using distroless image, ensure your application doesn't need shell access",
        "category": "security"
      }
    ],
    "suggestions": [
      "Consider adding multi-platform build support (linux/amd64, linux/arm64)",
      "Add labels for better image organization"
    ]
  }
}
```

### Get Dockerfile Templates

**Endpoint:** `GET /api/dockerfile/templates`

**Description:** Get predefined Dockerfile templates

**Response:** `200 OK`

```json
{
  "success": true,
  "templates": {
    "basic-nodejs": {
      "language": "nodejs",
      "description": "Basic Node.js application",
      "config": { ... }
    },
    "production-nodejs": {
      "language": "nodejs",
      "description": "Production-ready Node.js with multi-stage build",
      "config": { ... }
    },
    "python-fastapi": {
      "language": "python",
      "description": "FastAPI application with uvicorn",
      "config": { ... }
    }
  }
}
```

## Helm Chart API

### Generate Helm Chart

**Endpoint:** `POST /api/helm-chart/generate`

**Description:** Generate complete Helm chart structure

**Request Body:**

```json
{
  "chart": {
    "name": "my-app",
    "version": "1.0.0",
    "appVersion": "1.0.0",
    "description": "Production-ready web application",
    "keywords": ["web", "api", "microservice"],
    "maintainers": [
      {
        "name": "DevOps Team",
        "email": "devops@example.com"
      }
    ]
  },
  "image": {
    "repository": "myregistry.io/my-app",
    "tag": "1.0.0",
    "pullPolicy": "IfNotPresent",
    "pullSecrets": []
  },
  "service": {
    "type": "ClusterIP",
    "port": 80,
    "targetPort": 8080,
    "annotations": {}
  },
  "ingress": {
    "enabled": true,
    "className": "nginx",
    "annotations": {
      "cert-manager.io/cluster-issuer": "letsencrypt-prod"
    },
    "hosts": [
      {
        "host": "myapp.example.com",
        "paths": [
          {
            "path": "/",
            "pathType": "Prefix"
          }
        ]
      }
    ],
    "tls": [
      {
        "secretName": "myapp-tls",
        "hosts": ["myapp.example.com"]
      }
    ]
  },
  "resources": {
    "requests": {
      "cpu": "100m",
      "memory": "128Mi"
    },
    "limits": {
      "cpu": "500m",
      "memory": "512Mi"
    }
  },
  "autoscaling": {
    "enabled": true,
    "minReplicas": 2,
    "maxReplicas": 10,
    "targetCPUUtilizationPercentage": 80,
    "targetMemoryUtilizationPercentage": 80
  },
  "advanced": {
    "serviceMonitor": {
      "enabled": true,
      "interval": "30s",
      "scrapeTimeout": "10s"
    },
    "podDisruptionBudget": {
      "enabled": true,
      "minAvailable": 1
    },
    "networkPolicy": {
      "enabled": true,
      "ingressRules": [
        {
          "from": [{ "namespaceSelector": {} }],
          "ports": [{ "protocol": "TCP", "port": 8080 }]
        }
      ]
    }
  },
  "environments": [
    {
      "name": "development",
      "replicaCount": 1,
      "resources": {
        "requests": { "cpu": "50m", "memory": "64Mi" }
      }
    },
    {
      "name": "production",
      "replicaCount": 3,
      "resources": {
        "requests": { "cpu": "200m", "memory": "256Mi" }
      }
    }
  ]
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "files": {
    "Chart.yaml": "apiVersion: v2\nname: my-app\nversion: 1.0.0\nappVersion: 1.0.0\ndescription: Production-ready web application\nkeywords:\n  - web\n  - api\n  - microservice\nmaintainers:\n  - name: DevOps Team\n    email: devops@example.com",
    "values.yaml": "...",
    "templates/deployment.yaml": "...",
    "templates/service.yaml": "...",
    "templates/ingress.yaml": "...",
    "templates/_helpers.tpl": "...",
    "templates/hpa.yaml": "...",
    "templates/servicemonitor.yaml": "...",
    "templates/poddisruptionbudget.yaml": "...",
    "templates/networkpolicy.yaml": "...",
    "templates/NOTES.txt": "...",
    "values-development.yaml": "...",
    "values-production.yaml": "...",
    ".helmignore": "...",
    "README.md": "..."
  }
}
```

### Validate Helm Chart

**Endpoint:** `POST /api/helm-chart/validate`

**Description:** Validate Helm chart configuration

**Request Body:** (Same as generate endpoint)

**Response:** `200 OK`

```json
{
  "success": true,
  "validation": {
    "valid": true,
    "warnings": [
      {
        "severity": "low",
        "message": "ServiceMonitor requires Prometheus Operator to be installed",
        "file": "templates/servicemonitor.yaml"
      }
    ],
    "suggestions": [
      "Add RBAC templates for service accounts",
      "Consider adding configmap and secret templates",
      "Add tests in templates/tests/ directory"
    ]
  }
}
```

### Get Helm Chart Templates

**Endpoint:** `GET /api/helm-chart/templates`

**Description:** Get predefined Helm chart templates

**Response:** `200 OK`

```json
{
  "success": true,
  "templates": {
    "basic": {
      "name": "Basic Helm Chart",
      "description": "Simple chart with deployment and service",
      "config": { ... }
    },
    "production": {
      "name": "Production Helm Chart",
      "description": "Full-featured chart with monitoring and HA",
      "config": { ... }
    },
    "microservice": {
      "name": "Microservice Chart",
      "description": "Chart for microservice with service mesh support",
      "config": { ... }
    }
  }
}
```

## CI/CD Pipeline API

### Generate CI/CD Pipeline

**Endpoint:** `POST /api/cicd/generate`

**Description:** Generate CI/CD pipeline configuration

**Request Body:**

```json
{
  "platform": "github-actions",
  "projectName": "my-app",
  "language": "nodejs",
  "triggers": {
    "branches": ["main", "develop"],
    "tags": ["v*"],
    "pullRequest": true,
    "schedule": "0 0 * * *",
    "paths": ["src/**", ".github/workflows/**"]
  },
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".",
    "buildArgs": {
      "NODE_ENV": "production"
    },
    "platforms": ["linux/amd64", "linux/arm64"],
    "useCache": true,
    "target": "production"
  },
  "test": {
    "enabled": true,
    "unitTests": {
      "enabled": true,
      "command": "npm test"
    },
    "integrationTests": {
      "enabled": true,
      "command": "npm run test:integration"
    },
    "e2eTests": {
      "enabled": false,
      "command": "npm run test:e2e"
    },
    "coverage": {
      "enabled": true,
      "threshold": 80
    }
  },
  "security": {
    "enabled": true,
    "trivy": {
      "enabled": true,
      "severity": ["HIGH", "CRITICAL"],
      "exitOnError": false
    },
    "snyk": {
      "enabled": true,
      "token": "${{ secrets.SNYK_TOKEN }}"
    },
    "sonarqube": {
      "enabled": false
    }
  },
  "registry": {
    "type": "ghcr",
    "url": "ghcr.io",
    "repository": "myorg/my-app",
    "usernameSecret": "${{ github.actor }}",
    "passwordSecret": "${{ secrets.GITHUB_TOKEN }}",
    "tagStrategy": "commit-sha",
    "additionalTags": ["latest"]
  },
  "deployment": {
    "enabled": true,
    "strategy": "helm",
    "cluster": {
      "name": "production-cluster",
      "contextSecret": "${{ secrets.KUBE_CONFIG }}"
    },
    "namespace": "production",
    "helmChart": {
      "name": "my-app",
      "path": "./helm/my-app",
      "valuesFile": "values-prod.yaml"
    },
    "gitops": {
      "enabled": false
    }
  },
  "environments": [
    {
      "name": "development",
      "branch": "develop",
      "namespace": "dev",
      "requireApproval": false
    },
    {
      "name": "production",
      "branch": "main",
      "namespace": "production",
      "requireApproval": true
    }
  ],
  "notifications": {
    "slack": {
      "enabled": true,
      "webhookSecret": "${{ secrets.SLACK_WEBHOOK }}",
      "channel": "#deployments"
    },
    "email": {
      "enabled": false
    }
  },
  "options": {
    "parallelJobs": true,
    "cacheEnabled": true,
    "artifactRetention": 30,
    "timeout": 60,
    "retryOnFailure": {
      "enabled": true,
      "maxAttempts": 2
    }
  }
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "files": {
    ".github/workflows/ci-cd.yml": "name: CI/CD Pipeline\n\non:\n  push:\n    branches: [main, develop]\n    tags: ['v*']\n  pull_request:\n    branches: [main, develop]\n  schedule:\n    - cron: '0 0 * * *'\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Set up Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '20'\n          cache: 'npm'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Run unit tests\n        run: npm test\n      \n      - name: Run integration tests\n        run: npm run test:integration\n      \n      - name: Check coverage\n        run: npm run coverage\n      \n      - name: Build Docker image\n        run: |\n          docker buildx create --use\n          docker buildx build \\\n            --platform linux/amd64,linux/arm64 \\\n            --tag ghcr.io/myorg/my-app:${{ github.sha }} \\\n            --tag ghcr.io/myorg/my-app:latest \\\n            --push .\n      \n      - name: Run Trivy scan\n        uses: aquasecurity/trivy-action@master\n        with:\n          image-ref: ghcr.io/myorg/my-app:${{ github.sha }}\n          severity: HIGH,CRITICAL\n      \n      - name: Deploy with Helm\n        if: github.ref == 'refs/heads/main'\n        run: |\n          helm upgrade --install my-app ./helm/my-app \\\n            --namespace production \\\n            --values ./helm/my-app/values-prod.yaml \\\n            --set image.tag=${{ github.sha }}\n      \n      - name: Notify Slack\n        if: always()\n        uses: 8398a7/action-slack@v3\n        with:\n          status: ${{ job.status }}\n          webhook_url: ${{ secrets.SLACK_WEBHOOK }}\n          channel: '#deployments'",
    "README-CICD.md": "# CI/CD Pipeline\n\n## Overview\nThis repository uses GitHub Actions for continuous integration and deployment...\n\n## Setup\n1. Configure secrets in GitHub repository settings\n2. Update workflow configuration as needed\n3. Push changes to trigger pipeline\n\n## Required Secrets\n- `GITHUB_TOKEN`: Automatically provided\n- `SNYK_TOKEN`: Snyk API token\n- `KUBE_CONFIG`: Kubernetes config for deployment\n- `SLACK_WEBHOOK`: Slack webhook URL\n\n## Workflow Stages\n1. **Build**: Compile and build application\n2. **Test**: Run unit and integration tests\n3. **Security Scan**: Scan for vulnerabilities\n4. **Docker Build**: Build and push Docker images\n5. **Deploy**: Deploy to Kubernetes cluster\n6. **Notify**: Send notifications to Slack"
  }
}
```

### Validate CI/CD Pipeline

**Endpoint:** `POST /api/cicd/validate`

**Description:** Validate CI/CD pipeline configuration

**Request Body:** (Same as generate endpoint)

**Response:** `200 OK`

```json
{
  "success": true,
  "validation": {
    "valid": true,
    "warnings": [
      {
        "severity": "medium",
        "message": "Building for multiple platforms increases build time significantly",
        "platform": "github-actions"
      },
      {
        "severity": "low",
        "message": "Consider adding deployment rollback on failure",
        "platform": "github-actions"
      }
    ],
    "suggestions": [
      "Add branch protection rules to require CI checks",
      "Configure CODEOWNERS file for review requirements",
      "Set up environment protection rules for production",
      "Add deployment status checks"
    ]
  }
}
```

### Get CI/CD Templates

**Endpoint:** `GET /api/cicd/templates`

**Description:** Get predefined CI/CD pipeline templates

**Response:** `200 OK`

```json
{
  "success": true,
  "templates": {
    "basic-nodejs": {
      "platform": "github-actions",
      "projectName": "my-nodejs-app",
      "language": "nodejs",
      "description": "Basic Node.js CI/CD with tests and Docker build",
      "config": { ... }
    },
    "production-microservice": {
      "platform": "gitlab-ci",
      "projectName": "payment-service",
      "language": "go",
      "description": "Production microservice with full CI/CD including security scanning",
      "config": { ... }
    },
    "jenkins-java": {
      "platform": "jenkins",
      "projectName": "spring-boot-api",
      "language": "java",
      "description": "Jenkins pipeline for Java Spring Boot application",
      "config": { ... }
    }
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `INVALID_RESOURCE_TYPE` | 400 | Unknown or unsupported resource type |
| `INVALID_LANGUAGE` | 400 | Unsupported programming language |
| `INVALID_PLATFORM` | 400 | Unsupported CI/CD platform |
| `MISSING_REQUIRED_FIELD` | 400 | Required field is missing |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

## Rate Limiting

### Limits

- **Development**: 100 requests per minute per IP
- **Production**: 1000 requests per minute per API key

### Headers

Response includes rate limit headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642250400
```

### Rate Limit Exceeded Response

**Status:** `429 Too Many Requests`

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

## Webhooks

### Configuration

Configure webhooks to receive notifications about generation events:

**Endpoint:** `POST /api/webhooks`

**Request Body:**
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["manifest.generated", "dockerfile.generated"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload

```json
{
  "event": "manifest.generated",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "resourceType": "Deployment",
    "generatedBy": "api-key-123",
    "manifest": "..."
  },
  "signature": "sha256=..."
}
```

## SDKs & Client Libraries

### JavaScript/TypeScript

```bash
npm install @devopsforge/client
```

```typescript
import { DevOpsForgeClient } from '@devopsforge/client';

const client = new DevOpsForgeClient({
  baseURL: 'https://api.devopsforge.com/api',
  apiKey: 'your-api-key'
});

// Generate Kubernetes manifest
const manifest = await client.manifest.generate({
  resourceType: 'Deployment',
  deployment: { ... }
});

// Generate Dockerfile
const dockerfile = await client.dockerfile.generate({
  language: 'nodejs',
  projectName: 'my-app'
});
```

### Python

```bash
pip install devopsforge
```

```python
from devopsforge import Client

client = Client(
    base_url='https://api.devopsforge.com/api',
    api_key='your-api-key'
)

# Generate Helm chart
chart = client.helm_chart.generate({
    'chart': {
        'name': 'my-app',
        'version': '1.0.0'
    },
    'image': { ... }
})
```

### Go

```bash
go get github.com/devopsforge/go-client
```

```go
package main

import (
    "github.com/devopsforge/go-client"
)

func main() {
    client := devopsforge.NewClient(
        devopsforge.WithBaseURL("https://api.devopsforge.com/api"),
        devopsforge.WithAPIKey("your-api-key"),
    )

    // Generate CI/CD pipeline
    pipeline, err := client.CICD.Generate(&devopsforge.CICDInput{
        Platform: "github-actions",
        ProjectName: "my-app",
        Language: "go",
    })
}
```

### cURL Examples

```bash
# Generate Kubernetes Deployment
curl -X POST https://api.devopsforge.com/api/manifest/generate \
  -H "Content-Type: application/json" \
  -d '{"resourceType":"Deployment","deployment":{...}}'

# Generate Dockerfile
curl -X POST https://api.devopsforge.com/api/dockerfile/generate \
  -H "Content-Type: application/json" \
  -d '{"language":"nodejs","projectName":"my-app"}'

# Generate Helm Chart
curl -X POST https://api.devopsforge.com/api/helm-chart/generate \
  -H "Content-Type: application/json" \
  -d '{"chart":{"name":"my-app"}}'

# Generate CI/CD Pipeline
curl -X POST https://api.devopsforge.com/api/cicd/generate \
  -H "Content-Type: application/json" \
  -d '{"platform":"github-actions","projectName":"my-app"}'
```

---

## Next Steps

- [Installation Guide](./INSTALLATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Architecture Overview](./ARCHITECTURE.md)

**Need Help?**
- 📖 [Documentation](../README.md)
- 🐛 [GitHub Issues](https://github.com/yourusername/devops-forge/issues)
- 💬 [API Support](mailto:api-support@devopsforge.com)
