import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface StatefulSetFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function StatefulSetForm({ data, onChange }: StatefulSetFormProps) {
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

  const toggleAccessMode = (templateIdx: number, mode: string) => {
    const templates = getValue('volumeClaimTemplates', []);
    const template = templates[templateIdx];
    const accessModes = template?.spec?.accessModes || ['ReadWriteOnce'];
    const currentModes = [...accessModes];
    const index = currentModes.indexOf(mode);

    if (index > -1) {
      if (currentModes.length > 1) {
        currentModes.splice(index, 1);
      }
    } else {
      currentModes.push(mode);
    }

    const newTemplates = [...templates];
    newTemplates[templateIdx] = {
      ...newTemplates[templateIdx],
      spec: {
        ...newTemplates[templateIdx].spec,
        accessModes: currentModes,
      },
    };
    updateField('volumeClaimTemplates', newTemplates);
  };

  // Initialize defaults
  if (!data.metadata) {
    onChange({
      metadata: { name: 'stateful-app', namespace: 'default', labels: { app: 'stateful-app' } },
      serviceName: 'stateful-app-headless',
      replicas: 3,
      podManagementPolicy: 'OrderedReady',
      containers: [
        {
          name: 'app',
          image: 'mysql:8.0',
          ports: [{ containerPort: 3306 }],
          resources: {
            requests: { cpu: '250m', memory: '512Mi' },
            limits: { cpu: '500m', memory: '1Gi' },
          },
        },
      ],
      volumeClaimTemplates: [
        {
          metadata: { name: 'data' },
          spec: {
            accessModes: ['ReadWriteOnce'],
            storageClassName: 'fast-storage',
            resources: { requests: { storage: '10Gi' } },
          },
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
          <strong>StatefulSets</strong> provide stable network identity and persistent storage. Ideal for databases, message queues, and stateful applications.
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

      {/* Service Name (Required for StatefulSet) */}
      <div>
        <Label htmlFor="serviceName">Service Name * (Headless Service)</Label>
        <Input
          id="serviceName"
          value={getValue('serviceName')}
          onChange={(e) => updateField('serviceName', e.target.value)}
          placeholder="stateful-app-headless"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          ⚠️ Create a headless Service (clusterIP: None) with this name for stable network identity
        </p>
      </div>

      {/* Replicas and Pod Management Policy */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="replicas">Replicas</Label>
          <Input
            id="replicas"
            type="number"
            min="1"
            value={getValue('replicas', 3)}
            onChange={(e) => updateField('replicas', parseInt(e.target.value) || 1)}
          />
        </div>
        <div>
          <Label htmlFor="podManagementPolicy">Pod Management Policy</Label>
          <select
            id="podManagementPolicy"
            value={getValue('podManagementPolicy', 'OrderedReady')}
            onChange={(e) => updateField('podManagementPolicy', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="OrderedReady">OrderedReady - Sequential startup</option>
            <option value="Parallel">Parallel - Faster startup</option>
          </select>
        </div>
      </div>

      {/* Volume Claim Templates (Key Feature) */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Volume Claim Templates</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Automatically creates PVCs for each replica. Each pod gets its own persistent storage.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const templates = getValue('volumeClaimTemplates', []);
              updateField('volumeClaimTemplates', [
                ...templates,
                {
                  metadata: { name: `data-${templates.length + 1}` },
                  spec: {
                    accessModes: ['ReadWriteOnce'],
                    storageClassName: 'standard',
                    resources: { requests: { storage: '10Gi' } },
                  },
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Template
          </Button>
        </div>

        {getValue('volumeClaimTemplates', []).map((template: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-4 space-y-4 bg-purple-50">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Volume Template {idx + 1}</h4>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  const templates = getValue('volumeClaimTemplates', []);
                  updateField(
                    'volumeClaimTemplates',
                    templates.filter((_: any, i: number) => i !== idx)
                  );
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label className="text-xs">Volume Name *</Label>
              <Input
                value={template.metadata?.name || ''}
                onChange={(e) => {
                  const templates = [...getValue('volumeClaimTemplates', [])];
                  templates[idx] = {
                    ...templates[idx],
                    metadata: { ...templates[idx].metadata, name: e.target.value },
                  };
                  updateField('volumeClaimTemplates', templates);
                }}
                placeholder="data"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Mount path: /mnt/{template.metadata?.name || 'data'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Storage Size *</Label>
                <Input
                  value={template.spec?.resources?.requests?.storage || ''}
                  onChange={(e) => {
                    const templates = [...getValue('volumeClaimTemplates', [])];
                    templates[idx] = {
                      ...templates[idx],
                      spec: {
                        ...templates[idx].spec,
                        resources: { requests: { storage: e.target.value } },
                      },
                    };
                    updateField('volumeClaimTemplates', templates);
                  }}
                  placeholder="10Gi"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Storage Class Name</Label>
                <Input
                  value={template.spec?.storageClassName || ''}
                  onChange={(e) => {
                    const templates = [...getValue('volumeClaimTemplates', [])];
                    templates[idx] = {
                      ...templates[idx],
                      spec: {
                        ...templates[idx].spec,
                        storageClassName: e.target.value,
                      },
                    };
                    updateField('volumeClaimTemplates', templates);
                  }}
                  placeholder="fast-storage"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Access Modes *</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(template.spec?.accessModes || ['ReadWriteOnce']).includes('ReadWriteOnce')}
                    onChange={() => toggleAccessMode(idx, 'ReadWriteOnce')}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">ReadWriteOnce (RWO)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(template.spec?.accessModes || []).includes('ReadOnlyMany')}
                    onChange={() => toggleAccessMode(idx, 'ReadOnlyMany')}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">ReadOnlyMany (ROX)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(template.spec?.accessModes || []).includes('ReadWriteMany')}
                    onChange={() => toggleAccessMode(idx, 'ReadWriteMany')}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">ReadWriteMany (RWX)</span>
                </label>
              </div>
            </div>
          </div>
        ))}

        {getValue('volumeClaimTemplates', []).length === 0 && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No volume claim templates. Pods will not have persistent storage.
          </div>
        )}
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
                  image: 'mysql:8.0',
                  ports: [{ containerPort: 3306 }],
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
                  placeholder="mysql:8.0"
                  required
                />
              </div>
            </div>

            {/* Ports */}
            <div>
              <Label className="text-xs">Ports</Label>
              <div className="space-y-2 mt-1">
                {(container.ports || []).map((port: any, portIdx: number) => (
                  <div key={portIdx} className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="65535"
                      value={port.containerPort || ''}
                      onChange={(e) => {
                        const containers = [...getValue('containers', [])];
                        const ports = [...(containers[idx].ports || [])];
                        ports[portIdx] = { containerPort: parseInt(e.target.value) || 80 };
                        containers[idx] = { ...containers[idx], ports };
                        updateField('containers', containers);
                      }}
                      placeholder="3306"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        const containers = [...getValue('containers', [])];
                        const ports = containers[idx].ports || [];
                        containers[idx] = {
                          ...containers[idx],
                          ports: ports.filter((_: any, i: number) => i !== portIdx),
                        };
                        updateField('containers', containers);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const containers = [...getValue('containers', [])];
                    const ports = containers[idx].ports || [];
                    containers[idx] = { ...containers[idx], ports: [...ports, { containerPort: 80 }] };
                    updateField('containers', containers);
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Port
                </Button>
              </div>
            </div>

            {/* Resources */}
            <div className="grid grid-cols-4 gap-2">
              <div>
                <Label className="text-xs">CPU Request</Label>
                <Input
                  value={container.resources?.requests?.cpu || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        requests: { ...containers[idx].resources?.requests, cpu: e.target.value },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="250m"
                />
              </div>
              <div>
                <Label className="text-xs">Memory Request</Label>
                <Input
                  value={container.resources?.requests?.memory || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        requests: { ...containers[idx].resources?.requests, memory: e.target.value },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="512Mi"
                />
              </div>
              <div>
                <Label className="text-xs">CPU Limit</Label>
                <Input
                  value={container.resources?.limits?.cpu || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        limits: { ...containers[idx].resources?.limits, cpu: e.target.value },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="500m"
                />
              </div>
              <div>
                <Label className="text-xs">Memory Limit</Label>
                <Input
                  value={container.resources?.limits?.memory || ''}
                  onChange={(e) => {
                    const containers = [...getValue('containers', [])];
                    containers[idx] = {
                      ...containers[idx],
                      resources: {
                        ...containers[idx].resources,
                        limits: { ...containers[idx].resources?.limits, memory: e.target.value },
                      },
                    };
                    updateField('containers', containers);
                  }}
                  placeholder="1Gi"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
