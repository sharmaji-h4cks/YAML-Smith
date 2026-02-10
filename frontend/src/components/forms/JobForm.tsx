import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface JobFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function JobForm({ data, onChange }: JobFormProps) {
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
      metadata: { name: 'batch-job', namespace: 'default', labels: { app: 'batch-job' } },
      completions: 1,
      parallelism: 1,
      backoffLimit: 6,
      restartPolicy: 'Never',
      containers: [
        {
          name: 'batch-processor',
          image: 'busybox:latest',
          command: ['sh', '-c', 'echo Processing batch job && sleep 30'],
        },
      ],
    });
    return null;
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900">
          Jobs run pods to completion. Use for batch processing, data migrations, backups, and one-time tasks.
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-4">
        <h3 className="font-semibold">Metadata</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={getValue('metadata.name')}
              onChange={(e) => updateField('metadata.name', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="namespace">Namespace</Label>
            <Input
              id="namespace"
              value={getValue('metadata.namespace', 'default')}
              onChange={(e) => updateField('metadata.namespace', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Job Configuration */}
      <div className="space-y-4">
        <h3 className="font-semibold">Job Configuration</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="completions">Completions</Label>
            <Input
              id="completions"
              type="number"
              min="1"
              value={getValue('completions', 1)}
              onChange={(e) => updateField('completions', parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Number of successful completions required
            </p>
          </div>
          <div>
            <Label htmlFor="parallelism">Parallelism</Label>
            <Input
              id="parallelism"
              type="number"
              min="1"
              value={getValue('parallelism', 1)}
              onChange={(e) => updateField('parallelism', parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Number of pods running in parallel
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="backoffLimit">Backoff Limit</Label>
            <Input
              id="backoffLimit"
              type="number"
              min="0"
              value={getValue('backoffLimit', 6)}
              onChange={(e) => updateField('backoffLimit', parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Number of retries before marking job failed
            </p>
          </div>
          <div>
            <Label htmlFor="activeDeadlineSeconds">Active Deadline (seconds, optional)</Label>
            <Input
              id="activeDeadlineSeconds"
              type="number"
              min="1"
              value={getValue('activeDeadlineSeconds', '')}
              onChange={(e) => updateField('activeDeadlineSeconds', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Leave empty for no timeout"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum duration before job is terminated
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="ttlSecondsAfterFinished">TTL After Finished (seconds, optional)</Label>
          <Input
            id="ttlSecondsAfterFinished"
            type="number"
            min="0"
            value={getValue('ttlSecondsAfterFinished', '')}
            onChange={(e) => updateField('ttlSecondsAfterFinished', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Leave empty to keep job indefinitely"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Auto-delete completed job after this duration (e.g., 3600 = 1 hour)
          </p>
        </div>
      </div>

      {/* Restart Policy */}
      <div>
        <Label>Restart Policy</Label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="restartPolicy"
              value="Never"
              checked={getValue('restartPolicy', 'Never') === 'Never'}
              onChange={(e) => updateField('restartPolicy', e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm">Never</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="restartPolicy"
              value="OnFailure"
              checked={getValue('restartPolicy', 'Never') === 'OnFailure'}
              onChange={(e) => updateField('restartPolicy', e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm">OnFailure</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Never: Don't restart failed containers. OnFailure: Retry failed containers
        </p>
      </div>

      {/* Containers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Containers *</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const containers = getValue('containers', []);
              updateField('containers', [
                ...containers,
                {
                  name: `container-${containers.length + 1}`,
                  image: 'busybox:latest',
                  command: ['sh', '-c', 'echo Hello && sleep 10'],
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Container
          </Button>
        </div>

        {getValue('containers', []).map((container: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-4 space-y-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Container {idx + 1}</h4>
              {getValue('containers', []).length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const containers = getValue('containers', []);
                    updateField(
                      'containers',
                      containers.filter((_: any, i: number) => i !== idx)
                    );
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Container Name *</Label>
                <Input
                  value={container.name || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = { ...containers[idx], name: e.target.value };
                    updateField('containers', containers);
                  }}
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Image *</Label>
                <Input
                  value={container.image || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = { ...containers[idx], image: e.target.value };
                    updateField('containers', containers);
                  }}
                  placeholder="busybox:latest"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Command (optional)</Label>
              <Input
                value={Array.isArray(container.command) ? container.command.join(' ') : ''}
                onChange={(e) => {
                  const containers = [...getValue('containers', [])];
                  containers[idx] = {
                    ...containers[idx],
                    command: e.target.value ? e.target.value.split(' ') : undefined,
                  };
                  updateField('containers', containers);
                }}
                placeholder='sh -c "echo Processing && sleep 30"'
              />
              <p className="text-xs text-muted-foreground mt-1">
                Space-separated command and arguments
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Service Account (optional) */}
      <div>
        <Label htmlFor="serviceAccountName">Service Account Name (optional)</Label>
        <Input
          id="serviceAccountName"
          value={getValue('serviceAccountName', '')}
          onChange={(e) => updateField('serviceAccountName', e.target.value)}
          placeholder="default"
        />
        <p className="text-xs text-muted-foreground mt-1">
          For RBAC permissions (e.g., accessing Kubernetes API)
        </p>
      </div>
    </div>
  );
}
