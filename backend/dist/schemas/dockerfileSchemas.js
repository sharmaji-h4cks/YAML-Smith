"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dockerfileValidationSchema = exports.dockerfileSchema = exports.rubyConfigSchema = exports.phpConfigSchema = exports.dotnetConfigSchema = exports.rustConfigSchema = exports.javaConfigSchema = exports.goConfigSchema = exports.pythonConfigSchema = exports.nodejsConfigSchema = exports.securitySchema = exports.multiStageSchema = exports.envVarSchema = exports.buildArgSchema = exports.healthCheckSchema = exports.packageManagerEnum = exports.baseImageTypeEnum = exports.languageEnum = void 0;
const zod_1 = require("zod");
// Language-specific schemas
exports.languageEnum = zod_1.z.enum([
    'nodejs',
    'python',
    'go',
    'java',
    'rust',
    'dotnet',
    'php',
    'ruby',
]);
exports.baseImageTypeEnum = zod_1.z.enum([
    'alpine',
    'debian',
    'ubuntu',
    'distroless',
    'scratch',
    'custom',
]);
exports.packageManagerEnum = zod_1.z.enum([
    'npm',
    'yarn',
    'pnpm',
    'pip',
    'poetry',
    'pipenv',
    'go-mod',
    'maven',
    'gradle',
    'cargo',
    'dotnet',
    'composer',
    'bundler',
]);
// Health check schema
exports.healthCheckSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    command: zod_1.z.string().optional(),
    interval: zod_1.z.string().optional().default('30s'),
    timeout: zod_1.z.string().optional().default('3s'),
    startPeriod: zod_1.z.string().optional().default('5s'),
    retries: zod_1.z.number().optional().default(3),
});
// Build argument schema
exports.buildArgSchema = zod_1.z.object({
    name: zod_1.z.string(),
    value: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
// Environment variable schema
exports.envVarSchema = zod_1.z.object({
    name: zod_1.z.string(),
    value: zod_1.z.string(),
});
// Multi-stage build configuration
exports.multiStageSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    builderStageName: zod_1.z.string().optional().default('builder'),
    runtimeStageName: zod_1.z.string().optional().default('runtime'),
    useDistrolessRuntime: zod_1.z.boolean().optional().default(false),
});
// Security configuration
exports.securitySchema = zod_1.z.object({
    nonRootUser: zod_1.z.boolean().default(true),
    username: zod_1.z.string().optional().default('appuser'),
    uid: zod_1.z.number().optional().default(1000),
    gid: zod_1.z.number().optional().default(1000),
    readOnlyRootFilesystem: zod_1.z.boolean().optional().default(false),
});
// Node.js specific configuration
exports.nodejsConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('20'),
    packageManager: zod_1.z.enum(['npm', 'yarn', 'pnpm']).default('npm'),
    installDevDependencies: zod_1.z.boolean().optional().default(false),
    buildScript: zod_1.z.string().optional(),
    startScript: zod_1.z.string().optional().default('start'),
    useNodeModulesCache: zod_1.z.boolean().optional().default(true),
});
// Python specific configuration
exports.pythonConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('3.11'),
    packageManager: zod_1.z.enum(['pip', 'poetry', 'pipenv']).default('pip'),
    requirementsFile: zod_1.z.string().optional().default('requirements.txt'),
    useVirtualEnv: zod_1.z.boolean().optional().default(true),
    pipUpgrade: zod_1.z.boolean().optional().default(true),
});
// Go specific configuration
exports.goConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('1.21'),
    useModules: zod_1.z.boolean().default(true),
    cgoEnabled: zod_1.z.boolean().optional().default(false),
    buildFlags: zod_1.z.array(zod_1.z.string()).optional().default([]),
    ldflags: zod_1.z.string().optional(),
});
// Java specific configuration
exports.javaConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('17'),
    buildTool: zod_1.z.enum(['maven', 'gradle']).default('maven'),
    baseImage: zod_1.z.string().optional().default('eclipse-temurin'),
    jarName: zod_1.z.string().optional(),
    mainClass: zod_1.z.string().optional(),
});
// Rust specific configuration
exports.rustConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('1.75'),
    useMusl: zod_1.z.boolean().optional().default(false),
    buildProfile: zod_1.z.enum(['debug', 'release']).default('release'),
    features: zod_1.z.array(zod_1.z.string()).optional().default([]),
});
// .NET specific configuration
exports.dotnetConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('8.0'),
    projectFile: zod_1.z.string().optional(),
    configuration: zod_1.z.enum(['Debug', 'Release']).default('Release'),
    runtime: zod_1.z.string().optional().default('linux-x64'),
});
// PHP specific configuration
exports.phpConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('8.2'),
    extensions: zod_1.z.array(zod_1.z.string()).optional().default([]),
    composer: zod_1.z.boolean().default(true),
    webServer: zod_1.z.enum(['apache', 'fpm', 'cli']).default('fpm'),
});
// Ruby specific configuration
exports.rubyConfigSchema = zod_1.z.object({
    version: zod_1.z.string().default('3.2'),
    bundlerVersion: zod_1.z.string().optional(),
    railsEnv: zod_1.z.string().optional().default('production'),
});
// Main Dockerfile schema
exports.dockerfileSchema = zod_1.z.object({
    // Basic configuration
    language: exports.languageEnum,
    projectName: zod_1.z.string().min(1, 'Project name is required'),
    // Base image configuration
    baseImageType: exports.baseImageTypeEnum.default('alpine'),
    customBaseImage: zod_1.z.string().optional(),
    // Multi-stage build
    multiStage: exports.multiStageSchema.optional().default({ enabled: true }),
    // Ports and networking
    port: zod_1.z.number().min(1).max(65535).optional(),
    exposeAdditionalPorts: zod_1.z.array(zod_1.z.number()).optional().default([]),
    // Working directory
    workdir: zod_1.z.string().default('/app'),
    // Commands
    buildCommand: zod_1.z.string().optional(),
    startCommand: zod_1.z.string(),
    // Environment and build args
    env: zod_1.z.array(exports.envVarSchema).optional().default([]),
    buildArgs: zod_1.z.array(exports.buildArgSchema).optional().default([]),
    // Health check
    healthCheck: exports.healthCheckSchema.optional(),
    // Security
    security: exports.securitySchema.optional().default({ nonRootUser: true }),
    // Labels
    labels: zod_1.z.record(zod_1.z.string()).optional().default({}),
    // Language-specific configurations
    nodejsConfig: exports.nodejsConfigSchema.optional(),
    pythonConfig: exports.pythonConfigSchema.optional(),
    goConfig: exports.goConfigSchema.optional(),
    javaConfig: exports.javaConfigSchema.optional(),
    rustConfig: exports.rustConfigSchema.optional(),
    dotnetConfig: exports.dotnetConfigSchema.optional(),
    phpConfig: exports.phpConfigSchema.optional(),
    rubyConfig: exports.rubyConfigSchema.optional(),
    // Additional files
    generateDockerignore: zod_1.z.boolean().optional().default(true),
    // Optimization flags
    optimizations: zod_1.z.object({
        layerCaching: zod_1.z.boolean().optional().default(true),
        minimizeImageSize: zod_1.z.boolean().optional().default(true),
        useMultiArchBuild: zod_1.z.boolean().optional().default(false),
    }).optional().default({}),
});
// Validation result schema
exports.dockerfileValidationSchema = zod_1.z.object({
    valid: zod_1.z.boolean(),
    warnings: zod_1.z.array(zod_1.z.object({
        severity: zod_1.z.enum(['low', 'medium', 'high']),
        message: zod_1.z.string(),
        category: zod_1.z.enum(['security', 'performance', 'best-practice', 'size']),
    })),
    suggestions: zod_1.z.array(zod_1.z.string()),
    estimatedSize: zod_1.z.string().optional(),
});
//# sourceMappingURL=dockerfileSchemas.js.map