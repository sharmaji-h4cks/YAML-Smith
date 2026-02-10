"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helmChartValidationSchema = exports.helmChartOutputSchema = exports.helmChartSchema = exports.dependencySchema = exports.valuesConfigSchema = exports.environmentSchema = exports.chartMetadataSchema = void 0;
const zod_1 = require("zod");
// Chart metadata schema (Chart.yaml)
exports.chartMetadataSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Chart name is required').regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 'Invalid chart name'),
    version: zod_1.z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be semver (e.g., 1.0.0)').default('0.1.0'),
    description: zod_1.z.string().optional(),
    apiVersion: zod_1.z.string().default('v2'),
    appVersion: zod_1.z.string().optional(),
    type: zod_1.z.enum(['application', 'library']).default('application'),
    keywords: zod_1.z.array(zod_1.z.string()).optional().default([]),
    home: zod_1.z.string().url().optional(),
    sources: zod_1.z.array(zod_1.z.string().url()).optional().default([]),
    maintainers: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email().optional(),
        url: zod_1.z.string().url().optional(),
    })).optional().default([]),
    icon: zod_1.z.string().url().optional(),
    deprecated: zod_1.z.boolean().optional().default(false),
    annotations: zod_1.z.record(zod_1.z.string()).optional().default({}),
});
// Environment configuration schema
exports.environmentSchema = zod_1.z.object({
    name: zod_1.z.string(),
    namespace: zod_1.z.string().optional(),
    replicas: zod_1.z.number().optional(),
    imageTag: zod_1.z.string().optional(),
    resources: zod_1.z.object({
        requests: zod_1.z.object({
            cpu: zod_1.z.string().optional(),
            memory: zod_1.z.string().optional(),
        }).optional(),
        limits: zod_1.z.object({
            cpu: zod_1.z.string().optional(),
            memory: zod_1.z.string().optional(),
        }).optional(),
    }).optional(),
    ingress: zod_1.z.object({
        enabled: zod_1.z.boolean().optional(),
        host: zod_1.z.string().optional(),
        tls: zod_1.z.boolean().optional(),
    }).optional(),
    env: zod_1.z.record(zod_1.z.string()).optional(),
});
// Values configuration schema
exports.valuesConfigSchema = zod_1.z.object({
    // Image configuration
    image: zod_1.z.object({
        repository: zod_1.z.string().optional(),
        pullPolicy: zod_1.z.enum(['Always', 'IfNotPresent', 'Never']).optional().default('IfNotPresent'),
        tag: zod_1.z.string().optional(),
    }).optional(),
    // Replica configuration
    replicaCount: zod_1.z.number().min(1).optional().default(1),
    // Service configuration
    service: zod_1.z.object({
        type: zod_1.z.enum(['ClusterIP', 'NodePort', 'LoadBalancer']).optional().default('ClusterIP'),
        port: zod_1.z.number().optional().default(80),
        targetPort: zod_1.z.number().optional(),
    }).optional(),
    // Ingress configuration
    ingress: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        className: zod_1.z.string().optional(),
        annotations: zod_1.z.record(zod_1.z.string()).optional(),
        hosts: zod_1.z.array(zod_1.z.object({
            host: zod_1.z.string(),
            paths: zod_1.z.array(zod_1.z.object({
                path: zod_1.z.string(),
                pathType: zod_1.z.string().optional().default('Prefix'),
            })),
        })).optional(),
        tls: zod_1.z.array(zod_1.z.object({
            secretName: zod_1.z.string(),
            hosts: zod_1.z.array(zod_1.z.string()),
        })).optional(),
    }).optional(),
    // Resources
    resources: zod_1.z.object({
        requests: zod_1.z.object({
            cpu: zod_1.z.string().optional(),
            memory: zod_1.z.string().optional(),
        }).optional(),
        limits: zod_1.z.object({
            cpu: zod_1.z.string().optional(),
            memory: zod_1.z.string().optional(),
        }).optional(),
    }).optional(),
    // Autoscaling
    autoscaling: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        minReplicas: zod_1.z.number().optional().default(1),
        maxReplicas: zod_1.z.number().optional().default(10),
        targetCPUUtilizationPercentage: zod_1.z.number().optional().default(80),
        targetMemoryUtilizationPercentage: zod_1.z.number().optional(),
    }).optional(),
    // Environment variables
    env: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        value: zod_1.z.string(),
    })).optional(),
    // ConfigMaps and Secrets
    configMaps: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        data: zod_1.z.record(zod_1.z.string()),
    })).optional(),
    secrets: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        data: zod_1.z.record(zod_1.z.string()),
    })).optional(),
    // Probes
    livenessProbe: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(true),
        httpGet: zod_1.z.object({
            path: zod_1.z.string().optional().default('/health'),
            port: zod_1.z.number().optional(),
        }).optional(),
        initialDelaySeconds: zod_1.z.number().optional().default(30),
        periodSeconds: zod_1.z.number().optional().default(10),
    }).optional(),
    readinessProbe: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(true),
        httpGet: zod_1.z.object({
            path: zod_1.z.string().optional().default('/ready'),
            port: zod_1.z.number().optional(),
        }).optional(),
        initialDelaySeconds: zod_1.z.number().optional().default(5),
        periodSeconds: zod_1.z.number().optional().default(5),
    }).optional(),
    // Node selector, tolerations, affinity
    nodeSelector: zod_1.z.record(zod_1.z.string()).optional(),
    tolerations: zod_1.z.array(zod_1.z.any()).optional(),
    affinity: zod_1.z.any().optional(),
    // Security context
    securityContext: zod_1.z.object({
        runAsNonRoot: zod_1.z.boolean().optional().default(true),
        runAsUser: zod_1.z.number().optional().default(1000),
        fsGroup: zod_1.z.number().optional().default(1000),
    }).optional(),
    // Service account
    serviceAccount: zod_1.z.object({
        create: zod_1.z.boolean().optional().default(true),
        name: zod_1.z.string().optional(),
        annotations: zod_1.z.record(zod_1.z.string()).optional(),
    }).optional(),
    // Additional labels and annotations
    labels: zod_1.z.record(zod_1.z.string()).optional(),
    annotations: zod_1.z.record(zod_1.z.string()).optional(),
});
// Dependency schema (for Chart.yaml dependencies)
exports.dependencySchema = zod_1.z.object({
    name: zod_1.z.string(),
    version: zod_1.z.string(),
    repository: zod_1.z.string(),
    condition: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    enabled: zod_1.z.boolean().optional(),
    importValues: zod_1.z.array(zod_1.z.any()).optional(),
    alias: zod_1.z.string().optional(),
});
// Main Helm chart input schema
exports.helmChartSchema = zod_1.z.object({
    // Chart metadata
    metadata: exports.chartMetadataSchema,
    // Values configuration
    values: exports.valuesConfigSchema.optional(),
    // Multi-environment support
    environments: zod_1.z.array(exports.environmentSchema).optional().default([]),
    // Dependencies
    dependencies: zod_1.z.array(exports.dependencySchema).optional().default([]),
    // K8s manifests to convert (optional - for conversion mode)
    manifests: zod_1.z.array(zod_1.z.object({
        kind: zod_1.z.string(),
        yaml: zod_1.z.string(),
    })).optional(),
    // Generation options
    options: zod_1.z.object({
        includeHelpers: zod_1.z.boolean().optional().default(true),
        includeTests: zod_1.z.boolean().optional().default(true),
        includeNotes: zod_1.z.boolean().optional().default(true),
        includeHooks: zod_1.z.boolean().optional().default(false),
        generateEnvironmentValues: zod_1.z.boolean().optional().default(false),
        includeServiceMonitor: zod_1.z.boolean().optional().default(false),
        includePodDisruptionBudget: zod_1.z.boolean().optional().default(false),
        includeNetworkPolicy: zod_1.z.boolean().optional().default(false),
    }).optional().default({}),
    // Template style
    templateStyle: zod_1.z.enum(['standard', 'minimal', 'comprehensive']).optional().default('standard'),
});
// Output schema
exports.helmChartOutputSchema = zod_1.z.record(zod_1.z.string());
// Validation result schema
exports.helmChartValidationSchema = zod_1.z.object({
    valid: zod_1.z.boolean(),
    warnings: zod_1.z.array(zod_1.z.object({
        severity: zod_1.z.enum(['low', 'medium', 'high']),
        message: zod_1.z.string(),
        file: zod_1.z.string().optional(),
    })),
    suggestions: zod_1.z.array(zod_1.z.string()),
});
//# sourceMappingURL=helmChartSchemas.js.map