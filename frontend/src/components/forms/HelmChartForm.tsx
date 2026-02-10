import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Textarea } from '../ui/Textarea';
import { HelmChartInput } from '../../lib/api';

interface HelmChartFormProps {
  onSubmit: (data: HelmChartInput) => void;
  isLoading?: boolean;
}

export default function HelmChartForm({ onSubmit, isLoading }: HelmChartFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<HelmChartInput>({
    defaultValues: {
      metadata: {
        name: 'my-app',
        version: '0.1.0',
        description: 'A Helm chart for my application',
        apiVersion: 'v2',
        appVersion: '1.0.0',
        type: 'application',
        keywords: [],
        maintainers: [],
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
          minReplicas: 1,
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
      },
      options: {
        includeHelpers: true,
        includeTests: true,
        includeNotes: true,
        includeServiceMonitor: false,
        includePodDisruptionBudget: false,
        includeNetworkPolicy: false,
        generateEnvironmentValues: false,
      },
      templateStyle: 'standard',
    },
  });

  const ingressEnabled = watch('values.ingress.enabled');
  const autoscalingEnabled = watch('values.autoscaling.enabled');
  const generateEnvValues = watch('options.generateEnvironmentValues');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Helm Chart Configuration</CardTitle>
        <CardDescription>
          Generate production-ready Helm charts with best practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Chart Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Chart Metadata</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Chart Name *</Label>
                <Input
                  id="name"
                  {...register('metadata.name', { required: true })}
                  placeholder="my-app"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version *</Label>
                <Input
                  id="version"
                  {...register('metadata.version', { required: true })}
                  placeholder="0.1.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('metadata.description')}
                placeholder="A Helm chart for my application"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appVersion">App Version</Label>
                <Input
                  id="appVersion"
                  {...register('metadata.appVersion')}
                  placeholder="1.0.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Chart Type</Label>
                <Select
                  value={watch('metadata.type')}
                  onValueChange={(value) => setValue('metadata.type', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Image Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Image Configuration</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repository">Image Repository *</Label>
                <Input
                  id="repository"
                  {...register('values.image.repository', { required: true })}
                  placeholder="nginx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag">Image Tag</Label>
                <Input
                  id="tag"
                  {...register('values.image.tag')}
                  placeholder="1.21"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pullPolicy">Pull Policy</Label>
              <Select
                value={watch('values.image.pullPolicy')}
                onValueChange={(value) => setValue('values.image.pullPolicy', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IfNotPresent">IfNotPresent</SelectItem>
                  <SelectItem value="Always">Always</SelectItem>
                  <SelectItem value="Never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Replicas & Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Configuration</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="replicaCount">Replicas</Label>
                <Input
                  id="replicaCount"
                  type="number"
                  {...register('values.replicaCount', { valueAsNumber: true })}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  value={watch('values.service.type')}
                  onValueChange={(value) => setValue('values.service.type', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ClusterIP">ClusterIP</SelectItem>
                    <SelectItem value="NodePort">NodePort</SelectItem>
                    <SelectItem value="LoadBalancer">LoadBalancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="servicePort">Service Port</Label>
                <Input
                  id="servicePort"
                  type="number"
                  {...register('values.service.port', { valueAsNumber: true })}
                  placeholder="80"
                />
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Requests</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    {...register('values.resources.requests.cpu')}
                    placeholder="100m"
                  />
                  <Input
                    {...register('values.resources.requests.memory')}
                    placeholder="128Mi"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Limits</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    {...register('values.resources.limits.cpu')}
                    placeholder="100m"
                  />
                  <Input
                    {...register('values.resources.limits.memory')}
                    placeholder="128Mi"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ingress */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ingressEnabled"
                checked={ingressEnabled}
                onCheckedChange={(checked) => setValue('values.ingress.enabled', checked as boolean)}
              />
              <Label htmlFor="ingressEnabled" className="font-semibold">
                Enable Ingress
              </Label>
            </div>

            {ingressEnabled && (
              <div className="pl-6 space-y-2">
                <div className="space-y-2">
                  <Label>Ingress Class</Label>
                  <Input
                    {...register('values.ingress.className')}
                    placeholder="nginx"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Autoscaling */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoscalingEnabled"
                checked={autoscalingEnabled}
                onCheckedChange={(checked) => setValue('values.autoscaling.enabled', checked as boolean)}
              />
              <Label htmlFor="autoscalingEnabled" className="font-semibold">
                Enable Autoscaling (HPA)
              </Label>
            </div>

            {autoscalingEnabled && (
              <div className="pl-6 grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Min Replicas</Label>
                  <Input
                    type="number"
                    {...register('values.autoscaling.minReplicas', { valueAsNumber: true })}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Replicas</Label>
                  <Input
                    type="number"
                    {...register('values.autoscaling.maxReplicas', { valueAsNumber: true })}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target CPU %</Label>
                  <Input
                    type="number"
                    {...register('values.autoscaling.targetCPUUtilizationPercentage', { valueAsNumber: true })}
                    placeholder="80"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Advanced Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Advanced Options</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeHelpers"
                  checked={watch('options.includeHelpers')}
                  onCheckedChange={(checked) => setValue('options.includeHelpers', checked as boolean)}
                />
                <Label htmlFor="includeHelpers">Include Helpers</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeTests"
                  checked={watch('options.includeTests')}
                  onCheckedChange={(checked) => setValue('options.includeTests', checked as boolean)}
                />
                <Label htmlFor="includeTests">Include Tests</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeNotes"
                  checked={watch('options.includeNotes')}
                  onCheckedChange={(checked) => setValue('options.includeNotes', checked as boolean)}
                />
                <Label htmlFor="includeNotes">Include NOTES.txt</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeServiceMonitor"
                  checked={watch('options.includeServiceMonitor')}
                  onCheckedChange={(checked) => setValue('options.includeServiceMonitor', checked as boolean)}
                />
                <Label htmlFor="includeServiceMonitor">ServiceMonitor (Prometheus)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includePodDisruptionBudget"
                  checked={watch('options.includePodDisruptionBudget')}
                  onCheckedChange={(checked) => setValue('options.includePodDisruptionBudget', checked as boolean)}
                />
                <Label htmlFor="includePodDisruptionBudget">PodDisruptionBudget</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeNetworkPolicy"
                  checked={watch('options.includeNetworkPolicy')}
                  onCheckedChange={(checked) => setValue('options.includeNetworkPolicy', checked as boolean)}
                />
                <Label htmlFor="includeNetworkPolicy">NetworkPolicy</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="generateEnvironmentValues"
                  checked={watch('options.generateEnvironmentValues')}
                  onCheckedChange={(checked) => setValue('options.generateEnvironmentValues', checked as boolean)}
                />
                <Label htmlFor="generateEnvironmentValues">Multi-Environment Values</Label>
              </div>
            </div>
          </div>

          {/* Template Style */}
          <div className="space-y-2">
            <Label htmlFor="templateStyle">Template Style</Label>
            <Select
              value={watch('templateStyle')}
              onValueChange={(value) => setValue('templateStyle', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="standard">Standard (Recommended)</SelectItem>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Helm Chart'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
