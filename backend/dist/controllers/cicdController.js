"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCICDTemplates = exports.validateCICDPipeline = exports.generateCICDPipeline = void 0;
const cicdGenerator_1 = require("../services/cicdGenerator");
const generateCICDPipeline = async (req, res, next) => {
    try {
        const input = req.body;
        const generator = new cicdGenerator_1.CICDPipelineGenerator(input);
        const result = generator.generate();
        res.json({
            success: true,
            files: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateCICDPipeline = generateCICDPipeline;
const validateCICDPipeline = async (req, res, next) => {
    try {
        const input = req.body;
        const generator = new cicdGenerator_1.CICDPipelineGenerator(input);
        const validation = generator.validate();
        res.json({
            success: true,
            validation,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.validateCICDPipeline = validateCICDPipeline;
const getCICDTemplates = async (req, res, next) => {
    try {
        const templates = {
            'basic-nodejs': {
                platform: 'github-actions',
                projectName: 'my-nodejs-app',
                language: 'nodejs',
                triggers: {
                    branches: ['main', 'develop'],
                    pullRequest: true,
                },
                build: {
                    dockerfile: 'Dockerfile',
                    context: '.',
                    useCache: true,
                },
                test: {
                    enabled: true,
                    unitTests: {
                        enabled: true,
                        command: 'npm test',
                    },
                },
                security: {
                    enabled: true,
                    trivy: {
                        enabled: true,
                        severity: ['HIGH', 'CRITICAL'],
                    },
                },
                registry: {
                    type: 'dockerhub',
                    repository: 'myusername/my-nodejs-app',
                    tagStrategy: 'commit-sha',
                },
                deployment: {
                    enabled: true,
                    strategy: 'kubectl',
                    namespace: 'production',
                    manifests: ['k8s/deployment.yaml', 'k8s/service.yaml'],
                },
            },
            'production-microservice': {
                platform: 'gitlab-ci',
                projectName: 'payment-service',
                language: 'go',
                triggers: {
                    branches: ['main', 'develop', 'staging'],
                    pullRequest: true,
                },
                build: {
                    dockerfile: 'Dockerfile',
                    context: '.',
                    useCache: true,
                    platforms: ['linux/amd64', 'linux/arm64'],
                },
                test: {
                    enabled: true,
                    unitTests: {
                        enabled: true,
                        command: 'go test ./...',
                    },
                    integrationTests: {
                        enabled: true,
                        command: 'go test -tags=integration ./...',
                    },
                    coverage: {
                        enabled: true,
                        threshold: 80,
                    },
                },
                security: {
                    enabled: true,
                    trivy: {
                        enabled: true,
                        severity: ['MEDIUM', 'HIGH', 'CRITICAL'],
                        exitOnError: true,
                    },
                    snyk: {
                        enabled: true,
                    },
                },
                registry: {
                    type: 'gcr',
                    repository: 'gcr.io/my-project/payment-service',
                    tagStrategy: 'semantic',
                    additionalTags: ['latest'],
                },
                deployment: {
                    enabled: true,
                    strategy: 'helm',
                    namespace: 'production',
                    helmChart: {
                        name: 'payment-service',
                        path: './helm/payment-service',
                        valuesFile: 'values-prod.yaml',
                    },
                    gitops: {
                        enabled: true,
                        tool: 'argocd',
                        application: 'payment-service-prod',
                    },
                },
                environments: [
                    {
                        name: 'development',
                        branch: 'develop',
                        namespace: 'dev',
                    },
                    {
                        name: 'staging',
                        branch: 'staging',
                        namespace: 'staging',
                    },
                    {
                        name: 'production',
                        branch: 'main',
                        namespace: 'production',
                        requireApproval: true,
                    },
                ],
                notifications: {
                    slack: {
                        enabled: true,
                        channel: '#deployments',
                    },
                },
            },
            'jenkins-java': {
                platform: 'jenkins',
                projectName: 'spring-boot-api',
                language: 'java',
                triggers: {
                    branches: ['main', 'develop'],
                },
                build: {
                    dockerfile: 'Dockerfile',
                    context: '.',
                    useCache: true,
                },
                test: {
                    enabled: true,
                    unitTests: {
                        enabled: true,
                        command: 'mvn test',
                    },
                    coverage: {
                        enabled: true,
                        threshold: 75,
                    },
                },
                security: {
                    enabled: true,
                    trivy: {
                        enabled: true,
                        severity: ['HIGH', 'CRITICAL'],
                    },
                    sonarqube: {
                        enabled: true,
                        projectKey: 'spring-boot-api',
                    },
                },
                registry: {
                    type: 'acr',
                    repository: 'myregistry.azurecr.io/spring-boot-api',
                    tagStrategy: 'commit-sha',
                },
                deployment: {
                    enabled: true,
                    strategy: 'kubectl',
                    namespace: 'production',
                    manifests: ['k8s/'],
                },
            },
        };
        res.json({
            success: true,
            templates,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCICDTemplates = getCICDTemplates;
//# sourceMappingURL=cicdController.js.map