import { z } from 'zod';

// CI/CD Platform enum
export const cicdPlatformEnum = z.enum([
  'github-actions',
  'gitlab-ci',
  'jenkins',
  'circleci',
  'azure-devops',
]);

// Trigger configuration
export const triggerSchema = z.object({
  branches: z.array(z.string()).optional().default(['main', 'develop']),
  tags: z.array(z.string()).optional().default([]),
  pullRequest: z.boolean().optional().default(true),
  schedule: z.string().optional(), // Cron format
  paths: z.array(z.string()).optional(), // Path filters
});

// Build configuration
export const buildConfigSchema = z.object({
  dockerfile: z.string().optional().default('Dockerfile'),
  context: z.string().optional().default('.'),
  buildArgs: z.record(z.string()).optional().default({}),
  platforms: z.array(z.string()).optional().default(['linux/amd64']),
  useCache: z.boolean().optional().default(true),
  target: z.string().optional(), // Multi-stage target
});

// Test configuration
export const testConfigSchema = z.object({
  enabled: z.boolean().default(true),
  unitTests: z.object({
    enabled: z.boolean().default(true),
    command: z.string().optional(),
  }).optional(),
  integrationTests: z.object({
    enabled: z.boolean().optional().default(false),
    command: z.string().optional(),
  }).optional(),
  e2eTests: z.object({
    enabled: z.boolean().optional().default(false),
    command: z.string().optional(),
  }).optional(),
  coverage: z.object({
    enabled: z.boolean().optional().default(false),
    threshold: z.number().optional().default(80),
  }).optional(),
});

// Security scanning configuration
export const securityScanSchema = z.object({
  enabled: z.boolean().default(true),
  trivy: z.object({
    enabled: z.boolean().default(true),
    severity: z.array(z.enum(['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])).optional().default(['HIGH', 'CRITICAL']),
    exitOnError: z.boolean().optional().default(false),
  }).optional(),
  snyk: z.object({
    enabled: z.boolean().optional().default(false),
    token: z.string().optional(),
  }).optional(),
  sonarqube: z.object({
    enabled: z.boolean().optional().default(false),
    projectKey: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
});

// Container registry configuration
export const registrySchema = z.object({
  type: z.enum(['dockerhub', 'gcr', 'ecr', 'acr', 'ghcr', 'gitlab', 'custom']).default('dockerhub'),
  url: z.string().optional(),
  repository: z.string(),
  usernameSecret: z.string().optional(),
  passwordSecret: z.string().optional(),
  tagStrategy: z.enum(['commit-sha', 'branch-name', 'tag', 'semantic', 'latest']).default('commit-sha'),
  additionalTags: z.array(z.string()).optional().default([]),
});

// Kubernetes deployment configuration
export const deploymentSchema = z.object({
  enabled: z.boolean().default(true),
  strategy: z.enum(['kubectl', 'helm', 'kustomize', 'gitops']).default('kubectl'),
  cluster: z.object({
    name: z.string().optional(),
    contextSecret: z.string().optional(),
  }).optional(),
  namespace: z.string().optional().default('default'),
  manifests: z.array(z.string()).optional().default([]),
  helmChart: z.object({
    name: z.string().optional(),
    path: z.string().optional(),
    valuesFile: z.string().optional(),
  }).optional(),
  gitops: z.object({
    enabled: z.boolean().optional().default(false),
    tool: z.enum(['argocd', 'flux']).optional().default('argocd'),
    application: z.string().optional(),
  }).optional(),
});

// Environment configuration
export const environmentSchema = z.object({
  name: z.string(),
  branch: z.string().optional(),
  namespace: z.string().optional(),
  url: z.string().optional(),
  requireApproval: z.boolean().optional().default(false),
  secrets: z.record(z.string()).optional().default({}),
});

// Notification configuration
export const notificationSchema = z.object({
  slack: z.object({
    enabled: z.boolean().optional().default(false),
    webhookSecret: z.string().optional(),
    channel: z.string().optional(),
  }).optional(),
  email: z.object({
    enabled: z.boolean().optional().default(false),
    recipients: z.array(z.string()).optional(),
  }).optional(),
  teams: z.object({
    enabled: z.boolean().optional().default(false),
    webhookSecret: z.string().optional(),
  }).optional(),
});

// Main CI/CD pipeline schema
export const cicdPipelineSchema = z.object({
  // Platform selection
  platform: cicdPlatformEnum,

  // Project information
  projectName: z.string().min(1, 'Project name is required'),
  language: z.enum(['nodejs', 'python', 'go', 'java', 'rust', 'dotnet', 'php', 'ruby', 'generic']).default('nodejs'),

  // Trigger configuration
  triggers: triggerSchema.optional().default({}),

  // Build configuration
  build: buildConfigSchema.optional().default({}),

  // Test configuration
  test: testConfigSchema.optional().default({ enabled: true }),

  // Security scanning
  security: securityScanSchema.optional().default({ enabled: true }),

  // Container registry
  registry: registrySchema,

  // Deployment configuration
  deployment: deploymentSchema.optional().default({ enabled: true }),

  // Multi-environment support
  environments: z.array(environmentSchema).optional().default([]),

  // Notifications
  notifications: notificationSchema.optional().default({}),

  // Advanced options
  options: z.object({
    parallelJobs: z.boolean().optional().default(true),
    cacheEnabled: z.boolean().optional().default(true),
    artifactRetention: z.number().optional().default(30), // days
    timeout: z.number().optional().default(60), // minutes
    retryOnFailure: z.object({
      enabled: z.boolean().optional().default(false),
      maxAttempts: z.number().optional().default(2),
    }).optional(),
  }).optional().default({}),

  // Custom stages
  customStages: z.array(z.object({
    name: z.string(),
    commands: z.array(z.string()),
    dependsOn: z.array(z.string()).optional(),
    when: z.enum(['always', 'on-success', 'on-failure', 'manual']).optional().default('always'),
  })).optional().default([]),
});

// Output schema
export const cicdPipelineOutputSchema = z.record(z.string());

// Validation result schema
export const cicdValidationSchema = z.object({
  valid: z.boolean(),
  warnings: z.array(z.object({
    severity: z.enum(['low', 'medium', 'high']),
    message: z.string(),
    platform: z.string().optional(),
  })),
  suggestions: z.array(z.string()),
});

// Export types
export type CICDPipelineInput = z.infer<typeof cicdPipelineSchema>;
export type CICDPlatform = z.infer<typeof cicdPlatformEnum>;
export type TriggerConfig = z.infer<typeof triggerSchema>;
export type BuildConfig = z.infer<typeof buildConfigSchema>;
export type TestConfig = z.infer<typeof testConfigSchema>;
export type SecurityScanConfig = z.infer<typeof securityScanSchema>;
export type RegistryConfig = z.infer<typeof registrySchema>;
export type DeploymentConfig = z.infer<typeof deploymentSchema>;
export type EnvironmentConfig = z.infer<typeof environmentSchema>;
export type NotificationConfig = z.infer<typeof notificationSchema>;
export type CICDPipelineOutput = z.infer<typeof cicdPipelineOutputSchema>;
export type CICDValidation = z.infer<typeof cicdValidationSchema>;
