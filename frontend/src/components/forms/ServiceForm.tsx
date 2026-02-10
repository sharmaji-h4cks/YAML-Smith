import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface ServiceFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function ServiceForm({ data, onChange }: ServiceFormProps) {
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
      metadata: { name: 'myapp-service', namespace: 'default', labels: { app: 'myapp' } },
      type: 'ClusterIP',
      selector: { app: 'myapp' },
      ports: [{ port: 80, targetPort: 80 }],
    });
    return null;
  }

  return (
    <div className="space-y-6">
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

      {/* Service Type */}
      <div>
        <Label htmlFor="type">Service Type</Label>
        <select
          id="type"
          value={getValue('type', 'ClusterIP')}
          onChange={(e) => updateField('type', e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="ClusterIP">ClusterIP</option>
          <option value="NodePort">NodePort</option>
          <option value="LoadBalancer">LoadBalancer</option>
        </select>
      </div>

      {/* Ports */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Ports</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const ports = getValue('ports', []);
              updateField('ports', [...ports, { port: 80, targetPort: 80 }]);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Port
          </Button>
        </div>

        {getValue('ports', []).map((port: any, idx: number) => (
          <div key={idx} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className="text-xs">Port</Label>
              <Input
                type="number"
                min="1"
                max="65535"
                value={port.port || ''}
                onChange={(e) => {
                  const ports = [...getValue('ports', [])];
                  ports[idx] = { ...ports[idx], port: parseInt(e.target.value) };
                  updateField('ports', ports);
                }}
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs">Target Port</Label>
              <Input
                type="number"
                min="1"
                max="65535"
                value={port.targetPort || ''}
                onChange={(e) => {
                  const ports = [...getValue('ports', [])];
                  ports[idx] = { ...ports[idx], targetPort: parseInt(e.target.value) };
                  updateField('ports', ports);
                }}
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => {
                const ports = getValue('ports', []);
                updateField(
                  'ports',
                  ports.filter((_: any, i: number) => i !== idx)
                );
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Selector */}
      <div>
        <Label>Selector (app label)</Label>
        <Input
          value={getValue('selector.app', 'myapp')}
          onChange={(e) => updateField('selector.app', e.target.value)}
          placeholder="myapp"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Must match the labels of the pods you want to expose
        </p>
      </div>
    </div>
  );
}
