import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { manifestApi, ManifestInput } from '@/lib/api';
import DeploymentForm from './forms/DeploymentForm';
import ServiceForm from './forms/ServiceForm';
import ConfigMapForm from './forms/ConfigMapForm';
import IngressForm from './forms/IngressForm';
import SecretForm from './forms/SecretForm';
import PVCForm from './forms/PVCForm';
import HPAForm from './forms/HPAForm';
import StorageClassForm from './forms/StorageClassForm';
import PVForm from './forms/PVForm';
import StatefulSetForm from './forms/StatefulSetForm';
import DaemonSetForm from './forms/DaemonSetForm';
import JobForm from './forms/JobForm';
import CronJobForm from './forms/CronJobForm';

interface ManifestFormProps {
  onGenerate: (
    manifest: string,
    warnings: string[],
    suggestions: string[],
    metadata: { resourceType: string },
    dependencies: Array<{ resourceType: string; reason: string; required: boolean }>,
    relatedResources: Array<{ resourceType: string; reason: string }>,
    deploymentCommands: Array<{ description: string; command: string }>,
    deploymentOrder: Array<{ step: number; resources: string[]; description: string }>
  ) => void;
}

type ResourceType = 'Deployment' | 'Service' | 'ConfigMap' | 'Secret' | 'Ingress' | 'PersistentVolumeClaim' | 'HorizontalPodAutoscaler' | 'StorageClass' | 'PersistentVolume' | 'StatefulSet' | 'DaemonSet' | 'Job' | 'CronJob';

export default function ManifestForm({ onGenerate }: ManifestFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [resourceType, setResourceType] = useState<ResourceType>('Deployment');
  const [formData, setFormData] = useState<any>({});

  // Map resource type to backend field name
  const getResourceFieldName = (type: ResourceType): string => {
    const mapping: Record<ResourceType, string> = {
      'Deployment': 'deployment',
      'Service': 'service',
      'ConfigMap': 'configMap',
      'Secret': 'secret',
      'Ingress': 'ingress',
      'PersistentVolumeClaim': 'pvc',
      'HorizontalPodAutoscaler': 'hpa',
      'StorageClass': 'storageClass',
      'PersistentVolume': 'pv',
      'StatefulSet': 'statefulSet',
      'DaemonSet': 'daemonSet',
      'Job': 'job',
      'CronJob': 'cronJob',
    };
    return mapping[type];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const input: ManifestInput = {
        resourceType,
        [getResourceFieldName(resourceType)]: formData,
        includeNamespace: false,
      };

      const [generateResult, validateResult] = await Promise.all([
        manifestApi.generate(input),
        manifestApi.validate(input),
      ]);

      onGenerate(
        generateResult.manifest,
        validateResult.warnings,
        validateResult.suggestions,
        generateResult.metadata,
        validateResult.dependencies,
        validateResult.relatedResources,
        validateResult.deploymentCommands,
        validateResult.deploymentOrder
      );
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate manifest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Configure Your Manifest</CardTitle>
        <CardDescription>
          Select a resource type and fill in the configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resource Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resource Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Deployment', 'Service', 'ConfigMap', 'Secret', 'Ingress', 'PersistentVolumeClaim', 'HorizontalPodAutoscaler', 'StorageClass', 'PersistentVolume', 'StatefulSet', 'DaemonSet', 'Job', 'CronJob'] as ResourceType[]).map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setResourceType(type);
                      setFormData({});
                    }}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      resourceType === type
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Dynamic Form based on Resource Type */}
          <div className="border-t pt-6">
            {resourceType === 'Deployment' && (
              <DeploymentForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'Service' && (
              <ServiceForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'ConfigMap' && (
              <ConfigMapForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'Ingress' && (
              <IngressForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'Secret' && (
              <SecretForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'PersistentVolumeClaim' && (
              <PVCForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'HorizontalPodAutoscaler' && (
              <HPAForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'StorageClass' && (
              <StorageClassForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'PersistentVolume' && (
              <PVForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'StatefulSet' && (
              <StatefulSetForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'DaemonSet' && (
              <DaemonSetForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'Job' && (
              <JobForm data={formData} onChange={setFormData} />
            )}
            {resourceType === 'CronJob' && (
              <CronJobForm data={formData} onChange={setFormData} />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Manifest'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
