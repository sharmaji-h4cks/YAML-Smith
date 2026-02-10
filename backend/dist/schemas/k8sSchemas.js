"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifestSchema = exports.hpaSchema = exports.pvcSchema = exports.ingressSchema = exports.secretSchema = exports.configMapSchema = exports.serviceSchema = exports.deploymentSchema = exports.containerSchema = exports.probeSchema = exports.volumeSchema = exports.volumeMountSchema = exports.envVarSchema = exports.containerPortSchema = exports.resourceRequirementsSchema = exports.metadataSchema = void 0;
const zod_1 = require("zod");
// Common schemas
exports.metadataSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 'Invalid Kubernetes name'),
    namespace: zod_1.z.string().optional().default('default'),
    labels: zod_1.z.record(zod_1.z.string()).optional().default({}),
    annotations: zod_1.z.record(zod_1.z.string()).optional().default({}),
});
exports.resourceRequirementsSchema = zod_1.z.object({
    requests: zod_1.z.object({
        cpu: zod_1.z.string().optional(),
        memory: zod_1.z.string().optional(),
    }).optional(),
    limits: zod_1.z.object({
        cpu: zod_1.z.string().optional(),
        memory: zod_1.z.string().optional(),
    }).optional(),
});
exports.containerPortSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    containerPort: zod_1.z.number().min(1).max(65535),
    protocol: zod_1.z.enum(['TCP', 'UDP', 'SCTP']).optional().default('TCP'),
});
exports.envVarSchema = zod_1.z.object({
    name: zod_1.z.string(),
    value: zod_1.z.string().optional(),
    valueFrom: zod_1.z.object({
        configMapKeyRef: zod_1.z.object({
            name: zod_1.z.string(),
            key: zod_1.z.string(),
        }).optional(),
        secretKeyRef: zod_1.z.object({
            name: zod_1.z.string(),
            key: zod_1.z.string(),
        }).optional(),
    }).optional(),
});
exports.volumeMountSchema = zod_1.z.object({
    name: zod_1.z.string(),
    mountPath: zod_1.z.string(),
    readOnly: zod_1.z.boolean().optional().default(false),
    subPath: zod_1.z.string().optional(),
});
exports.volumeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.enum(['emptyDir', 'configMap', 'secret', 'persistentVolumeClaim', 'hostPath']),
    configMap: zod_1.z.object({
        name: zod_1.z.string(),
    }).optional(),
    secret: zod_1.z.object({
        secretName: zod_1.z.string(),
    }).optional(),
    persistentVolumeClaim: zod_1.z.object({
        claimName: zod_1.z.string(),
    }).optional(),
    hostPath: zod_1.z.object({
        path: zod_1.z.string(),
    }).optional(),
});
exports.probeSchema = zod_1.z.object({
    httpGet: zod_1.z.object({
        path: zod_1.z.string(),
        port: zod_1.z.number(),
        scheme: zod_1.z.enum(['HTTP', 'HTTPS']).optional().default('HTTP'),
    }).optional(),
    exec: zod_1.z.object({
        command: zod_1.z.array(zod_1.z.string()),
    }).optional(),
    tcpSocket: zod_1.z.object({
        port: zod_1.z.number(),
    }).optional(),
    initialDelaySeconds: zod_1.z.number().optional().default(0),
    periodSeconds: zod_1.z.number().optional().default(10),
    timeoutSeconds: zod_1.z.number().optional().default(1),
    successThreshold: zod_1.z.number().optional().default(1),
    failureThreshold: zod_1.z.number().optional().default(3),
});
exports.containerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Container name is required'),
    image: zod_1.z.string().min(1, 'Image is required'),
    imagePullPolicy: zod_1.z.enum(['Always', 'IfNotPresent', 'Never']).optional().default('IfNotPresent'),
    command: zod_1.z.array(zod_1.z.string()).optional(),
    args: zod_1.z.array(zod_1.z.string()).optional(),
    ports: zod_1.z.array(exports.containerPortSchema).optional().default([]),
    env: zod_1.z.array(exports.envVarSchema).optional().default([]),
    resources: exports.resourceRequirementsSchema.optional(),
    volumeMounts: zod_1.z.array(exports.volumeMountSchema).optional().default([]),
    livenessProbe: exports.probeSchema.optional(),
    readinessProbe: exports.probeSchema.optional(),
    startupProbe: exports.probeSchema.optional(),
});
// Deployment schema
exports.deploymentSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    replicas: zod_1.z.number().min(1).optional().default(1),
    strategy: zod_1.z.object({
        type: zod_1.z.enum(['RollingUpdate', 'Recreate']).optional().default('RollingUpdate'),
        rollingUpdate: zod_1.z.object({
            maxSurge: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).optional().default(1),
            maxUnavailable: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).optional().default(0),
        }).optional(),
    }).optional(),
    containers: zod_1.z.array(exports.containerSchema).min(1, 'At least one container is required'),
    initContainers: zod_1.z.array(exports.containerSchema).optional().default([]),
    volumes: zod_1.z.array(exports.volumeSchema).optional().default([]),
    serviceAccountName: zod_1.z.string().optional(),
    nodeSelector: zod_1.z.record(zod_1.z.string()).optional(),
    tolerations: zod_1.z.array(zod_1.z.object({
        key: zod_1.z.string().optional(),
        operator: zod_1.z.enum(['Equal', 'Exists']).optional(),
        value: zod_1.z.string().optional(),
        effect: zod_1.z.enum(['NoSchedule', 'PreferNoSchedule', 'NoExecute']).optional(),
    })).optional(),
    affinity: zod_1.z.any().optional(),
});
// Service schema
exports.serviceSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    type: zod_1.z.enum(['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName']).default('ClusterIP'),
    selector: zod_1.z.record(zod_1.z.string()).optional(),
    ports: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().optional(),
        port: zod_1.z.number().min(1).max(65535),
        targetPort: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).optional(),
        protocol: zod_1.z.enum(['TCP', 'UDP', 'SCTP']).optional().default('TCP'),
        nodePort: zod_1.z.number().min(30000).max(32767).optional(),
    })).min(1, 'At least one port is required'),
    sessionAffinity: zod_1.z.enum(['None', 'ClientIP']).optional().default('None'),
    loadBalancerIP: zod_1.z.string().optional(),
    externalTrafficPolicy: zod_1.z.enum(['Cluster', 'Local']).optional(),
});
// ConfigMap schema
exports.configMapSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    data: zod_1.z.record(zod_1.z.string()).optional().default({}),
    binaryData: zod_1.z.record(zod_1.z.string()).optional(),
});
// Secret schema
exports.secretSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    type: zod_1.z.enum([
        'Opaque',
        'kubernetes.io/service-account-token',
        'kubernetes.io/dockercfg',
        'kubernetes.io/dockerconfigjson',
        'kubernetes.io/basic-auth',
        'kubernetes.io/ssh-auth',
        'kubernetes.io/tls',
    ]).default('Opaque'),
    data: zod_1.z.record(zod_1.z.string()).optional().default({}),
    stringData: zod_1.z.record(zod_1.z.string()).optional(),
});
// Ingress schema
exports.ingressSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    ingressClassName: zod_1.z.string().optional(),
    rules: zod_1.z.array(zod_1.z.object({
        host: zod_1.z.string().optional(),
        http: zod_1.z.object({
            paths: zod_1.z.array(zod_1.z.object({
                path: zod_1.z.string(),
                pathType: zod_1.z.enum(['Exact', 'Prefix', 'ImplementationSpecific']).default('Prefix'),
                backend: zod_1.z.object({
                    service: zod_1.z.object({
                        name: zod_1.z.string(),
                        port: zod_1.z.object({
                            number: zod_1.z.number().optional(),
                            name: zod_1.z.string().optional(),
                        }),
                    }),
                }),
            })),
        }),
    })).min(1, 'At least one rule is required'),
    tls: zod_1.z.array(zod_1.z.object({
        hosts: zod_1.z.array(zod_1.z.string()),
        secretName: zod_1.z.string(),
    })).optional(),
});
// PersistentVolumeClaim schema
exports.pvcSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    accessModes: zod_1.z.array(zod_1.z.enum(['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'])).min(1),
    storageClassName: zod_1.z.string().optional(),
    resources: zod_1.z.object({
        requests: zod_1.z.object({
            storage: zod_1.z.string(), // e.g., "10Gi"
        }),
    }),
    volumeMode: zod_1.z.enum(['Filesystem', 'Block']).optional().default('Filesystem'),
});
// HorizontalPodAutoscaler schema
exports.hpaSchema = zod_1.z.object({
    metadata: exports.metadataSchema,
    scaleTargetRef: zod_1.z.object({
        apiVersion: zod_1.z.string().default('apps/v1'),
        kind: zod_1.z.string().default('Deployment'),
        name: zod_1.z.string(),
    }),
    minReplicas: zod_1.z.number().min(1).default(1),
    maxReplicas: zod_1.z.number().min(1),
    metrics: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(['Resource', 'Pods', 'Object', 'External']),
        resource: zod_1.z.object({
            name: zod_1.z.enum(['cpu', 'memory']),
            target: zod_1.z.object({
                type: zod_1.z.enum(['Utilization', 'AverageValue']),
                averageUtilization: zod_1.z.number().optional(),
                averageValue: zod_1.z.string().optional(),
            }),
        }).optional(),
    })).optional(),
    targetCPUUtilizationPercentage: zod_1.z.number().min(1).max(100).optional(),
});
// Main manifest schema
exports.manifestSchema = zod_1.z.object({
    resourceType: zod_1.z.enum([
        'Deployment',
        'Service',
        'ConfigMap',
        'Secret',
        'Ingress',
        'PersistentVolumeClaim',
        'HorizontalPodAutoscaler',
    ]),
    deployment: exports.deploymentSchema.optional(),
    service: exports.serviceSchema.optional(),
    configMap: exports.configMapSchema.optional(),
    secret: exports.secretSchema.optional(),
    ingress: exports.ingressSchema.optional(),
    pvc: exports.pvcSchema.optional(),
    hpa: exports.hpaSchema.optional(),
    includeNamespace: zod_1.z.boolean().optional().default(false),
});
//# sourceMappingURL=k8sSchemas.js.map