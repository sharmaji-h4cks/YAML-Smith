import { Request, Response, NextFunction } from 'express';
import { HelmChartGenerator } from '../services/helmChartGenerator';
import { HelmChartInput } from '../schemas/helmChartSchemas';

export const generateHelmChart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input: HelmChartInput = req.body;
    const generator = new HelmChartGenerator(input);
    const result = generator.generate();

    res.json({
      success: true,
      files: result,
    });
  } catch (error) {
    next(error);
  }
};

export const validateHelmChart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input: HelmChartInput = req.body;
    const generator = new HelmChartGenerator(input);
    const validation = generator.validate();

    res.json({
      success: true,
      validation,
    });
  } catch (error) {
    next(error);
  }
};

export const getHelmChartTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const templates = {
      basic: {
        metadata: {
          name: 'my-app',
          version: '0.1.0',
          description: 'A basic Helm chart for my application',
          apiVersion: 'v2',
          appVersion: '1.0.0',
          type: 'application',
          keywords: ['app', 'web'],
          maintainers: [
            {
              name: 'Your Name',
              email: 'your-email@example.com',
            },
          ],
        },
        values: {
          image: {
            repository: 'nginx',
            pullPolicy: 'IfNotPresent',
            tag: '1.21',
          },
          replicaCount: 1,
          service: {
            type: 'ClusterIP',
            port: 80,
            targetPort: 8080,
          },
          ingress: {
            enabled: false,
          },
          resources: {
            limits: {
              cpu: '100m',
              memory: '128Mi',
            },
            requests: {
              cpu: '100m',
              memory: '128Mi',
            },
          },
          autoscaling: {
            enabled: false,
          },
          serviceAccount: {
            create: true,
          },
          securityContext: {
            runAsNonRoot: true,
            runAsUser: 1000,
            fsGroup: 1000,
          },
        },
        options: {
          includeHelpers: true,
          includeTests: true,
          includeNotes: true,
          includeHooks: false,
          generateEnvironmentValues: false,
        },
        templateStyle: 'standard',
      },
      production: {
        metadata: {
          name: 'my-app',
          version: '1.0.0',
          description: 'Production-grade Helm chart',
          apiVersion: 'v2',
          appVersion: '1.0.0',
          type: 'application',
          keywords: ['production', 'app', 'kubernetes'],
          maintainers: [
            {
              name: 'DevOps Team',
              email: 'devops@example.com',
            },
          ],
        },
        values: {
          image: {
            repository: 'myregistry/myapp',
            pullPolicy: 'IfNotPresent',
            tag: '',
          },
          replicaCount: 3,
          service: {
            type: 'ClusterIP',
            port: 80,
            targetPort: 8080,
          },
          ingress: {
            enabled: true,
            className: 'nginx',
            annotations: {
              'cert-manager.io/cluster-issuer': 'letsencrypt-prod',
            },
            hosts: [
              {
                host: 'myapp.example.com',
                paths: [
                  {
                    path: '/',
                    pathType: 'Prefix',
                  },
                ],
              },
            ],
            tls: [
              {
                secretName: 'myapp-tls',
                hosts: ['myapp.example.com'],
              },
            ],
          },
          resources: {
            limits: {
              cpu: '500m',
              memory: '512Mi',
            },
            requests: {
              cpu: '250m',
              memory: '256Mi',
            },
          },
          autoscaling: {
            enabled: true,
            minReplicas: 3,
            maxReplicas: 10,
            targetCPUUtilizationPercentage: 80,
          },
          serviceAccount: {
            create: true,
          },
          securityContext: {
            runAsNonRoot: true,
            runAsUser: 1000,
            fsGroup: 1000,
          },
          livenessProbe: {
            enabled: true,
            httpGet: {
              path: '/health',
            },
            initialDelaySeconds: 30,
            periodSeconds: 10,
          },
          readinessProbe: {
            enabled: true,
            httpGet: {
              path: '/ready',
            },
            initialDelaySeconds: 5,
            periodSeconds: 5,
          },
        },
        environments: [
          {
            name: 'dev',
            namespace: 'development',
            replicas: 1,
            imageTag: 'dev',
            ingress: {
              enabled: true,
              host: 'myapp-dev.example.com',
            },
          },
          {
            name: 'staging',
            namespace: 'staging',
            replicas: 2,
            imageTag: 'staging',
            ingress: {
              enabled: true,
              host: 'myapp-staging.example.com',
            },
          },
          {
            name: 'prod',
            namespace: 'production',
            replicas: 3,
            imageTag: 'latest',
            ingress: {
              enabled: true,
              host: 'myapp.example.com',
              tls: true,
            },
          },
        ],
        options: {
          includeHelpers: true,
          includeTests: true,
          includeNotes: true,
          includeHooks: false,
          generateEnvironmentValues: true,
          includeServiceMonitor: true,
          includePodDisruptionBudget: true,
          includeNetworkPolicy: false,
        },
        templateStyle: 'comprehensive',
      },
      microservice: {
        metadata: {
          name: 'my-microservice',
          version: '0.1.0',
          description: 'A microservice Helm chart',
          apiVersion: 'v2',
          appVersion: '1.0.0',
          type: 'application',
          keywords: ['microservice', 'api'],
        },
        values: {
          image: {
            repository: 'myregistry/my-microservice',
            pullPolicy: 'IfNotPresent',
            tag: '',
          },
          replicaCount: 2,
          service: {
            type: 'ClusterIP',
            port: 80,
            targetPort: 3000,
          },
          ingress: {
            enabled: false,
          },
          resources: {
            limits: {
              cpu: '200m',
              memory: '256Mi',
            },
            requests: {
              cpu: '100m',
              memory: '128Mi',
            },
          },
          autoscaling: {
            enabled: true,
            minReplicas: 2,
            maxReplicas: 5,
            targetCPUUtilizationPercentage: 70,
          },
          env: [
            {
              name: 'NODE_ENV',
              value: 'production',
            },
            {
              name: 'PORT',
              value: '3000',
            },
          ],
          serviceAccount: {
            create: true,
          },
          securityContext: {
            runAsNonRoot: true,
            runAsUser: 1000,
            fsGroup: 1000,
          },
        },
        options: {
          includeHelpers: true,
          includeTests: true,
          includeNotes: true,
          includeServiceMonitor: true,
        },
        templateStyle: 'standard',
      },
    };

    res.json({
      success: true,
      templates,
    });
  } catch (error) {
    next(error);
  }
};
