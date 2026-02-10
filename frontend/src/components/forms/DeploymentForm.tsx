import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface DeploymentFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function DeploymentForm({ data, onChange }: DeploymentFormProps) {
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
      metadata: { name: 'myapp', namespace: 'default', labels: { app: 'myapp' } },
      replicas: 3,
      containers: [
        {
          name: 'myapp',
          image: 'nginx:1.21',
          ports: [{ containerPort: 80 }],
          resources: {
            requests: { cpu: '100m', memory: '128Mi' },
            limits: { cpu: '500m', memory: '512Mi' },
          },
        },
      ],
    });
    return null;
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
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

      {/* Replicas */}
      <div>
        <Label htmlFor="replicas">Replicas</Label>
        <Input
          id="replicas"
          type="number"
          min="1"
          value={getValue('replicas', 1)}
          onChange={(e) => updateField('replicas', parseInt(e.target.value))}
        />
      </div>

      {/* Containers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Containers</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const containers = getValue('containers', []);
              updateField('containers', [
                ...containers,
                { name: 'container', image: 'nginx:latest', ports: [] },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Container
          </Button>
        </div>

        {getValue('containers', []).map((container: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Container {idx + 1}</span>
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Name *</Label>
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
                <Label>Image *</Label>
                <Input
                  value={container.image || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = { ...containers[idx], image: e.target.value };
                    updateField('containers', containers);
                  }}
                  placeholder="nginx:1.21"
                  required
                />
              </div>
            </div>

            {/* Ports */}
            <div>
              <Label className="text-xs">Container Port</Label>
              <Input
                type="number"
                min="1"
                max="65535"
                value={container.ports?.[0]?.containerPort || ''}
                onChange={(e) => {
                  const containers = [...getValue('containers', [])];
                  containers[idx] = {
                    ...containers[idx],
                    ports: [{ containerPort: parseInt(e.target.value) }],
                  };
                  updateField('containers', containers);
                }}
                placeholder="80"
              />
            </div>

            {/* Resources */}
            <div className="space-y-2">
              <Label className="text-xs">Resource Requests</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={container.resources?.requests?.cpu || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        requests: {
                          ...containers[idx].resources?.requests,
                          cpu: e.target.value,
                        },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="CPU (100m)"
                />
                <Input
                  value={container.resources?.requests?.memory || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        requests: {
                          ...containers[idx].resources?.requests,
                          memory: e.target.value,
                        },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="Memory (128Mi)"
                />
              </div>
              <Label className="text-xs">Resource Limits</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={container.resources?.limits?.cpu || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        limits: {
                          ...containers[idx].resources?.limits,
                          cpu: e.target.value,
                        },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="CPU (500m)"
                />
                <Input
                  value={container.resources?.limits?.memory || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        limits: {
                          ...containers[idx].resources?.limits,
                          memory: e.target.value,
                        },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="Memory (512Mi)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
