import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface StorageClassFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function StorageClassForm({ data, onChange }: StorageClassFormProps) {
  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const getValue = (path: string, defaultValue: any = '') => {
    const keys = path.split('.');
    let current = data;

    for (const key of keys) {
      if (current === undefined || current === null) return defaultValue;
      current = current[key];
    }

    return current === undefined ? defaultValue : current;
  };

  // Initialize defaults
  if (!data.metadata) {
    onChange({
      metadata: { name: 'fast-storage', labels: {} },
      provisioner: 'kubernetes.io/aws-ebs',
      reclaimPolicy: 'Delete',
      allowVolumeExpansion: true,
      volumeBindingMode: 'WaitForFirstConsumer',
      parameters: {},
    });
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> StorageClass is cluster-scoped (no namespace). It defines how dynamic PVCs are provisioned.
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-4">
        <h3 className="font-semibold">Metadata</h3>
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={getValue('metadata.name')}
            onChange={(e) => updateField('metadata.name', e.target.value)}
            placeholder="fast-storage"
            required
          />
        </div>
      </div>

      {/* Provisioner */}
      <div>
        <Label htmlFor="provisioner">Provisioner *</Label>
        <select
          id="provisioner"
          value={getValue('provisioner', 'kubernetes.io/aws-ebs')}
          onChange={(e) => updateField('provisioner', e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="kubernetes.io/aws-ebs">AWS EBS (kubernetes.io/aws-ebs)</option>
          <option value="kubernetes.io/gce-pd">GCE Persistent Disk (kubernetes.io/gce-pd)</option>
          <option value="kubernetes.io/azure-disk">Azure Disk (kubernetes.io/azure-disk)</option>
          <option value="kubernetes.io/azure-file">Azure File (kubernetes.io/azure-file)</option>
          <option value="kubernetes.io/cinder">OpenStack Cinder (kubernetes.io/cinder)</option>
          <option value="kubernetes.io/vsphere-volume">vSphere (kubernetes.io/vsphere-volume)</option>
          <option value="kubernetes.io/no-provisioner">No Provisioner (Local)</option>
        </select>
        <p className="text-xs text-muted-foreground mt-1">
          Cloud provider or storage plugin that will create volumes
        </p>
      </div>

      {/* Parameters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Parameters (optional)</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const params = getValue('parameters', {});
              updateField('parameters', { ...params, '': '' });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Parameter
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Provisioner-specific parameters (e.g., type=gp3, iops=3000 for AWS EBS)
        </p>

        {Object.entries(getValue('parameters', {})).map(([key, value]: [string, any], idx: number) => (
          <div key={idx} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className="text-xs">Key</Label>
              <Input
                value={key}
                onChange={(e) => {
                  const params = { ...getValue('parameters', {}) };
                  delete params[key];
                  params[e.target.value] = value;
                  updateField('parameters', params);
                }}
                placeholder="type"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs">Value</Label>
              <Input
                value={value}
                onChange={(e) => {
                  const params = { ...getValue('parameters', {}) };
                  params[key] = e.target.value;
                  updateField('parameters', params);
                }}
                placeholder="gp3"
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => {
                const params = { ...getValue('parameters', {}) };
                delete params[key];
                updateField('parameters', params);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Reclaim Policy */}
      <div>
        <Label>Reclaim Policy</Label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="reclaimPolicy"
              value="Delete"
              checked={getValue('reclaimPolicy', 'Delete') === 'Delete'}
              onChange={(e) => updateField('reclaimPolicy', e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm">Delete</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="reclaimPolicy"
              value="Retain"
              checked={getValue('reclaimPolicy', 'Delete') === 'Retain'}
              onChange={(e) => updateField('reclaimPolicy', e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm">Retain</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Delete: Remove volume when PVC deleted. Retain: Keep volume for manual cleanup
        </p>
      </div>

      {/* Volume Binding Mode */}
      <div>
        <Label>Volume Binding Mode</Label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="volumeBindingMode"
              value="Immediate"
              checked={getValue('volumeBindingMode', 'WaitForFirstConsumer') === 'Immediate'}
              onChange={(e) => updateField('volumeBindingMode', e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm">Immediate</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="volumeBindingMode"
              value="WaitForFirstConsumer"
              checked={getValue('volumeBindingMode', 'WaitForFirstConsumer') === 'WaitForFirstConsumer'}
              onChange={(e) => updateField('volumeBindingMode', e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm">WaitForFirstConsumer</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          WaitForFirstConsumer (recommended): Create volume in same zone as pod
        </p>
      </div>

      {/* Allow Volume Expansion */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="allowVolumeExpansion"
          checked={getValue('allowVolumeExpansion', true)}
          onChange={(e) => updateField('allowVolumeExpansion', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="allowVolumeExpansion" className="cursor-pointer">
          Allow Volume Expansion
        </Label>
      </div>
      <p className="text-xs text-muted-foreground">
        Enable resizing PVCs without downtime (recommended)
      </p>
    </div>
  );
}
