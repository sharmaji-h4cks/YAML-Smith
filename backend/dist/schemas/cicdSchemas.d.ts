import { z } from 'zod';
export declare const cicdPlatformEnum: z.ZodEnum<["github-actions", "gitlab-ci", "jenkins", "circleci", "azure-devops"]>;
export declare const triggerSchema: z.ZodObject<{
    branches: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    tags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    pullRequest: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    schedule: z.ZodOptional<z.ZodString>;
    paths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    tags: string[];
    branches: string[];
    pullRequest: boolean;
    paths?: string[] | undefined;
    schedule?: string | undefined;
}, {
    paths?: string[] | undefined;
    tags?: string[] | undefined;
    branches?: string[] | undefined;
    pullRequest?: boolean | undefined;
    schedule?: string | undefined;
}>;
export declare const buildConfigSchema: z.ZodObject<{
    dockerfile: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    context: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    buildArgs: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    platforms: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    useCache: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    target: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    buildArgs: Record<string, string>;
    dockerfile: string;
    context: string;
    platforms: string[];
    useCache: boolean;
    target?: string | undefined;
}, {
    target?: string | undefined;
    buildArgs?: Record<string, string> | undefined;
    dockerfile?: string | undefined;
    context?: string | undefined;
    platforms?: string[] | undefined;
    useCache?: boolean | undefined;
}>;
export declare const testConfigSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    unitTests: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        command: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        command?: string | undefined;
    }, {
        command?: string | undefined;
        enabled?: boolean | undefined;
    }>>;
    integrationTests: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        command: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        command?: string | undefined;
    }, {
        command?: string | undefined;
        enabled?: boolean | undefined;
    }>>;
    e2eTests: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        command: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        command?: string | undefined;
    }, {
        command?: string | undefined;
        enabled?: boolean | undefined;
    }>>;
    coverage: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        threshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        threshold: number;
    }, {
        enabled?: boolean | undefined;
        threshold?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    coverage?: {
        enabled: boolean;
        threshold: number;
    } | undefined;
    unitTests?: {
        enabled: boolean;
        command?: string | undefined;
    } | undefined;
    integrationTests?: {
        enabled: boolean;
        command?: string | undefined;
    } | undefined;
    e2eTests?: {
        enabled: boolean;
        command?: string | undefined;
    } | undefined;
}, {
    enabled?: boolean | undefined;
    coverage?: {
        enabled?: boolean | undefined;
        threshold?: number | undefined;
    } | undefined;
    unitTests?: {
        command?: string | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    integrationTests?: {
        command?: string | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    e2eTests?: {
        command?: string | undefined;
        enabled?: boolean | undefined;
    } | undefined;
}>;
export declare const securityScanSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    trivy: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        severity: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<["UNKNOWN", "LOW", "MEDIUM", "HIGH", "CRITICAL"]>, "many">>>;
        exitOnError: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        severity: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[];
        exitOnError: boolean;
    }, {
        enabled?: boolean | undefined;
        severity?: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[] | undefined;
        exitOnError?: boolean | undefined;
    }>>;
    snyk: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        token: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        token?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        token?: string | undefined;
    }>>;
    sonarqube: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        projectKey: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        url?: string | undefined;
        projectKey?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        url?: string | undefined;
        projectKey?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    trivy?: {
        enabled: boolean;
        severity: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[];
        exitOnError: boolean;
    } | undefined;
    snyk?: {
        enabled: boolean;
        token?: string | undefined;
    } | undefined;
    sonarqube?: {
        enabled: boolean;
        url?: string | undefined;
        projectKey?: string | undefined;
    } | undefined;
}, {
    enabled?: boolean | undefined;
    trivy?: {
        enabled?: boolean | undefined;
        severity?: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[] | undefined;
        exitOnError?: boolean | undefined;
    } | undefined;
    snyk?: {
        enabled?: boolean | undefined;
        token?: string | undefined;
    } | undefined;
    sonarqube?: {
        enabled?: boolean | undefined;
        url?: string | undefined;
        projectKey?: string | undefined;
    } | undefined;
}>;
export declare const registrySchema: z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["dockerhub", "gcr", "ecr", "acr", "ghcr", "gitlab", "custom"]>>;
    url: z.ZodOptional<z.ZodString>;
    repository: z.ZodString;
    usernameSecret: z.ZodOptional<z.ZodString>;
    passwordSecret: z.ZodOptional<z.ZodString>;
    tagStrategy: z.ZodDefault<z.ZodEnum<["commit-sha", "branch-name", "tag", "semantic", "latest"]>>;
    additionalTags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    type: "custom" | "dockerhub" | "gcr" | "ecr" | "acr" | "ghcr" | "gitlab";
    repository: string;
    tagStrategy: "tag" | "latest" | "commit-sha" | "branch-name" | "semantic";
    additionalTags: string[];
    url?: string | undefined;
    usernameSecret?: string | undefined;
    passwordSecret?: string | undefined;
}, {
    repository: string;
    type?: "custom" | "dockerhub" | "gcr" | "ecr" | "acr" | "ghcr" | "gitlab" | undefined;
    url?: string | undefined;
    usernameSecret?: string | undefined;
    passwordSecret?: string | undefined;
    tagStrategy?: "tag" | "latest" | "commit-sha" | "branch-name" | "semantic" | undefined;
    additionalTags?: string[] | undefined;
}>;
export declare const deploymentSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    strategy: z.ZodDefault<z.ZodEnum<["kubectl", "helm", "kustomize", "gitops"]>>;
    cluster: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        contextSecret: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        contextSecret?: string | undefined;
    }, {
        name?: string | undefined;
        contextSecret?: string | undefined;
    }>>;
    namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    manifests: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    helmChart: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
        valuesFile: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        path?: string | undefined;
        valuesFile?: string | undefined;
    }, {
        name?: string | undefined;
        path?: string | undefined;
        valuesFile?: string | undefined;
    }>>;
    gitops: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        tool: z.ZodDefault<z.ZodOptional<z.ZodEnum<["argocd", "flux"]>>>;
        application: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        tool: "argocd" | "flux";
        application?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        application?: string | undefined;
        tool?: "argocd" | "flux" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    namespace: string;
    strategy: "kubectl" | "helm" | "kustomize" | "gitops";
    enabled: boolean;
    manifests: string[];
    gitops?: {
        enabled: boolean;
        tool: "argocd" | "flux";
        application?: string | undefined;
    } | undefined;
    cluster?: {
        name?: string | undefined;
        contextSecret?: string | undefined;
    } | undefined;
    helmChart?: {
        name?: string | undefined;
        path?: string | undefined;
        valuesFile?: string | undefined;
    } | undefined;
}, {
    namespace?: string | undefined;
    strategy?: "kubectl" | "helm" | "kustomize" | "gitops" | undefined;
    enabled?: boolean | undefined;
    manifests?: string[] | undefined;
    gitops?: {
        enabled?: boolean | undefined;
        application?: string | undefined;
        tool?: "argocd" | "flux" | undefined;
    } | undefined;
    cluster?: {
        name?: string | undefined;
        contextSecret?: string | undefined;
    } | undefined;
    helmChart?: {
        name?: string | undefined;
        path?: string | undefined;
        valuesFile?: string | undefined;
    } | undefined;
}>;
export declare const environmentSchema: z.ZodObject<{
    name: z.ZodString;
    branch: z.ZodOptional<z.ZodString>;
    namespace: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    requireApproval: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    secrets: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    secrets: Record<string, string>;
    requireApproval: boolean;
    namespace?: string | undefined;
    url?: string | undefined;
    branch?: string | undefined;
}, {
    name: string;
    namespace?: string | undefined;
    url?: string | undefined;
    secrets?: Record<string, string> | undefined;
    branch?: string | undefined;
    requireApproval?: boolean | undefined;
}>;
export declare const notificationSchema: z.ZodObject<{
    slack: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        webhookSecret: z.ZodOptional<z.ZodString>;
        channel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        webhookSecret?: string | undefined;
        channel?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        webhookSecret?: string | undefined;
        channel?: string | undefined;
    }>>;
    email: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        recipients: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        recipients?: string[] | undefined;
    }, {
        enabled?: boolean | undefined;
        recipients?: string[] | undefined;
    }>>;
    teams: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        webhookSecret: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        webhookSecret?: string | undefined;
    }, {
        enabled?: boolean | undefined;
        webhookSecret?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    email?: {
        enabled: boolean;
        recipients?: string[] | undefined;
    } | undefined;
    slack?: {
        enabled: boolean;
        webhookSecret?: string | undefined;
        channel?: string | undefined;
    } | undefined;
    teams?: {
        enabled: boolean;
        webhookSecret?: string | undefined;
    } | undefined;
}, {
    email?: {
        enabled?: boolean | undefined;
        recipients?: string[] | undefined;
    } | undefined;
    slack?: {
        enabled?: boolean | undefined;
        webhookSecret?: string | undefined;
        channel?: string | undefined;
    } | undefined;
    teams?: {
        enabled?: boolean | undefined;
        webhookSecret?: string | undefined;
    } | undefined;
}>;
export declare const cicdPipelineSchema: z.ZodObject<{
    platform: z.ZodEnum<["github-actions", "gitlab-ci", "jenkins", "circleci", "azure-devops"]>;
    projectName: z.ZodString;
    language: z.ZodDefault<z.ZodEnum<["nodejs", "python", "go", "java", "rust", "dotnet", "php", "ruby", "generic"]>>;
    triggers: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        branches: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        tags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        pullRequest: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        schedule: z.ZodOptional<z.ZodString>;
        paths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        branches: string[];
        pullRequest: boolean;
        paths?: string[] | undefined;
        schedule?: string | undefined;
    }, {
        paths?: string[] | undefined;
        tags?: string[] | undefined;
        branches?: string[] | undefined;
        pullRequest?: boolean | undefined;
        schedule?: string | undefined;
    }>>>;
    build: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        dockerfile: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        context: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        buildArgs: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        platforms: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        useCache: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        target: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        buildArgs: Record<string, string>;
        dockerfile: string;
        context: string;
        platforms: string[];
        useCache: boolean;
        target?: string | undefined;
    }, {
        target?: string | undefined;
        buildArgs?: Record<string, string> | undefined;
        dockerfile?: string | undefined;
        context?: string | undefined;
        platforms?: string[] | undefined;
        useCache?: boolean | undefined;
    }>>>;
    test: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        unitTests: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            command: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            command?: string | undefined;
        }, {
            command?: string | undefined;
            enabled?: boolean | undefined;
        }>>;
        integrationTests: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            command: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            command?: string | undefined;
        }, {
            command?: string | undefined;
            enabled?: boolean | undefined;
        }>>;
        e2eTests: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            command: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            command?: string | undefined;
        }, {
            command?: string | undefined;
            enabled?: boolean | undefined;
        }>>;
        coverage: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            threshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            threshold: number;
        }, {
            enabled?: boolean | undefined;
            threshold?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        coverage?: {
            enabled: boolean;
            threshold: number;
        } | undefined;
        unitTests?: {
            enabled: boolean;
            command?: string | undefined;
        } | undefined;
        integrationTests?: {
            enabled: boolean;
            command?: string | undefined;
        } | undefined;
        e2eTests?: {
            enabled: boolean;
            command?: string | undefined;
        } | undefined;
    }, {
        enabled?: boolean | undefined;
        coverage?: {
            enabled?: boolean | undefined;
            threshold?: number | undefined;
        } | undefined;
        unitTests?: {
            command?: string | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        integrationTests?: {
            command?: string | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        e2eTests?: {
            command?: string | undefined;
            enabled?: boolean | undefined;
        } | undefined;
    }>>>;
    security: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        trivy: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            severity: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<["UNKNOWN", "LOW", "MEDIUM", "HIGH", "CRITICAL"]>, "many">>>;
            exitOnError: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            severity: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[];
            exitOnError: boolean;
        }, {
            enabled?: boolean | undefined;
            severity?: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[] | undefined;
            exitOnError?: boolean | undefined;
        }>>;
        snyk: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            token: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            token?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            token?: string | undefined;
        }>>;
        sonarqube: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            projectKey: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            url?: string | undefined;
            projectKey?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            url?: string | undefined;
            projectKey?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        trivy?: {
            enabled: boolean;
            severity: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[];
            exitOnError: boolean;
        } | undefined;
        snyk?: {
            enabled: boolean;
            token?: string | undefined;
        } | undefined;
        sonarqube?: {
            enabled: boolean;
            url?: string | undefined;
            projectKey?: string | undefined;
        } | undefined;
    }, {
        enabled?: boolean | undefined;
        trivy?: {
            enabled?: boolean | undefined;
            severity?: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[] | undefined;
            exitOnError?: boolean | undefined;
        } | undefined;
        snyk?: {
            enabled?: boolean | undefined;
            token?: string | undefined;
        } | undefined;
        sonarqube?: {
            enabled?: boolean | undefined;
            url?: string | undefined;
            projectKey?: string | undefined;
        } | undefined;
    }>>>;
    registry: z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["dockerhub", "gcr", "ecr", "acr", "ghcr", "gitlab", "custom"]>>;
        url: z.ZodOptional<z.ZodString>;
        repository: z.ZodString;
        usernameSecret: z.ZodOptional<z.ZodString>;
        passwordSecret: z.ZodOptional<z.ZodString>;
        tagStrategy: z.ZodDefault<z.ZodEnum<["commit-sha", "branch-name", "tag", "semantic", "latest"]>>;
        additionalTags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "dockerhub" | "gcr" | "ecr" | "acr" | "ghcr" | "gitlab";
        repository: string;
        tagStrategy: "tag" | "latest" | "commit-sha" | "branch-name" | "semantic";
        additionalTags: string[];
        url?: string | undefined;
        usernameSecret?: string | undefined;
        passwordSecret?: string | undefined;
    }, {
        repository: string;
        type?: "custom" | "dockerhub" | "gcr" | "ecr" | "acr" | "ghcr" | "gitlab" | undefined;
        url?: string | undefined;
        usernameSecret?: string | undefined;
        passwordSecret?: string | undefined;
        tagStrategy?: "tag" | "latest" | "commit-sha" | "branch-name" | "semantic" | undefined;
        additionalTags?: string[] | undefined;
    }>;
    deployment: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        strategy: z.ZodDefault<z.ZodEnum<["kubectl", "helm", "kustomize", "gitops"]>>;
        cluster: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            contextSecret: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            contextSecret?: string | undefined;
        }, {
            name?: string | undefined;
            contextSecret?: string | undefined;
        }>>;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        manifests: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        helmChart: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
            valuesFile: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            path?: string | undefined;
            valuesFile?: string | undefined;
        }, {
            name?: string | undefined;
            path?: string | undefined;
            valuesFile?: string | undefined;
        }>>;
        gitops: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            tool: z.ZodDefault<z.ZodOptional<z.ZodEnum<["argocd", "flux"]>>>;
            application: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            tool: "argocd" | "flux";
            application?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            application?: string | undefined;
            tool?: "argocd" | "flux" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        namespace: string;
        strategy: "kubectl" | "helm" | "kustomize" | "gitops";
        enabled: boolean;
        manifests: string[];
        gitops?: {
            enabled: boolean;
            tool: "argocd" | "flux";
            application?: string | undefined;
        } | undefined;
        cluster?: {
            name?: string | undefined;
            contextSecret?: string | undefined;
        } | undefined;
        helmChart?: {
            name?: string | undefined;
            path?: string | undefined;
            valuesFile?: string | undefined;
        } | undefined;
    }, {
        namespace?: string | undefined;
        strategy?: "kubectl" | "helm" | "kustomize" | "gitops" | undefined;
        enabled?: boolean | undefined;
        manifests?: string[] | undefined;
        gitops?: {
            enabled?: boolean | undefined;
            application?: string | undefined;
            tool?: "argocd" | "flux" | undefined;
        } | undefined;
        cluster?: {
            name?: string | undefined;
            contextSecret?: string | undefined;
        } | undefined;
        helmChart?: {
            name?: string | undefined;
            path?: string | undefined;
            valuesFile?: string | undefined;
        } | undefined;
    }>>>;
    environments: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        branch: z.ZodOptional<z.ZodString>;
        namespace: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        requireApproval: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        secrets: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        secrets: Record<string, string>;
        requireApproval: boolean;
        namespace?: string | undefined;
        url?: string | undefined;
        branch?: string | undefined;
    }, {
        name: string;
        namespace?: string | undefined;
        url?: string | undefined;
        secrets?: Record<string, string> | undefined;
        branch?: string | undefined;
        requireApproval?: boolean | undefined;
    }>, "many">>>;
    notifications: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        slack: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            webhookSecret: z.ZodOptional<z.ZodString>;
            channel: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            webhookSecret?: string | undefined;
            channel?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            webhookSecret?: string | undefined;
            channel?: string | undefined;
        }>>;
        email: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            recipients: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            recipients?: string[] | undefined;
        }, {
            enabled?: boolean | undefined;
            recipients?: string[] | undefined;
        }>>;
        teams: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            webhookSecret: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            webhookSecret?: string | undefined;
        }, {
            enabled?: boolean | undefined;
            webhookSecret?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        email?: {
            enabled: boolean;
            recipients?: string[] | undefined;
        } | undefined;
        slack?: {
            enabled: boolean;
            webhookSecret?: string | undefined;
            channel?: string | undefined;
        } | undefined;
        teams?: {
            enabled: boolean;
            webhookSecret?: string | undefined;
        } | undefined;
    }, {
        email?: {
            enabled?: boolean | undefined;
            recipients?: string[] | undefined;
        } | undefined;
        slack?: {
            enabled?: boolean | undefined;
            webhookSecret?: string | undefined;
            channel?: string | undefined;
        } | undefined;
        teams?: {
            enabled?: boolean | undefined;
            webhookSecret?: string | undefined;
        } | undefined;
    }>>>;
    options: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        parallelJobs: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        cacheEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        artifactRetention: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        timeout: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        retryOnFailure: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            maxAttempts: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            maxAttempts: number;
        }, {
            enabled?: boolean | undefined;
            maxAttempts?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timeout: number;
        parallelJobs: boolean;
        cacheEnabled: boolean;
        artifactRetention: number;
        retryOnFailure?: {
            enabled: boolean;
            maxAttempts: number;
        } | undefined;
    }, {
        timeout?: number | undefined;
        parallelJobs?: boolean | undefined;
        cacheEnabled?: boolean | undefined;
        artifactRetention?: number | undefined;
        retryOnFailure?: {
            enabled?: boolean | undefined;
            maxAttempts?: number | undefined;
        } | undefined;
    }>>>;
    customStages: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        commands: z.ZodArray<z.ZodString, "many">;
        dependsOn: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        when: z.ZodDefault<z.ZodOptional<z.ZodEnum<["always", "on-success", "on-failure", "manual"]>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        commands: string[];
        when: "always" | "on-success" | "on-failure" | "manual";
        dependsOn?: string[] | undefined;
    }, {
        name: string;
        commands: string[];
        dependsOn?: string[] | undefined;
        when?: "always" | "on-success" | "on-failure" | "manual" | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    options: {
        timeout: number;
        parallelJobs: boolean;
        cacheEnabled: boolean;
        artifactRetention: number;
        retryOnFailure?: {
            enabled: boolean;
            maxAttempts: number;
        } | undefined;
    };
    deployment: {
        namespace: string;
        strategy: "kubectl" | "helm" | "kustomize" | "gitops";
        enabled: boolean;
        manifests: string[];
        gitops?: {
            enabled: boolean;
            tool: "argocd" | "flux";
            application?: string | undefined;
        } | undefined;
        cluster?: {
            name?: string | undefined;
            contextSecret?: string | undefined;
        } | undefined;
        helmChart?: {
            name?: string | undefined;
            path?: string | undefined;
            valuesFile?: string | undefined;
        } | undefined;
    };
    language: "nodejs" | "python" | "go" | "java" | "rust" | "dotnet" | "php" | "ruby" | "generic";
    projectName: string;
    security: {
        enabled: boolean;
        trivy?: {
            enabled: boolean;
            severity: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[];
            exitOnError: boolean;
        } | undefined;
        snyk?: {
            enabled: boolean;
            token?: string | undefined;
        } | undefined;
        sonarqube?: {
            enabled: boolean;
            url?: string | undefined;
            projectKey?: string | undefined;
        } | undefined;
    };
    test: {
        enabled: boolean;
        coverage?: {
            enabled: boolean;
            threshold: number;
        } | undefined;
        unitTests?: {
            enabled: boolean;
            command?: string | undefined;
        } | undefined;
        integrationTests?: {
            enabled: boolean;
            command?: string | undefined;
        } | undefined;
        e2eTests?: {
            enabled: boolean;
            command?: string | undefined;
        } | undefined;
    };
    build: {
        buildArgs: Record<string, string>;
        dockerfile: string;
        context: string;
        platforms: string[];
        useCache: boolean;
        target?: string | undefined;
    };
    environments: {
        name: string;
        secrets: Record<string, string>;
        requireApproval: boolean;
        namespace?: string | undefined;
        url?: string | undefined;
        branch?: string | undefined;
    }[];
    platform: "github-actions" | "gitlab-ci" | "jenkins" | "circleci" | "azure-devops";
    triggers: {
        tags: string[];
        branches: string[];
        pullRequest: boolean;
        paths?: string[] | undefined;
        schedule?: string | undefined;
    };
    registry: {
        type: "custom" | "dockerhub" | "gcr" | "ecr" | "acr" | "ghcr" | "gitlab";
        repository: string;
        tagStrategy: "tag" | "latest" | "commit-sha" | "branch-name" | "semantic";
        additionalTags: string[];
        url?: string | undefined;
        usernameSecret?: string | undefined;
        passwordSecret?: string | undefined;
    };
    notifications: {
        email?: {
            enabled: boolean;
            recipients?: string[] | undefined;
        } | undefined;
        slack?: {
            enabled: boolean;
            webhookSecret?: string | undefined;
            channel?: string | undefined;
        } | undefined;
        teams?: {
            enabled: boolean;
            webhookSecret?: string | undefined;
        } | undefined;
    };
    customStages: {
        name: string;
        commands: string[];
        when: "always" | "on-success" | "on-failure" | "manual";
        dependsOn?: string[] | undefined;
    }[];
}, {
    projectName: string;
    platform: "github-actions" | "gitlab-ci" | "jenkins" | "circleci" | "azure-devops";
    registry: {
        repository: string;
        type?: "custom" | "dockerhub" | "gcr" | "ecr" | "acr" | "ghcr" | "gitlab" | undefined;
        url?: string | undefined;
        usernameSecret?: string | undefined;
        passwordSecret?: string | undefined;
        tagStrategy?: "tag" | "latest" | "commit-sha" | "branch-name" | "semantic" | undefined;
        additionalTags?: string[] | undefined;
    };
    options?: {
        timeout?: number | undefined;
        parallelJobs?: boolean | undefined;
        cacheEnabled?: boolean | undefined;
        artifactRetention?: number | undefined;
        retryOnFailure?: {
            enabled?: boolean | undefined;
            maxAttempts?: number | undefined;
        } | undefined;
    } | undefined;
    deployment?: {
        namespace?: string | undefined;
        strategy?: "kubectl" | "helm" | "kustomize" | "gitops" | undefined;
        enabled?: boolean | undefined;
        manifests?: string[] | undefined;
        gitops?: {
            enabled?: boolean | undefined;
            application?: string | undefined;
            tool?: "argocd" | "flux" | undefined;
        } | undefined;
        cluster?: {
            name?: string | undefined;
            contextSecret?: string | undefined;
        } | undefined;
        helmChart?: {
            name?: string | undefined;
            path?: string | undefined;
            valuesFile?: string | undefined;
        } | undefined;
    } | undefined;
    language?: "nodejs" | "python" | "go" | "java" | "rust" | "dotnet" | "php" | "ruby" | "generic" | undefined;
    security?: {
        enabled?: boolean | undefined;
        trivy?: {
            enabled?: boolean | undefined;
            severity?: ("UNKNOWN" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")[] | undefined;
            exitOnError?: boolean | undefined;
        } | undefined;
        snyk?: {
            enabled?: boolean | undefined;
            token?: string | undefined;
        } | undefined;
        sonarqube?: {
            enabled?: boolean | undefined;
            url?: string | undefined;
            projectKey?: string | undefined;
        } | undefined;
    } | undefined;
    test?: {
        enabled?: boolean | undefined;
        coverage?: {
            enabled?: boolean | undefined;
            threshold?: number | undefined;
        } | undefined;
        unitTests?: {
            command?: string | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        integrationTests?: {
            command?: string | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        e2eTests?: {
            command?: string | undefined;
            enabled?: boolean | undefined;
        } | undefined;
    } | undefined;
    build?: {
        target?: string | undefined;
        buildArgs?: Record<string, string> | undefined;
        dockerfile?: string | undefined;
        context?: string | undefined;
        platforms?: string[] | undefined;
        useCache?: boolean | undefined;
    } | undefined;
    environments?: {
        name: string;
        namespace?: string | undefined;
        url?: string | undefined;
        secrets?: Record<string, string> | undefined;
        branch?: string | undefined;
        requireApproval?: boolean | undefined;
    }[] | undefined;
    triggers?: {
        paths?: string[] | undefined;
        tags?: string[] | undefined;
        branches?: string[] | undefined;
        pullRequest?: boolean | undefined;
        schedule?: string | undefined;
    } | undefined;
    notifications?: {
        email?: {
            enabled?: boolean | undefined;
            recipients?: string[] | undefined;
        } | undefined;
        slack?: {
            enabled?: boolean | undefined;
            webhookSecret?: string | undefined;
            channel?: string | undefined;
        } | undefined;
        teams?: {
            enabled?: boolean | undefined;
            webhookSecret?: string | undefined;
        } | undefined;
    } | undefined;
    customStages?: {
        name: string;
        commands: string[];
        dependsOn?: string[] | undefined;
        when?: "always" | "on-success" | "on-failure" | "manual" | undefined;
    }[] | undefined;
}>;
export declare const cicdPipelineOutputSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export declare const cicdValidationSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    warnings: z.ZodArray<z.ZodObject<{
        severity: z.ZodEnum<["low", "medium", "high"]>;
        message: z.ZodString;
        platform: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        severity: "low" | "medium" | "high";
        platform?: string | undefined;
    }, {
        message: string;
        severity: "low" | "medium" | "high";
        platform?: string | undefined;
    }>, "many">;
    suggestions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    warnings: {
        message: string;
        severity: "low" | "medium" | "high";
        platform?: string | undefined;
    }[];
    suggestions: string[];
}, {
    valid: boolean;
    warnings: {
        message: string;
        severity: "low" | "medium" | "high";
        platform?: string | undefined;
    }[];
    suggestions: string[];
}>;
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
//# sourceMappingURL=cicdSchemas.d.ts.map