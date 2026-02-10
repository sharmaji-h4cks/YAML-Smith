import { z } from 'zod';
export declare const metadataSchema: z.ZodObject<{
    name: z.ZodString;
    namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    namespace: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
}, {
    name: string;
    namespace?: string | undefined;
    labels?: Record<string, string> | undefined;
    annotations?: Record<string, string> | undefined;
}>;
export declare const resourceRequirementsSchema: z.ZodObject<{
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
}>;
export declare const containerPortSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    containerPort: z.ZodNumber;
    protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
}, "strip", z.ZodTypeAny, {
    containerPort: number;
    protocol: "TCP" | "UDP" | "SCTP";
    name?: string | undefined;
}, {
    containerPort: number;
    name?: string | undefined;
    protocol?: "TCP" | "UDP" | "SCTP" | undefined;
}>;
export declare const envVarSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodOptional<z.ZodString>;
    valueFrom: z.ZodOptional<z.ZodObject<{
        configMapKeyRef: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            key: string;
        }, {
            name: string;
            key: string;
        }>>;
        secretKeyRef: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            key: string;
        }, {
            name: string;
            key: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        configMapKeyRef?: {
            name: string;
            key: string;
        } | undefined;
        secretKeyRef?: {
            name: string;
            key: string;
        } | undefined;
    }, {
        configMapKeyRef?: {
            name: string;
            key: string;
        } | undefined;
        secretKeyRef?: {
            name: string;
            key: string;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    value?: string | undefined;
    valueFrom?: {
        configMapKeyRef?: {
            name: string;
            key: string;
        } | undefined;
        secretKeyRef?: {
            name: string;
            key: string;
        } | undefined;
    } | undefined;
}, {
    name: string;
    value?: string | undefined;
    valueFrom?: {
        configMapKeyRef?: {
            name: string;
            key: string;
        } | undefined;
        secretKeyRef?: {
            name: string;
            key: string;
        } | undefined;
    } | undefined;
}>;
export declare const volumeMountSchema: z.ZodObject<{
    name: z.ZodString;
    mountPath: z.ZodString;
    readOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    subPath: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    mountPath: string;
    readOnly: boolean;
    subPath?: string | undefined;
}, {
    name: string;
    mountPath: string;
    readOnly?: boolean | undefined;
    subPath?: string | undefined;
}>;
export declare const volumeSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["emptyDir", "configMap", "secret", "persistentVolumeClaim", "hostPath"]>;
    configMap: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>>;
    secret: z.ZodOptional<z.ZodObject<{
        secretName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secretName: string;
    }, {
        secretName: string;
    }>>;
    persistentVolumeClaim: z.ZodOptional<z.ZodObject<{
        claimName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        claimName: string;
    }, {
        claimName: string;
    }>>;
    hostPath: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
    configMap?: {
        name: string;
    } | undefined;
    secret?: {
        secretName: string;
    } | undefined;
    persistentVolumeClaim?: {
        claimName: string;
    } | undefined;
    hostPath?: {
        path: string;
    } | undefined;
}, {
    name: string;
    type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
    configMap?: {
        name: string;
    } | undefined;
    secret?: {
        secretName: string;
    } | undefined;
    persistentVolumeClaim?: {
        claimName: string;
    } | undefined;
    hostPath?: {
        path: string;
    } | undefined;
}>;
export declare const probeSchema: z.ZodObject<{
    httpGet: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
        port: z.ZodNumber;
        scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        port: number;
        scheme: "HTTP" | "HTTPS";
    }, {
        path: string;
        port: number;
        scheme?: "HTTP" | "HTTPS" | undefined;
    }>>;
    exec: z.ZodOptional<z.ZodObject<{
        command: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        command: string[];
    }, {
        command: string[];
    }>>;
    tcpSocket: z.ZodOptional<z.ZodObject<{
        port: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        port: number;
    }, {
        port: number;
    }>>;
    initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    initialDelaySeconds: number;
    periodSeconds: number;
    timeoutSeconds: number;
    successThreshold: number;
    failureThreshold: number;
    httpGet?: {
        path: string;
        port: number;
        scheme: "HTTP" | "HTTPS";
    } | undefined;
    exec?: {
        command: string[];
    } | undefined;
    tcpSocket?: {
        port: number;
    } | undefined;
}, {
    httpGet?: {
        path: string;
        port: number;
        scheme?: "HTTP" | "HTTPS" | undefined;
    } | undefined;
    exec?: {
        command: string[];
    } | undefined;
    tcpSocket?: {
        port: number;
    } | undefined;
    initialDelaySeconds?: number | undefined;
    periodSeconds?: number | undefined;
    timeoutSeconds?: number | undefined;
    successThreshold?: number | undefined;
    failureThreshold?: number | undefined;
}>;
export declare const containerSchema: z.ZodObject<{
    name: z.ZodString;
    image: z.ZodString;
    imagePullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
    command: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        containerPort: z.ZodNumber;
        protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
    }, "strip", z.ZodTypeAny, {
        containerPort: number;
        protocol: "TCP" | "UDP" | "SCTP";
        name?: string | undefined;
    }, {
        containerPort: number;
        name?: string | undefined;
        protocol?: "TCP" | "UDP" | "SCTP" | undefined;
    }>, "many">>>;
    env: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
        valueFrom: z.ZodOptional<z.ZodObject<{
            configMapKeyRef: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                key: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                key: string;
            }, {
                name: string;
                key: string;
            }>>;
            secretKeyRef: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                key: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                key: string;
            }, {
                name: string;
                key: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            configMapKeyRef?: {
                name: string;
                key: string;
            } | undefined;
            secretKeyRef?: {
                name: string;
                key: string;
            } | undefined;
        }, {
            configMapKeyRef?: {
                name: string;
                key: string;
            } | undefined;
            secretKeyRef?: {
                name: string;
                key: string;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        value?: string | undefined;
        valueFrom?: {
            configMapKeyRef?: {
                name: string;
                key: string;
            } | undefined;
            secretKeyRef?: {
                name: string;
                key: string;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        value?: string | undefined;
        valueFrom?: {
            configMapKeyRef?: {
                name: string;
                key: string;
            } | undefined;
            secretKeyRef?: {
                name: string;
                key: string;
            } | undefined;
        } | undefined;
    }>, "many">>>;
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
    volumeMounts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        mountPath: z.ZodString;
        readOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        subPath: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        mountPath: string;
        readOnly: boolean;
        subPath?: string | undefined;
    }, {
        name: string;
        mountPath: string;
        readOnly?: boolean | undefined;
        subPath?: string | undefined;
    }>, "many">>>;
    livenessProbe: z.ZodOptional<z.ZodObject<{
        httpGet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            port: z.ZodNumber;
            scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        }, {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        }>>;
        exec: z.ZodOptional<z.ZodObject<{
            command: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            command: string[];
        }, {
            command: string[];
        }>>;
        tcpSocket: z.ZodOptional<z.ZodObject<{
            port: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            port: number;
        }, {
            port: number;
        }>>;
        initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        initialDelaySeconds: number;
        periodSeconds: number;
        timeoutSeconds: number;
        successThreshold: number;
        failureThreshold: number;
        httpGet?: {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
    }, {
        httpGet?: {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        timeoutSeconds?: number | undefined;
        successThreshold?: number | undefined;
        failureThreshold?: number | undefined;
    }>>;
    readinessProbe: z.ZodOptional<z.ZodObject<{
        httpGet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            port: z.ZodNumber;
            scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        }, {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        }>>;
        exec: z.ZodOptional<z.ZodObject<{
            command: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            command: string[];
        }, {
            command: string[];
        }>>;
        tcpSocket: z.ZodOptional<z.ZodObject<{
            port: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            port: number;
        }, {
            port: number;
        }>>;
        initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        initialDelaySeconds: number;
        periodSeconds: number;
        timeoutSeconds: number;
        successThreshold: number;
        failureThreshold: number;
        httpGet?: {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
    }, {
        httpGet?: {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        timeoutSeconds?: number | undefined;
        successThreshold?: number | undefined;
        failureThreshold?: number | undefined;
    }>>;
    startupProbe: z.ZodOptional<z.ZodObject<{
        httpGet: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
            port: z.ZodNumber;
            scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
        }, "strip", z.ZodTypeAny, {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        }, {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        }>>;
        exec: z.ZodOptional<z.ZodObject<{
            command: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            command: string[];
        }, {
            command: string[];
        }>>;
        tcpSocket: z.ZodOptional<z.ZodObject<{
            port: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            port: number;
        }, {
            port: number;
        }>>;
        initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        initialDelaySeconds: number;
        periodSeconds: number;
        timeoutSeconds: number;
        successThreshold: number;
        failureThreshold: number;
        httpGet?: {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
    }, {
        httpGet?: {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        timeoutSeconds?: number | undefined;
        successThreshold?: number | undefined;
        failureThreshold?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    image: string;
    imagePullPolicy: "Always" | "IfNotPresent" | "Never";
    ports: {
        containerPort: number;
        protocol: "TCP" | "UDP" | "SCTP";
        name?: string | undefined;
    }[];
    env: {
        name: string;
        value?: string | undefined;
        valueFrom?: {
            configMapKeyRef?: {
                name: string;
                key: string;
            } | undefined;
            secretKeyRef?: {
                name: string;
                key: string;
            } | undefined;
        } | undefined;
    }[];
    volumeMounts: {
        name: string;
        mountPath: string;
        readOnly: boolean;
        subPath?: string | undefined;
    }[];
    command?: string[] | undefined;
    args?: string[] | undefined;
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
        timeoutSeconds: number;
        successThreshold: number;
        failureThreshold: number;
        httpGet?: {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
    } | undefined;
    readinessProbe?: {
        initialDelaySeconds: number;
        periodSeconds: number;
        timeoutSeconds: number;
        successThreshold: number;
        failureThreshold: number;
        httpGet?: {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
    } | undefined;
    startupProbe?: {
        initialDelaySeconds: number;
        periodSeconds: number;
        timeoutSeconds: number;
        successThreshold: number;
        failureThreshold: number;
        httpGet?: {
            path: string;
            port: number;
            scheme: "HTTP" | "HTTPS";
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
    } | undefined;
}, {
    name: string;
    image: string;
    command?: string[] | undefined;
    imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
    args?: string[] | undefined;
    ports?: {
        containerPort: number;
        name?: string | undefined;
        protocol?: "TCP" | "UDP" | "SCTP" | undefined;
    }[] | undefined;
    env?: {
        name: string;
        value?: string | undefined;
        valueFrom?: {
            configMapKeyRef?: {
                name: string;
                key: string;
            } | undefined;
            secretKeyRef?: {
                name: string;
                key: string;
            } | undefined;
        } | undefined;
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
    volumeMounts?: {
        name: string;
        mountPath: string;
        readOnly?: boolean | undefined;
        subPath?: string | undefined;
    }[] | undefined;
    livenessProbe?: {
        httpGet?: {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        timeoutSeconds?: number | undefined;
        successThreshold?: number | undefined;
        failureThreshold?: number | undefined;
    } | undefined;
    readinessProbe?: {
        httpGet?: {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        timeoutSeconds?: number | undefined;
        successThreshold?: number | undefined;
        failureThreshold?: number | undefined;
    } | undefined;
    startupProbe?: {
        httpGet?: {
            path: string;
            port: number;
            scheme?: "HTTP" | "HTTPS" | undefined;
        } | undefined;
        exec?: {
            command: string[];
        } | undefined;
        tcpSocket?: {
            port: number;
        } | undefined;
        initialDelaySeconds?: number | undefined;
        periodSeconds?: number | undefined;
        timeoutSeconds?: number | undefined;
        successThreshold?: number | undefined;
        failureThreshold?: number | undefined;
    } | undefined;
}>;
export declare const deploymentSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    replicas: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    strategy: z.ZodOptional<z.ZodObject<{
        type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["RollingUpdate", "Recreate"]>>>;
        rollingUpdate: z.ZodOptional<z.ZodObject<{
            maxSurge: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
            maxUnavailable: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
        }, "strip", z.ZodTypeAny, {
            maxSurge: string | number;
            maxUnavailable: string | number;
        }, {
            maxSurge?: string | number | undefined;
            maxUnavailable?: string | number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "RollingUpdate" | "Recreate";
        rollingUpdate?: {
            maxSurge: string | number;
            maxUnavailable: string | number;
        } | undefined;
    }, {
        type?: "RollingUpdate" | "Recreate" | undefined;
        rollingUpdate?: {
            maxSurge?: string | number | undefined;
            maxUnavailable?: string | number | undefined;
        } | undefined;
    }>>;
    containers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        image: z.ZodString;
        imagePullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
        command: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            containerPort: z.ZodNumber;
            protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
        }, "strip", z.ZodTypeAny, {
            containerPort: number;
            protocol: "TCP" | "UDP" | "SCTP";
            name?: string | undefined;
        }, {
            containerPort: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        }>, "many">>>;
        env: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
            valueFrom: z.ZodOptional<z.ZodObject<{
                configMapKeyRef: z.ZodOptional<z.ZodObject<{
                    name: z.ZodString;
                    key: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    key: string;
                }, {
                    name: string;
                    key: string;
                }>>;
                secretKeyRef: z.ZodOptional<z.ZodObject<{
                    name: z.ZodString;
                    key: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    key: string;
                }, {
                    name: string;
                    key: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            }, {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }, {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }>, "many">>>;
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
        volumeMounts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            mountPath: z.ZodString;
            readOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            subPath: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            mountPath: string;
            readOnly: boolean;
            subPath?: string | undefined;
        }, {
            name: string;
            mountPath: string;
            readOnly?: boolean | undefined;
            subPath?: string | undefined;
        }>, "many">>>;
        livenessProbe: z.ZodOptional<z.ZodObject<{
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            }, {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            }>>;
            exec: z.ZodOptional<z.ZodObject<{
                command: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                command: string[];
            }, {
                command: string[];
            }>>;
            tcpSocket: z.ZodOptional<z.ZodObject<{
                port: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
            }, {
                port: number;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        }, {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        }>>;
        readinessProbe: z.ZodOptional<z.ZodObject<{
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            }, {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            }>>;
            exec: z.ZodOptional<z.ZodObject<{
                command: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                command: string[];
            }, {
                command: string[];
            }>>;
            tcpSocket: z.ZodOptional<z.ZodObject<{
                port: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
            }, {
                port: number;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        }, {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        }>>;
        startupProbe: z.ZodOptional<z.ZodObject<{
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            }, {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            }>>;
            exec: z.ZodOptional<z.ZodObject<{
                command: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                command: string[];
            }, {
                command: string[];
            }>>;
            tcpSocket: z.ZodOptional<z.ZodObject<{
                port: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
            }, {
                port: number;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        }, {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        imagePullPolicy: "Always" | "IfNotPresent" | "Never";
        ports: {
            containerPort: number;
            protocol: "TCP" | "UDP" | "SCTP";
            name?: string | undefined;
        }[];
        env: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }[];
        volumeMounts: {
            name: string;
            mountPath: string;
            readOnly: boolean;
            subPath?: string | undefined;
        }[];
        command?: string[] | undefined;
        args?: string[] | undefined;
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
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        readinessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        startupProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        image: string;
        command?: string[] | undefined;
        imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
        args?: string[] | undefined;
        ports?: {
            containerPort: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        }[] | undefined;
        env?: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
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
        volumeMounts?: {
            name: string;
            mountPath: string;
            readOnly?: boolean | undefined;
            subPath?: string | undefined;
        }[] | undefined;
        livenessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        readinessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        startupProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
    }>, "many">;
    initContainers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        image: z.ZodString;
        imagePullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
        command: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            containerPort: z.ZodNumber;
            protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
        }, "strip", z.ZodTypeAny, {
            containerPort: number;
            protocol: "TCP" | "UDP" | "SCTP";
            name?: string | undefined;
        }, {
            containerPort: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        }>, "many">>>;
        env: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
            valueFrom: z.ZodOptional<z.ZodObject<{
                configMapKeyRef: z.ZodOptional<z.ZodObject<{
                    name: z.ZodString;
                    key: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    key: string;
                }, {
                    name: string;
                    key: string;
                }>>;
                secretKeyRef: z.ZodOptional<z.ZodObject<{
                    name: z.ZodString;
                    key: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    key: string;
                }, {
                    name: string;
                    key: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            }, {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }, {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }>, "many">>>;
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
        volumeMounts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            mountPath: z.ZodString;
            readOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            subPath: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            mountPath: string;
            readOnly: boolean;
            subPath?: string | undefined;
        }, {
            name: string;
            mountPath: string;
            readOnly?: boolean | undefined;
            subPath?: string | undefined;
        }>, "many">>>;
        livenessProbe: z.ZodOptional<z.ZodObject<{
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            }, {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            }>>;
            exec: z.ZodOptional<z.ZodObject<{
                command: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                command: string[];
            }, {
                command: string[];
            }>>;
            tcpSocket: z.ZodOptional<z.ZodObject<{
                port: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
            }, {
                port: number;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        }, {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        }>>;
        readinessProbe: z.ZodOptional<z.ZodObject<{
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            }, {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            }>>;
            exec: z.ZodOptional<z.ZodObject<{
                command: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                command: string[];
            }, {
                command: string[];
            }>>;
            tcpSocket: z.ZodOptional<z.ZodObject<{
                port: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
            }, {
                port: number;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        }, {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        }>>;
        startupProbe: z.ZodOptional<z.ZodObject<{
            httpGet: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
                port: z.ZodNumber;
                scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            }, {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            }>>;
            exec: z.ZodOptional<z.ZodObject<{
                command: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                command: string[];
            }, {
                command: string[];
            }>>;
            tcpSocket: z.ZodOptional<z.ZodObject<{
                port: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                port: number;
            }, {
                port: number;
            }>>;
            initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        }, {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        imagePullPolicy: "Always" | "IfNotPresent" | "Never";
        ports: {
            containerPort: number;
            protocol: "TCP" | "UDP" | "SCTP";
            name?: string | undefined;
        }[];
        env: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }[];
        volumeMounts: {
            name: string;
            mountPath: string;
            readOnly: boolean;
            subPath?: string | undefined;
        }[];
        command?: string[] | undefined;
        args?: string[] | undefined;
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
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        readinessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        startupProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        image: string;
        command?: string[] | undefined;
        imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
        args?: string[] | undefined;
        ports?: {
            containerPort: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        }[] | undefined;
        env?: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
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
        volumeMounts?: {
            name: string;
            mountPath: string;
            readOnly?: boolean | undefined;
            subPath?: string | undefined;
        }[] | undefined;
        livenessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        readinessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        startupProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
    }>, "many">>>;
    volumes: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["emptyDir", "configMap", "secret", "persistentVolumeClaim", "hostPath"]>;
        configMap: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
        }, {
            name: string;
        }>>;
        secret: z.ZodOptional<z.ZodObject<{
            secretName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            secretName: string;
        }, {
            secretName: string;
        }>>;
        persistentVolumeClaim: z.ZodOptional<z.ZodObject<{
            claimName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            claimName: string;
        }, {
            claimName: string;
        }>>;
        hostPath: z.ZodOptional<z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
        configMap?: {
            name: string;
        } | undefined;
        secret?: {
            secretName: string;
        } | undefined;
        persistentVolumeClaim?: {
            claimName: string;
        } | undefined;
        hostPath?: {
            path: string;
        } | undefined;
    }, {
        name: string;
        type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
        configMap?: {
            name: string;
        } | undefined;
        secret?: {
            secretName: string;
        } | undefined;
        persistentVolumeClaim?: {
            claimName: string;
        } | undefined;
        hostPath?: {
            path: string;
        } | undefined;
    }>, "many">>>;
    serviceAccountName: z.ZodOptional<z.ZodString>;
    nodeSelector: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    tolerations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        operator: z.ZodOptional<z.ZodEnum<["Equal", "Exists"]>>;
        value: z.ZodOptional<z.ZodString>;
        effect: z.ZodOptional<z.ZodEnum<["NoSchedule", "PreferNoSchedule", "NoExecute"]>>;
    }, "strip", z.ZodTypeAny, {
        value?: string | undefined;
        key?: string | undefined;
        operator?: "Equal" | "Exists" | undefined;
        effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
    }, {
        value?: string | undefined;
        key?: string | undefined;
        operator?: "Equal" | "Exists" | undefined;
        effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
    }>, "many">>;
    affinity: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    replicas: number;
    containers: {
        name: string;
        image: string;
        imagePullPolicy: "Always" | "IfNotPresent" | "Never";
        ports: {
            containerPort: number;
            protocol: "TCP" | "UDP" | "SCTP";
            name?: string | undefined;
        }[];
        env: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }[];
        volumeMounts: {
            name: string;
            mountPath: string;
            readOnly: boolean;
            subPath?: string | undefined;
        }[];
        command?: string[] | undefined;
        args?: string[] | undefined;
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
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        readinessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        startupProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
    }[];
    initContainers: {
        name: string;
        image: string;
        imagePullPolicy: "Always" | "IfNotPresent" | "Never";
        ports: {
            containerPort: number;
            protocol: "TCP" | "UDP" | "SCTP";
            name?: string | undefined;
        }[];
        env: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
        }[];
        volumeMounts: {
            name: string;
            mountPath: string;
            readOnly: boolean;
            subPath?: string | undefined;
        }[];
        command?: string[] | undefined;
        args?: string[] | undefined;
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
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        readinessProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
        startupProbe?: {
            initialDelaySeconds: number;
            periodSeconds: number;
            timeoutSeconds: number;
            successThreshold: number;
            failureThreshold: number;
            httpGet?: {
                path: string;
                port: number;
                scheme: "HTTP" | "HTTPS";
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
        } | undefined;
    }[];
    volumes: {
        name: string;
        type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
        configMap?: {
            name: string;
        } | undefined;
        secret?: {
            secretName: string;
        } | undefined;
        persistentVolumeClaim?: {
            claimName: string;
        } | undefined;
        hostPath?: {
            path: string;
        } | undefined;
    }[];
    strategy?: {
        type: "RollingUpdate" | "Recreate";
        rollingUpdate?: {
            maxSurge: string | number;
            maxUnavailable: string | number;
        } | undefined;
    } | undefined;
    serviceAccountName?: string | undefined;
    nodeSelector?: Record<string, string> | undefined;
    tolerations?: {
        value?: string | undefined;
        key?: string | undefined;
        operator?: "Equal" | "Exists" | undefined;
        effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
    }[] | undefined;
    affinity?: any;
}, {
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    containers: {
        name: string;
        image: string;
        command?: string[] | undefined;
        imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
        args?: string[] | undefined;
        ports?: {
            containerPort: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        }[] | undefined;
        env?: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
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
        volumeMounts?: {
            name: string;
            mountPath: string;
            readOnly?: boolean | undefined;
            subPath?: string | undefined;
        }[] | undefined;
        livenessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        readinessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        startupProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
    }[];
    replicas?: number | undefined;
    strategy?: {
        type?: "RollingUpdate" | "Recreate" | undefined;
        rollingUpdate?: {
            maxSurge?: string | number | undefined;
            maxUnavailable?: string | number | undefined;
        } | undefined;
    } | undefined;
    initContainers?: {
        name: string;
        image: string;
        command?: string[] | undefined;
        imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
        args?: string[] | undefined;
        ports?: {
            containerPort: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        }[] | undefined;
        env?: {
            name: string;
            value?: string | undefined;
            valueFrom?: {
                configMapKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
                secretKeyRef?: {
                    name: string;
                    key: string;
                } | undefined;
            } | undefined;
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
        volumeMounts?: {
            name: string;
            mountPath: string;
            readOnly?: boolean | undefined;
            subPath?: string | undefined;
        }[] | undefined;
        livenessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        readinessProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
        startupProbe?: {
            httpGet?: {
                path: string;
                port: number;
                scheme?: "HTTP" | "HTTPS" | undefined;
            } | undefined;
            exec?: {
                command: string[];
            } | undefined;
            tcpSocket?: {
                port: number;
            } | undefined;
            initialDelaySeconds?: number | undefined;
            periodSeconds?: number | undefined;
            timeoutSeconds?: number | undefined;
            successThreshold?: number | undefined;
            failureThreshold?: number | undefined;
        } | undefined;
    }[] | undefined;
    volumes?: {
        name: string;
        type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
        configMap?: {
            name: string;
        } | undefined;
        secret?: {
            secretName: string;
        } | undefined;
        persistentVolumeClaim?: {
            claimName: string;
        } | undefined;
        hostPath?: {
            path: string;
        } | undefined;
    }[] | undefined;
    serviceAccountName?: string | undefined;
    nodeSelector?: Record<string, string> | undefined;
    tolerations?: {
        value?: string | undefined;
        key?: string | undefined;
        operator?: "Equal" | "Exists" | undefined;
        effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
    }[] | undefined;
    affinity?: any;
}>;
export declare const serviceSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    type: z.ZodDefault<z.ZodEnum<["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"]>>;
    selector: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    ports: z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        port: z.ZodNumber;
        targetPort: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
        nodePort: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        protocol: "TCP" | "UDP" | "SCTP";
        port: number;
        name?: string | undefined;
        targetPort?: string | number | undefined;
        nodePort?: number | undefined;
    }, {
        port: number;
        name?: string | undefined;
        protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        targetPort?: string | number | undefined;
        nodePort?: number | undefined;
    }>, "many">;
    sessionAffinity: z.ZodDefault<z.ZodOptional<z.ZodEnum<["None", "ClientIP"]>>>;
    loadBalancerIP: z.ZodOptional<z.ZodString>;
    externalTrafficPolicy: z.ZodOptional<z.ZodEnum<["Cluster", "Local"]>>;
}, "strip", z.ZodTypeAny, {
    type: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
    ports: {
        protocol: "TCP" | "UDP" | "SCTP";
        port: number;
        name?: string | undefined;
        targetPort?: string | number | undefined;
        nodePort?: number | undefined;
    }[];
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    sessionAffinity: "None" | "ClientIP";
    selector?: Record<string, string> | undefined;
    loadBalancerIP?: string | undefined;
    externalTrafficPolicy?: "Cluster" | "Local" | undefined;
}, {
    ports: {
        port: number;
        name?: string | undefined;
        protocol?: "TCP" | "UDP" | "SCTP" | undefined;
        targetPort?: string | number | undefined;
        nodePort?: number | undefined;
    }[];
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    type?: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName" | undefined;
    selector?: Record<string, string> | undefined;
    sessionAffinity?: "None" | "ClientIP" | undefined;
    loadBalancerIP?: string | undefined;
    externalTrafficPolicy?: "Cluster" | "Local" | undefined;
}>;
export declare const configMapSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    data: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    binaryData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    data: Record<string, string>;
    binaryData?: Record<string, string> | undefined;
}, {
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    data?: Record<string, string> | undefined;
    binaryData?: Record<string, string> | undefined;
}>;
export declare const secretSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    type: z.ZodDefault<z.ZodEnum<["Opaque", "kubernetes.io/service-account-token", "kubernetes.io/dockercfg", "kubernetes.io/dockerconfigjson", "kubernetes.io/basic-auth", "kubernetes.io/ssh-auth", "kubernetes.io/tls"]>>;
    data: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    stringData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "Opaque" | "kubernetes.io/service-account-token" | "kubernetes.io/dockercfg" | "kubernetes.io/dockerconfigjson" | "kubernetes.io/basic-auth" | "kubernetes.io/ssh-auth" | "kubernetes.io/tls";
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    data: Record<string, string>;
    stringData?: Record<string, string> | undefined;
}, {
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    type?: "Opaque" | "kubernetes.io/service-account-token" | "kubernetes.io/dockercfg" | "kubernetes.io/dockerconfigjson" | "kubernetes.io/basic-auth" | "kubernetes.io/ssh-auth" | "kubernetes.io/tls" | undefined;
    data?: Record<string, string> | undefined;
    stringData?: Record<string, string> | undefined;
}>;
export declare const ingressSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    ingressClassName: z.ZodOptional<z.ZodString>;
    rules: z.ZodArray<z.ZodObject<{
        host: z.ZodOptional<z.ZodString>;
        http: z.ZodObject<{
            paths: z.ZodArray<z.ZodObject<{
                path: z.ZodString;
                pathType: z.ZodDefault<z.ZodEnum<["Exact", "Prefix", "ImplementationSpecific"]>>;
                backend: z.ZodObject<{
                    service: z.ZodObject<{
                        name: z.ZodString;
                        port: z.ZodObject<{
                            number: z.ZodOptional<z.ZodNumber>;
                            name: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            number?: number | undefined;
                            name?: string | undefined;
                        }, {
                            number?: number | undefined;
                            name?: string | undefined;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    }, {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    }>;
                }, "strip", z.ZodTypeAny, {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                }, {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                }>;
            }, "strip", z.ZodTypeAny, {
                path: string;
                pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
            }, {
                path: string;
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
                pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            paths: {
                path: string;
                pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
            }[];
        }, {
            paths: {
                path: string;
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
                pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        http: {
            paths: {
                path: string;
                pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
            }[];
        };
        host?: string | undefined;
    }, {
        http: {
            paths: {
                path: string;
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
                pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
            }[];
        };
        host?: string | undefined;
    }>, "many">;
    tls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        hosts: z.ZodArray<z.ZodString, "many">;
        secretName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secretName: string;
        hosts: string[];
    }, {
        secretName: string;
        hosts: string[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    rules: {
        http: {
            paths: {
                path: string;
                pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
            }[];
        };
        host?: string | undefined;
    }[];
    ingressClassName?: string | undefined;
    tls?: {
        secretName: string;
        hosts: string[];
    }[] | undefined;
}, {
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    rules: {
        http: {
            paths: {
                path: string;
                backend: {
                    service: {
                        name: string;
                        port: {
                            number?: number | undefined;
                            name?: string | undefined;
                        };
                    };
                };
                pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
            }[];
        };
        host?: string | undefined;
    }[];
    ingressClassName?: string | undefined;
    tls?: {
        secretName: string;
        hosts: string[];
    }[] | undefined;
}>;
export declare const pvcSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    accessModes: z.ZodArray<z.ZodEnum<["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"]>, "many">;
    storageClassName: z.ZodOptional<z.ZodString>;
    resources: z.ZodObject<{
        requests: z.ZodObject<{
            storage: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            storage: string;
        }, {
            storage: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        requests: {
            storage: string;
        };
    }, {
        requests: {
            storage: string;
        };
    }>;
    volumeMode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Filesystem", "Block"]>>>;
}, "strip", z.ZodTypeAny, {
    resources: {
        requests: {
            storage: string;
        };
    };
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    accessModes: ("ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany")[];
    volumeMode: "Filesystem" | "Block";
    storageClassName?: string | undefined;
}, {
    resources: {
        requests: {
            storage: string;
        };
    };
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    accessModes: ("ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany")[];
    storageClassName?: string | undefined;
    volumeMode?: "Filesystem" | "Block" | undefined;
}>;
export declare const hpaSchema: z.ZodObject<{
    metadata: z.ZodObject<{
        name: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    }, {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    }>;
    scaleTargetRef: z.ZodObject<{
        apiVersion: z.ZodDefault<z.ZodString>;
        kind: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        apiVersion: string;
        kind: string;
    }, {
        name: string;
        apiVersion?: string | undefined;
        kind?: string | undefined;
    }>;
    minReplicas: z.ZodDefault<z.ZodNumber>;
    maxReplicas: z.ZodNumber;
    metrics: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["Resource", "Pods", "Object", "External"]>;
        resource: z.ZodOptional<z.ZodObject<{
            name: z.ZodEnum<["cpu", "memory"]>;
            target: z.ZodObject<{
                type: z.ZodEnum<["Utilization", "AverageValue"]>;
                averageUtilization: z.ZodOptional<z.ZodNumber>;
                averageValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            }, {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            name: "cpu" | "memory";
            target: {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            };
        }, {
            name: "cpu" | "memory";
            target: {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "Resource" | "Pods" | "Object" | "External";
        resource?: {
            name: "cpu" | "memory";
            target: {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            };
        } | undefined;
    }, {
        type: "Resource" | "Pods" | "Object" | "External";
        resource?: {
            name: "cpu" | "memory";
            target: {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            };
        } | undefined;
    }>, "many">>;
    targetCPUUtilizationPercentage: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    metadata: {
        name: string;
        namespace: string;
        labels: Record<string, string>;
        annotations: Record<string, string>;
    };
    scaleTargetRef: {
        name: string;
        apiVersion: string;
        kind: string;
    };
    minReplicas: number;
    maxReplicas: number;
    metrics?: {
        type: "Resource" | "Pods" | "Object" | "External";
        resource?: {
            name: "cpu" | "memory";
            target: {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            };
        } | undefined;
    }[] | undefined;
    targetCPUUtilizationPercentage?: number | undefined;
}, {
    metadata: {
        name: string;
        namespace?: string | undefined;
        labels?: Record<string, string> | undefined;
        annotations?: Record<string, string> | undefined;
    };
    scaleTargetRef: {
        name: string;
        apiVersion?: string | undefined;
        kind?: string | undefined;
    };
    maxReplicas: number;
    minReplicas?: number | undefined;
    metrics?: {
        type: "Resource" | "Pods" | "Object" | "External";
        resource?: {
            name: "cpu" | "memory";
            target: {
                type: "Utilization" | "AverageValue";
                averageUtilization?: number | undefined;
                averageValue?: string | undefined;
            };
        } | undefined;
    }[] | undefined;
    targetCPUUtilizationPercentage?: number | undefined;
}>;
export declare const manifestSchema: z.ZodObject<{
    resourceType: z.ZodEnum<["Deployment", "Service", "ConfigMap", "Secret", "Ingress", "PersistentVolumeClaim", "HorizontalPodAutoscaler"]>;
    deployment: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        replicas: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        strategy: z.ZodOptional<z.ZodObject<{
            type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["RollingUpdate", "Recreate"]>>>;
            rollingUpdate: z.ZodOptional<z.ZodObject<{
                maxSurge: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
                maxUnavailable: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
            }, "strip", z.ZodTypeAny, {
                maxSurge: string | number;
                maxUnavailable: string | number;
            }, {
                maxSurge?: string | number | undefined;
                maxUnavailable?: string | number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "RollingUpdate" | "Recreate";
            rollingUpdate?: {
                maxSurge: string | number;
                maxUnavailable: string | number;
            } | undefined;
        }, {
            type?: "RollingUpdate" | "Recreate" | undefined;
            rollingUpdate?: {
                maxSurge?: string | number | undefined;
                maxUnavailable?: string | number | undefined;
            } | undefined;
        }>>;
        containers: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            image: z.ZodString;
            imagePullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
            command: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                containerPort: z.ZodNumber;
                protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
            }, "strip", z.ZodTypeAny, {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }, {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }>, "many">>>;
            env: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
                valueFrom: z.ZodOptional<z.ZodObject<{
                    configMapKeyRef: z.ZodOptional<z.ZodObject<{
                        name: z.ZodString;
                        key: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        key: string;
                    }, {
                        name: string;
                        key: string;
                    }>>;
                    secretKeyRef: z.ZodOptional<z.ZodObject<{
                        name: z.ZodString;
                        key: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        key: string;
                    }, {
                        name: string;
                        key: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                }, {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }, {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }>, "many">>>;
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
            volumeMounts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                mountPath: z.ZodString;
                readOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                subPath: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }, {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }>, "many">>>;
            livenessProbe: z.ZodOptional<z.ZodObject<{
                httpGet: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    port: z.ZodNumber;
                    scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                }, {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                }>>;
                exec: z.ZodOptional<z.ZodObject<{
                    command: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    command: string[];
                }, {
                    command: string[];
                }>>;
                tcpSocket: z.ZodOptional<z.ZodObject<{
                    port: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    port: number;
                }, {
                    port: number;
                }>>;
                initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            }, {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            }>>;
            readinessProbe: z.ZodOptional<z.ZodObject<{
                httpGet: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    port: z.ZodNumber;
                    scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                }, {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                }>>;
                exec: z.ZodOptional<z.ZodObject<{
                    command: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    command: string[];
                }, {
                    command: string[];
                }>>;
                tcpSocket: z.ZodOptional<z.ZodObject<{
                    port: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    port: number;
                }, {
                    port: number;
                }>>;
                initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            }, {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            }>>;
            startupProbe: z.ZodOptional<z.ZodObject<{
                httpGet: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    port: z.ZodNumber;
                    scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                }, {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                }>>;
                exec: z.ZodOptional<z.ZodObject<{
                    command: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    command: string[];
                }, {
                    command: string[];
                }>>;
                tcpSocket: z.ZodOptional<z.ZodObject<{
                    port: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    port: number;
                }, {
                    port: number;
                }>>;
                initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            }, {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            image: string;
            imagePullPolicy: "Always" | "IfNotPresent" | "Never";
            ports: {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }[];
            env: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }[];
            volumeMounts: {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }[];
            command?: string[] | undefined;
            args?: string[] | undefined;
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
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            readinessProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            startupProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
        }, {
            name: string;
            image: string;
            command?: string[] | undefined;
            imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            args?: string[] | undefined;
            ports?: {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }[] | undefined;
            env?: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
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
            volumeMounts?: {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }[] | undefined;
            livenessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            readinessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            startupProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
        }>, "many">;
        initContainers: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            image: z.ZodString;
            imagePullPolicy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Always", "IfNotPresent", "Never"]>>>;
            command: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                containerPort: z.ZodNumber;
                protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
            }, "strip", z.ZodTypeAny, {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }, {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }>, "many">>>;
            env: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
                valueFrom: z.ZodOptional<z.ZodObject<{
                    configMapKeyRef: z.ZodOptional<z.ZodObject<{
                        name: z.ZodString;
                        key: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        key: string;
                    }, {
                        name: string;
                        key: string;
                    }>>;
                    secretKeyRef: z.ZodOptional<z.ZodObject<{
                        name: z.ZodString;
                        key: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        key: string;
                    }, {
                        name: string;
                        key: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                }, {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }, {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }>, "many">>>;
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
            volumeMounts: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                mountPath: z.ZodString;
                readOnly: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                subPath: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }, {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }>, "many">>>;
            livenessProbe: z.ZodOptional<z.ZodObject<{
                httpGet: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    port: z.ZodNumber;
                    scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                }, {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                }>>;
                exec: z.ZodOptional<z.ZodObject<{
                    command: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    command: string[];
                }, {
                    command: string[];
                }>>;
                tcpSocket: z.ZodOptional<z.ZodObject<{
                    port: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    port: number;
                }, {
                    port: number;
                }>>;
                initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            }, {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            }>>;
            readinessProbe: z.ZodOptional<z.ZodObject<{
                httpGet: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    port: z.ZodNumber;
                    scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                }, {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                }>>;
                exec: z.ZodOptional<z.ZodObject<{
                    command: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    command: string[];
                }, {
                    command: string[];
                }>>;
                tcpSocket: z.ZodOptional<z.ZodObject<{
                    port: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    port: number;
                }, {
                    port: number;
                }>>;
                initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            }, {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            }>>;
            startupProbe: z.ZodOptional<z.ZodObject<{
                httpGet: z.ZodOptional<z.ZodObject<{
                    path: z.ZodString;
                    port: z.ZodNumber;
                    scheme: z.ZodDefault<z.ZodOptional<z.ZodEnum<["HTTP", "HTTPS"]>>>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                }, {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                }>>;
                exec: z.ZodOptional<z.ZodObject<{
                    command: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    command: string[];
                }, {
                    command: string[];
                }>>;
                tcpSocket: z.ZodOptional<z.ZodObject<{
                    port: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    port: number;
                }, {
                    port: number;
                }>>;
                initialDelaySeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                periodSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                timeoutSeconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                successThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                failureThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            }, {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            image: string;
            imagePullPolicy: "Always" | "IfNotPresent" | "Never";
            ports: {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }[];
            env: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }[];
            volumeMounts: {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }[];
            command?: string[] | undefined;
            args?: string[] | undefined;
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
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            readinessProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            startupProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
        }, {
            name: string;
            image: string;
            command?: string[] | undefined;
            imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            args?: string[] | undefined;
            ports?: {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }[] | undefined;
            env?: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
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
            volumeMounts?: {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }[] | undefined;
            livenessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            readinessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            startupProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
        }>, "many">>>;
        volumes: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["emptyDir", "configMap", "secret", "persistentVolumeClaim", "hostPath"]>;
            configMap: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>>;
            secret: z.ZodOptional<z.ZodObject<{
                secretName: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                secretName: string;
            }, {
                secretName: string;
            }>>;
            persistentVolumeClaim: z.ZodOptional<z.ZodObject<{
                claimName: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                claimName: string;
            }, {
                claimName: string;
            }>>;
            hostPath: z.ZodOptional<z.ZodObject<{
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
            configMap?: {
                name: string;
            } | undefined;
            secret?: {
                secretName: string;
            } | undefined;
            persistentVolumeClaim?: {
                claimName: string;
            } | undefined;
            hostPath?: {
                path: string;
            } | undefined;
        }, {
            name: string;
            type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
            configMap?: {
                name: string;
            } | undefined;
            secret?: {
                secretName: string;
            } | undefined;
            persistentVolumeClaim?: {
                claimName: string;
            } | undefined;
            hostPath?: {
                path: string;
            } | undefined;
        }>, "many">>>;
        serviceAccountName: z.ZodOptional<z.ZodString>;
        nodeSelector: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        tolerations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodOptional<z.ZodString>;
            operator: z.ZodOptional<z.ZodEnum<["Equal", "Exists"]>>;
            value: z.ZodOptional<z.ZodString>;
            effect: z.ZodOptional<z.ZodEnum<["NoSchedule", "PreferNoSchedule", "NoExecute"]>>;
        }, "strip", z.ZodTypeAny, {
            value?: string | undefined;
            key?: string | undefined;
            operator?: "Equal" | "Exists" | undefined;
            effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
        }, {
            value?: string | undefined;
            key?: string | undefined;
            operator?: "Equal" | "Exists" | undefined;
            effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
        }>, "many">>;
        affinity: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        replicas: number;
        containers: {
            name: string;
            image: string;
            imagePullPolicy: "Always" | "IfNotPresent" | "Never";
            ports: {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }[];
            env: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }[];
            volumeMounts: {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }[];
            command?: string[] | undefined;
            args?: string[] | undefined;
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
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            readinessProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            startupProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
        }[];
        initContainers: {
            name: string;
            image: string;
            imagePullPolicy: "Always" | "IfNotPresent" | "Never";
            ports: {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }[];
            env: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }[];
            volumeMounts: {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }[];
            command?: string[] | undefined;
            args?: string[] | undefined;
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
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            readinessProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            startupProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
        }[];
        volumes: {
            name: string;
            type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
            configMap?: {
                name: string;
            } | undefined;
            secret?: {
                secretName: string;
            } | undefined;
            persistentVolumeClaim?: {
                claimName: string;
            } | undefined;
            hostPath?: {
                path: string;
            } | undefined;
        }[];
        strategy?: {
            type: "RollingUpdate" | "Recreate";
            rollingUpdate?: {
                maxSurge: string | number;
                maxUnavailable: string | number;
            } | undefined;
        } | undefined;
        serviceAccountName?: string | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: {
            value?: string | undefined;
            key?: string | undefined;
            operator?: "Equal" | "Exists" | undefined;
            effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
        }[] | undefined;
        affinity?: any;
    }, {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        containers: {
            name: string;
            image: string;
            command?: string[] | undefined;
            imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            args?: string[] | undefined;
            ports?: {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }[] | undefined;
            env?: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
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
            volumeMounts?: {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }[] | undefined;
            livenessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            readinessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            startupProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
        }[];
        replicas?: number | undefined;
        strategy?: {
            type?: "RollingUpdate" | "Recreate" | undefined;
            rollingUpdate?: {
                maxSurge?: string | number | undefined;
                maxUnavailable?: string | number | undefined;
            } | undefined;
        } | undefined;
        initContainers?: {
            name: string;
            image: string;
            command?: string[] | undefined;
            imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            args?: string[] | undefined;
            ports?: {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }[] | undefined;
            env?: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
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
            volumeMounts?: {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }[] | undefined;
            livenessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            readinessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            startupProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
        }[] | undefined;
        volumes?: {
            name: string;
            type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
            configMap?: {
                name: string;
            } | undefined;
            secret?: {
                secretName: string;
            } | undefined;
            persistentVolumeClaim?: {
                claimName: string;
            } | undefined;
            hostPath?: {
                path: string;
            } | undefined;
        }[] | undefined;
        serviceAccountName?: string | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: {
            value?: string | undefined;
            key?: string | undefined;
            operator?: "Equal" | "Exists" | undefined;
            effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
        }[] | undefined;
        affinity?: any;
    }>>;
    service: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        type: z.ZodDefault<z.ZodEnum<["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"]>>;
        selector: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        ports: z.ZodArray<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            port: z.ZodNumber;
            targetPort: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            protocol: z.ZodDefault<z.ZodOptional<z.ZodEnum<["TCP", "UDP", "SCTP"]>>>;
            nodePort: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            protocol: "TCP" | "UDP" | "SCTP";
            port: number;
            name?: string | undefined;
            targetPort?: string | number | undefined;
            nodePort?: number | undefined;
        }, {
            port: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            targetPort?: string | number | undefined;
            nodePort?: number | undefined;
        }>, "many">;
        sessionAffinity: z.ZodDefault<z.ZodOptional<z.ZodEnum<["None", "ClientIP"]>>>;
        loadBalancerIP: z.ZodOptional<z.ZodString>;
        externalTrafficPolicy: z.ZodOptional<z.ZodEnum<["Cluster", "Local"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
        ports: {
            protocol: "TCP" | "UDP" | "SCTP";
            port: number;
            name?: string | undefined;
            targetPort?: string | number | undefined;
            nodePort?: number | undefined;
        }[];
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        sessionAffinity: "None" | "ClientIP";
        selector?: Record<string, string> | undefined;
        loadBalancerIP?: string | undefined;
        externalTrafficPolicy?: "Cluster" | "Local" | undefined;
    }, {
        ports: {
            port: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            targetPort?: string | number | undefined;
            nodePort?: number | undefined;
        }[];
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        type?: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName" | undefined;
        selector?: Record<string, string> | undefined;
        sessionAffinity?: "None" | "ClientIP" | undefined;
        loadBalancerIP?: string | undefined;
        externalTrafficPolicy?: "Cluster" | "Local" | undefined;
    }>>;
    configMap: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        data: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        binaryData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        data: Record<string, string>;
        binaryData?: Record<string, string> | undefined;
    }, {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        data?: Record<string, string> | undefined;
        binaryData?: Record<string, string> | undefined;
    }>>;
    secret: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        type: z.ZodDefault<z.ZodEnum<["Opaque", "kubernetes.io/service-account-token", "kubernetes.io/dockercfg", "kubernetes.io/dockerconfigjson", "kubernetes.io/basic-auth", "kubernetes.io/ssh-auth", "kubernetes.io/tls"]>>;
        data: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        stringData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: "Opaque" | "kubernetes.io/service-account-token" | "kubernetes.io/dockercfg" | "kubernetes.io/dockerconfigjson" | "kubernetes.io/basic-auth" | "kubernetes.io/ssh-auth" | "kubernetes.io/tls";
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        data: Record<string, string>;
        stringData?: Record<string, string> | undefined;
    }, {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        type?: "Opaque" | "kubernetes.io/service-account-token" | "kubernetes.io/dockercfg" | "kubernetes.io/dockerconfigjson" | "kubernetes.io/basic-auth" | "kubernetes.io/ssh-auth" | "kubernetes.io/tls" | undefined;
        data?: Record<string, string> | undefined;
        stringData?: Record<string, string> | undefined;
    }>>;
    ingress: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        ingressClassName: z.ZodOptional<z.ZodString>;
        rules: z.ZodArray<z.ZodObject<{
            host: z.ZodOptional<z.ZodString>;
            http: z.ZodObject<{
                paths: z.ZodArray<z.ZodObject<{
                    path: z.ZodString;
                    pathType: z.ZodDefault<z.ZodEnum<["Exact", "Prefix", "ImplementationSpecific"]>>;
                    backend: z.ZodObject<{
                        service: z.ZodObject<{
                            name: z.ZodString;
                            port: z.ZodObject<{
                                number: z.ZodOptional<z.ZodNumber>;
                                name: z.ZodOptional<z.ZodString>;
                            }, "strip", z.ZodTypeAny, {
                                number?: number | undefined;
                                name?: string | undefined;
                            }, {
                                number?: number | undefined;
                                name?: string | undefined;
                            }>;
                        }, "strip", z.ZodTypeAny, {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        }, {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    }, {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    }>;
                }, "strip", z.ZodTypeAny, {
                    path: string;
                    pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                }, {
                    path: string;
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                    pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                paths: {
                    path: string;
                    pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                }[];
            }, {
                paths: {
                    path: string;
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                    pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
                }[];
            }>;
        }, "strip", z.ZodTypeAny, {
            http: {
                paths: {
                    path: string;
                    pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                }[];
            };
            host?: string | undefined;
        }, {
            http: {
                paths: {
                    path: string;
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                    pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
                }[];
            };
            host?: string | undefined;
        }>, "many">;
        tls: z.ZodOptional<z.ZodArray<z.ZodObject<{
            hosts: z.ZodArray<z.ZodString, "many">;
            secretName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            secretName: string;
            hosts: string[];
        }, {
            secretName: string;
            hosts: string[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        rules: {
            http: {
                paths: {
                    path: string;
                    pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                }[];
            };
            host?: string | undefined;
        }[];
        ingressClassName?: string | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
    }, {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        rules: {
            http: {
                paths: {
                    path: string;
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                    pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
                }[];
            };
            host?: string | undefined;
        }[];
        ingressClassName?: string | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
    }>>;
    pvc: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        accessModes: z.ZodArray<z.ZodEnum<["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"]>, "many">;
        storageClassName: z.ZodOptional<z.ZodString>;
        resources: z.ZodObject<{
            requests: z.ZodObject<{
                storage: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                storage: string;
            }, {
                storage: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            requests: {
                storage: string;
            };
        }, {
            requests: {
                storage: string;
            };
        }>;
        volumeMode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Filesystem", "Block"]>>>;
    }, "strip", z.ZodTypeAny, {
        resources: {
            requests: {
                storage: string;
            };
        };
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        accessModes: ("ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany")[];
        volumeMode: "Filesystem" | "Block";
        storageClassName?: string | undefined;
    }, {
        resources: {
            requests: {
                storage: string;
            };
        };
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        accessModes: ("ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany")[];
        storageClassName?: string | undefined;
        volumeMode?: "Filesystem" | "Block" | undefined;
    }>>;
    hpa: z.ZodOptional<z.ZodObject<{
        metadata: z.ZodObject<{
            name: z.ZodString;
            namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            labels: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
            annotations: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        }, {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        }>;
        scaleTargetRef: z.ZodObject<{
            apiVersion: z.ZodDefault<z.ZodString>;
            kind: z.ZodDefault<z.ZodString>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            apiVersion: string;
            kind: string;
        }, {
            name: string;
            apiVersion?: string | undefined;
            kind?: string | undefined;
        }>;
        minReplicas: z.ZodDefault<z.ZodNumber>;
        maxReplicas: z.ZodNumber;
        metrics: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["Resource", "Pods", "Object", "External"]>;
            resource: z.ZodOptional<z.ZodObject<{
                name: z.ZodEnum<["cpu", "memory"]>;
                target: z.ZodObject<{
                    type: z.ZodEnum<["Utilization", "AverageValue"]>;
                    averageUtilization: z.ZodOptional<z.ZodNumber>;
                    averageValue: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                }, {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            }, {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "Resource" | "Pods" | "Object" | "External";
            resource?: {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            } | undefined;
        }, {
            type: "Resource" | "Pods" | "Object" | "External";
            resource?: {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            } | undefined;
        }>, "many">>;
        targetCPUUtilizationPercentage: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        scaleTargetRef: {
            name: string;
            apiVersion: string;
            kind: string;
        };
        minReplicas: number;
        maxReplicas: number;
        metrics?: {
            type: "Resource" | "Pods" | "Object" | "External";
            resource?: {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            } | undefined;
        }[] | undefined;
        targetCPUUtilizationPercentage?: number | undefined;
    }, {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        scaleTargetRef: {
            name: string;
            apiVersion?: string | undefined;
            kind?: string | undefined;
        };
        maxReplicas: number;
        minReplicas?: number | undefined;
        metrics?: {
            type: "Resource" | "Pods" | "Object" | "External";
            resource?: {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            } | undefined;
        }[] | undefined;
        targetCPUUtilizationPercentage?: number | undefined;
    }>>;
    includeNamespace: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    resourceType: "Deployment" | "Service" | "ConfigMap" | "Secret" | "Ingress" | "PersistentVolumeClaim" | "HorizontalPodAutoscaler";
    includeNamespace: boolean;
    configMap?: {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        data: Record<string, string>;
        binaryData?: Record<string, string> | undefined;
    } | undefined;
    secret?: {
        type: "Opaque" | "kubernetes.io/service-account-token" | "kubernetes.io/dockercfg" | "kubernetes.io/dockerconfigjson" | "kubernetes.io/basic-auth" | "kubernetes.io/ssh-auth" | "kubernetes.io/tls";
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        data: Record<string, string>;
        stringData?: Record<string, string> | undefined;
    } | undefined;
    service?: {
        type: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
        ports: {
            protocol: "TCP" | "UDP" | "SCTP";
            port: number;
            name?: string | undefined;
            targetPort?: string | number | undefined;
            nodePort?: number | undefined;
        }[];
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        sessionAffinity: "None" | "ClientIP";
        selector?: Record<string, string> | undefined;
        loadBalancerIP?: string | undefined;
        externalTrafficPolicy?: "Cluster" | "Local" | undefined;
    } | undefined;
    deployment?: {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        replicas: number;
        containers: {
            name: string;
            image: string;
            imagePullPolicy: "Always" | "IfNotPresent" | "Never";
            ports: {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }[];
            env: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }[];
            volumeMounts: {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }[];
            command?: string[] | undefined;
            args?: string[] | undefined;
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
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            readinessProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            startupProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
        }[];
        initContainers: {
            name: string;
            image: string;
            imagePullPolicy: "Always" | "IfNotPresent" | "Never";
            ports: {
                containerPort: number;
                protocol: "TCP" | "UDP" | "SCTP";
                name?: string | undefined;
            }[];
            env: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
            }[];
            volumeMounts: {
                name: string;
                mountPath: string;
                readOnly: boolean;
                subPath?: string | undefined;
            }[];
            command?: string[] | undefined;
            args?: string[] | undefined;
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
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            readinessProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
            startupProbe?: {
                initialDelaySeconds: number;
                periodSeconds: number;
                timeoutSeconds: number;
                successThreshold: number;
                failureThreshold: number;
                httpGet?: {
                    path: string;
                    port: number;
                    scheme: "HTTP" | "HTTPS";
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
            } | undefined;
        }[];
        volumes: {
            name: string;
            type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
            configMap?: {
                name: string;
            } | undefined;
            secret?: {
                secretName: string;
            } | undefined;
            persistentVolumeClaim?: {
                claimName: string;
            } | undefined;
            hostPath?: {
                path: string;
            } | undefined;
        }[];
        strategy?: {
            type: "RollingUpdate" | "Recreate";
            rollingUpdate?: {
                maxSurge: string | number;
                maxUnavailable: string | number;
            } | undefined;
        } | undefined;
        serviceAccountName?: string | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: {
            value?: string | undefined;
            key?: string | undefined;
            operator?: "Equal" | "Exists" | undefined;
            effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
        }[] | undefined;
        affinity?: any;
    } | undefined;
    ingress?: {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        rules: {
            http: {
                paths: {
                    path: string;
                    pathType: "Exact" | "Prefix" | "ImplementationSpecific";
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                }[];
            };
            host?: string | undefined;
        }[];
        ingressClassName?: string | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
    } | undefined;
    pvc?: {
        resources: {
            requests: {
                storage: string;
            };
        };
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        accessModes: ("ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany")[];
        volumeMode: "Filesystem" | "Block";
        storageClassName?: string | undefined;
    } | undefined;
    hpa?: {
        metadata: {
            name: string;
            namespace: string;
            labels: Record<string, string>;
            annotations: Record<string, string>;
        };
        scaleTargetRef: {
            name: string;
            apiVersion: string;
            kind: string;
        };
        minReplicas: number;
        maxReplicas: number;
        metrics?: {
            type: "Resource" | "Pods" | "Object" | "External";
            resource?: {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            } | undefined;
        }[] | undefined;
        targetCPUUtilizationPercentage?: number | undefined;
    } | undefined;
}, {
    resourceType: "Deployment" | "Service" | "ConfigMap" | "Secret" | "Ingress" | "PersistentVolumeClaim" | "HorizontalPodAutoscaler";
    configMap?: {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        data?: Record<string, string> | undefined;
        binaryData?: Record<string, string> | undefined;
    } | undefined;
    secret?: {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        type?: "Opaque" | "kubernetes.io/service-account-token" | "kubernetes.io/dockercfg" | "kubernetes.io/dockerconfigjson" | "kubernetes.io/basic-auth" | "kubernetes.io/ssh-auth" | "kubernetes.io/tls" | undefined;
        data?: Record<string, string> | undefined;
        stringData?: Record<string, string> | undefined;
    } | undefined;
    service?: {
        ports: {
            port: number;
            name?: string | undefined;
            protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            targetPort?: string | number | undefined;
            nodePort?: number | undefined;
        }[];
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        type?: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName" | undefined;
        selector?: Record<string, string> | undefined;
        sessionAffinity?: "None" | "ClientIP" | undefined;
        loadBalancerIP?: string | undefined;
        externalTrafficPolicy?: "Cluster" | "Local" | undefined;
    } | undefined;
    deployment?: {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        containers: {
            name: string;
            image: string;
            command?: string[] | undefined;
            imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            args?: string[] | undefined;
            ports?: {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }[] | undefined;
            env?: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
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
            volumeMounts?: {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }[] | undefined;
            livenessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            readinessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            startupProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
        }[];
        replicas?: number | undefined;
        strategy?: {
            type?: "RollingUpdate" | "Recreate" | undefined;
            rollingUpdate?: {
                maxSurge?: string | number | undefined;
                maxUnavailable?: string | number | undefined;
            } | undefined;
        } | undefined;
        initContainers?: {
            name: string;
            image: string;
            command?: string[] | undefined;
            imagePullPolicy?: "Always" | "IfNotPresent" | "Never" | undefined;
            args?: string[] | undefined;
            ports?: {
                containerPort: number;
                name?: string | undefined;
                protocol?: "TCP" | "UDP" | "SCTP" | undefined;
            }[] | undefined;
            env?: {
                name: string;
                value?: string | undefined;
                valueFrom?: {
                    configMapKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                    secretKeyRef?: {
                        name: string;
                        key: string;
                    } | undefined;
                } | undefined;
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
            volumeMounts?: {
                name: string;
                mountPath: string;
                readOnly?: boolean | undefined;
                subPath?: string | undefined;
            }[] | undefined;
            livenessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            readinessProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
            startupProbe?: {
                httpGet?: {
                    path: string;
                    port: number;
                    scheme?: "HTTP" | "HTTPS" | undefined;
                } | undefined;
                exec?: {
                    command: string[];
                } | undefined;
                tcpSocket?: {
                    port: number;
                } | undefined;
                initialDelaySeconds?: number | undefined;
                periodSeconds?: number | undefined;
                timeoutSeconds?: number | undefined;
                successThreshold?: number | undefined;
                failureThreshold?: number | undefined;
            } | undefined;
        }[] | undefined;
        volumes?: {
            name: string;
            type: "emptyDir" | "configMap" | "secret" | "persistentVolumeClaim" | "hostPath";
            configMap?: {
                name: string;
            } | undefined;
            secret?: {
                secretName: string;
            } | undefined;
            persistentVolumeClaim?: {
                claimName: string;
            } | undefined;
            hostPath?: {
                path: string;
            } | undefined;
        }[] | undefined;
        serviceAccountName?: string | undefined;
        nodeSelector?: Record<string, string> | undefined;
        tolerations?: {
            value?: string | undefined;
            key?: string | undefined;
            operator?: "Equal" | "Exists" | undefined;
            effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute" | undefined;
        }[] | undefined;
        affinity?: any;
    } | undefined;
    ingress?: {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        rules: {
            http: {
                paths: {
                    path: string;
                    backend: {
                        service: {
                            name: string;
                            port: {
                                number?: number | undefined;
                                name?: string | undefined;
                            };
                        };
                    };
                    pathType?: "Exact" | "Prefix" | "ImplementationSpecific" | undefined;
                }[];
            };
            host?: string | undefined;
        }[];
        ingressClassName?: string | undefined;
        tls?: {
            secretName: string;
            hosts: string[];
        }[] | undefined;
    } | undefined;
    pvc?: {
        resources: {
            requests: {
                storage: string;
            };
        };
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        accessModes: ("ReadWriteOnce" | "ReadOnlyMany" | "ReadWriteMany")[];
        storageClassName?: string | undefined;
        volumeMode?: "Filesystem" | "Block" | undefined;
    } | undefined;
    hpa?: {
        metadata: {
            name: string;
            namespace?: string | undefined;
            labels?: Record<string, string> | undefined;
            annotations?: Record<string, string> | undefined;
        };
        scaleTargetRef: {
            name: string;
            apiVersion?: string | undefined;
            kind?: string | undefined;
        };
        maxReplicas: number;
        minReplicas?: number | undefined;
        metrics?: {
            type: "Resource" | "Pods" | "Object" | "External";
            resource?: {
                name: "cpu" | "memory";
                target: {
                    type: "Utilization" | "AverageValue";
                    averageUtilization?: number | undefined;
                    averageValue?: string | undefined;
                };
            } | undefined;
        }[] | undefined;
        targetCPUUtilizationPercentage?: number | undefined;
    } | undefined;
    includeNamespace?: boolean | undefined;
}>;
export type ManifestInput = z.infer<typeof manifestSchema>;
export type DeploymentInput = z.infer<typeof deploymentSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ConfigMapInput = z.infer<typeof configMapSchema>;
export type SecretInput = z.infer<typeof secretSchema>;
export type IngressInput = z.infer<typeof ingressSchema>;
export type PVCInput = z.infer<typeof pvcSchema>;
export type HPAInput = z.infer<typeof hpaSchema>;
//# sourceMappingURL=k8sSchemas.d.ts.map