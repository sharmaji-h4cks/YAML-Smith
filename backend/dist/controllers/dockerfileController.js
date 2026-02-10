"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDockerfileTemplates = exports.validateDockerfile = exports.generateDockerfile = void 0;
const dockerfileGenerator_1 = require("../services/dockerfileGenerator");
const generateDockerfile = async (req, res, next) => {
    try {
        const input = req.body;
        const generator = new dockerfileGenerator_1.DockerfileGenerator(input);
        const result = generator.generate();
        res.json({
            success: true,
            dockerfile: result.dockerfile,
            dockerignore: result.dockerignore,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateDockerfile = generateDockerfile;
const validateDockerfile = async (req, res, next) => {
    try {
        const input = req.body;
        const generator = new dockerfileGenerator_1.DockerfileGenerator(input);
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
exports.validateDockerfile = validateDockerfile;
const getDockerfileTemplates = async (req, res, next) => {
    try {
        const templates = {
            nodejs: {
                language: 'nodejs',
                projectName: 'my-node-app',
                baseImageType: 'alpine',
                multiStage: { enabled: true, useDistrolessRuntime: false },
                port: 3000,
                workdir: '/app',
                startCommand: '["npm", "run", "start"]',
                nodejsConfig: {
                    version: '20',
                    packageManager: 'npm',
                    startScript: 'start',
                    useNodeModulesCache: true,
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    command: 'node -e "require(\'http\').get(\'http://localhost:3000/health\', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"',
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
            },
            python: {
                language: 'python',
                projectName: 'my-python-app',
                baseImageType: 'alpine',
                multiStage: { enabled: true, useDistrolessRuntime: false },
                port: 8000,
                workdir: '/app',
                startCommand: '["python", "main.py"]',
                pythonConfig: {
                    version: '3.11',
                    packageManager: 'pip',
                    requirementsFile: 'requirements.txt',
                    useVirtualEnv: false,
                    pipUpgrade: true,
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
            },
            go: {
                language: 'go',
                projectName: 'my-go-app',
                baseImageType: 'alpine',
                multiStage: { enabled: true, useDistrolessRuntime: true },
                port: 8080,
                workdir: '/app',
                startCommand: '["./main"]',
                goConfig: {
                    version: '1.21',
                    useModules: true,
                    cgoEnabled: false,
                    buildFlags: ['-trimpath'],
                    ldflags: '-s -w',
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
            },
            java: {
                language: 'java',
                projectName: 'my-java-app',
                baseImageType: 'debian',
                multiStage: { enabled: true, useDistrolessRuntime: false },
                port: 8080,
                workdir: '/app',
                startCommand: '["java", "-jar", "app.jar"]',
                javaConfig: {
                    version: '17',
                    buildTool: 'maven',
                    baseImage: 'eclipse-temurin',
                    jarName: 'app.jar',
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
            },
            rust: {
                language: 'rust',
                projectName: 'my-rust-app',
                baseImageType: 'alpine',
                multiStage: { enabled: true, useDistrolessRuntime: true },
                port: 8080,
                workdir: '/app',
                startCommand: '["./app"]',
                rustConfig: {
                    version: '1.75',
                    useMusl: false,
                    buildProfile: 'release',
                    features: [],
                },
                security: {
                    nonRootUser: false,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: false,
                },
                generateDockerignore: true,
            },
            dotnet: {
                language: 'dotnet',
                projectName: 'my-dotnet-app',
                baseImageType: 'debian',
                multiStage: { enabled: true, useDistrolessRuntime: false },
                port: 8080,
                workdir: '/app',
                startCommand: '["dotnet", "my-dotnet-app.dll"]',
                dotnetConfig: {
                    version: '8.0',
                    configuration: 'Release',
                    runtime: 'linux-x64',
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
            },
            php: {
                language: 'php',
                projectName: 'my-php-app',
                baseImageType: 'alpine',
                multiStage: { enabled: false },
                port: 9000,
                workdir: '/var/www/html',
                startCommand: '["php-fpm"]',
                phpConfig: {
                    version: '8.2',
                    extensions: ['pdo', 'pdo_mysql', 'mysqli', 'mbstring'],
                    composer: true,
                    webServer: 'fpm',
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
            },
            ruby: {
                language: 'ruby',
                projectName: 'my-ruby-app',
                baseImageType: 'alpine',
                multiStage: { enabled: false },
                port: 3000,
                workdir: '/app',
                startCommand: '["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]',
                rubyConfig: {
                    version: '3.2',
                    railsEnv: 'production',
                },
                security: {
                    nonRootUser: true,
                    username: 'appuser',
                    uid: 1000,
                    gid: 1000,
                },
                healthCheck: {
                    enabled: true,
                    interval: '30s',
                    timeout: '3s',
                    startPeriod: '5s',
                    retries: 3,
                },
                generateDockerignore: true,
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
exports.getDockerfileTemplates = getDockerfileTemplates;
//# sourceMappingURL=dockerfileController.js.map