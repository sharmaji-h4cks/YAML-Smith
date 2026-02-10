import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { CICDPipelineInput } from '../../lib/api';

interface CICDFormProps {
  onSubmit: (data: CICDPipelineInput) => void;
  isLoading?: boolean;
}

export default function CICDForm({ onSubmit, isLoading }: CICDFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<CICDPipelineInput>({
    defaultValues: {
      platform: 'github-actions',
      projectName: 'my-app',
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
          exitOnError: false,
        },
      },
      registry: {
        type: 'dockerhub',
        repository: 'myusername/my-app',
        tagStrategy: 'commit-sha',
      },
      deployment: {
        enabled: true,
        strategy: 'kubectl',
        namespace: 'default',
        manifests: ['k8s/deployment.yaml', 'k8s/service.yaml'],
      },
      options: {
        parallelJobs: true,
        cacheEnabled: true,
        timeout: 60,
      },
    },
  });

  const selectedPlatform = watch('platform');
  const selectedLanguage = watch('language');
  const testEnabled = watch('test.enabled');
  const securityEnabled = watch('security.enabled');
  const deploymentEnabled = watch('deployment.enabled');

  // Update test command when language changes
  const handleLanguageChange = (language: string) => {
    setValue('language', language as any);
    const testCommands: Record<string, string> = {
      nodejs: 'npm test',
      python: 'pytest',
      go: 'go test ./...',
      java: 'mvn test',
      rust: 'cargo test',
      dotnet: 'dotnet test',
      php: 'vendor/bin/phpunit',
      ruby: 'bundle exec rspec',
    };
    setValue('test.unitTests.command', testCommands[language] || 'npm test');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CI/CD Pipeline Configuration</CardTitle>
        <CardDescription>
          Generate production-ready CI/CD pipelines for multiple platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Platform & Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform & Project</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">CI/CD Platform *</Label>
                <Select
                  value={selectedPlatform}
                  onValueChange={(value) => setValue('platform', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github-actions">GitHub Actions</SelectItem>
                    <SelectItem value="gitlab-ci">GitLab CI</SelectItem>
                    <SelectItem value="jenkins">Jenkins</SelectItem>
                    <SelectItem value="circleci">CircleCI</SelectItem>
                    <SelectItem value="azure-devops">Azure DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  {...register('projectName', { required: true })}
                  placeholder="my-app"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select
                value={selectedLanguage}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nodejs">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="dotnet">.NET</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="ruby">Ruby</SelectItem>
                  <SelectItem value="generic">Generic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Build Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Build Configuration</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dockerfile">Dockerfile</Label>
                <Input
                  id="dockerfile"
                  {...register('build.dockerfile')}
                  placeholder="Dockerfile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Build Context</Label>
                <Input
                  id="context"
                  {...register('build.context')}
                  placeholder="."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="useCache"
                checked={watch('build.useCache')}
                onCheckedChange={(checked) => setValue('build.useCache', checked as boolean)}
              />
              <Label htmlFor="useCache">Use Docker layer caching</Label>
            </div>
          </div>

          {/* Test Configuration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="testEnabled"
                checked={testEnabled}
                onCheckedChange={(checked) => setValue('test.enabled', checked as boolean)}
              />
              <Label htmlFor="testEnabled" className="font-semibold">
                Enable Testing
              </Label>
            </div>

            {testEnabled && (
              <div className="pl-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testCommand">Test Command</Label>
                  <Input
                    id="testCommand"
                    {...register('test.unitTests.command')}
                    placeholder="npm test"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="coverage"
                    checked={watch('test.coverage.enabled')}
                    onCheckedChange={(checked) => setValue('test.coverage.enabled', checked as boolean)}
                  />
                  <Label htmlFor="coverage">Enable code coverage</Label>
                </div>

                {watch('test.coverage.enabled') && (
                  <div className="pl-6 space-y-2">
                    <Label htmlFor="coverageThreshold">Coverage Threshold (%)</Label>
                    <Input
                      id="coverageThreshold"
                      type="number"
                      {...register('test.coverage.threshold', { valueAsNumber: true })}
                      placeholder="80"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Security Scanning */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="securityEnabled"
                checked={securityEnabled}
                onCheckedChange={(checked) => setValue('security.enabled', checked as boolean)}
              />
              <Label htmlFor="securityEnabled" className="font-semibold">
                Enable Security Scanning
              </Label>
            </div>

            {securityEnabled && (
              <div className="pl-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trivy"
                    checked={watch('security.trivy.enabled')}
                    onCheckedChange={(checked) => setValue('security.trivy.enabled', checked as boolean)}
                  />
                  <Label htmlFor="trivy">Trivy vulnerability scanner</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exitOnError"
                    checked={watch('security.trivy.exitOnError')}
                    onCheckedChange={(checked) => setValue('security.trivy.exitOnError', checked as boolean)}
                  />
                  <Label htmlFor="exitOnError">Fail pipeline on security issues</Label>
                </div>
              </div>
            )}
          </div>

          {/* Container Registry */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Container Registry</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registryType">Registry Type *</Label>
                <Select
                  value={watch('registry.type')}
                  onValueChange={(value) => setValue('registry.type', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dockerhub">Docker Hub</SelectItem>
                    <SelectItem value="ghcr">GitHub Container Registry</SelectItem>
                    <SelectItem value="gcr">Google Container Registry</SelectItem>
                    <SelectItem value="ecr">AWS ECR</SelectItem>
                    <SelectItem value="acr">Azure Container Registry</SelectItem>
                    <SelectItem value="gitlab">GitLab Registry</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">Repository *</Label>
                <Input
                  id="repository"
                  {...register('registry.repository', { required: true })}
                  placeholder="myusername/my-app"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagStrategy">Tag Strategy</Label>
              <Select
                value={watch('registry.tagStrategy')}
                onValueChange={(value) => setValue('registry.tagStrategy', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commit-sha">Commit SHA</SelectItem>
                  <SelectItem value="branch-name">Branch Name</SelectItem>
                  <SelectItem value="tag">Git Tag</SelectItem>
                  <SelectItem value="semantic">Semantic Version</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deployment */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="deploymentEnabled"
                checked={deploymentEnabled}
                onCheckedChange={(checked) => setValue('deployment.enabled', checked as boolean)}
              />
              <Label htmlFor="deploymentEnabled" className="font-semibold">
                Enable Kubernetes Deployment
              </Label>
            </div>

            {deploymentEnabled && (
              <div className="pl-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="strategy">Deployment Strategy</Label>
                    <Select
                      value={watch('deployment.strategy')}
                      onValueChange={(value) => setValue('deployment.strategy', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kubectl">kubectl apply</SelectItem>
                        <SelectItem value="helm">Helm</SelectItem>
                        <SelectItem value="kustomize">Kustomize</SelectItem>
                        <SelectItem value="gitops">GitOps (ArgoCD/Flux)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="namespace">Namespace</Label>
                    <Input
                      id="namespace"
                      {...register('deployment.namespace')}
                      placeholder="default"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Platform Info Badge */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Platform:</strong> {selectedPlatform.toUpperCase()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedPlatform === 'github-actions' && 'Will generate .github/workflows/ci-cd.yml'}
              {selectedPlatform === 'gitlab-ci' && 'Will generate .gitlab-ci.yml'}
              {selectedPlatform === 'jenkins' && 'Will generate Jenkinsfile'}
              {selectedPlatform === 'circleci' && 'Will generate .circleci/config.yml'}
              {selectedPlatform === 'azure-devops' && 'Will generate azure-pipelines.yml'}
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate CI/CD Pipeline'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
