"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CICDPipelineGenerator = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
class CICDPipelineGenerator {
    input;
    constructor(input) {
        this.input = input;
    }
    generate() {
        const output = {};
        switch (this.input.platform) {
            case 'github-actions':
                output['.github/workflows/ci-cd.yml'] = this.generateGitHubActions();
                break;
            case 'gitlab-ci':
                output['.gitlab-ci.yml'] = this.generateGitLabCI();
                break;
            case 'jenkins':
                output['Jenkinsfile'] = this.generateJenkinsfile();
                break;
            case 'circleci':
                output['.circleci/config.yml'] = this.generateCircleCI();
                break;
            case 'azure-devops':
                output['azure-pipelines.yml'] = this.generateAzureDevOps();
                break;
            default:
                throw new Error(`Unsupported platform: ${this.input.platform}`);
        }
        // Add README with instructions
        output['README-CICD.md'] = this.generateReadme();
        return output;
    }
    generateGitHubActions() {
        const workflow = {
            name: `${this.input.projectName} CI/CD`,
            on: this.getGitHubTriggers(),
            env: this.getEnvironmentVariables(),
            jobs: {},
        };
        // Build job
        workflow.jobs.build = {
            'runs-on': 'ubuntu-latest',
            steps: [
                {
                    name: 'Checkout code',
                    uses: 'actions/checkout@v4',
                },
                this.getLanguageSetup('github-actions'),
                ...(this.input.test?.enabled ? [this.getTestSteps('github-actions')] : []),
                {
                    name: 'Set up Docker Buildx',
                    uses: 'docker/setup-buildx-action@v3',
                },
                {
                    name: 'Log in to Container Registry',
                    uses: 'docker/login-action@v3',
                    with: this.getRegistryLogin('github-actions'),
                },
                {
                    name: 'Build and push Docker image',
                    uses: 'docker/build-push-action@v5',
                    with: {
                        context: this.input.build?.context || '.',
                        file: this.input.build?.dockerfile || 'Dockerfile',
                        push: true,
                        tags: this.getImageTags('${{ github.sha }}'),
                        'cache-from': 'type=gha',
                        'cache-to': 'type=gha,mode=max',
                    },
                },
            ],
        };
        // Security scan job
        if (this.input.security?.enabled) {
            workflow.jobs.security = {
                'runs-on': 'ubuntu-latest',
                needs: ['build'],
                steps: [
                    {
                        name: 'Checkout code',
                        uses: 'actions/checkout@v4',
                    },
                    ...(this.input.security.trivy?.enabled ? [
                        {
                            name: 'Run Trivy vulnerability scanner',
                            uses: 'aquasecurity/trivy-action@master',
                            with: {
                                'image-ref': this.getImageTags('${{ github.sha }}')[0],
                                format: 'sarif',
                                output: 'trivy-results.sarif',
                                severity: this.input.security.trivy.severity?.join(','),
                            },
                        },
                        {
                            name: 'Upload Trivy results to GitHub Security',
                            uses: 'github/codeql-action/upload-sarif@v3',
                            with: {
                                'sarif_file': 'trivy-results.sarif',
                            },
                        },
                    ] : []),
                ],
            };
        }
        // Deploy job
        if (this.input.deployment?.enabled) {
            workflow.jobs.deploy = {
                'runs-on': 'ubuntu-latest',
                needs: ['build', ...(this.input.security?.enabled ? ['security'] : [])],
                if: "github.ref == 'refs/heads/main'",
                steps: [
                    {
                        name: 'Checkout code',
                        uses: 'actions/checkout@v4',
                    },
                    this.getDeploymentSteps('github-actions'),
                ],
            };
        }
        return js_yaml_1.default.dump(workflow, { lineWidth: 120, quotingType: '"' });
    }
    generateGitLabCI() {
        const pipeline = {
            stages: ['build', 'test', 'security', 'deploy'],
            variables: this.getEnvironmentVariables(),
        };
        // Build stage
        pipeline.build = {
            stage: 'build',
            image: 'docker:24-cli',
            services: ['docker:24-dind'],
            before_script: [
                'docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY',
            ],
            script: [
                `docker build -t ${this.getImageTags('$CI_COMMIT_SHA')[0]} -f ${this.input.build?.dockerfile || 'Dockerfile'} ${this.input.build?.context || '.'}`,
                `docker push ${this.getImageTags('$CI_COMMIT_SHA')[0]}`,
            ],
            only: this.input.triggers?.branches || ['main', 'develop'],
        };
        // Test stage
        if (this.input.test?.enabled) {
            pipeline.test = {
                stage: 'test',
                image: this.getLanguageImage(),
                script: this.getTestCommands(),
                coverage: '/Coverage: \\d+\\.\\d+/',
                only: this.input.triggers?.branches || ['main', 'develop'],
            };
        }
        // Security scan stage
        if (this.input.security?.enabled && this.input.security.trivy?.enabled) {
            pipeline.trivy = {
                stage: 'security',
                image: 'aquasec/trivy:latest',
                script: [
                    `trivy image --severity ${this.input.security.trivy.severity?.join(',')} ${this.getImageTags('$CI_COMMIT_SHA')[0]}`,
                ],
                allow_failure: !this.input.security.trivy.exitOnError,
                only: this.input.triggers?.branches || ['main', 'develop'],
            };
        }
        // Deploy stage
        if (this.input.deployment?.enabled) {
            pipeline.deploy = {
                stage: 'deploy',
                image: 'bitnami/kubectl:latest',
                script: this.getDeploymentCommands(),
                only: ['main'],
                when: 'manual',
            };
        }
        return js_yaml_1.default.dump(pipeline, { lineWidth: 120, quotingType: '"' });
    }
    generateJenkinsfile() {
        const lines = [];
        lines.push("pipeline {");
        lines.push("    agent any");
        lines.push("");
        lines.push("    environment {");
        const envVars = this.getEnvironmentVariables();
        Object.entries(envVars).forEach(([key, value]) => {
            lines.push(`        ${key} = '${value}'`);
        });
        lines.push("    }");
        lines.push("");
        lines.push("    stages {");
        // Build stage
        lines.push("        stage('Build') {");
        lines.push("            steps {");
        lines.push("                script {");
        lines.push(`                    docker.build("${this.input.registry.repository}:\${env.BUILD_ID}", "-f ${this.input.build?.dockerfile || 'Dockerfile'} ${this.input.build?.context || '.'}")`);
        lines.push("                }");
        lines.push("            }");
        lines.push("        }");
        // Test stage
        if (this.input.test?.enabled) {
            lines.push("");
            lines.push("        stage('Test') {");
            lines.push("            steps {");
            this.getTestCommands().forEach(cmd => {
                lines.push(`                sh '${cmd}'`);
            });
            lines.push("            }");
            lines.push("        }");
        }
        // Security scan
        if (this.input.security?.enabled && this.input.security.trivy?.enabled) {
            lines.push("");
            lines.push("        stage('Security Scan') {");
            lines.push("            steps {");
            lines.push("                script {");
            lines.push(`                    sh 'trivy image --severity ${this.input.security.trivy.severity?.join(',')} ${this.input.registry.repository}:\${env.BUILD_ID}'`);
            lines.push("                }");
            lines.push("            }");
            lines.push("        }");
        }
        // Push stage
        lines.push("");
        lines.push("        stage('Push') {");
        lines.push("            steps {");
        lines.push("                script {");
        lines.push("                    docker.withRegistry('', 'docker-credentials') {");
        lines.push(`                        docker.image("${this.input.registry.repository}:\${env.BUILD_ID}").push()`);
        lines.push(`                        docker.image("${this.input.registry.repository}:\${env.BUILD_ID}").push('latest')`);
        lines.push("                    }");
        lines.push("                }");
        lines.push("            }");
        lines.push("        }");
        // Deploy stage
        if (this.input.deployment?.enabled) {
            lines.push("");
            lines.push("        stage('Deploy') {");
            lines.push("            when {");
            lines.push("                branch 'main'");
            lines.push("            }");
            lines.push("            steps {");
            this.getDeploymentCommands().forEach(cmd => {
                lines.push(`                sh '${cmd}'`);
            });
            lines.push("            }");
            lines.push("        }");
        }
        lines.push("    }");
        lines.push("");
        lines.push("    post {");
        lines.push("        always {");
        lines.push("            cleanWs()");
        lines.push("        }");
        lines.push("        success {");
        lines.push("            echo 'Pipeline succeeded!'");
        lines.push("        }");
        lines.push("        failure {");
        lines.push("            echo 'Pipeline failed!'");
        lines.push("        }");
        lines.push("    }");
        lines.push("}");
        return lines.join('\n');
    }
    generateCircleCI() {
        const config = {
            version: 2.1,
            orbs: {
                docker: 'circleci/docker@2.2.0',
            },
            jobs: {
                build: {
                    docker: [{ image: 'cimg/base:stable' }],
                    steps: [
                        'checkout',
                        {
                            run: {
                                name: 'Build Docker image',
                                command: `docker build -t ${this.input.registry.repository}:${this.input.registry.tagStrategy} -f ${this.input.build?.dockerfile || 'Dockerfile'} ${this.input.build?.context || '.'}`,
                            },
                        },
                    ],
                },
            },
            workflows: {
                'build-test-deploy': {
                    jobs: ['build'],
                },
            },
        };
        if (this.input.test?.enabled) {
            config.jobs.test = {
                docker: [{ image: this.getLanguageImage() }],
                steps: [
                    'checkout',
                    {
                        run: {
                            name: 'Run tests',
                            command: this.getTestCommands().join(' && '),
                        },
                    },
                ],
            };
            config.workflows['build-test-deploy'].jobs.push({
                test: {
                    requires: ['build'],
                },
            });
        }
        if (this.input.deployment?.enabled) {
            config.jobs.deploy = {
                docker: [{ image: 'cimg/base:stable' }],
                steps: [
                    'checkout',
                    {
                        run: {
                            name: 'Deploy to Kubernetes',
                            command: this.getDeploymentCommands().join(' && '),
                        },
                    },
                ],
            };
            config.workflows['build-test-deploy'].jobs.push({
                deploy: {
                    requires: ['build', ...(this.input.test?.enabled ? ['test'] : [])],
                    filters: {
                        branches: {
                            only: ['main'],
                        },
                    },
                },
            });
        }
        return js_yaml_1.default.dump(config, { lineWidth: 120, quotingType: '"' });
    }
    generateAzureDevOps() {
        const pipeline = {
            trigger: this.input.triggers?.branches || ['main', 'develop'],
            pool: {
                vmImage: 'ubuntu-latest',
            },
            variables: this.getEnvironmentVariables(),
            stages: [],
        };
        // Build stage
        const buildStage = {
            stage: 'Build',
            jobs: [
                {
                    job: 'BuildDocker',
                    steps: [
                        {
                            task: 'Docker@2',
                            inputs: {
                                command: 'buildAndPush',
                                repository: this.input.registry.repository,
                                dockerfile: this.input.build?.dockerfile || 'Dockerfile',
                                tags: '$(Build.BuildId)',
                            },
                        },
                    ],
                },
            ],
        };
        pipeline.stages.push(buildStage);
        // Test stage
        if (this.input.test?.enabled) {
            pipeline.stages.push({
                stage: 'Test',
                dependsOn: 'Build',
                jobs: [
                    {
                        job: 'RunTests',
                        steps: [
                            {
                                script: this.getTestCommands().join('\n'),
                                displayName: 'Run tests',
                            },
                        ],
                    },
                ],
            });
        }
        // Deploy stage
        if (this.input.deployment?.enabled) {
            pipeline.stages.push({
                stage: 'Deploy',
                dependsOn: ['Build', ...(this.input.test?.enabled ? ['Test'] : [])],
                condition: "eq(variables['Build.SourceBranch'], 'refs/heads/main')",
                jobs: [
                    {
                        job: 'DeployToK8s',
                        steps: [
                            {
                                task: 'Kubernetes@1',
                                inputs: {
                                    command: 'apply',
                                    arguments: `-f ${this.input.deployment.manifests?.join(' -f ') || 'k8s/'}`,
                                },
                            },
                        ],
                    },
                ],
            });
        }
        return js_yaml_1.default.dump(pipeline, { lineWidth: 120, quotingType: '"' });
    }
    generateReadme() {
        const lines = [];
        lines.push(`# CI/CD Pipeline for ${this.input.projectName}`);
        lines.push('');
        lines.push(`**Platform**: ${this.input.platform.toUpperCase()}`);
        lines.push(`**Language**: ${this.input.language}`);
        lines.push('');
        lines.push('## Overview');
        lines.push('');
        lines.push('This CI/CD pipeline automates:');
        lines.push('- ✅ Code checkout and build');
        if (this.input.test?.enabled)
            lines.push('- ✅ Automated testing');
        if (this.input.security?.enabled)
            lines.push('- ✅ Security scanning');
        lines.push('- ✅ Docker image build and push');
        if (this.input.deployment?.enabled)
            lines.push('- ✅ Kubernetes deployment');
        lines.push('');
        lines.push('## Setup Instructions');
        lines.push('');
        // Platform-specific setup
        switch (this.input.platform) {
            case 'github-actions':
                lines.push('### GitHub Actions Setup');
                lines.push('');
                lines.push('1. **Add Secrets** to your GitHub repository:');
                lines.push('   - Settings → Secrets and variables → Actions → New repository secret');
                lines.push('');
                lines.push('   Required secrets:');
                lines.push(`   - \`DOCKER_USERNAME\`: Your Docker registry username`);
                lines.push(`   - \`DOCKER_PASSWORD\`: Your Docker registry password`);
                if (this.input.deployment?.enabled) {
                    lines.push(`   - \`KUBECONFIG\`: Your Kubernetes cluster configuration (base64 encoded)`);
                }
                lines.push('');
                lines.push('2. **Push to GitHub**: The workflow will trigger automatically');
                lines.push('');
                lines.push('3. **Monitor**: Go to Actions tab to see pipeline runs');
                break;
            case 'gitlab-ci':
                lines.push('### GitLab CI Setup');
                lines.push('');
                lines.push('1. **Add CI/CD Variables**:');
                lines.push('   - Settings → CI/CD → Variables → Expand → Add variable');
                lines.push('');
                lines.push('   Required variables:');
                lines.push(`   - \`CI_REGISTRY_USER\`: Registry username`);
                lines.push(`   - \`CI_REGISTRY_PASSWORD\`: Registry password`);
                if (this.input.deployment?.enabled) {
                    lines.push(`   - \`KUBE_CONFIG\`: Kubernetes configuration`);
                }
                lines.push('');
                lines.push('2. **Push to GitLab**: Pipeline runs automatically');
                break;
            case 'jenkins':
                lines.push('### Jenkins Setup');
                lines.push('');
                lines.push('1. **Install Required Plugins**:');
                lines.push('   - Docker Pipeline');
                lines.push('   - Kubernetes CLI');
                lines.push('   - Pipeline');
                lines.push('');
                lines.push('2. **Add Credentials**:');
                lines.push('   - Jenkins → Manage Jenkins → Credentials');
                lines.push(`   - Add \`docker-credentials\` for Docker registry`);
                if (this.input.deployment?.enabled) {
                    lines.push(`   - Add \`kubeconfig\` for Kubernetes`);
                }
                lines.push('');
                lines.push('3. **Create Pipeline**: New Item → Pipeline → Use Jenkinsfile from SCM');
                break;
        }
        lines.push('');
        lines.push('## Pipeline Stages');
        lines.push('');
        lines.push('### 1. Build');
        lines.push(`- Builds Docker image from \`${this.input.build?.dockerfile || 'Dockerfile'}\``);
        lines.push(`- Tags: ${this.getImageTags('$COMMIT_SHA').join(', ')}`);
        lines.push('');
        if (this.input.test?.enabled) {
            lines.push('### 2. Test');
            lines.push('- Runs unit tests');
            if (this.input.test.coverage?.enabled) {
                lines.push(`- Code coverage threshold: ${this.input.test.coverage.threshold}%`);
            }
            lines.push('');
        }
        if (this.input.security?.enabled) {
            lines.push('### 3. Security Scan');
            if (this.input.security.trivy?.enabled) {
                lines.push('- Trivy vulnerability scanning');
                lines.push(`- Severity levels: ${this.input.security.trivy.severity?.join(', ')}`);
            }
            if (this.input.security.snyk?.enabled) {
                lines.push('- Snyk dependency scanning');
            }
            lines.push('');
        }
        if (this.input.deployment?.enabled) {
            lines.push('### 4. Deploy');
            lines.push(`- Strategy: ${this.input.deployment.strategy}`);
            lines.push(`- Namespace: ${this.input.deployment.namespace || 'default'}`);
            lines.push('- Triggers: Manual or on main branch');
            lines.push('');
        }
        lines.push('## Monitoring');
        lines.push('');
        lines.push('View pipeline status:');
        switch (this.input.platform) {
            case 'github-actions':
                lines.push('- GitHub → Actions tab');
                break;
            case 'gitlab-ci':
                lines.push('- GitLab → CI/CD → Pipelines');
                break;
            case 'jenkins':
                lines.push('- Jenkins Dashboard → Build History');
                break;
        }
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push('*Generated by DevOps Forge*');
        return lines.join('\n');
    }
    // Helper methods
    getGitHubTriggers() {
        const triggers = {};
        if (this.input.triggers?.branches && this.input.triggers.branches.length > 0) {
            triggers.push = {
                branches: this.input.triggers.branches,
            };
        }
        if (this.input.triggers?.pullRequest) {
            triggers.pull_request = {
                branches: this.input.triggers.branches || ['main'],
            };
        }
        if (this.input.triggers?.schedule) {
            triggers.schedule = [{ cron: this.input.triggers.schedule }];
        }
        return triggers;
    }
    getEnvironmentVariables() {
        return {
            PROJECT_NAME: this.input.projectName,
            REGISTRY: this.input.registry.repository.split('/')[0] || 'docker.io',
            IMAGE_NAME: this.input.registry.repository,
        };
    }
    getLanguageSetup(platform) {
        const setups = {
            nodejs: {
                name: 'Set up Node.js',
                uses: 'actions/setup-node@v4',
                with: { 'node-version': '20' },
            },
            python: {
                name: 'Set up Python',
                uses: 'actions/setup-python@v5',
                with: { 'python-version': '3.11' },
            },
            go: {
                name: 'Set up Go',
                uses: 'actions/setup-go@v5',
                with: { 'go-version': '1.21' },
            },
            java: {
                name: 'Set up Java',
                uses: 'actions/setup-java@v4',
                with: { 'java-version': '17', distribution: 'temurin' },
            },
        };
        return setups[this.input.language] || setups.nodejs;
    }
    getLanguageImage() {
        const images = {
            nodejs: 'node:20',
            python: 'python:3.11',
            go: 'golang:1.21',
            java: 'eclipse-temurin:17',
            rust: 'rust:1.75',
            dotnet: 'mcr.microsoft.com/dotnet/sdk:8.0',
            php: 'php:8.2',
            ruby: 'ruby:3.2',
        };
        return images[this.input.language] || images.nodejs;
    }
    getTestSteps(platform) {
        const commands = this.getTestCommands();
        if (platform === 'github-actions') {
            return {
                name: 'Run tests',
                run: commands.join('\n'),
            };
        }
        return commands;
    }
    getTestCommands() {
        const commands = [];
        if (this.input.test?.unitTests?.enabled) {
            if (this.input.test.unitTests.command) {
                commands.push(this.input.test.unitTests.command);
            }
            else {
                // Default test commands by language
                const defaults = {
                    nodejs: 'npm test',
                    python: 'pytest',
                    go: 'go test ./...',
                    java: 'mvn test',
                    rust: 'cargo test',
                    dotnet: 'dotnet test',
                    php: 'vendor/bin/phpunit',
                    ruby: 'bundle exec rspec',
                };
                commands.push(defaults[this.input.language] || defaults.nodejs);
            }
        }
        return commands;
    }
    getRegistryLogin(platform) {
        const registryUrls = {
            dockerhub: 'docker.io',
            gcr: 'gcr.io',
            ecr: 'aws_account_id.dkr.ecr.region.amazonaws.com',
            acr: 'myregistry.azurecr.io',
            ghcr: 'ghcr.io',
            gitlab: 'registry.gitlab.com',
        };
        return {
            registry: this.input.registry.url || registryUrls[this.input.registry.type] || 'docker.io',
            username: this.input.registry.usernameSecret || '${{ secrets.DOCKER_USERNAME }}',
            password: this.input.registry.passwordSecret || '${{ secrets.DOCKER_PASSWORD }}',
        };
    }
    getImageTags(commitSha) {
        const tags = [];
        const repo = this.input.registry.repository;
        switch (this.input.registry.tagStrategy) {
            case 'commit-sha':
                tags.push(`${repo}:${commitSha.substring(0, 8)}`);
                break;
            case 'branch-name':
                tags.push(`${repo}:branch-name`);
                break;
            case 'tag':
                tags.push(`${repo}:tag-name`);
                break;
            case 'semantic':
                tags.push(`${repo}:v1.0.0`);
                break;
            case 'latest':
                tags.push(`${repo}:latest`);
                break;
        }
        // Add additional tags
        if (this.input.registry.additionalTags) {
            this.input.registry.additionalTags.forEach(tag => {
                tags.push(`${repo}:${tag}`);
            });
        }
        return tags;
    }
    getDeploymentSteps(platform) {
        const commands = this.getDeploymentCommands();
        if (platform === 'github-actions') {
            return {
                name: 'Deploy to Kubernetes',
                run: commands.join('\n'),
            };
        }
        return commands;
    }
    getDeploymentCommands() {
        const commands = [];
        switch (this.input.deployment?.strategy) {
            case 'kubectl':
                commands.push('kubectl config use-context $KUBE_CONTEXT');
                if (this.input.deployment.manifests && this.input.deployment.manifests.length > 0) {
                    this.input.deployment.manifests.forEach(manifest => {
                        commands.push(`kubectl apply -f ${manifest} -n ${this.input.deployment?.namespace || 'default'}`);
                    });
                }
                break;
            case 'helm':
                if (this.input.deployment.helmChart) {
                    commands.push(`helm upgrade --install ${this.input.deployment.helmChart.name} ${this.input.deployment.helmChart.path} ` +
                        `--namespace ${this.input.deployment.namespace || 'default'} ` +
                        `--values ${this.input.deployment.helmChart.valuesFile || 'values.yaml'}`);
                }
                break;
            case 'kustomize':
                commands.push(`kubectl apply -k . -n ${this.input.deployment.namespace || 'default'}`);
                break;
            case 'gitops':
                if (this.input.deployment.gitops?.tool === 'argocd') {
                    commands.push(`argocd app sync ${this.input.deployment.gitops.application}`);
                }
                break;
        }
        return commands;
    }
    validate() {
        const warnings = [];
        const suggestions = [];
        // Check for security scanning
        if (!this.input.security?.enabled) {
            warnings.push({
                severity: 'medium',
                message: 'Security scanning is disabled - recommended for production',
                platform: this.input.platform,
            });
            suggestions.push('Enable Trivy or Snyk security scanning');
        }
        // Check for tests
        if (!this.input.test?.enabled) {
            warnings.push({
                severity: 'high',
                message: 'Tests are disabled - highly recommended to enable',
                platform: this.input.platform,
            });
            suggestions.push('Enable unit tests to catch bugs early');
        }
        // Check registry configuration
        if (!this.input.registry.usernameSecret || !this.input.registry.passwordSecret) {
            warnings.push({
                severity: 'high',
                message: 'Registry credentials not configured',
                platform: this.input.platform,
            });
        }
        // Platform-specific suggestions
        suggestions.push(`Set up secrets/credentials for ${this.input.platform}`);
        suggestions.push('Test the pipeline in a development environment first');
        suggestions.push('Monitor pipeline runs and adjust timeouts as needed');
        if (this.input.deployment?.enabled) {
            suggestions.push('Use GitOps (ArgoCD/Flux) for production deployments');
            suggestions.push('Implement rollback strategy for failed deployments');
        }
        return {
            valid: warnings.filter(w => w.severity === 'high').length === 0,
            warnings,
            suggestions,
        };
    }
}
exports.CICDPipelineGenerator = CICDPipelineGenerator;
//# sourceMappingURL=cicdGenerator.js.map