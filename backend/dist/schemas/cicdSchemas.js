"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cicdValidationSchema = exports.cicdPipelineOutputSchema = exports.cicdPipelineSchema = exports.notificationSchema = exports.environmentSchema = exports.deploymentSchema = exports.registrySchema = exports.securityScanSchema = exports.testConfigSchema = exports.buildConfigSchema = exports.triggerSchema = exports.cicdPlatformEnum = void 0;
const zod_1 = require("zod");
// CI/CD Platform enum
exports.cicdPlatformEnum = zod_1.z.enum([
    'github-actions',
    'gitlab-ci',
    'jenkins',
    'circleci',
    'azure-devops',
]);
// Trigger configuration
exports.triggerSchema = zod_1.z.object({
    branches: zod_1.z.array(zod_1.z.string()).optional().default(['main', 'develop']),
    tags: zod_1.z.array(zod_1.z.string()).optional().default([]),
    pullRequest: zod_1.z.boolean().optional().default(true),
    schedule: zod_1.z.string().optional(), // Cron format
    paths: zod_1.z.array(zod_1.z.string()).optional(), // Path filters
});
// Build configuration
exports.buildConfigSchema = zod_1.z.object({
    dockerfile: zod_1.z.string().optional().default('Dockerfile'),
    context: zod_1.z.string().optional().default('.'),
    buildArgs: zod_1.z.record(zod_1.z.string()).optional().default({}),
    platforms: zod_1.z.array(zod_1.z.string()).optional().default(['linux/amd64']),
    useCache: zod_1.z.boolean().optional().default(true),
    target: zod_1.z.string().optional(), // Multi-stage target
});
// Test configuration
exports.testConfigSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    unitTests: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        command: zod_1.z.string().optional(),
    }).optional(),
    integrationTests: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        command: zod_1.z.string().optional(),
    }).optional(),
    e2eTests: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        command: zod_1.z.string().optional(),
    }).optional(),
    coverage: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        threshold: zod_1.z.number().optional().default(80),
    }).optional(),
});
// Security scanning configuration
exports.securityScanSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    trivy: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        severity: zod_1.z.array(zod_1.z.enum(['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])).optional().default(['HIGH', 'CRITICAL']),
        exitOnError: zod_1.z.boolean().optional().default(false),
    }).optional(),
    snyk: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        token: zod_1.z.string().optional(),
    }).optional(),
    sonarqube: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        projectKey: zod_1.z.string().optional(),
        url: zod_1.z.string().optional(),
    }).optional(),
});
// Container registry configuration
exports.registrySchema = zod_1.z.object({
    type: zod_1.z.enum(['dockerhub', 'gcr', 'ecr', 'acr', 'ghcr', 'gitlab', 'custom']).default('dockerhub'),
    url: zod_1.z.string().optional(),
    repository: zod_1.z.string(),
    usernameSecret: zod_1.z.string().optional(),
    passwordSecret: zod_1.z.string().optional(),
    tagStrategy: zod_1.z.enum(['commit-sha', 'branch-name', 'tag', 'semantic', 'latest']).default('commit-sha'),
    additionalTags: zod_1.z.array(zod_1.z.string()).optional().default([]),
});
// Kubernetes deployment configuration
exports.deploymentSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    strategy: zod_1.z.enum(['kubectl', 'helm', 'kustomize', 'gitops']).default('kubectl'),
    cluster: zod_1.z.object({
        name: zod_1.z.string().optional(),
        contextSecret: zod_1.z.string().optional(),
    }).optional(),
    namespace: zod_1.z.string().optional().default('default'),
    manifests: zod_1.z.array(zod_1.z.string()).optional().default([]),
    helmChart: zod_1.z.object({
        name: zod_1.z.string().optional(),
        path: zod_1.z.string().optional(),
        valuesFile: zod_1.z.string().optional(),
    }).optional(),
    gitops: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        tool: zod_1.z.enum(['argocd', 'flux']).optional().default('argocd'),
        application: zod_1.z.string().optional(),
    }).optional(),
});
// Environment configuration
exports.environmentSchema = zod_1.z.object({
    name: zod_1.z.string(),
    branch: zod_1.z.string().optional(),
    namespace: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    requireApproval: zod_1.z.boolean().optional().default(false),
    secrets: zod_1.z.record(zod_1.z.string()).optional().default({}),
});
// Notification configuration
exports.notificationSchema = zod_1.z.object({
    slack: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        webhookSecret: zod_1.z.string().optional(),
        channel: zod_1.z.string().optional(),
    }).optional(),
    email: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        recipients: zod_1.z.array(zod_1.z.string()).optional(),
    }).optional(),
    teams: zod_1.z.object({
        enabled: zod_1.z.boolean().optional().default(false),
        webhookSecret: zod_1.z.string().optional(),
    }).optional(),
});
// Main CI/CD pipeline schema
exports.cicdPipelineSchema = zod_1.z.object({
    // Platform selection
    platform: exports.cicdPlatformEnum,
    // Project information
    projectName: zod_1.z.string().min(1, 'Project name is required'),
    language: zod_1.z.enum(['nodejs', 'python', 'go', 'java', 'rust', 'dotnet', 'php', 'ruby', 'generic']).default('nodejs'),
    // Trigger configuration
    triggers: exports.triggerSchema.optional().default({}),
    // Build configuration
    build: exports.buildConfigSchema.optional().default({}),
    // Test configuration
    test: exports.testConfigSchema.optional().default({ enabled: true }),
    // Security scanning
    security: exports.securityScanSchema.optional().default({ enabled: true }),
    // Container registry
    registry: exports.registrySchema,
    // Deployment configuration
    deployment: exports.deploymentSchema.optional().default({ enabled: true }),
    // Multi-environment support
    environments: zod_1.z.array(exports.environmentSchema).optional().default([]),
    // Notifications
    notifications: exports.notificationSchema.optional().default({}),
    // Advanced options
    options: zod_1.z.object({
        parallelJobs: zod_1.z.boolean().optional().default(true),
        cacheEnabled: zod_1.z.boolean().optional().default(true),
        artifactRetention: zod_1.z.number().optional().default(30), // days
        timeout: zod_1.z.number().optional().default(60), // minutes
        retryOnFailure: zod_1.z.object({
            enabled: zod_1.z.boolean().optional().default(false),
            maxAttempts: zod_1.z.number().optional().default(2),
        }).optional(),
    }).optional().default({}),
    // Custom stages
    customStages: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        commands: zod_1.z.array(zod_1.z.string()),
        dependsOn: zod_1.z.array(zod_1.z.string()).optional(),
        when: zod_1.z.enum(['always', 'on-success', 'on-failure', 'manual']).optional().default('always'),
    })).optional().default([]),
});
// Output schema
exports.cicdPipelineOutputSchema = zod_1.z.record(zod_1.z.string());
// Validation result schema
exports.cicdValidationSchema = zod_1.z.object({
    valid: zod_1.z.boolean(),
    warnings: zod_1.z.array(zod_1.z.object({
        severity: zod_1.z.enum(['low', 'medium', 'high']),
        message: zod_1.z.string(),
        platform: zod_1.z.string().optional(),
    })),
    suggestions: zod_1.z.array(zod_1.z.string()),
});
//# sourceMappingURL=cicdSchemas.js.map