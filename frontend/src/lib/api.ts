import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ManifestInput {
  resourceType: 'Deployment' | 'Service' | 'ConfigMap' | 'Secret' | 'Ingress' | 'PersistentVolumeClaim' | 'HorizontalPodAutoscaler' | 'StorageClass' | 'PersistentVolume' | 'StatefulSet' | 'DaemonSet' | 'Job' | 'CronJob';
  deployment?: any;
  service?: any;
  configMap?: any;
  secret?: any;
  ingress?: any;
  pvc?: any;
  hpa?: any;
  storageClass?: any;
  pv?: any;
  statefulSet?: any;
  daemonSet?: any;
  job?: any;
  cronJob?: any;
  includeNamespace?: boolean;
}

export interface GenerateResponse {
  success: boolean;
  manifest: string;
  metadata: {
    resourceType: string;
    timestamp: string;
  };
}

export interface ValidateResponse {
  success: boolean;
  valid: boolean;
  warnings: string[];
  suggestions: string[];
  dependencies: Array<{ resourceType: string; reason: string; required: boolean }>;
  relatedResources: Array<{ resourceType: string; reason: string }>;
  deploymentCommands: Array<{ description: string; command: string }>;
  deploymentOrder: Array<{ step: number; resources: string[]; description: string }>;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DockerfileInput {
  language: 'nodejs' | 'python' | 'go' | 'java' | 'rust' | 'dotnet' | 'php' | 'ruby';
  projectName: string;
  baseImageType?: 'alpine' | 'debian' | 'ubuntu' | 'distroless' | 'scratch' | 'custom';
  customBaseImage?: string;
  multiStage?: {
    enabled: boolean;
    builderStageName?: string;
    runtimeStageName?: string;
    useDistrolessRuntime?: boolean;
  };
  port?: number;
  exposeAdditionalPorts?: number[];
  workdir?: string;
  buildCommand?: string;
  startCommand: string;
  env?: { name: string; value: string }[];
  buildArgs?: { name: string; value: string; description?: string }[];
  healthCheck?: {
    enabled: boolean;
    command?: string;
    interval?: string;
    timeout?: string;
    startPeriod?: string;
    retries?: number;
  };
  security?: {
    nonRootUser: boolean;
    username?: string;
    uid?: number;
    gid?: number;
    readOnlyRootFilesystem?: boolean;
  };
  labels?: Record<string, string>;
  nodejsConfig?: any;
  pythonConfig?: any;
  goConfig?: any;
  javaConfig?: any;
  rustConfig?: any;
  dotnetConfig?: any;
  phpConfig?: any;
  rubyConfig?: any;
  generateDockerignore?: boolean;
  optimizations?: {
    layerCaching?: boolean;
    minimizeImageSize?: boolean;
    useMultiArchBuild?: boolean;
  };
}

export interface DockerfileGenerateResponse {
  success: boolean;
  dockerfile: string;
  dockerignore?: string;
}

export interface DockerfileValidateResponse {
  success: boolean;
  validation: {
    valid: boolean;
    warnings: Array<{
      severity: 'low' | 'medium' | 'high';
      message: string;
      category: 'security' | 'performance' | 'best-practice' | 'size';
    }>;
    suggestions: string[];
    estimatedSize?: string;
  };
}

export const manifestApi = {
  generate: async (input: ManifestInput): Promise<GenerateResponse> => {
    const response = await api.post<GenerateResponse>('/manifest/generate', input);
    return response.data;
  },

  validate: async (input: ManifestInput): Promise<ValidateResponse> => {
    const response = await api.post<ValidateResponse>('/manifest/validate', input);
    return response.data;
  },

  getTemplates: async (): Promise<any> => {
    const response = await api.get('/manifest/templates');
    return response.data;
  },
};

export const dockerfileApi = {
  generate: async (input: DockerfileInput): Promise<DockerfileGenerateResponse> => {
    const response = await api.post<DockerfileGenerateResponse>('/dockerfile/generate', input);
    return response.data;
  },

  validate: async (input: DockerfileInput): Promise<DockerfileValidateResponse> => {
    const response = await api.post<DockerfileValidateResponse>('/dockerfile/validate', input);
    return response.data;
  },

  getTemplates: async (): Promise<any> => {
    const response = await api.get('/dockerfile/templates');
    return response.data;
  },
};

export interface HelmChartInput {
  metadata: {
    name: string;
    version: string;
    description?: string;
    apiVersion?: string;
    appVersion?: string;
    type?: 'application' | 'library';
    keywords?: string[];
    maintainers?: Array<{
      name: string;
      email?: string;
      url?: string;
    }>;
  };
  values?: {
    image?: {
      repository?: string;
      pullPolicy?: 'Always' | 'IfNotPresent' | 'Never';
      tag?: string;
    };
    replicaCount?: number;
    service?: {
      type?: 'ClusterIP' | 'NodePort' | 'LoadBalancer';
      port?: number;
      targetPort?: number;
    };
    ingress?: {
      enabled?: boolean;
      className?: string;
      annotations?: Record<string, string>;
      hosts?: Array<{
        host: string;
        paths: Array<{
          path: string;
          pathType?: string;
        }>;
      }>;
      tls?: Array<{
        secretName: string;
        hosts: string[];
      }>;
    };
    resources?: {
      requests?: {
        cpu?: string;
        memory?: string;
      };
      limits?: {
        cpu?: string;
        memory?: string;
      };
    };
    autoscaling?: {
      enabled?: boolean;
      minReplicas?: number;
      maxReplicas?: number;
      targetCPUUtilizationPercentage?: number;
    };
    serviceAccount?: {
      create?: boolean;
      name?: string;
    };
    securityContext?: {
      runAsNonRoot?: boolean;
      runAsUser?: number;
      fsGroup?: number;
    };
    env?: Array<{
      name: string;
      value: string;
    }>;
  };
  environments?: Array<{
    name: string;
    namespace?: string;
    replicas?: number;
    imageTag?: string;
  }>;
  options?: {
    includeHelpers?: boolean;
    includeTests?: boolean;
    includeNotes?: boolean;
    includeServiceMonitor?: boolean;
    includePodDisruptionBudget?: boolean;
    includeNetworkPolicy?: boolean;
    generateEnvironmentValues?: boolean;
  };
  templateStyle?: 'standard' | 'minimal' | 'comprehensive';
}

export interface HelmChartGenerateResponse {
  success: boolean;
  files: Record<string, string>;
}

export interface HelmChartValidateResponse {
  success: boolean;
  validation: {
    valid: boolean;
    warnings: Array<{
      severity: 'low' | 'medium' | 'high';
      message: string;
      file?: string;
    }>;
    suggestions: string[];
  };
}

export const helmChartApi = {
  generate: async (input: HelmChartInput): Promise<HelmChartGenerateResponse> => {
    const response = await api.post<HelmChartGenerateResponse>('/helm-chart/generate', input);
    return response.data;
  },

  validate: async (input: HelmChartInput): Promise<HelmChartValidateResponse> => {
    const response = await api.post<HelmChartValidateResponse>('/helm-chart/validate', input);
    return response.data;
  },

  getTemplates: async (): Promise<any> => {
    const response = await api.get('/helm-chart/templates');
    return response.data;
  },
};

export interface CICDPipelineInput {
  platform: 'github-actions' | 'gitlab-ci' | 'jenkins' | 'circleci' | 'azure-devops';
  projectName: string;
  language: 'nodejs' | 'python' | 'go' | 'java' | 'rust' | 'dotnet' | 'php' | 'ruby' | 'generic';
  triggers?: {
    branches?: string[];
    tags?: string[];
    pullRequest?: boolean;
    schedule?: string;
    paths?: string[];
  };
  build?: {
    dockerfile?: string;
    context?: string;
    buildArgs?: Record<string, string>;
    platforms?: string[];
    useCache?: boolean;
    target?: string;
  };
  test?: {
    enabled: boolean;
    unitTests?: {
      enabled: boolean;
      command?: string;
    };
    integrationTests?: {
      enabled?: boolean;
      command?: string;
    };
    coverage?: {
      enabled?: boolean;
      threshold?: number;
    };
  };
  security?: {
    enabled: boolean;
    trivy?: {
      enabled: boolean;
      severity?: string[];
      exitOnError?: boolean;
    };
    snyk?: {
      enabled?: boolean;
      token?: string;
    };
  };
  registry: {
    type: 'dockerhub' | 'gcr' | 'ecr' | 'acr' | 'ghcr' | 'gitlab' | 'custom';
    url?: string;
    repository: string;
    usernameSecret?: string;
    passwordSecret?: string;
    tagStrategy: 'commit-sha' | 'branch-name' | 'tag' | 'semantic' | 'latest';
    additionalTags?: string[];
  };
  deployment?: {
    enabled: boolean;
    strategy: 'kubectl' | 'helm' | 'kustomize' | 'gitops';
    namespace?: string;
    manifests?: string[];
    helmChart?: {
      name?: string;
      path?: string;
      valuesFile?: string;
    };
  };
  environments?: Array<{
    name: string;
    branch?: string;
    namespace?: string;
  }>;
  options?: {
    parallelJobs?: boolean;
    cacheEnabled?: boolean;
    timeout?: number;
  };
}

export interface CICDPipelineGenerateResponse {
  success: boolean;
  files: Record<string, string>;
}

export interface CICDPipelineValidateResponse {
  success: boolean;
  validation: {
    valid: boolean;
    warnings: Array<{
      severity: 'low' | 'medium' | 'high';
      message: string;
      platform?: string;
    }>;
    suggestions: string[];
  };
}

export const cicdApi = {
  generate: async (input: CICDPipelineInput): Promise<CICDPipelineGenerateResponse> => {
    const response = await api.post<CICDPipelineGenerateResponse>('/cicd/generate', input);
    return response.data;
  },

  validate: async (input: CICDPipelineInput): Promise<CICDPipelineValidateResponse> => {
    const response = await api.post<CICDPipelineValidateResponse>('/cicd/validate', input);
    return response.data;
  },

  getTemplates: async (): Promise<any> => {
    const response = await api.get('/cicd/templates');
    return response.data;
  },
};
