import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { DockerfileInput } from '../../lib/api';

interface DockerfileFormProps {
  onSubmit: (data: DockerfileInput) => void;
  isLoading?: boolean;
}

export default function DockerfileForm({ onSubmit, isLoading }: DockerfileFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<DockerfileInput>({
    defaultValues: {
      language: 'nodejs',
      projectName: 'my-app',
      baseImageType: 'alpine',
      port: 3000,
      workdir: '/app',
      startCommand: '["npm", "run", "start"]',
      multiStage: {
        enabled: true,
        useDistrolessRuntime: false,
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
      optimizations: {
        layerCaching: true,
        minimizeImageSize: true,
        useMultiArchBuild: false,
      },
    },
  });

  const selectedLanguage = watch('language');
  const multiStageEnabled = watch('multiStage.enabled');
  const securityEnabled = watch('security.nonRootUser');
  const healthCheckEnabled = watch('healthCheck.enabled');

  const getLanguageDefaults = (language: string) => {
    const defaults: Record<string, any> = {
      nodejs: {
        port: 3000,
        startCommand: '["npm", "run", "start"]',
        workdir: '/app',
      },
      python: {
        port: 8000,
        startCommand: '["python", "main.py"]',
        workdir: '/app',
      },
      go: {
        port: 8080,
        startCommand: '["./main"]',
        workdir: '/app',
      },
      java: {
        port: 8080,
        startCommand: '["java", "-jar", "app.jar"]',
        workdir: '/app',
      },
      rust: {
        port: 8080,
        startCommand: '["./app"]',
        workdir: '/app',
      },
      dotnet: {
        port: 8080,
        startCommand: '["dotnet", "app.dll"]',
        workdir: '/app',
      },
      php: {
        port: 9000,
        startCommand: '["php-fpm"]',
        workdir: '/var/www/html',
      },
      ruby: {
        port: 3000,
        startCommand: '["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]',
        workdir: '/app',
      },
    };
    return defaults[language] || defaults.nodejs;
  };

  const handleLanguageChange = (language: string) => {
    setValue('language', language as any);
    const defaults = getLanguageDefaults(language);
    setValue('port', defaults.port);
    setValue('startCommand', defaults.startCommand);
    setValue('workdir', defaults.workdir);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dockerfile Configuration</CardTitle>
        <CardDescription>
          Generate optimized, multi-stage Dockerfiles with security best practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Configuration</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baseImageType">Base Image Type</Label>
                <Select
                  value={watch('baseImageType')}
                  onValueChange={(value) => setValue('baseImageType', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpine">Alpine (smallest)</SelectItem>
                    <SelectItem value="debian">Debian</SelectItem>
                    <SelectItem value="ubuntu">Ubuntu</SelectItem>
                    <SelectItem value="distroless">Distroless (most secure)</SelectItem>
                    <SelectItem value="scratch">Scratch (minimal)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="number"
                  {...register('port', { valueAsNumber: true })}
                  placeholder="3000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startCommand">Start Command *</Label>
              <Input
                id="startCommand"
                {...register('startCommand', { required: true })}
                placeholder='["npm", "run", "start"]'
              />
            </div>
          </div>

          {/* Language-Specific Configuration */}
          {selectedLanguage === 'nodejs' && (
            <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold">Node.js Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Node Version</Label>
                  <Input
                    {...register('nodejsConfig.version')}
                    defaultValue="20"
                    placeholder="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Package Manager</Label>
                  <Select
                    defaultValue="npm"
                    onValueChange={(value) => setValue('nodejsConfig.packageManager', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="npm">npm</SelectItem>
                      <SelectItem value="yarn">Yarn</SelectItem>
                      <SelectItem value="pnpm">pnpm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Build Script (optional)</Label>
                <Input
                  {...register('nodejsConfig.buildScript')}
                  placeholder="build"
                />
              </div>
            </div>
          )}

          {selectedLanguage === 'python' && (
            <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold">Python Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Python Version</Label>
                  <Input
                    {...register('pythonConfig.version')}
                    defaultValue="3.11"
                    placeholder="3.11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Package Manager</Label>
                  <Select
                    defaultValue="pip"
                    onValueChange={(value) => setValue('pythonConfig.packageManager', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pip">pip</SelectItem>
                      <SelectItem value="poetry">Poetry</SelectItem>
                      <SelectItem value="pipenv">Pipenv</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {selectedLanguage === 'go' && (
            <div className="space-y-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h3 className="text-lg font-semibold">Go Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Go Version</Label>
                  <Input
                    {...register('goConfig.version')}
                    defaultValue="1.21"
                    placeholder="1.21"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CGO Enabled</Label>
                  <Checkbox
                    onCheckedChange={(checked) => setValue('goConfig.cgoEnabled', checked as boolean)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Multi-Stage Build */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiStage"
                checked={multiStageEnabled}
                onCheckedChange={(checked) => setValue('multiStage.enabled', checked as boolean)}
              />
              <Label htmlFor="multiStage" className="font-semibold">
                Enable Multi-Stage Build (recommended for smaller images)
              </Label>
            </div>

            {multiStageEnabled && (
              <div className="pl-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="distroless"
                    checked={watch('multiStage.useDistrolessRuntime')}
                    onCheckedChange={(checked) => setValue('multiStage.useDistrolessRuntime', checked as boolean)}
                  />
                  <Label htmlFor="distroless">
                    Use Distroless Runtime (most secure, no shell)
                  </Label>
                </div>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nonRoot"
                checked={securityEnabled}
                onCheckedChange={(checked) => setValue('security.nonRootUser', checked as boolean)}
              />
              <Label htmlFor="nonRoot" className="font-semibold">
                Run as Non-Root User (recommended)
              </Label>
            </div>

            {securityEnabled && (
              <div className="pl-6 grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    {...register('security.username')}
                    defaultValue="appuser"
                    placeholder="appuser"
                  />
                </div>
                <div className="space-y-2">
                  <Label>UID</Label>
                  <Input
                    type="number"
                    {...register('security.uid', { valueAsNumber: true })}
                    defaultValue={1000}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GID</Label>
                  <Input
                    type="number"
                    {...register('security.gid', { valueAsNumber: true })}
                    defaultValue={1000}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Health Check */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="healthCheck"
                checked={healthCheckEnabled}
                onCheckedChange={(checked) => setValue('healthCheck.enabled', checked as boolean)}
              />
              <Label htmlFor="healthCheck" className="font-semibold">
                Enable Health Check
              </Label>
            </div>

            {healthCheckEnabled && (
              <div className="pl-6 space-y-2">
                <div className="space-y-2">
                  <Label>Custom Health Check Command (optional)</Label>
                  <Input
                    {...register('healthCheck.command')}
                    placeholder="Leave empty for default"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Options */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dockerignore"
                checked={watch('generateDockerignore')}
                onCheckedChange={(checked) => setValue('generateDockerignore', checked as boolean)}
              />
              <Label htmlFor="dockerignore">
                Generate .dockerignore file
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Dockerfile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
