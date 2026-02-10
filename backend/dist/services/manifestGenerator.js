"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestGenerator = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
class ManifestGenerator {
    input;
    constructor(input) {
        this.input = input;
    }
    generate() {
        const manifests = [];
        // Add namespace if requested
        if (this.input.includeNamespace) {
            const namespace = this.generateNamespace();
            if (namespace)
                manifests.push(namespace);
        }
        // Generate the requested resource type
        switch (this.input.resourceType) {
            case 'Deployment':
                if (this.input.deployment) {
                    manifests.push(this.generateDeployment(this.input.deployment));
                }
                break;
            case 'Service':
                if (this.input.service) {
                    manifests.push(this.generateService(this.input.service));
                }
                break;
            case 'ConfigMap':
                if (this.input.configMap) {
                    manifests.push(this.generateConfigMap(this.input.configMap));
                }
                break;
            case 'Secret':
                if (this.input.secret) {
                    manifests.push(this.generateSecret(this.input.secret));
                }
                break;
            case 'Ingress':
                if (this.input.ingress) {
                    manifests.push(this.generateIngress(this.input.ingress));
                }
                break;
            case 'PersistentVolumeClaim':
                if (this.input.pvc) {
                    manifests.push(this.generatePVC(this.input.pvc));
                }
                break;
            case 'HorizontalPodAutoscaler':
                if (this.input.hpa) {
                    manifests.push(this.generateHPA(this.input.hpa));
                }
                break;
        }
        // Convert to YAML
        return manifests.map(m => js_yaml_1.default.dump(m, { indent: 2, lineWidth: 120 })).join('---\n');
    }
    generateNamespace() {
        const namespace = this.getNamespace();
        if (namespace === 'default')
            return null;
        return {
            apiVersion: 'v1',
            kind: 'Namespace',
            metadata: {
                name: namespace,
            },
        };
    }
    generateDeployment(input) {
        const manifest = {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            spec: {
                replicas: input.replicas,
                selector: {
                    matchLabels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
                },
                template: {
                    metadata: {
                        labels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
                        annotations: this.cleanObject(input.metadata.annotations),
                    },
                    spec: {
                        containers: input.containers.map(c => this.generateContainer(c)),
                    },
                },
            },
        };
        // Add strategy
        if (input.strategy) {
            manifest.spec.strategy = {
                type: input.strategy.type,
            };
            if (input.strategy.type === 'RollingUpdate' && input.strategy.rollingUpdate) {
                manifest.spec.strategy.rollingUpdate = input.strategy.rollingUpdate;
            }
        }
        // Add init containers
        if (input.initContainers && input.initContainers.length > 0) {
            manifest.spec.template.spec.initContainers = input.initContainers.map(c => this.generateContainer(c));
        }
        // Add volumes
        if (input.volumes && input.volumes.length > 0) {
            manifest.spec.template.spec.volumes = input.volumes.map(v => this.generateVolume(v));
        }
        // Add service account
        if (input.serviceAccountName) {
            manifest.spec.template.spec.serviceAccountName = input.serviceAccountName;
        }
        // Add node selector
        if (input.nodeSelector && Object.keys(input.nodeSelector).length > 0) {
            manifest.spec.template.spec.nodeSelector = input.nodeSelector;
        }
        // Add tolerations
        if (input.tolerations && input.tolerations.length > 0) {
            manifest.spec.template.spec.tolerations = input.tolerations;
        }
        // Add affinity
        if (input.affinity) {
            manifest.spec.template.spec.affinity = input.affinity;
        }
        return this.cleanObject(manifest);
    }
    generateContainer(container) {
        const c = {
            name: container.name,
            image: container.image,
            imagePullPolicy: container.imagePullPolicy,
        };
        if (container.command && container.command.length > 0) {
            c.command = container.command;
        }
        if (container.args && container.args.length > 0) {
            c.args = container.args;
        }
        if (container.ports && container.ports.length > 0) {
            c.ports = container.ports.map((p) => this.cleanObject({
                name: p.name,
                containerPort: p.containerPort,
                protocol: p.protocol,
            }));
        }
        if (container.env && container.env.length > 0) {
            c.env = container.env.map((e) => this.cleanObject({
                name: e.name,
                value: e.value,
                valueFrom: e.valueFrom,
            }));
        }
        if (container.resources) {
            c.resources = this.cleanObject(container.resources);
        }
        if (container.volumeMounts && container.volumeMounts.length > 0) {
            c.volumeMounts = container.volumeMounts;
        }
        if (container.livenessProbe) {
            c.livenessProbe = this.generateProbe(container.livenessProbe);
        }
        if (container.readinessProbe) {
            c.readinessProbe = this.generateProbe(container.readinessProbe);
        }
        if (container.startupProbe) {
            c.startupProbe = this.generateProbe(container.startupProbe);
        }
        return this.cleanObject(c);
    }
    generateProbe(probe) {
        const p = {};
        if (probe.httpGet) {
            p.httpGet = this.cleanObject(probe.httpGet);
        }
        else if (probe.exec) {
            p.exec = probe.exec;
        }
        else if (probe.tcpSocket) {
            p.tcpSocket = probe.tcpSocket;
        }
        p.initialDelaySeconds = probe.initialDelaySeconds;
        p.periodSeconds = probe.periodSeconds;
        p.timeoutSeconds = probe.timeoutSeconds;
        p.successThreshold = probe.successThreshold;
        p.failureThreshold = probe.failureThreshold;
        return this.cleanObject(p);
    }
    generateVolume(volume) {
        const v = {
            name: volume.name,
        };
        switch (volume.type) {
            case 'emptyDir':
                v.emptyDir = {};
                break;
            case 'configMap':
                v.configMap = volume.configMap;
                break;
            case 'secret':
                v.secret = volume.secret;
                break;
            case 'persistentVolumeClaim':
                v.persistentVolumeClaim = volume.persistentVolumeClaim;
                break;
            case 'hostPath':
                v.hostPath = volume.hostPath;
                break;
        }
        return this.cleanObject(v);
    }
    generateService(input) {
        const manifest = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            spec: {
                type: input.type,
                selector: input.selector || { app: input.metadata.name },
                ports: input.ports.map(p => this.cleanObject({
                    name: p.name,
                    port: p.port,
                    targetPort: p.targetPort || p.port,
                    protocol: p.protocol,
                    nodePort: p.nodePort,
                })),
                sessionAffinity: input.sessionAffinity,
            },
        };
        if (input.loadBalancerIP) {
            manifest.spec.loadBalancerIP = input.loadBalancerIP;
        }
        if (input.externalTrafficPolicy) {
            manifest.spec.externalTrafficPolicy = input.externalTrafficPolicy;
        }
        return this.cleanObject(manifest);
    }
    generateConfigMap(input) {
        return this.cleanObject({
            apiVersion: 'v1',
            kind: 'ConfigMap',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            data: input.data,
            binaryData: input.binaryData,
        });
    }
    generateSecret(input) {
        return this.cleanObject({
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            type: input.type,
            data: input.data,
            stringData: input.stringData,
        });
    }
    generateIngress(input) {
        const manifest = {
            apiVersion: 'networking.k8s.io/v1',
            kind: 'Ingress',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            spec: {
                ingressClassName: input.ingressClassName,
                rules: input.rules,
            },
        };
        if (input.tls && input.tls.length > 0) {
            manifest.spec.tls = input.tls;
        }
        return this.cleanObject(manifest);
    }
    generatePVC(input) {
        return this.cleanObject({
            apiVersion: 'v1',
            kind: 'PersistentVolumeClaim',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            spec: {
                accessModes: input.accessModes,
                storageClassName: input.storageClassName,
                resources: input.resources,
                volumeMode: input.volumeMode,
            },
        });
    }
    generateHPA(input) {
        const manifest = {
            apiVersion: 'autoscaling/v2',
            kind: 'HorizontalPodAutoscaler',
            metadata: {
                name: input.metadata.name,
                namespace: input.metadata.namespace,
                labels: this.cleanObject(input.metadata.labels),
                annotations: this.cleanObject(input.metadata.annotations),
            },
            spec: {
                scaleTargetRef: input.scaleTargetRef,
                minReplicas: input.minReplicas,
                maxReplicas: input.maxReplicas,
            },
        };
        if (input.metrics && input.metrics.length > 0) {
            manifest.spec.metrics = input.metrics;
        }
        else if (input.targetCPUUtilizationPercentage) {
            manifest.spec.metrics = [
                {
                    type: 'Resource',
                    resource: {
                        name: 'cpu',
                        target: {
                            type: 'Utilization',
                            averageUtilization: input.targetCPUUtilizationPercentage,
                        },
                    },
                },
            ];
        }
        return this.cleanObject(manifest);
    }
    getNamespace() {
        switch (this.input.resourceType) {
            case 'Deployment':
                return this.input.deployment?.metadata.namespace || 'default';
            case 'Service':
                return this.input.service?.metadata.namespace || 'default';
            case 'ConfigMap':
                return this.input.configMap?.metadata.namespace || 'default';
            case 'Secret':
                return this.input.secret?.metadata.namespace || 'default';
            case 'Ingress':
                return this.input.ingress?.metadata.namespace || 'default';
            case 'PersistentVolumeClaim':
                return this.input.pvc?.metadata.namespace || 'default';
            case 'HorizontalPodAutoscaler':
                return this.input.hpa?.metadata.namespace || 'default';
            default:
                return 'default';
        }
    }
    cleanObject(obj) {
        if (obj === null || obj === undefined)
            return undefined;
        if (typeof obj !== 'object')
            return obj;
        if (Array.isArray(obj)) {
            const cleaned = obj.map(item => this.cleanObject(item)).filter(item => item !== undefined);
            return cleaned.length > 0 ? cleaned : undefined;
        }
        const cleaned = {};
        for (const [key, value] of Object.entries(obj)) {
            const cleanedValue = this.cleanObject(value);
            if (cleanedValue !== undefined && cleanedValue !== null && cleanedValue !== '' &&
                !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)) {
                cleaned[key] = cleanedValue;
            }
        }
        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }
    getWarnings() {
        const warnings = [];
        switch (this.input.resourceType) {
            case 'Deployment':
                warnings.push(...this.getDeploymentWarnings());
                break;
            case 'Service':
                warnings.push(...this.getServiceWarnings());
                break;
            case 'Secret':
                warnings.push(...this.getSecretWarnings());
                break;
            case 'Ingress':
                warnings.push(...this.getIngressWarnings());
                break;
        }
        return warnings;
    }
    getDeploymentWarnings() {
        const warnings = [];
        const deployment = this.input.deployment;
        if (!deployment)
            return warnings;
        // Check for latest tag
        deployment.containers.forEach(container => {
            if (container.image.includes(':latest') || !container.image.includes(':')) {
                warnings.push(`Container "${container.name}": Using "latest" tag is not recommended for production.`);
            }
        });
        // Check for resource limits
        deployment.containers.forEach(container => {
            if (!container.resources?.limits) {
                warnings.push(`Container "${container.name}": No resource limits defined. This can lead to resource exhaustion.`);
            }
        });
        // Check for liveness/readiness probes
        deployment.containers.forEach(container => {
            if (!container.livenessProbe) {
                warnings.push(`Container "${container.name}": No liveness probe defined. Consider adding one for better reliability.`);
            }
            if (!container.readinessProbe) {
                warnings.push(`Container "${container.name}": No readiness probe defined. This affects traffic routing.`);
            }
        });
        // Check replicas
        if (deployment.replicas && deployment.replicas < 2) {
            warnings.push('Running with less than 2 replicas provides no high availability.');
        }
        return warnings;
    }
    getServiceWarnings() {
        const warnings = [];
        const service = this.input.service;
        if (!service)
            return warnings;
        if (service.type === 'LoadBalancer') {
            warnings.push('LoadBalancer type creates cloud resources and may incur costs.');
        }
        if (service.type === 'NodePort') {
            warnings.push('NodePort exposes service on all nodes. Ensure firewall rules are configured.');
        }
        return warnings;
    }
    getSecretWarnings() {
        const warnings = [];
        const secret = this.input.secret;
        if (!secret)
            return warnings;
        if (secret.stringData && Object.keys(secret.stringData).length > 0) {
            warnings.push('stringData is stored as plain text in manifests. Consider using sealed secrets or external secret operators.');
        }
        return warnings;
    }
    getIngressWarnings() {
        const warnings = [];
        const ingress = this.input.ingress;
        if (!ingress)
            return warnings;
        if (!ingress.tls || ingress.tls.length === 0) {
            warnings.push('No TLS configuration. Consider enabling HTTPS for security.');
        }
        return warnings;
    }
    getSuggestions() {
        const suggestions = [];
        suggestions.push('Use kubectl apply -f <filename> to apply these manifests to your cluster.');
        suggestions.push('Consider using Kustomize or Helm for managing multiple environments.');
        suggestions.push('Add resource quotas and limit ranges to prevent resource abuse.');
        if (this.input.resourceType === 'Deployment') {
            suggestions.push('Consider adding a HorizontalPodAutoscaler for automatic scaling.');
            suggestions.push('Use PodDisruptionBudgets to maintain availability during updates.');
        }
        if (this.input.resourceType === 'Service') {
            suggestions.push('Consider using NetworkPolicies to control traffic between pods.');
        }
        return suggestions;
    }
}
exports.ManifestGenerator = ManifestGenerator;
//# sourceMappingURL=manifestGenerator.js.map