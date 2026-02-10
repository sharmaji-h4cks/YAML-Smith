import { z } from 'zod';
export declare const chartMetadataSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodDefault<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    apiVersion: z.ZodDefault<z.ZodString>;
    appVersion: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["application", "library"]>>;
    keywords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    home: z.ZodOptional<z.ZodString>;
    sources: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    maintainers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>, "many">>>;
    icon: z.ZodOptional<z.ZodString>;
    deprecated: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "application" | "library";
    annotations: Record<string, string>;
    apiVersion: string;
    version: string;
    keywords: string[];
    sources: string[];
    maintainers: {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }[];
    deprecated: boolean;
    description?: string | undefined;
    appVersion?: string | undefined;
    home?: string | undefined;
    icon?: string | undefined;
}, {
    name: string;
    type?: "application" | "library" | undefined;
    annotations?: Record<string, string> | undefined;
    apiVersion?: string | undefined;
    description?: string | undefined;
    version?: string | undefined;
    appVersion?: string | undefined;
    keywords?: string[] | undefined;
    home?: string | undefined;
    sources?: string[] | undefined;
    maintainers?: {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }[] | undefined;
    icon?: string | undefined;
    deprecated?: boolean | undefined;
}>;
export declare const environmentSchema: z.ZodObject<{
    name: z.ZodString;
    namespace: z.ZodOptional<z.ZodString>;
    replicas: z.ZodOptional<z.ZodNumber>;
    imageTag: z.ZodOptional<z.ZodString>;
    resources: z.ZodOptional<z.ZodObject<{
        requests: z.ZodOptional<z.ZodObject<{
            cpu: z.ZodOptional<z.ZodString>;
            memory: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }>>;
        limits: z.ZodOptional<z.ZodObject<{
            cpu: z.ZodOptional<z.ZodString>;
            memory: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    }, {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    }>>;
    ingress: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        host: z.ZodOptional<z.ZodString>;
        tls: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        host?: string | undefined;
        tls?: boolean | undefined;
        enabled?: boolean | undefined;
    }, {
        host?: string | undefined;
        tls?: boolean | undefined;
        enabled?: boolean | undefined;
    }>>;
    env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    namespace?: string | undefined;
    env?: Record<string, string> | undefined;
    resources?: {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    } | undefined;
    replicas?: number | undefined;
    ingress?: {
        host?: string | undefined;
        tls?: boolean | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    imageTag?: string | undefined;
}, {
    name: string;
    namespace?: string | undefined;
    env?: Record<string, string> | undefined;
    resources?: {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    } | undefined;
    replicas?: number | undefined;
    ingress?: {
        host?: string | undefined;
        tls?: boolean | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    imageTag?: string | undefined;
}>;
export declare const valuesConfigSchema: z.ZodObject<{
    image: z.ZodOptional<z.ZodObject<{
        repository: z.ZodOptional<z.ZodString>;
        pullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
        tag: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pullPolicy: "Always" | "IfNotPresent" | "Never";
        repository?: string | undefined;
        tag?: string | undefined;
    }, {
        repository?: string | undefined;
        pullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
        tag?: string | undefined;
    }>>;
    replicaCount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    service: z.ZodOptional<z.ZodObject<{
        type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["ClusterIP", "NodePort", "LoadBalancer"]>>>;
        port: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        targetPort: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "ClusterIP" | "NodePort" | "LoadBalancer";
        port: number;
        targetPort?: number | undefined;
    }, {
        type?: "ClusterIP" | "NodePort" | "LoadBalancer" | undefined;
        port?: number | undefined;
        targetPort?: number | undefined;
    }>>;
    ingress: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        className: z.ZodOptional<z.ZodString>;
        annotations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        hosts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            host: z.ZodString;
            paths: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                pathType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                pathType: string;
            }, {
                path: string;
                pathType?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            host: string;
            paths: {
                path: string;
                pathType: string;
            }[];
        }, {
            host: string;
            paths: {
                path: string;
                pathType?: string | undefined;
            }[];
        }>, "many">>;
        tls: z.ZodOptional<z.ZodArray<z.ZodObject<{
            secretName: z.ZodString;
            hosts: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            secretName: string;
            hosts: string[];
        }, {
            secretName: string;
            hosts: string[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        annotations?: Record<string, string> | undefined;
        hosts?: {
            host: string;
            paths: {
                path: string;
                pathType: string;
            }[];
        }[] | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
        className?: string | undefined;
    }, {
        annotations?: Record<string, string> | undefined;
        hosts?: {
            host: string;
            paths: {
                path: string;
                pathType?: string | undefined;
            }[];
        }[] | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
        enabled?: boolean | undefined;
        className?: string | undefined;
    }>>;
    resources: z.ZodOptional<z.ZodObject<{
        requests: z.ZodOptional<z.ZodObject<{
            cpu: z.ZodOptional<z.ZodString>;
            memory: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }>>;
        limits: z.ZodOptional<z.ZodObject<{
            cpu: z.ZodOptional<z.ZodString>;
            memory: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }, {
            cpu?: string | undefined;
            memory?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    }, {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    }>>;
    autoscaling: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        minReplicas: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        maxReplicas: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        targetCPUUtilizationPercentage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        targetMemoryUtilizationPercentage: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        minReplicas: number;
        maxReplicas: number;
        targetCPUUtilizationPercentage: number;
        enabled: boolean;
        targetMemoryUtilizationPercentage?: number | undefined;
    }, {
        minReplicas?: number | undefined;
        maxReplicas?: number | undefined;
        targetCPUUtilizationPercentage?: number | undefined;
        enabled?: boolean | undefined;
        targetMemoryUtilizationPercentage?: number | undefined;
    }>>;
    env: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        value: string;
    }, {
        name: string;
        value: string;
    }>, "many">>;
    configMaps: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        data: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        data: Record<string, string>;
    }, {
        name: string;
        data: Record<string, string>;
    }>, "many">>;
    secrets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        data: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        data: Record<string, string>;
    }, {
        name: string;
        data: Record<string, string>;
    }>, "many">>;
    livenessProbe: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        httpGet: z.ZodOptional<z.ZodObject<{
            path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            port: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            port?: number | undefined;
        }, {
            path?: string | undefined;
            port?: number | undefined;
        }>>;
        initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        initialDelaySeconds: number;
        periodSeconds: number;
        enabled: boolean;
        httpGet?: {
            path: string;
            port?: number | undefined;
        } | undefined;
    }, {
        httpGet?: {
            path?: string | undefined;
            port?: number | undefined;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        enabled?: boolean | undefined;
    }>>;
    readinessProbe: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        httpGet: z.ZodOptional<z.ZodObject<{
            path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            port: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            port?: number | undefined;
        }, {
            path?: string | undefined;
            port?: number | undefined;
        }>>;
        initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        initialDelaySeconds: number;
        periodSeconds: number;
        enabled: boolean;
        httpGet?: {
            path: string;
            port?: number | undefined;
        } | undefined;
    }, {
        httpGet?: {
            path?: string | undefined;
            port?: number | undefined;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        enabled?: boolean | undefined;
    }>>;
    nodeSelector: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    tolerations: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    affinity: z.ZodOptional<z.ZodAny>;
    securityContext: z.ZodOptional<z.ZodObject<{
        runAsNonRoot: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        runAsUser: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        fsGroup: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        runAsNonRoot: boolean;
        runAsUser: number;
        fsGroup: number;
    }, {
        runAsNonRoot?: boolean | undefined;
        runAsUser?: number | undefined;
        fsGroup?: number | undefined;
    }>>;
    serviceAccount: z.ZodOptional<z.ZodObject<{
        create: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        name: z.ZodOptional<z.ZodString>;
        annotations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        create: boolean;
        name?: string | undefined;
        annotations?: Record<string, string> | undefined;
    }, {
        name?: string | undefined;
        annotations?: Record<string, string> | undefined;
        create?: boolean | undefined;
    }>>;
    labels: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    annotations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    replicaCount: number;
    labels?: Record<string, string> | undefined;
    annotations?: Record<string, string> | undefined;
    image?: {
        pullPolicy: "Always" | "IfNotPresent" | "Never";
        repository?: string | undefined;
        tag?: string | undefined;
    } | undefined;
    env?: {
        name: string;
        value: string;
    }[] | undefined;
    resources?: {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    } | undefined;
    livenessProbe?: {
        initialDelaySeconds: number;
        periodSeconds: number;
        enabled: boolean;
        httpGet?: {
            path: string;
            port?: number | undefined;
        } | undefined;
    } | undefined;
    readinessProbe?: {
        initialDelaySeconds: number;
        periodSeconds: number;
        enabled: boolean;
        httpGet?: {
            path: string;
            port?: number | undefined;
        } | undefined;
    } | undefined;
    nodeSelector?: Record<string, string> | undefined;
    tolerations?: any[] | undefined;
    affinity?: any;
    service?: {
        type: "ClusterIP" | "NodePort" | "LoadBalancer";
        port: number;
        targetPort?: number | undefined;
    } | undefined;
    ingress?: {
        enabled: boolean;
        annotations?: Record<string, string> | undefined;
        hosts?: {
            host: string;
            paths: {
                path: string;
                pathType: string;
            }[];
        }[] | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
        className?: string | undefined;
    } | undefined;
    autoscaling?: {
        minReplicas: number;
        maxReplicas: number;
        targetCPUUtilizationPercentage: number;
        enabled: boolean;
        targetMemoryUtilizationPercentage?: number | undefined;
    } | undefined;
    configMaps?: {
        name: string;
        data: Record<string, string>;
    }[] | undefined;
    secrets?: {
        name: string;
        data: Record<string, string>;
    }[] | undefined;
    securityContext?: {
        runAsNonRoot: boolean;
        runAsUser: number;
        fsGroup: number;
    } | undefined;
    serviceAccount?: {
        create: boolean;
        name?: string | undefined;
        annotations?: Record<string, string> | undefined;
    } | undefined;
}, {
    labels?: Record<string, string> | undefined;
    annotations?: Record<string, string> | undefined;
    image?: {
        repository?: string | undefined;
        pullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
        tag?: string | undefined;
    } | undefined;
    env?: {
        name: string;
        value: string;
    }[] | undefined;
    resources?: {
        requests?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
        limits?: {
            cpu?: string | undefined;
            memory?: string | undefined;
        } | undefined;
    } | undefined;
    livenessProbe?: {
        httpGet?: {
            path?: string | undefined;
            port?: number | undefined;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    readinessProbe?: {
        httpGet?: {
            path?: string | undefined;
            port?: number | undefined;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        enabled?: boolean | undefined;
    } | undefined;
    nodeSelector?: Record<string, string> | undefined;
    tolerations?: any[] | undefined;
    affinity?: any;
    service?: {
        type?: "ClusterIP" | "NodePort" | "LoadBalancer" | undefined;
        port?: number | undefined;
        targetPort?: number | undefined;
    } | undefined;
    ingress?: {
        annotations?: Record<string, string> | undefined;
        hosts?: {
            host: string;
            paths: {
                path: string;
                pathType?: string | undefined;
            }[];
        }[] | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
        enabled?: boolean | undefined;
        className?: string | undefined;
    } | undefined;
    replicaCount?: number | undefined;
    autoscaling?: {
        minReplicas?: number | undefined;
        maxReplicas?: number | undefined;
        targetCPUUtilizationPercentage?: number | undefined;
        enabled?: boolean | undefined;
        targetMemoryUtilizationPercentage?: number | undefined;
    } | undefined;
    configMaps?: {
        name: string;
        data: Record<string, string>;
    }[] | undefined;
    secrets?: {
        name: string;
        data: Record<string, string>;
    }[] | undefined;
    securityContext?: {
        runAsNonRoot?: boolean | undefined;
        runAsUser?: number | undefined;
        fsGroup?: number | undefined;
    } | undefined;
    serviceAccount?: {
        name?: string | undefined;
        annotations?: Record<string, string> | undefined;
        create?: boolean | undefined;
    } | undefined;
}>;
export declare const dependencySchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    repository: z.ZodString;
    condition: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    importValues: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    alias: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    version: string;
    repository: string;
    enabled?: boolean | undefined;
    condition?: string | undefined;
    tags?: string[] | undefined;
    importValues?: any[] | undefined;
    alias?: string | undefined;
}, {
    name: string;
    version: string;
    repository: string;
    enabled?: boolean | undefined;
    condition?: string | undefined;
    tags?: string[] | undefined;
    importValues?: any[] | undefined;
    alias?: string | undefined;
}>;
export declare const helmChartSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodDefault<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        apiVersion: z.ZodDefault<z.ZodString>;
        appVersion: z.ZodOptional<z.ZodString>;
        type: z.ZodDefault<z.ZodEnum<["application", "library"]>>;
        keywords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        home: z.ZodOptional<z.ZodString>;
        sources: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        maintainers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            email: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email?: string | undefined;
            url?: string | undefined;
        }, {
            name: string;
            email?: string | undefined;
            url?: string | undefined;
        }>, "many">>>;
        icon: z.ZodOptional<z.ZodString>;
        deprecated: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "application" | "library";
        annotations: Record<string, string>;
        apiVersion: string;
        version: string;
        keywords: string[];
        sources: string[];
        maintainers: {
            name: string;
            email?: string | undefined;
            url?: string | undefined;
        }[];
        deprecated: boolean;
        description?: string | undefined;
        appVersion?: string | undefined;
        home?: string | undefined;
        icon?: string | undefined;
    }, {
        name: string;
        type?: "application" | "library" | undefined;
        annotations?: Record<string, string> | undefined;
        apiVersion?: string | undefined;
        description?: string | undefined;
        version?: string | undefined;
        appVersion?: string | undefined;
        keywords?: string[] | undefined;
        home?: string | undefined;
        sources?: string[] | undefined;
        maintainers?: {
            name: string;
            email?: string | undefined;
            url?: string | undefined;
        }[] | undefined;
        icon?: string | undefined;
        deprecated?: boolean | undefined;
    }>;
    values: z.ZodOptional<z.ZodObject<{
        image: z.ZodOptional<z.ZodObject<{
            repository: z.ZodOptional<z.ZodString>;
            pullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
            tag: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            pullPolicy: "Always" | "IfNotPresent" | "Never";
            repository?: string | undefined;
            tag?: string | undefined;
        }, {
            repository?: string | undefined;
            pullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            tag?: string | undefined;
        }>>;
        replicaCount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        service: z.ZodOptional<z.ZodObject<{
            type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["ClusterIP", "NodePort", "LoadBalancer"]>>>;
            port: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            targetPort: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "ClusterIP" | "NodePort" | "LoadBalancer";
            port: number;
            targetPort?: number | undefined;
        }, {
            type?: "ClusterIP" | "NodePort" | "LoadBalancer" | undefined;
            port?: number | undefined;
            targetPort?: number | undefined;
        }>>;
        ingress: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            className: z.ZodOptional<z.ZodString>;
            annotations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            hosts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                host: z.ZodString;
                paths: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    pathType: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    pathType: string;
                }, {
                    path: string;
                    pathType?: string | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                host: string;
                paths: {
                    path: string;
                    pathType: string;
                }[];
            }, {
                host: string;
                paths: {
                    path: string;
                    pathType?: string | undefined;
                }[];
            }>, "many">>;
            tls: z.ZodOptional<z.ZodArray<z.ZodObject<{
                secretName: z.ZodString;
                hosts: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                secretName: string;
                hosts: string[];
            }, {
                secretName: string;
                hosts: string[];
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            annotations?: Record<string, string> | undefined;
            hosts?: {
                host: string;
                paths: {
                    path: string;
                    pathType: string;
                }[];
            }[] | undefined;
            tls?: {
                secretName: string;
                hosts: string[];
            }[] | undefined;
            className?: string | undefined;
        }, {
            annotations?: Record<string, string> | undefined;
            hosts?: {
                host: string;
                paths: {
                    path: string;
                    pathType?: string | undefined;
                }[];
            }[] | undefined;
            tls?: {
                secretName: string;
                hosts: string[];
            }[] | undefined;
            enabled?: boolean | undefined;
            className?: string | undefined;
        }>>;
        resources: z.ZodOptional<z.ZodObject<{
            requests: z.ZodOptional<z.ZodObject<{
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
            limits: z.ZodOptional<z.ZodObject<{
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }, {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }>>;
        autoscaling: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            minReplicas: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            maxReplicas: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            targetCPUUtilizationPercentage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            targetMemoryUtilizationPercentage: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            minReplicas: number;
            maxReplicas: number;
            targetCPUUtilizationPercentage: number;
            enabled: boolean;
            targetMemoryUtilizationPercentage?: number | undefined;
        }, {
            minReplicas?: number | undefined;
            maxReplicas?: number | undefined;
            targetCPUUtilizationPercentage?: number | undefined;
            enabled?: boolean | undefined;
            targetMemoryUtilizationPercentage?: number | undefined;
        }>>;
        env: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string;
        }, {
            name: string;
            value: string;
        }>, "many">>;
        configMaps: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            data: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            data: Record<string, string>;
        }, {
            name: string;
            data: Record<string, string>;
        }>, "many">>;
        secrets: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            data: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            data: Record<string, string>;
        }, {
            name: string;
            data: Record<string, string>;
        }>, "many">>;
        livenessProbe: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                port: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port?: number | undefined;
            }, {
                path?: string | undefined;
                port?: number | undefined;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            enabled: boolean;
            httpGet?: {
                path: string;
                port?: number | undefined;
            } | undefined;
        }, {
            httpGet?: {
                path?: string | undefined;
                port?: number | undefined;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            enabled?: boolean | undefined;
        }>>;
        readinessProbe: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
                port: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port?: number | undefined;
            }, {
                path?: string | undefined;
                port?: number | undefined;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            enabled: boolean;
            httpGet?: {
                path: string;
                port?: number | undefined;
            } | undefined;
        }, {
            httpGet?: {
                path?: string | undefined;
                port?: number | undefined;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            enabled?: boolean | undefined;
        }>>;
        nodeSelector: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        tolerations: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        affinity: z.ZodOptional<z.ZodAny>;
        securityContext: z.ZodOptional<z.ZodObject<{
            runAsNonRoot: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            runAsUser: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            fsGroup: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            runAsNonRoot: boolean;
            runAsUser: number;
            fsGroup: number;
        }, {
            runAsNonRoot?: boolean | undefined;
            runAsUser?: number | undefined;
            fsGroup?: number | undefined;
        }>>;
        serviceAccount: z.ZodOptional<z.ZodObject<{
            create: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            name: z.ZodOptional<z.ZodString>;
            annotations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            create: boolean;
            name?: string | undefined;
            annotations?: Record<string, string> | undefined;
        }, {
            name?: string | undefined;
            annotations?: Record<string, string> | undefined;
            create?: boolean | undefined;
        }>>;
        labels: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        annotations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        replicaCount: number;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
        image?: {
            pullPolicy: "Always" | "IfNotPresent" | "Never";
            repository?: string | undefined;
            tag?: string | undefined;
        } | undefined;
        env?: {
            name: string;
            value: string;
        }[] | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        livenessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            enabled: boolean;
            httpGet?: {
                path: string;
                port?: number | undefined;
            } | undefined;
        } | undefined;
        readinessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            enabled: boolean;
            httpGet?: {
                path: string;
                port?: number | undefined;
            } | undefined;
        } | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: any[] | undefined;
        affinity?: any;
        service?: {
            type: "ClusterIP" | "NodePort" | "LoadBalancer";
            port: number;
            targetPort?: number | undefined;
        } | undefined;
        ingress?: {
            enabled: boolean;
            annotations?: Record<string, string> | undefined;
            hosts?: {
                host: string;
                paths: {
                    path: string;
                    pathType: string;
                }[];
            }[] | undefined;
            tls?: {
                secretName: string;
                hosts: string[];
            }[] | undefined;
            className?: string | undefined;
        } | undefined;
        autoscaling?: {
            minReplicas: number;
            maxReplicas: number;
            targetCPUUtilizationPercentage: number;
            enabled: boolean;
            targetMemoryUtilizationPercentage?: number | undefined;
        } | undefined;
        configMaps?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        secrets?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        securityContext?: {
            runAsNonRoot: boolean;
            runAsUser: number;
            fsGroup: number;
        } | undefined;
        serviceAccount?: {
            create: boolean;
            name?: string | undefined;
            annotations?: Record<string, string> | undefined;
        } | undefined;
    }, {
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
        image?: {
            repository?: string | undefined;
            pullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            tag?: string | undefined;
        } | undefined;
        env?: {
            name: string;
            value: string;
        }[] | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        livenessProbe?: {
            httpGet?: {
                path?: string | undefined;
                port?: number | undefined;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        readinessProbe?: {
            httpGet?: {
                path?: string | undefined;
                port?: number | undefined;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: any[] | undefined;
        affinity?: any;
        service?: {
            type?: "ClusterIP" | "NodePort" | "LoadBalancer" | undefined;
            port?: number | undefined;
            targetPort?: number | undefined;
        } | undefined;
        ingress?: {
            annotations?: Record<string, string> | undefined;
            hosts?: {
                host: string;
                paths: {
                    path: string;
                    pathType?: string | undefined;
                }[];
            }[] | undefined;
            tls?: {
                secretName: string;
                hosts: string[];
            }[] | undefined;
            enabled?: boolean | undefined;
            className?: string | undefined;
        } | undefined;
        replicaCount?: number | undefined;
        autoscaling?: {
            minReplicas?: number | undefined;
            maxReplicas?: number | undefined;
            targetCPUUtilizationPercentage?: number | undefined;
            enabled?: boolean | undefined;
            targetMemoryUtilizationPercentage?: number | undefined;
        } | undefined;
        configMaps?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        secrets?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        securityContext?: {
            runAsNonRoot?: boolean | undefined;
            runAsUser?: number | undefined;
            fsGroup?: number | undefined;
        } | undefined;
        serviceAccount?: {
            name?: string | undefined;
            annotations?: Record<string, string> | undefined;
            create?: boolean | undefined;
        } | undefined;
    }>>;
    environments: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodOptional<z.ZodString>;
        replicas: z.ZodOptional<z.ZodNumber>;
        imageTag: z.ZodOptional<z.ZodString>;
        resources: z.ZodOptional<z.ZodObject<{
            requests: z.ZodOptional<z.ZodObject<{
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
            limits: z.ZodOptional<z.ZodObject<{
                cpu: z.ZodOptional<z.ZodString>;
                memory: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }, {
                cpu?: string | undefined;
                memory?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }, {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        }>>;
        ingress: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            host: z.ZodOptional<z.ZodString>;
            tls: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            host?: string | undefined;
            tls?: boolean | undefined;
            enabled?: boolean | undefined;
        }, {
            host?: string | undefined;
            tls?: boolean | undefined;
            enabled?: boolean | undefined;
        }>>;
        env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace?: string | undefined;
        env?: Record<string, string> | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        replicas?: number | undefined;
        ingress?: {
            host?: string | undefined;
            tls?: boolean | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        imageTag?: string | undefined;
    }, {
        name: string;
        namespace?: string | undefined;
        env?: Record<string, string> | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        replicas?: number | undefined;
        ingress?: {
            host?: string | undefined;
            tls?: boolean | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        imageTag?: string | undefined;
    }>, "many">>>;
    dependencies: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        repository: z.ZodString;
        condition: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        enabled: z.ZodOptional<z.ZodBoolean>;
        importValues: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        alias: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        version: string;
        repository: string;
        enabled?: boolean | undefined;
        condition?: string | undefined;
        tags?: string[] | undefined;
        importValues?: any[] | undefined;
        alias?: string | undefined;
    }, {
        name: string;
        version: string;
        repository: string;
        enabled?: boolean | undefined;
        condition?: string | undefined;
        tags?: string[] | undefined;
        importValues?: any[] | undefined;
        alias?: string | undefined;
    }>, "many">>>;
    manifests: z.ZodOptional<z.ZodArray<z.ZodObject<{
        kind: z.ZodString;
        yaml: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        kind: string;
        yaml: string;
    }, {
        kind: string;
        yaml: string;
    }>, "many">>;
    options: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        includeHelpers: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        includeTests: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        includeNotes: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        includeHooks: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        generateEnvironmentValues: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        includeServiceMonitor: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        includePodDisruptionBudget: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        includeNetworkPolicy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        includeHelpers: boolean;
        includeTests: boolean;
        includeNotes: boolean;
        includeHooks: boolean;
        generateEnvironmentValues: boolean;
        includeServiceMonitor: boolean;
        includePodDisruptionBudget: boolean;
        includeNetworkPolicy: boolean;
    }, {
        includeHelpers?: boolean | undefined;
        includeTests?: boolean | undefined;
        includeNotes?: boolean | undefined;
        includeHooks?: boolean | undefined;
        generateEnvironmentValues?: boolean | undefined;
        includeServiceMonitor?: boolean | undefined;
        includePodDisruptionBudget?: boolean | undefined;
        includeNetworkPolicy?: boolean | undefined;
    }>>>;
    templateStyle: z.ZodDefault<z.ZodOptional<z.ZodEnum<["standard", "minimal", "comprehensive"]>>>;
}, "strip", z.ZodTypeAny, {
    options: {
        includeHelpers: boolean;
        includeTests: boolean;
        includeNotes: boolean;
        includeHooks: boolean;
        generateEnvironmentValues: boolean;
        includeServiceMonitor: boolean;
        includePodDisruptionBudget: boolean;
        includeNetworkPolicy: boolean;
    };
    metadata: {
        name: string;
        type: "application" | "library";
        annotations: Record<string, string>;
        apiVersion: string;
        version: string;
        keywords: string[];
        sources: string[];
        maintainers: {
            name: string;
            email?: string | undefined;
            url?: string | undefined;
        }[];
        deprecated: boolean;
        description?: string | undefined;
        appVersion?: string | undefined;
        home?: string | undefined;
        icon?: string | undefined;
    };
    environments: {
        name: string;
        namespace?: string | undefined;
        env?: Record<string, string> | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        replicas?: number | undefined;
        ingress?: {
            host?: string | undefined;
            tls?: boolean | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        imageTag?: string | undefined;
    }[];
    dependencies: {
        name: string;
        version: string;
        repository: string;
        enabled?: boolean | undefined;
        condition?: string | undefined;
        tags?: string[] | undefined;
        importValues?: any[] | undefined;
        alias?: string | undefined;
    }[];
    templateStyle: "standard" | "minimal" | "comprehensive";
    values?: {
        replicaCount: number;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
        image?: {
            pullPolicy: "Always" | "IfNotPresent" | "Never";
            repository?: string | undefined;
            tag?: string | undefined;
        } | undefined;
        env?: {
            name: string;
            value: string;
        }[] | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        livenessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            enabled: boolean;
            httpGet?: {
                path: string;
                port?: number | undefined;
            } | undefined;
        } | undefined;
        readinessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            enabled: boolean;
            httpGet?: {
                path: string;
                port?: number | undefined;
            } | undefined;
        } | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: any[] | undefined;
        affinity?: any;
        service?: {
            type: "ClusterIP" | "NodePort" | "LoadBalancer";
            port: number;
            targetPort?: number | undefined;
        } | undefined;
        ingress?: {
            enabled: boolean;
            annotations?: Record<string, string> | undefined;
            hosts?: {
                host: string;
                paths: {
                    path: string;
                    pathType: string;
                }[];
            }[] | undefined;
            tls?: {
                secretName: string;
                hosts: string[];
            }[] | undefined;
            className?: string | undefined;
        } | undefined;
        autoscaling?: {
            minReplicas: number;
            maxReplicas: number;
            targetCPUUtilizationPercentage: number;
            enabled: boolean;
            targetMemoryUtilizationPercentage?: number | undefined;
        } | undefined;
        configMaps?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        secrets?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        securityContext?: {
            runAsNonRoot: boolean;
            runAsUser: number;
            fsGroup: number;
        } | undefined;
        serviceAccount?: {
            create: boolean;
            name?: string | undefined;
            annotations?: Record<string, string> | undefined;
        } | undefined;
    } | undefined;
    manifests?: {
        kind: string;
        yaml: string;
    }[] | undefined;
}, {
    metadata: {
        name: string;
        type?: "application" | "library" | undefined;
        annotations?: Record<string, string> | undefined;
        apiVersion?: string | undefined;
        description?: string | undefined;
        version?: string | undefined;
        appVersion?: string | undefined;
        keywords?: string[] | undefined;
        home?: string | undefined;
        sources?: string[] | undefined;
        maintainers?: {
            name: string;
            email?: string | undefined;
            url?: string | undefined;
        }[] | undefined;
        icon?: string | undefined;
        deprecated?: boolean | undefined;
    };
    values?: {
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
        image?: {
            repository?: string | undefined;
            pullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            tag?: string | undefined;
        } | undefined;
        env?: {
            name: string;
            value: string;
        }[] | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        livenessProbe?: {
            httpGet?: {
                path?: string | undefined;
                port?: number | undefined;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        readinessProbe?: {
            httpGet?: {
                path?: string | undefined;
                port?: number | undefined;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: any[] | undefined;
        affinity?: any;
        service?: {
            type?: "ClusterIP" | "NodePort" | "LoadBalancer" | undefined;
            port?: number | undefined;
            targetPort?: number | undefined;
        } | undefined;
        ingress?: {
            annotations?: Record<string, string> | undefined;
            hosts?: {
                host: string;
                paths: {
                    path: string;
                    pathType?: string | undefined;
                }[];
            }[] | undefined;
            tls?: {
                secretName: string;
                hosts: string[];
            }[] | undefined;
            enabled?: boolean | undefined;
            className?: string | undefined;
        } | undefined;
        replicaCount?: number | undefined;
        autoscaling?: {
            minReplicas?: number | undefined;
            maxReplicas?: number | undefined;
            targetCPUUtilizationPercentage?: number | undefined;
            enabled?: boolean | undefined;
            targetMemoryUtilizationPercentage?: number | undefined;
        } | undefined;
        configMaps?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        secrets?: {
            name: string;
            data: Record<string, string>;
        }[] | undefined;
        securityContext?: {
            runAsNonRoot?: boolean | undefined;
            runAsUser?: number | undefined;
            fsGroup?: number | undefined;
        } | undefined;
        serviceAccount?: {
            name?: string | undefined;
            annotations?: Record<string, string> | undefined;
            create?: boolean | undefined;
        } | undefined;
    } | undefined;
    options?: {
        includeHelpers?: boolean | undefined;
        includeTests?: boolean | undefined;
        includeNotes?: boolean | undefined;
        includeHooks?: boolean | undefined;
        generateEnvironmentValues?: boolean | undefined;
        includeServiceMonitor?: boolean | undefined;
        includePodDisruptionBudget?: boolean | undefined;
        includeNetworkPolicy?: boolean | undefined;
    } | undefined;
    environments?: {
        name: string;
        namespace?: string | undefined;
        env?: Record<string, string> | undefined;
        resources?: {
            requests?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
            limits?: {
                cpu?: string | undefined;
                memory?: string | undefined;
            } | undefined;
        } | undefined;
        replicas?: number | undefined;
        ingress?: {
            host?: string | undefined;
            tls?: boolean | undefined;
            enabled?: boolean | undefined;
        } | undefined;
        imageTag?: string | undefined;
    }[] | undefined;
    dependencies?: {
        name: string;
        version: string;
        repository: string;
        enabled?: boolean | undefined;
        condition?: string | undefined;
        tags?: string[] | undefined;
        importValues?: any[] | undefined;
        alias?: string | undefined;
    }[] | undefined;
    manifests?: {
        kind: string;
        yaml: string;
    }[] | undefined;
    templateStyle?: "standard" | "minimal" | "comprehensive" | undefined;
}>;
export declare const helmChartOutputSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export declare const helmChartValidationSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    warnings: z.ZodArray<z.ZodObject<{
        severity: z.ZodEnum<["low", "medium", "high"]>;
        message: z.ZodString;
        file: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        severity: "low" | "medium" | "high";
        file?: string | undefined;
    }, {
        message: string;
        severity: "low" | "medium" | "high";
        file?: string | undefined;
    }>, "many">;
    suggestions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    warnings: {
        message: string;
        severity: "low" | "medium" | "high";
        file?: string | undefined;
    }[];
    suggestions: string[];
}, {
    valid: boolean;
    warnings: {
        message: string;
        severity: "low" | "medium" | "high";
        file?: string | undefined;
    }[];
    suggestions: string[];
}>;
export type HelmChartInput = z.infer<typeof helmChartSchema>;
export type ChartMetadata = z.infer<typeof chartMetadataSchema>;
export type ValuesConfig = z.infer<typeof valuesConfigSchema>;
export type EnvironmentConfig = z.infer<typeof environmentSchema>;
export type DependencyConfig = z.infer<typeof dependencySchema>;
export type HelmChartOutput = z.infer<typeof helmChartOutputSchema>;
export type HelmChartValidation = z.infer<typeof helmChartValidationSchema>;
//# sourceMappingURL=helmChartSchemas.d.ts.map