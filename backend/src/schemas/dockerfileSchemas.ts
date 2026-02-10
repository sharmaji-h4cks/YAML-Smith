import { z } from 'zod';

// Language-specific schemas
export const languageEnum = z.enum([
  'nodejs',
  'python',
  'go',
  'java',
  'rust',
  'dotnet',
  'php',
  'ruby',
]);

export const baseImageTypeEnum = z.enum([
  'alpine',
  'debian',
  'ubuntu',
  'distroless',
  'scratch',
  'custom',
]);

export const packageManagerEnum = z.enum([
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
export const healthCheckSchema = z.object({
  enabled: z.boolean().default(true),
  command: z.string().optional(),
  interval: z.string().optional().default('30s'),
  timeout: z.string().optional().default('3s'),
  startPeriod: z.string().optional().default('5s'),
  retries: z.number().optional().default(3),
});

// Build argument schema
export const buildArgSchema = z.object({
  name: z.string(),
  value: z.string(),
  description: z.string().optional(),
});

// Environment variable schema
export const envVarSchema = z.object({
  name: z.string(),
  value: z.string(),
});

// Multi-stage build configuration
export const multiStageSchema = z.object({
  enabled: z.boolean().default(true),
  builderStageName: z.string().optional().default('builder'),
  runtimeStageName: z.string().optional().default('runtime'),
  useDistrolessRuntime: z.boolean().optional().default(false),
});

// Security configuration
export const securitySchema = z.object({
  nonRootUser: z.boolean().default(true),
  username: z.string().optional().default('appuser'),
  uid: z.number().optional().default(1000),
  gid: z.number().optional().default(1000),
  readOnlyRootFilesystem: z.boolean().optional().default(false),
});

// Node.js specific configuration
export const nodejsConfigSchema = z.object({
  version: z.string().default('20'),
  packageManager: z.enum(['npm', 'yarn', 'pnpm']).default('npm'),
  installDevDependencies: z.boolean().optional().default(false),
  buildScript: z.string().optional(),
  startScript: z.string().optional().default('start'),
  useNodeModulesCache: z.boolean().optional().default(true),
});

// Python specific configuration
export const pythonConfigSchema = z.object({
  version: z.string().default('3.11'),
  packageManager: z.enum(['pip', 'poetry', 'pipenv']).default('pip'),
  requirementsFile: z.string().optional().default('requirements.txt'),
  useVirtualEnv: z.boolean().optional().default(true),
  pipUpgrade: z.boolean().optional().default(true),
});

// Go specific configuration
export const goConfigSchema = z.object({
  version: z.string().default('1.21'),
  useModules: z.boolean().default(true),
  cgoEnabled: z.boolean().optional().default(false),
  buildFlags: z.array(z.string()).optional().default([]),
  ldflags: z.string().optional(),
});

// Java specific configuration
export const javaConfigSchema = z.object({
  version: z.string().default('17'),
  buildTool: z.enum(['maven', 'gradle']).default('maven'),
  baseImage: z.string().optional().default('eclipse-temurin'),
  jarName: z.string().optional(),
  mainClass: z.string().optional(),
});

// Rust specific configuration
export const rustConfigSchema = z.object({
  version: z.string().default('1.75'),
  useMusl: z.boolean().optional().default(false),
  buildProfile: z.enum(['debug', 'release']).default('release'),
  features: z.array(z.string()).optional().default([]),
});

// .NET specific configuration
export const dotnetConfigSchema = z.object({
  version: z.string().default('8.0'),
  projectFile: z.string().optional(),
  configuration: z.enum(['Debug', 'Release']).default('Release'),
  runtime: z.string().optional().default('linux-x64'),
});

// PHP specific configuration
export const phpConfigSchema = z.object({
  version: z.string().default('8.2'),
  extensions: z.array(z.string()).optional().default([]),
  composer: z.boolean().default(true),
  webServer: z.enum(['apache', 'fpm', 'cli']).default('fpm'),
});

// Ruby specific configuration
export const rubyConfigSchema = z.object({
  version: z.string().default('3.2'),
  bundlerVersion: z.string().optional(),
  railsEnv: z.string().optional().default('production'),
});

// Main Dockerfile schema
export const dockerfileSchema = z.object({
  // Basic configuration
  language: languageEnum,
  projectName: z.string().min(1, 'Project name is required'),

  // Base image configuration
  baseImageType: baseImageTypeEnum.default('alpine'),
  customBaseImage: z.string().optional(),

  // Multi-stage build
  multiStage: multiStageSchema.optional().default({ enabled: true }),

  // Ports and networking
  port: z.number().min(1).max(65535).optional(),
  exposeAdditionalPorts: z.array(z.number()).optional().default([]),

  // Working directory
  workdir: z.string().default('/app'),

  // Commands
  buildCommand: z.string().optional(),
  startCommand: z.string(),

  // Environment and build args
  env: z.array(envVarSchema).optional().default([]),
  buildArgs: z.array(buildArgSchema).optional().default([]),

  // Health check
  healthCheck: healthCheckSchema.optional(),

  // Security
  security: securitySchema.optional().default({ nonRootUser: true }),

  // Labels
  labels: z.record(z.string()).optional().default({}),

  // Language-specific configurations
  nodejsConfig: nodejsConfigSchema.optional(),
  pythonConfig: pythonConfigSchema.optional(),
  goConfig: goConfigSchema.optional(),
  javaConfig: javaConfigSchema.optional(),
  rustConfig: rustConfigSchema.optional(),
  dotnetConfig: dotnetConfigSchema.optional(),
  phpConfig: phpConfigSchema.optional(),
  rubyConfig: rubyConfigSchema.optional(),

  // Additional files
  generateDockerignore: z.boolean().optional().default(true),

  // Optimization flags
  optimizations: z.object({
    layerCaching: z.boolean().optional().default(true),
    minimizeImageSize: z.boolean().optional().default(true),
    useMultiArchBuild: z.boolean().optional().default(false),
  }).optional().default({}),
});

// Validation result schema
export const dockerfileValidationSchema = z.object({
  valid: z.boolean(),
  warnings: z.array(z.object({
    severity: z.enum(['low', 'medium', 'high']),
    message: z.string(),
    category: z.enum(['security', 'performance', 'best-practice', 'size']),
  })),
  suggestions: z.array(z.string()),
  estimatedSize: z.string().optional(),
});

// Export types
export type DockerfileInput = z.infer<typeof dockerfileSchema>;
export type LanguageType = z.infer<typeof languageEnum>;
export type BaseImageType = z.infer<typeof baseImageTypeEnum>;
export type HealthCheckConfig = z.infer<typeof healthCheckSchema>;
export type SecurityConfig = z.infer<typeof securitySchema>;
export type MultiStageConfig = z.infer<typeof multiStageSchema>;
export type NodejsConfig = z.infer<typeof nodejsConfigSchema>;
export type PythonConfig = z.infer<typeof pythonConfigSchema>;
export type GoConfig = z.infer<typeof goConfigSchema>;
export type JavaConfig = z.infer<typeof javaConfigSchema>;
export type RustConfig = z.infer<typeof rustConfigSchema>;
export type DotnetConfig = z.infer<typeof dotnetConfigSchema>;
export type PhpConfig = z.infer<typeof phpConfigSchema>;
export type RubyConfig = z.infer<typeof rubyConfigSchema>;
export type DockerfileValidation = z.infer<typeof dockerfileValidationSchema>;
