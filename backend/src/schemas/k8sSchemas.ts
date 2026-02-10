import { z } from 'zod';

// Common schemas
export const metadataSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 'Invalid Kubernetes name'),
  namespace: z.string().optional().default('default'),
  labels: z.record(z.string()).optional().default({}),
  annotations: z.record(z.string()).optional().default({}),
});

export const resourceRequirementsSchema = z.object({
  requests: z.object({
    cpu: z.string().optional(),
    memory: z.string().optional(),
  }).optional(),
  limits: z.object({
    cpu: z.string().optional(),
    memory: z.string().optional(),
  }).optional(),
});

export const containerPortSchema = z.object({
  name: z.string().optional(),
  containerPort: z.number().min(1).max(65535),
  protocol: z.enum(['TCP', 'UDP', 'SCTP']).optional().default('TCP'),
});

export const envVarSchema = z.object({
  name: z.string(),
  value: z.string().optional(),
  valueFrom: z.object({
    configMapKeyRef: z.object({
      name: z.string(),
      key: z.string(),
    }).optional(),
    secretKeyRef: z.object({
      name: z.string(),
      key: z.string(),
    }).optional(),
  }).optional(),
});

export const volumeMountSchema = z.object({
  name: z.string(),
  mountPath: z.string(),
  readOnly: z.boolean().optional().default(false),
  subPath: z.string().optional(),
});

export const volumeSchema = z.object({
  name: z.string(),
  type: z.enum(['emptyDir', 'configMap', 'secret', 'persistentVolumeClaim', 'hostPath']),
  configMap: z.object({
    name: z.string(),
  }).optional(),
  secret: z.object({
    secretName: z.string(),
  }).optional(),
  persistentVolumeClaim: z.object({
    claimName: z.string(),
  }).optional(),
  hostPath: z.object({
    path: z.string(),
  }).optional(),
});

export const probeSchema = z.object({
  httpGet: z.object({
    path: z.string(),
    port: z.number(),
    scheme: z.enum(['HTTP', 'HTTPS']).optional().default('HTTP'),
  }).optional(),
  exec: z.object({
    command: z.array(z.string()),
  }).optional(),
  tcpSocket: z.object({
    port: z.number(),
  }).optional(),
  initialDelaySeconds: z.number().optional().default(0),
  periodSeconds: z.number().optional().default(10),
  timeoutSeconds: z.number().optional().default(1),
  successThreshold: z.number().optional().default(1),
  failureThreshold: z.number().optional().default(3),
});

export const containerSchema = z.object({
  name: z.string().min(1, 'Container name is required'),
  image: z.string().min(1, 'Image is required'),
  imagePullPolicy: z.enum(['Always', 'IfNotPresent', 'Never']).optional().default('IfNotPresent'),
  command: z.array(z.string()).optional(),
  args: z.array(z.string()).optional(),
  ports: z.array(containerPortSchema).optional().default([]),
  env: z.array(envVarSchema).optional().default([]),
  resources: resourceRequirementsSchema.optional(),
  volumeMounts: z.array(volumeMountSchema).optional().default([]),
  livenessProbe: probeSchema.optional(),
  readinessProbe: probeSchema.optional(),
  startupProbe: probeSchema.optional(),
});

// Deployment schema
export const deploymentSchema = z.object({
  metadata: metadataSchema,
  replicas: z.number().min(1).optional().default(1),
  strategy: z.object({
    type: z.enum(['RollingUpdate', 'Recreate']).optional().default('RollingUpdate'),
    rollingUpdate: z.object({
      maxSurge: z.union([z.number(), z.string()]).optional().default(1),
      maxUnavailable: z.union([z.number(), z.string()]).optional().default(0),
    }).optional(),
  }).optional(),
  containers: z.array(containerSchema).min(1, 'At least one container is required'),
  initContainers: z.array(containerSchema).optional().default([]),
  volumes: z.array(volumeSchema).optional().default([]),
  serviceAccountName: z.string().optional(),
  nodeSelector: z.record(z.string()).optional(),
  tolerations: z.array(z.object({
    key: z.string().optional(),
    operator: z.enum(['Equal', 'Exists']).optional(),
    value: z.string().optional(),
    effect: z.enum(['NoSchedule', 'PreferNoSchedule', 'NoExecute']).optional(),
  })).optional(),
  affinity: z.any().optional(),
});

// Service schema
export const serviceSchema = z.object({
  metadata: metadataSchema,
  type: z.enum(['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName']).default('ClusterIP'),
  selector: z.record(z.string()).optional(),
  ports: z.array(z.object({
    name: z.string().optional(),
    port: z.number().min(1).max(65535),
    targetPort: z.union([z.number(), z.string()]).optional(),
    protocol: z.enum(['TCP', 'UDP', 'SCTP']).optional().default('TCP'),
    nodePort: z.number().min(30000).max(32767).optional(),
  })).min(1, 'At least one port is required'),
  sessionAffinity: z.enum(['None', 'ClientIP']).optional().default('None'),
  loadBalancerIP: z.string().optional(),
  externalTrafficPolicy: z.enum(['Cluster', 'Local']).optional(),
});

// ConfigMap schema
export const configMapSchema = z.object({
  metadata: metadataSchema,
  data: z.record(z.string()).optional().default({}),
  binaryData: z.record(z.string()).optional(),
});

// Secret schema
export const secretSchema = z.object({
  metadata: metadataSchema,
  type: z.enum([
    'Opaque',
    'kubernetes.io/service-account-token',
    'kubernetes.io/dockercfg',
    'kubernetes.io/dockerconfigjson',
    'kubernetes.io/basic-auth',
    'kubernetes.io/ssh-auth',
    'kubernetes.io/tls',
  ]).default('Opaque'),
  data: z.record(z.string()).optional().default({}),
  stringData: z.record(z.string()).optional(),
});

// Ingress schema
export const ingressSchema = z.object({
  metadata: metadataSchema,
  ingressClassName: z.string().optional(),
  rules: z.array(z.object({
    host: z.string().optional(),
    http: z.object({
      paths: z.array(z.object({
        path: z.string(),
        pathType: z.enum(['Exact', 'Prefix', 'ImplementationSpecific']).default('Prefix'),
        backend: z.object({
          service: z.object({
            name: z.string(),
            port: z.object({
              number: z.number().optional(),
              name: z.string().optional(),
            }),
          }),
        }),
      })),
    }),
  })).min(1, 'At least one rule is required'),
  tls: z.array(z.object({
    hosts: z.array(z.string()),
    secretName: z.string(),
  })).optional(),
});

// PersistentVolumeClaim schema
export const pvcSchema = z.object({
  metadata: metadataSchema,
  accessModes: z.array(z.enum(['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'])).min(1),
  storageClassName: z.string().optional(),
  resources: z.object({
    requests: z.object({
      storage: z.string(), // e.g., "10Gi"
    }),
  }),
  volumeMode: z.enum(['Filesystem', 'Block']).optional().default('Filesystem'),
});

// HorizontalPodAutoscaler schema
export const hpaSchema = z.object({
  metadata: metadataSchema,
  scaleTargetRef: z.object({
    apiVersion: z.string().default('apps/v1'),
    kind: z.string().default('Deployment'),
    name: z.string(),
  }),
  minReplicas: z.number().min(1).default(1),
  maxReplicas: z.number().min(1),
  metrics: z.array(z.object({
    type: z.enum(['Resource', 'Pods', 'Object', 'External']),
    resource: z.object({
      name: z.enum(['cpu', 'memory']),
      target: z.object({
        type: z.enum(['Utilization', 'AverageValue']),
        averageUtilization: z.number().optional(),
        averageValue: z.string().optional(),
      }),
    }).optional(),
  })).optional(),
  targetCPUUtilizationPercentage: z.number().min(1).max(100).optional(),
});

// StorageClass schema
export const storageClassSchema = z.object({
  metadata: z.object({
    name: z.string().min(1, 'Name is required').regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 'Name must be valid DNS subdomain'),
    labels: z.record(z.string()).optional(),
    annotations: z.record(z.string()).optional(),
  }),
  provisioner: z.string().min(1, 'Provisioner is required'),
  parameters: z.record(z.string()).optional(),
  reclaimPolicy: z.enum(['Retain', 'Delete']).optional().default('Delete'),
  allowVolumeExpansion: z.boolean().optional().default(false),
  volumeBindingMode: z.enum(['Immediate', 'WaitForFirstConsumer']).optional().default('Immediate'),
  mountOptions: z.array(z.string()).optional(),
});

// PersistentVolume schema
export const pvSchema = z.object({
  metadata: z.object({
    name: z.string().min(1, 'Name is required').regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 'Name must be valid DNS subdomain'),
    labels: z.record(z.string()).optional(),
    annotations: z.record(z.string()).optional(),
  }),
  storageClassName: z.string().optional(),
  capacity: z.object({
    storage: z.string().regex(/^[0-9]+(Ei|Pi|Ti|Gi|Mi|Ki|E|P|T|G|M|K)?$/, 'Storage must be valid quantity (e.g., 10Gi)'),
  }),
  accessModes: z.array(z.enum(['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'])).min(1, 'At least one access mode is required'),
  persistentVolumeReclaimPolicy: z.enum(['Retain', 'Recycle', 'Delete']).optional().default('Retain'),
  volumeMode: z.enum(['Filesystem', 'Block']).optional().default('Filesystem'),
  // Volume sources (mutually exclusive)
  hostPath: z.object({
    path: z.string().min(1, 'Path is required'),
    type: z.enum(['', 'DirectoryOrCreate', 'Directory', 'FileOrCreate', 'File', 'Socket', 'CharDevice', 'BlockDevice']).optional(),
  }).optional(),
  nfs: z.object({
    server: z.string().min(1, 'NFS server is required'),
    path: z.string().min(1, 'NFS path is required'),
    readOnly: z.boolean().optional(),
  }).optional(),
  awsElasticBlockStore: z.object({
    volumeID: z.string().min(1, 'AWS EBS volume ID is required'),
    fsType: z.string().optional(),
    readOnly: z.boolean().optional(),
  }).optional(),
  gcePersistentDisk: z.object({
    pdName: z.string().min(1, 'GCE PD name is required'),
    fsType: z.string().optional(),
    readOnly: z.boolean().optional(),
  }).optional(),
});

// StatefulSet schema
export const statefulSetSchema = z.object({
  metadata: metadataSchema,
  serviceName: z.string().min(1, 'Service name is required'),
  replicas: z.number().min(0).optional().default(1),
  podManagementPolicy: z.enum(['OrderedReady', 'Parallel']).optional().default('OrderedReady'),
  updateStrategy: z.object({
    type: z.enum(['RollingUpdate', 'OnDelete']).optional().default('RollingUpdate'),
    rollingUpdate: z.object({
      maxUnavailable: z.union([z.number(), z.string()]).optional(),
    }).optional(),
  }).optional(),
  containers: z.array(containerSchema).min(1, 'At least one container is required'),
  initContainers: z.array(containerSchema).optional().default([]),
  volumes: z.array(volumeSchema).optional().default([]),
  volumeClaimTemplates: z.array(z.object({
    metadata: z.object({
      name: z.string().min(1, 'Volume claim template name is required'),
      labels: z.record(z.string()).optional(),
    }),
    spec: z.object({
      accessModes: z.array(z.enum(['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'])).min(1),
      storageClassName: z.string().optional(),
      resources: z.object({
        requests: z.object({
          storage: z.string().regex(/^[0-9]+(Ei|Pi|Ti|Gi|Mi|Ki|E|P|T|G|M|K)?$/, 'Storage must be valid quantity'),
        }),
      }),
    }),
  })).optional().default([]),
  serviceAccountName: z.string().optional(),
  nodeSelector: z.record(z.string()).optional(),
});

// DaemonSet schema
export const daemonSetSchema = z.object({
  metadata: metadataSchema,
  updateStrategy: z.object({
    type: z.enum(['RollingUpdate', 'OnDelete']).optional().default('RollingUpdate'),
    rollingUpdate: z.object({
      maxSurge: z.union([z.number(), z.string()]).optional(),
      maxUnavailable: z.union([z.number(), z.string()]).optional().default(1),
    }).optional(),
  }).optional(),
  containers: z.array(containerSchema).min(1, 'At least one container is required'),
  initContainers: z.array(containerSchema).optional().default([]),
  volumes: z.array(volumeSchema).optional().default([]),
  serviceAccountName: z.string().optional(),
  nodeSelector: z.record(z.string()).optional(),
  tolerations: z.array(z.object({
    key: z.string().optional(),
    operator: z.enum(['Equal', 'Exists']).optional(),
    value: z.string().optional(),
    effect: z.enum(['NoSchedule', 'PreferNoSchedule', 'NoExecute']).optional(),
    tolerationSeconds: z.number().optional(),
  })).optional(),
  hostNetwork: z.boolean().optional().default(false),
  hostPID: z.boolean().optional().default(false),
  priorityClassName: z.string().optional(),
});

// Job schema
export const jobSchema = z.object({
  metadata: metadataSchema,
  completions: z.number().min(1).optional().default(1),
  parallelism: z.number().min(1).optional().default(1),
  backoffLimit: z.number().min(0).optional().default(6),
  activeDeadlineSeconds: z.number().min(1).optional(),
  ttlSecondsAfterFinished: z.number().min(0).optional(),
  completionMode: z.enum(['NonIndexed', 'Indexed']).optional().default('NonIndexed'),
  containers: z.array(containerSchema).min(1, 'At least one container is required'),
  initContainers: z.array(containerSchema).optional().default([]),
  volumes: z.array(volumeSchema).optional().default([]),
  restartPolicy: z.enum(['Never', 'OnFailure']).optional().default('Never'),
  serviceAccountName: z.string().optional(),
});

// CronJob schema
export const cronJobSchema = z.object({
  metadata: metadataSchema,
  schedule: z.string().min(1, 'Cron schedule is required'),
  concurrencyPolicy: z.enum(['Allow', 'Forbid', 'Replace']).optional().default('Allow'),
  successfulJobsHistoryLimit: z.number().min(0).optional().default(3),
  failedJobsHistoryLimit: z.number().min(0).optional().default(1),
  startingDeadlineSeconds: z.number().min(1).optional(),
  suspend: z.boolean().optional().default(false),
  jobTemplate: z.object({
    completions: z.number().min(1).optional().default(1),
    parallelism: z.number().min(1).optional().default(1),
    backoffLimit: z.number().min(0).optional().default(6),
    activeDeadlineSeconds: z.number().min(1).optional(),
    ttlSecondsAfterFinished: z.number().min(0).optional().default(86400),
    containers: z.array(containerSchema).min(1, 'At least one container is required'),
    initContainers: z.array(containerSchema).optional().default([]),
    volumes: z.array(volumeSchema).optional().default([]),
    restartPolicy: z.enum(['Never', 'OnFailure']).optional().default('Never'),
  }),
});

// Main manifest schema
export const manifestSchema = z.object({
  resourceType: z.enum([
    'Deployment',
    'Service',
    'ConfigMap',
    'Secret',
    'Ingress',
    'PersistentVolumeClaim',
    'HorizontalPodAutoscaler',
    'StorageClass',
    'PersistentVolume',
    'StatefulSet',
    'DaemonSet',
    'Job',
    'CronJob',
  ]),
  deployment: deploymentSchema.optional(),
  service: serviceSchema.optional(),
  configMap: configMapSchema.optional(),
  secret: secretSchema.optional(),
  ingress: ingressSchema.optional(),
  pvc: pvcSchema.optional(),
  hpa: hpaSchema.optional(),
  storageClass: storageClassSchema.optional(),
  pv: pvSchema.optional(),
  statefulSet: statefulSetSchema.optional(),
  daemonSet: daemonSetSchema.optional(),
  job: jobSchema.optional(),
  cronJob: cronJobSchema.optional(),
  includeNamespace: z.boolean().optional().default(false),
});

export type ManifestInput = z.infer<typeof manifestSchema>;
export type DeploymentInput = z.infer<typeof deploymentSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ConfigMapInput = z.infer<typeof configMapSchema>;
export type SecretInput = z.infer<typeof secretSchema>;
export type IngressInput = z.infer<typeof ingressSchema>;
export type PVCInput = z.infer<typeof pvcSchema>;
export type HPAInput = z.infer<typeof hpaSchema>;
export type StorageClassInput = z.infer<typeof storageClassSchema>;
export type PVInput = z.infer<typeof pvSchema>;
export type StatefulSetInput = z.infer<typeof statefulSetSchema>;
export type DaemonSetInput = z.infer<typeof daemonSetSchema>;
export type JobInput = z.infer<typeof jobSchema>;
export type CronJobInput = z.infer<typeof cronJobSchema>;
