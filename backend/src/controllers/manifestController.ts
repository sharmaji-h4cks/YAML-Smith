import { Request, Response, NextFunction } from 'express';
import { ManifestInput } from '../schemas/k8sSchemas';
import { ManifestGenerator } from '../services/manifestGenerator';
import { AppError } from '../middleware/errorHandler';

export const generateManifest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input: ManifestInput = req.body;
    const generator = new ManifestGenerator(input);
    const manifest = generator.generate();

    res.json({
      success: true,
      manifest,
      metadata: {
        resourceType: input.resourceType,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Failed to generate manifest', 500));
  }
};

export const validateManifest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input: ManifestInput = req.body;
    const generator = new ManifestGenerator(input);
    const warnings = generator.getWarnings();
    const suggestions = generator.getSuggestions();
    const dependencies = generator.getDependencies();
    const relatedResources = generator.getRelatedResources();
    const deploymentCommands = generator.getDeploymentCommands();
    const deploymentOrder = generator.getDeploymentOrder();

    res.json({
      success: true,
      valid: true,
      warnings,
      suggestions,
      dependencies,
      relatedResources,
      deploymentCommands,
      deploymentOrder,
    });
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Validation failed', 400));
  }
};

export const getTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const templates = {
      deployment: {
        name: 'Basic Deployment',
        description: 'A simple deployment with one container',
        template: {
          resourceType: 'Deployment',
          deployment: {
            metadata: {
              name: 'myapp',
              namespace: 'default',
              labels: { app: 'myapp' },
            },
            replicas: 3,
            containers: [
              {
                name: 'myapp',
                image: 'nginx:1.21',
                ports: [{ containerPort: 80 }],
              },
            ],
          },
        },
      },
      service: {
        name: 'ClusterIP Service',
        description: 'Internal service for pod communication',
        template: {
          resourceType: 'Service',
          service: {
            metadata: {
              name: 'myapp-service',
              namespace: 'default',
            },
            type: 'ClusterIP',
            selector: { app: 'myapp' },
            ports: [{ port: 80, targetPort: 80 }],
          },
        },
      },
    };

    res.json({
      success: true,
      templates,
    });
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Failed to get templates', 500));
  }
};
