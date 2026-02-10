import { z } from 'zod';

// Chart metadata schema (Chart.yaml)
export const chartMetadataSchema = z.object({
  name: z.string().min(1, 'Chart name is required').regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 'Invalid chart name'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be semver (e.g., 1.0.0)').default('0.1.0'),
  description: z.string().optional(),
  apiVersion: z.string().default('v2'),
  appVersion: z.string().optional(),
  type: z.enum(['application', 'library']).default('application'),
  keywords: z.array(z.string()).optional().default([]),
  home: z.string().url().optional(),
  sources: z.array(z.string().url()).optional().default([]),
  maintainers: z.array(z.object({
    name: z.string(),
    email: z.string().email().optional(),
    url: z.string().url().optional(),
  })).optional().default([]),
  icon: z.string().url().optional(),
  deprecated: z.boolean().optional().default(false),
  annotations: z.record(z.string()).optional().default({}),
});

// Environment configuration schema
export const environmentSchema = z.object({
  name: z.string(),
  namespace: z.string().optional(),
  replicas: z.number().optional(),
  imageTag: z.string().optional(),
  resources: z.object({
    requests: z.object({
      cpu: z.string().optional(),
      memory: z.string().optional(),
    }).optional(),
    limits: z.object({
      cpu: z.string().optional(),
      memory: z.string().optional(),
    }).optional(),
  }).optional(),
  ingress: z.object({
    enabled: z.boolean().optional(),
    host: z.string().optional(),
    tls: z.boolean().optional(),
  }).optional(),
  env: z.record(z.string()).optional(),
});

// Values configuration schema
export const valuesConfigSchema = z.object({
  // Image configuration
  image: z.object({
    repository: z.string().optional(),
    pullPolicy: z.enum(['Always', 'IfNotPresent', 'Never']).optional().default('IfNotPresent'),
    tag: z.string().optional(),
  }).optional(),

  // Replica configuration
  replicaCount: z.number().min(1).optional().default(1),

  // Service configuration
  service: z.object({
    type: z.enum(['ClusterIP', 'NodePort', 'LoadBalancer']).optional().default('ClusterIP'),
    port: z.number().optional().default(80),
    targetPort: z.number().optional(),
  }).optional(),

  // Ingress configuration
  ingress: z.object({
    enabled: z.boolean().optional().default(false),
    className: z.string().optional(),
    annotations: z.record(z.string()).optional(),
    hosts: z.array(z.object({
      host: z.string(),
      paths: z.array(z.object({
        path: z.string(),
        pathType: z.string().optional().default('Prefix'),
      })),
    })).optional(),
    tls: z.array(z.object({
      secretName: z.string(),
      hosts: z.array(z.string()),
    })).optional(),
  }).optional(),

  // Resources
  resources: z.object({
    requests: z.object({
      cpu: z.string().optional(),
      memory: z.string().optional(),
    }).optional(),
    limits: z.object({
      cpu: z.string().optional(),
      memory: z.string().optional(),
    }).optional(),
  }).optional(),

  // Autoscaling
  autoscaling: z.object({
    enabled: z.boolean().optional().default(false),
    minReplicas: z.number().optional().default(1),
    maxReplicas: z.number().optional().default(10),
    targetCPUUtilizationPercentage: z.number().optional().default(80),
    targetMemoryUtilizationPercentage: z.number().optional(),
  }).optional(),

  // Environment variables
  env: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),

  // ConfigMaps and Secrets
  configMaps: z.array(z.object({
    name: z.string(),
    data: z.record(z.string()),
  })).optional(),

  secrets: z.array(z.object({
    name: z.string(),
    data: z.record(z.string()),
  })).optional(),

  // Probes
  livenessProbe: z.object({
    enabled: z.boolean().optional().default(true),
    httpGet: z.object({
      path: z.string().optional().default('/health'),
      port: z.number().optional(),
    }).optional(),
    initialDelaySeconds: z.number().optional().default(30),
    periodSeconds: z.number().optional().default(10),
  }).optional(),

  readinessProbe: z.object({
    enabled: z.boolean().optional().default(true),
    httpGet: z.object({
      path: z.string().optional().default('/ready'),
      port: z.number().optional(),
    }).optional(),
    initialDelaySeconds: z.number().optional().default(5),
    periodSeconds: z.number().optional().default(5),
  }).optional(),

  // Node selector, tolerations, affinity
  nodeSelector: z.record(z.string()).optional(),
  tolerations: z.array(z.any()).optional(),
  affinity: z.any().optional(),

  // Security context
  securityContext: z.object({
    runAsNonRoot: z.boolean().optional().default(true),
    runAsUser: z.number().optional().default(1000),
    fsGroup: z.number().optional().default(1000),
  }).optional(),

  // Service account
  serviceAccount: z.object({
    create: z.boolean().optional().default(true),
    name: z.string().optional(),
    annotations: z.record(z.string()).optional(),
  }).optional(),

  // Additional labels and annotations
  labels: z.record(z.string()).optional(),
  annotations: z.record(z.string()).optional(),
});

// Dependency schema (for Chart.yaml dependencies)
export const dependencySchema = z.object({
  name: z.string(),
  version: z.string(),
  repository: z.string(),
  condition: z.string().optional(),
  tags: z.array(z.string()).optional(),
  enabled: z.boolean().optional(),
  importValues: z.array(z.any()).optional(),
  alias: z.string().optional(),
});

// Main Helm chart input schema
export const helmChartSchema = z.object({
  // Chart metadata
  metadata: chartMetadataSchema,

  // Values configuration
  values: valuesConfigSchema.optional(),

  // Multi-environment support
  environments: z.array(environmentSchema).optional().default([]),

  // Dependencies
  dependencies: z.array(dependencySchema).optional().default([]),

  // K8s manifests to convert (optional - for conversion mode)
  manifests: z.array(z.object({
    kind: z.string(),
    yaml: z.string(),
  })).optional(),

  // Generation options
  options: z.object({
    includeHelpers: z.boolean().optional().default(true),
    includeTests: z.boolean().optional().default(true),
    includeNotes: z.boolean().optional().default(true),
    includeHooks: z.boolean().optional().default(false),
    generateEnvironmentValues: z.boolean().optional().default(false),
    includeServiceMonitor: z.boolean().optional().default(false),
    includePodDisruptionBudget: z.boolean().optional().default(false),
    includeNetworkPolicy: z.boolean().optional().default(false),
  }).optional().default({}),

  // Template style
  templateStyle: z.enum(['standard', 'minimal', 'comprehensive']).optional().default('standard'),
});

// Output schema
export const helmChartOutputSchema = z.record(z.string());

// Validation result schema
export const helmChartValidationSchema = z.object({
  valid: z.boolean(),
  warnings: z.array(z.object({
    severity: z.enum(['low', 'medium', 'high']),
    message: z.string(),
    file: z.string().optional(),
  })),
  suggestions: z.array(z.string()),
});

// Export types
export type HelmChartInput = z.infer<typeof helmChartSchema>;
export type ChartMetadata = z.infer<typeof chartMetadataSchema>;
export type ValuesConfig = z.infer<typeof valuesConfigSchema>;
export type EnvironmentConfig = z.infer<typeof environmentSchema>;
export type DependencyConfig = z.infer<typeof dependencySchema>;
export type HelmChartOutput = z.infer<typeof helmChartOutputSchema>;
export type HelmChartValidation = z.infer<typeof helmChartValidationSchema>;
