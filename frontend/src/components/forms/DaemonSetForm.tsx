import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface DaemonSetFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function DaemonSetForm({ data, onChange }: DaemonSetFormProps) {
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
      metadata: { name: 'node-agent', namespace: 'default', labels: { app: 'node-agent' } },
      hostNetwork: false,
      hostPID: false,
      containers: [
        {
          name: 'agent',
          image: 'fluentd:latest',
          resources: {
            requests: { cpu: '100m', memory: '128Mi' },
            limits: { cpu: '200m', memory: '256Mi' },
          },
        },
      ],
      tolerations: [],
      nodeSelector: {},
    });
    return null;
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900">
          DaemonSets run one pod per node. Use for node-level services: logging agents, monitoring, networking (CNI), storage.
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

      {/* Host Network and Host PID */}
      <div className="space-y-4">
        <h3 className="font-semibold">Host Access (Use with Caution)</h3>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="hostNetwork"
              checked={getValue('hostNetwork', false)}
              onChange={(e) => updateField('hostNetwork', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 mt-1"
            />
            <div>
              <Label htmlFor="hostNetwork" className="cursor-pointer font-medium">
                Host Network
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                ⚠️ Allows pod to use host network stack. Required for networking plugins (CNI), but reduces isolation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="hostPID"
              checked={getValue('hostPID', false)}
              onChange={(e) => updateField('hostPID', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 mt-1"
            />
            <div>
              <Label htmlFor="hostPID" className="cursor-pointer font-medium">
                Host PID
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                ⚠️ Allows pod to see host processes. Use only for trusted system-level workloads.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Node Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Node Selector (optional)</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nodeSelector = getValue('nodeSelector', {});
              updateField('nodeSelector', { ...nodeSelector, '': '' });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Selector
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Run pods only on nodes with these labels (e.g., disktype=ssd, gpu=true)
        </p>

        {Object.entries(getValue('nodeSelector', {})).map(([key, value]: [string, any], idx: number) => (
          <div key={idx} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className="text-xs">Key</Label>
              <Input
                value={key}
                onChange={(e) => {
                  const nodeSelector = { ...getValue('nodeSelector', {}) };
                  delete nodeSelector[key];
                  nodeSelector[e.target.value] = value;
                  updateField('nodeSelector', nodeSelector);
                }}
                placeholder="disktype"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs">Value</Label>
              <Input
                value={value}
                onChange={(e) => {
                  const nodeSelector = { ...getValue('nodeSelector', {}) };
                  nodeSelector[key] = e.target.value;
                  updateField('nodeSelector', nodeSelector);
                }}
                placeholder="ssd"
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => {
                const nodeSelector = { ...getValue('nodeSelector', {}) };
                delete nodeSelector[key];
                updateField('nodeSelector', nodeSelector);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Tolerations */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Tolerations (optional)</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const tolerations = getValue('tolerations', []);
              updateField('tolerations', [
                ...tolerations,
                { key: '', operator: 'Equal', value: '', effect: 'NoSchedule' },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Toleration
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Allow pods to run on tainted nodes (e.g., control-plane nodes, GPU nodes)
        </p>

        {getValue('tolerations', []).map((toleration: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-3 space-y-2 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Toleration {idx + 1}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  const tolerations = getValue('tolerations', []);
                  updateField(
                    'tolerations',
                    tolerations.filter((_: any, i: number) => i !== idx)
                  );
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Key</Label>
                <Input
                  value={toleration.key || ''}
                  onChange={(e) => {
                    const tolerations = [...getValue('tolerations', [])];
                    tolerations[idx] = { ...tolerations[idx], key: e.target.value };
                    updateField('tolerations', tolerations);
                  }}
                  placeholder="node-role.kubernetes.io/control-plane"
                />
              </div>
              <div>
                <Label className="text-xs">Operator</Label>
                <select
                  value={toleration.operator || 'Equal'}
                  onChange={(e) => {
                    const tolerations = [...getValue('tolerations', [])];
                    tolerations[idx] = { ...tolerations[idx], operator: e.target.value };
                    updateField('tolerations', tolerations);
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  <option value="Equal">Equal</option>
                  <option value="Exists">Exists</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Value (if Equal)</Label>
                <Input
                  value={toleration.value || ''}
                  onChange={(e) => {
                    const tolerations = [...getValue('tolerations', [])];
                    tolerations[idx] = { ...tolerations[idx], value: e.target.value };
                    updateField('tolerations', tolerations);
                  }}
                  placeholder=""
                  disabled={toleration.operator === 'Exists'}
                />
              </div>
              <div>
                <Label className="text-xs">Effect</Label>
                <select
                  value={toleration.effect || 'NoSchedule'}
                  onChange={(e) => {
                    const tolerations = [...getValue('tolerations', [])];
                    tolerations[idx] = { ...tolerations[idx], effect: e.target.value };
                    updateField('tolerations', tolerations);
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  <option value="NoSchedule">NoSchedule</option>
                  <option value="PreferNoSchedule">PreferNoSchedule</option>
                  <option value="NoExecute">NoExecute</option>
                </select>
              </div>
            </div>
          </div>
        ))}
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
                  placeholder="fluentd:latest"
                  required
                />
              </div>
            </div>

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
                  placeholder="100m"
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
                  placeholder="128Mi"
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
                  placeholder="200m"
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
                  placeholder="256Mi"
                />
              </div>
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
      </div>
    </div>
  );
}
