import { z } from 'zod';
export declare const languageEnum: z.ZodEnum<["nodejs", "python", "go", "java", "rust", "dotnet", "php", "ruby"]>;
export declare const baseImageTypeEnum: z.ZodEnum<["alpine", "debian", "ubuntu", "distroless", "scratch", "custom"]>;
export declare const packageManagerEnum: z.ZodEnum<["npm", "yarn", "pnpm", "pip", "poetry", "pipenv", "go-mod", "maven", "gradle", "cargo", "dotnet", "composer", "bundler"]>;
export declare const healthCheckSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    command: z.ZodOptional<z.ZodString>;
    interval: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    timeout: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    startPeriod: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    retries: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    interval: string;
    timeout: string;
    startPeriod: string;
    retries: number;
    command?: string | undefined;
}, {
    command?: string | undefined;
    enabled?: boolean | undefined;
    interval?: string | undefined;
    timeout?: string | undefined;
    startPeriod?: string | undefined;
    retries?: number | undefined;
}>;
export declare const buildArgSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    value: string;
    description?: string | undefined;
}, {
    name: string;
    value: string;
    description?: string | undefined;
}>;
export declare const envVarSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    value: string;
}, {
    name: string;
    value: string;
}>;
export declare const multiStageSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    builderStageName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    runtimeStageName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    useDistrolessRuntime: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    builderStageName: string;
    runtimeStageName: string;
    useDistrolessRuntime: boolean;
}, {
    enabled?: boolean | undefined;
    builderStageName?: string | undefined;
    runtimeStageName?: string | undefined;
    useDistrolessRuntime?: boolean | undefined;
}>;
export declare const securitySchema: z.ZodObject<{
    nonRootUser: z.ZodDefault<z.ZodBoolean>;
    username: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    uid: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    gid: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    readOnlyRootFilesystem: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    nonRootUser: boolean;
    username: string;
    uid: number;
    gid: number;
    readOnlyRootFilesystem: boolean;
}, {
    nonRootUser?: boolean | undefined;
    username?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
    readOnlyRootFilesystem?: boolean | undefined;
}>;
export declare const nodejsConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    packageManager: z.ZodDefault<z.ZodEnum<["npm", "yarn", "pnpm"]>>;
    installDevDependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    buildScript: z.ZodOptional<z.ZodString>;
    startScript: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    useNodeModulesCache: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    packageManager: "npm" | "yarn" | "pnpm";
    installDevDependencies: boolean;
    startScript: string;
    useNodeModulesCache: boolean;
    buildScript?: string | undefined;
}, {
    version?: string | undefined;
    packageManager?: "npm" | "yarn" | "pnpm" | undefined;
    installDevDependencies?: boolean | undefined;
    buildScript?: string | undefined;
    startScript?: string | undefined;
    useNodeModulesCache?: boolean | undefined;
}>;
export declare const pythonConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    packageManager: z.ZodDefault<z.ZodEnum<["pip", "poetry", "pipenv"]>>;
    requirementsFile: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    useVirtualEnv: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    pipUpgrade: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    packageManager: "pip" | "poetry" | "pipenv";
    requirementsFile: string;
    useVirtualEnv: boolean;
    pipUpgrade: boolean;
}, {
    version?: string | undefined;
    packageManager?: "pip" | "poetry" | "pipenv" | undefined;
    requirementsFile?: string | undefined;
    useVirtualEnv?: boolean | undefined;
    pipUpgrade?: boolean | undefined;
}>;
export declare const goConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    useModules: z.ZodDefault<z.ZodBoolean>;
    cgoEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    buildFlags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    ldflags: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    version: string;
    useModules: boolean;
    cgoEnabled: boolean;
    buildFlags: string[];
    ldflags?: string | undefined;
}, {
    version?: string | undefined;
    useModules?: boolean | undefined;
    cgoEnabled?: boolean | undefined;
    buildFlags?: string[] | undefined;
    ldflags?: string | undefined;
}>;
export declare const javaConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    buildTool: z.ZodDefault<z.ZodEnum<["maven", "gradle"]>>;
    baseImage: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    jarName: z.ZodOptional<z.ZodString>;
    mainClass: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    version: string;
    buildTool: "maven" | "gradle";
    baseImage: string;
    jarName?: string | undefined;
    mainClass?: string | undefined;
}, {
    version?: string | undefined;
    buildTool?: "maven" | "gradle" | undefined;
    baseImage?: string | undefined;
    jarName?: string | undefined;
    mainClass?: string | undefined;
}>;
export declare const rustConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    useMusl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    buildProfile: z.ZodDefault<z.ZodEnum<["debug", "release"]>>;
    features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    useMusl: boolean;
    buildProfile: "debug" | "release";
    features: string[];
}, {
    version?: string | undefined;
    useMusl?: boolean | undefined;
    buildProfile?: "debug" | "release" | undefined;
    features?: string[] | undefined;
}>;
export declare const dotnetConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    projectFile: z.ZodOptional<z.ZodString>;
    configuration: z.ZodDefault<z.ZodEnum<["Debug", "Release"]>>;
    runtime: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    runtime: string;
    version: string;
    configuration: "Debug" | "Release";
    projectFile?: string | undefined;
}, {
    runtime?: string | undefined;
    version?: string | undefined;
    projectFile?: string | undefined;
    configuration?: "Debug" | "Release" | undefined;
}>;
export declare const phpConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    extensions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    composer: z.ZodDefault<z.ZodBoolean>;
    webServer: z.ZodDefault<z.ZodEnum<["apache", "fpm", "cli"]>>;
}, "strip", z.ZodTypeAny, {
    composer: boolean;
    version: string;
    extensions: string[];
    webServer: "apache" | "fpm" | "cli";
}, {
    composer?: boolean | undefined;
    version?: string | undefined;
    extensions?: string[] | undefined;
    webServer?: "apache" | "fpm" | "cli" | undefined;
}>;
export declare const rubyConfigSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    bundlerVersion: z.ZodOptional<z.ZodString>;
    railsEnv: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    railsEnv: string;
    bundlerVersion?: string | undefined;
}, {
    version?: string | undefined;
    bundlerVersion?: string | undefined;
    railsEnv?: string | undefined;
}>;
export declare const dockerfileSchema: z.ZodObject<{
    language: z.ZodEnum<["nodejs", "python", "go", "java", "rust", "dotnet", "php", "ruby"]>;
    projectName: z.ZodString;
    baseImageType: z.ZodDefault<z.ZodEnum<["alpine", "debian", "ubuntu", "distroless", "scratch", "custom"]>>;
    customBaseImage: z.ZodOptional<z.ZodString>;
    multiStage: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        builderStageName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        runtimeStageName: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        useDistrolessRuntime: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        builderStageName: string;
        runtimeStageName: string;
        useDistrolessRuntime: boolean;
    }, {
        enabled?: boolean | undefined;
        builderStageName?: string | undefined;
        runtimeStageName?: string | undefined;
        useDistrolessRuntime?: boolean | undefined;
    }>>>;
    port: z.ZodOptional<z.ZodNumber>;
    exposeAdditionalPorts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
    workdir: z.ZodDefault<z.ZodString>;
    buildCommand: z.ZodOptional<z.ZodString>;
    startCommand: z.ZodString;
    env: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        value: string;
    }, {
        name: string;
        value: string;
    }>, "many">>>;
    buildArgs: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        value: string;
        description?: string | undefined;
    }, {
        name: string;
        value: string;
        description?: string | undefined;
    }>, "many">>>;
    healthCheck: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        command: z.ZodOptional<z.ZodString>;
        interval: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        timeout: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        startPeriod: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        retries: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        interval: string;
        timeout: string;
        startPeriod: string;
        retries: number;
        command?: string | undefined;
    }, {
        command?: string | undefined;
        enabled?: boolean | undefined;
        interval?: string | undefined;
        timeout?: string | undefined;
        startPeriod?: string | undefined;
        retries?: number | undefined;
    }>>;
    security: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        nonRootUser: z.ZodDefault<z.ZodBoolean>;
        username: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        uid: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        gid: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        readOnlyRootFilesystem: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        nonRootUser: boolean;
        username: string;
        uid: number;
        gid: number;
        readOnlyRootFilesystem: boolean;
    }, {
        nonRootUser?: boolean | undefined;
        username?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
        readOnlyRootFilesystem?: boolean | undefined;
    }>>>;
    labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    nodejsConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        packageManager: z.ZodDefault<z.ZodEnum<["npm", "yarn", "pnpm"]>>;
        installDevDependencies: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        buildScript: z.ZodOptional<z.ZodString>;
        startScript: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        useNodeModulesCache: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        packageManager: "npm" | "yarn" | "pnpm";
        installDevDependencies: boolean;
        startScript: string;
        useNodeModulesCache: boolean;
        buildScript?: string | undefined;
    }, {
        version?: string | undefined;
        packageManager?: "npm" | "yarn" | "pnpm" | undefined;
        installDevDependencies?: boolean | undefined;
        buildScript?: string | undefined;
        startScript?: string | undefined;
        useNodeModulesCache?: boolean | undefined;
    }>>;
    pythonConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        packageManager: z.ZodDefault<z.ZodEnum<["pip", "poetry", "pipenv"]>>;
        requirementsFile: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        useVirtualEnv: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        pipUpgrade: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        packageManager: "pip" | "poetry" | "pipenv";
        requirementsFile: string;
        useVirtualEnv: boolean;
        pipUpgrade: boolean;
    }, {
        version?: string | undefined;
        packageManager?: "pip" | "poetry" | "pipenv" | undefined;
        requirementsFile?: string | undefined;
        useVirtualEnv?: boolean | undefined;
        pipUpgrade?: boolean | undefined;
    }>>;
    goConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        useModules: z.ZodDefault<z.ZodBoolean>;
        cgoEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        buildFlags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        ldflags: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        useModules: boolean;
        cgoEnabled: boolean;
        buildFlags: string[];
        ldflags?: string | undefined;
    }, {
        version?: string | undefined;
        useModules?: boolean | undefined;
        cgoEnabled?: boolean | undefined;
        buildFlags?: string[] | undefined;
        ldflags?: string | undefined;
    }>>;
    javaConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        buildTool: z.ZodDefault<z.ZodEnum<["maven", "gradle"]>>;
        baseImage: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        jarName: z.ZodOptional<z.ZodString>;
        mainClass: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        buildTool: "maven" | "gradle";
        baseImage: string;
        jarName?: string | undefined;
        mainClass?: string | undefined;
    }, {
        version?: string | undefined;
        buildTool?: "maven" | "gradle" | undefined;
        baseImage?: string | undefined;
        jarName?: string | undefined;
        mainClass?: string | undefined;
    }>>;
    rustConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        useMusl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        buildProfile: z.ZodDefault<z.ZodEnum<["debug", "release"]>>;
        features: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        useMusl: boolean;
        buildProfile: "debug" | "release";
        features: string[];
    }, {
        version?: string | undefined;
        useMusl?: boolean | undefined;
        buildProfile?: "debug" | "release" | undefined;
        features?: string[] | undefined;
    }>>;
    dotnetConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        projectFile: z.ZodOptional<z.ZodString>;
        configuration: z.ZodDefault<z.ZodEnum<["Debug", "Release"]>>;
        runtime: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        runtime: string;
        version: string;
        configuration: "Debug" | "Release";
        projectFile?: string | undefined;
    }, {
        runtime?: string | undefined;
        version?: string | undefined;
        projectFile?: string | undefined;
        configuration?: "Debug" | "Release" | undefined;
    }>>;
    phpConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        extensions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        composer: z.ZodDefault<z.ZodBoolean>;
        webServer: z.ZodDefault<z.ZodEnum<["apache", "fpm", "cli"]>>;
    }, "strip", z.ZodTypeAny, {
        composer: boolean;
        version: string;
        extensions: string[];
        webServer: "apache" | "fpm" | "cli";
    }, {
        composer?: boolean | undefined;
        version?: string | undefined;
        extensions?: string[] | undefined;
        webServer?: "apache" | "fpm" | "cli" | undefined;
    }>>;
    rubyConfig: z.ZodOptional<z.ZodObject<{
        version: z.ZodDefault<z.ZodString>;
        bundlerVersion: z.ZodOptional<z.ZodString>;
        railsEnv: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        railsEnv: string;
        bundlerVersion?: string | undefined;
    }, {
        version?: string | undefined;
        bundlerVersion?: string | undefined;
        railsEnv?: string | undefined;
    }>>;
    generateDockerignore: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    optimizations: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        layerCaching: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        minimizeImageSize: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        useMultiArchBuild: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        layerCaching: boolean;
        minimizeImageSize: boolean;
        useMultiArchBuild: boolean;
    }, {
        layerCaching?: boolean | undefined;
        minimizeImageSize?: boolean | undefined;
        useMultiArchBuild?: boolean | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    labels: Record<string, string>;
    env: {
        name: string;
        value: string;
    }[];
    language: "nodejs" | "python" | "go" | "java" | "rust" | "dotnet" | "php" | "ruby";
    projectName: string;
    baseImageType: "custom" | "alpine" | "debian" | "ubuntu" | "distroless" | "scratch";
    multiStage: {
        enabled: boolean;
        builderStageName: string;
        runtimeStageName: string;
        useDistrolessRuntime: boolean;
    };
    exposeAdditionalPorts: number[];
    workdir: string;
    startCommand: string;
    buildArgs: {
        name: string;
        value: string;
        description?: string | undefined;
    }[];
    security: {
        nonRootUser: boolean;
        username: string;
        uid: number;
        gid: number;
        readOnlyRootFilesystem: boolean;
    };
    generateDockerignore: boolean;
    optimizations: {
        layerCaching: boolean;
        minimizeImageSize: boolean;
        useMultiArchBuild: boolean;
    };
    port?: number | undefined;
    customBaseImage?: string | undefined;
    buildCommand?: string | undefined;
    healthCheck?: {
        enabled: boolean;
        interval: string;
        timeout: string;
        startPeriod: string;
        retries: number;
        command?: string | undefined;
    } | undefined;
    nodejsConfig?: {
        version: string;
        packageManager: "npm" | "yarn" | "pnpm";
        installDevDependencies: boolean;
        startScript: string;
        useNodeModulesCache: boolean;
        buildScript?: string | undefined;
    } | undefined;
    pythonConfig?: {
        version: string;
        packageManager: "pip" | "poetry" | "pipenv";
        requirementsFile: string;
        useVirtualEnv: boolean;
        pipUpgrade: boolean;
    } | undefined;
    goConfig?: {
        version: string;
        useModules: boolean;
        cgoEnabled: boolean;
        buildFlags: string[];
        ldflags?: string | undefined;
    } | undefined;
    javaConfig?: {
        version: string;
        buildTool: "maven" | "gradle";
        baseImage: string;
        jarName?: string | undefined;
        mainClass?: string | undefined;
    } | undefined;
    rustConfig?: {
        version: string;
        useMusl: boolean;
        buildProfile: "debug" | "release";
        features: string[];
    } | undefined;
    dotnetConfig?: {
        runtime: string;
        version: string;
        configuration: "Debug" | "Release";
        projectFile?: string | undefined;
    } | undefined;
    phpConfig?: {
        composer: boolean;
        version: string;
        extensions: string[];
        webServer: "apache" | "fpm" | "cli";
    } | undefined;
    rubyConfig?: {
        version: string;
        railsEnv: string;
        bundlerVersion?: string | undefined;
    } | undefined;
}, {
    language: "nodejs" | "python" | "go" | "java" | "rust" | "dotnet" | "php" | "ruby";
    projectName: string;
    startCommand: string;
    labels?: Record<string, string> | undefined;
    port?: number | undefined;
    env?: {
        name: string;
        value: string;
    }[] | undefined;
    baseImageType?: "custom" | "alpine" | "debian" | "ubuntu" | "distroless" | "scratch" | undefined;
    customBaseImage?: string | undefined;
    multiStage?: {
        enabled?: boolean | undefined;
        builderStageName?: string | undefined;
        runtimeStageName?: string | undefined;
        useDistrolessRuntime?: boolean | undefined;
    } | undefined;
    exposeAdditionalPorts?: number[] | undefined;
    workdir?: string | undefined;
    buildCommand?: string | undefined;
    buildArgs?: {
        name: string;
        value: string;
        description?: string | undefined;
    }[] | undefined;
    healthCheck?: {
        command?: string | undefined;
        enabled?: boolean | undefined;
        interval?: string | undefined;
        timeout?: string | undefined;
        startPeriod?: string | undefined;
        retries?: number | undefined;
    } | undefined;
    security?: {
        nonRootUser?: boolean | undefined;
        username?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
        readOnlyRootFilesystem?: boolean | undefined;
    } | undefined;
    nodejsConfig?: {
        version?: string | undefined;
        packageManager?: "npm" | "yarn" | "pnpm" | undefined;
        installDevDependencies?: boolean | undefined;
        buildScript?: string | undefined;
        startScript?: string | undefined;
        useNodeModulesCache?: boolean | undefined;
    } | undefined;
    pythonConfig?: {
        version?: string | undefined;
        packageManager?: "pip" | "poetry" | "pipenv" | undefined;
        requirementsFile?: string | undefined;
        useVirtualEnv?: boolean | undefined;
        pipUpgrade?: boolean | undefined;
    } | undefined;
    goConfig?: {
        version?: string | undefined;
        useModules?: boolean | undefined;
        cgoEnabled?: boolean | undefined;
        buildFlags?: string[] | undefined;
        ldflags?: string | undefined;
    } | undefined;
    javaConfig?: {
        version?: string | undefined;
        buildTool?: "maven" | "gradle" | undefined;
        baseImage?: string | undefined;
        jarName?: string | undefined;
        mainClass?: string | undefined;
    } | undefined;
    rustConfig?: {
        version?: string | undefined;
        useMusl?: boolean | undefined;
        buildProfile?: "debug" | "release" | undefined;
        features?: string[] | undefined;
    } | undefined;
    dotnetConfig?: {
        runtime?: string | undefined;
        version?: string | undefined;
        projectFile?: string | undefined;
        configuration?: "Debug" | "Release" | undefined;
    } | undefined;
    phpConfig?: {
        composer?: boolean | undefined;
        version?: string | undefined;
        extensions?: string[] | undefined;
        webServer?: "apache" | "fpm" | "cli" | undefined;
    } | undefined;
    rubyConfig?: {
        version?: string | undefined;
        bundlerVersion?: string | undefined;
        railsEnv?: string | undefined;
    } | undefined;
    generateDockerignore?: boolean | undefined;
    optimizations?: {
        layerCaching?: boolean | undefined;
        minimizeImageSize?: boolean | undefined;
        useMultiArchBuild?: boolean | undefined;
    } | undefined;
}>;
export declare const dockerfileValidationSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    warnings: z.ZodArray<z.ZodObject<{
        severity: z.ZodEnum<["low", "medium", "high"]>;
        message: z.ZodString;
        category: z.ZodEnum<["security", "performance", "best-practice", "size"]>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        severity: "low" | "medium" | "high";
        category: "security" | "performance" | "best-practice" | "size";
    }, {
        message: string;
        severity: "low" | "medium" | "high";
        category: "security" | "performance" | "best-practice" | "size";
    }>, "many">;
    suggestions: z.ZodArray<z.ZodString, "many">;
    estimatedSize: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    warnings: {
        message: string;
        severity: "low" | "medium" | "high";
        category: "security" | "performance" | "best-practice" | "size";
    }[];
    suggestions: string[];
    estimatedSize?: string | undefined;
}, {
    valid: boolean;
    warnings: {
        message: string;
        severity: "low" | "medium" | "high";
        category: "security" | "performance" | "best-practice" | "size";
    }[];
    suggestions: string[];
    estimatedSize?: string | undefined;
}>;
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
//# sourceMappingURL=dockerfileSchemas.d.ts.map