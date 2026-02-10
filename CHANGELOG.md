# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### Added
- Initial release of Kubernetes Manifest Generator
- Modern React 18 frontend with TypeScript
- Node.js/Express backend API with YAML generation
- Support for 7 Kubernetes resource types:
  - Deployment (with multi-container support)
  - Service (ClusterIP, NodePort, LoadBalancer)
  - ConfigMap
  - Secret
  - Ingress (with TLS support)
  - PersistentVolumeClaim
  - HorizontalPodAutoscaler
- Visual configuration interface for all resources
- Real-time validation with warnings and suggestions
- Best practices enforcement:
  - Resource limits and requests
  - Health probes (liveness, readiness, startup)
  - Security recommendations
  - Image tag validation
- YAML export functionality (copy to clipboard, download)
- Comprehensive validation using Zod schemas
- Production-ready YAML generation
- Docker and Docker Compose deployment
- CI/CD workflows with GitHub Actions
- Responsive UI with Tailwind CSS
- Health checks for containers
- Production Nginx configuration

### Features by Resource Type

#### Deployment
- Multiple containers and init containers
- Resource requests and limits
- Container ports configuration
- Environment variables
- Volume mounts
- Liveness, readiness, and startup probes
- Replica configuration
- Rolling update strategy
- Node selectors and tolerations

#### Service
- Multiple service types
- Port configuration with target ports
- Selector labels
- Session affinity
- Load balancer configuration

#### ConfigMap
- Key-value data entries
- Multi-line configuration support
- Namespace isolation

#### Ingress
- Multi-host routing
- Path-based routing
- TLS/SSL configuration
- Ingress class specification
- Backend service configuration

#### PersistentVolumeClaim
- Access modes configuration
- Storage class support
- Resource requests

#### HorizontalPodAutoscaler
- CPU-based scaling
- Memory-based scaling
- Min/max replica configuration

### Developer Experience
- Hot-reload development environment
- TypeScript strict mode
- ESLint and Prettier configuration
- Comprehensive test coverage
- Docker development setup
- VS Code recommended extensions
- Detailed API documentation

## [Unreleased]

## [1.1.0] - 2024-02-10

### Added - Complete Frontend Form Coverage
- **SecretForm**: Complete UI form for Secret resource with all 7 secret types
  - Support for Opaque, TLS, basic-auth, SSH, Docker registry, service-account-token, dockercfg
  - Dynamic key-value pair management
  - Type-specific hints and validation
  - Security warnings for sensitive data handling
- **PVCForm**: Complete UI form for PersistentVolumeClaim resource
  - Storage size configuration with validation
  - Multi-select access modes (ReadWriteOnce, ReadOnlyMany, ReadWriteMany)
  - Storage class selection
  - Volume mode selection (Filesystem/Block)
  - Access mode compatibility warnings
- **HPAForm**: Complete UI form for HorizontalPodAutoscaler resource
  - Scale target reference (Deployment, StatefulSet, ReplicaSet)
  - Min/Max replica configuration
  - Simple mode: CPU utilization percentage
  - Advanced mode: Custom metrics (CPU, Memory, Pods, Object, External)
  - Real-time scaling preview
  - High availability warnings

### Changed
- Updated ManifestForm to integrate all three new forms
- Removed "coming soon" placeholders for Secret and PersistentVolumeClaim
- Added HorizontalPodAutoscaler to resource type selector
- Enhanced README with detailed usage guides for new forms

### Fixed
- All 7 Kubernetes resource types now have complete frontend form coverage
- Backend-frontend feature parity achieved for initial resource set

## [Unreleased - Future Versions]

### Planned
- StatefulSet support
- DaemonSet support
- Job and CronJob support
- NetworkPolicy support
- ServiceAccount support
- RBAC (Role, RoleBinding, ClusterRole, ClusterRoleBinding)
- Template library for common patterns
- Manifest analyzer (upload existing YAML)
- Multi-manifest generation
- Helm chart generation
- Kustomize integration
- Policy validation with OPA
- Cost estimation
- GitOps integration
- CLI tool
- VS Code extension
