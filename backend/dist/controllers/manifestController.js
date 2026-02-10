"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = exports.validateManifest = exports.generateManifest = void 0;
const manifestGenerator_1 = require("../services/manifestGenerator");
const errorHandler_1 = require("../middleware/errorHandler");
const generateManifest = async (req, res, next) => {
    try {
        const input = req.body;
        const generator = new manifestGenerator_1.ManifestGenerator(input);
        const manifest = generator.generate();
        res.json({
            success: true,
            manifest,
            metadata: {
                resourceType: input.resourceType,
                timestamp: new Date().toISOString(),
            },
        });
    }
    catch (error) {
        next(error instanceof Error ? error : new errorHandler_1.AppError('Failed to generate manifest', 500));
    }
};
exports.generateManifest = generateManifest;
const validateManifest = async (req, res, next) => {
    try {
        const input = req.body;
        const generator = new manifestGenerator_1.ManifestGenerator(input);
        const warnings = generator.getWarnings();
        const suggestions = generator.getSuggestions();
        res.json({
            success: true,
            valid: true,
            warnings,
            suggestions,
        });
    }
    catch (error) {
        next(error instanceof Error ? error : new errorHandler_1.AppError('Validation failed', 400));
    }
};
exports.validateManifest = validateManifest;
const getTemplates = async (req, res, next) => {
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
    }
    catch (error) {
        next(error instanceof Error ? error : new errorHandler_1.AppError('Failed to get templates', 500));
    }
};
exports.getTemplates = getTemplates;
//# sourceMappingURL=manifestController.js.map