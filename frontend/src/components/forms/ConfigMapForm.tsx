import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';

interface ConfigMapFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function ConfigMapForm({ data, onChange }: ConfigMapFormProps) {
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
      metadata: { name: 'myapp-config', namespace: 'default' },
      data: { 'app.properties': 'key=value' },
    });
    return null;
  }

  const dataEntries = Object.entries(getValue('data', {}));

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

      {/* Data */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Data</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const currentData = getValue('data', {});
              updateField('data', { ...currentData, [`key${Date.now()}`]: 'value' });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </Button>
        </div>

        {dataEntries.map(([key, value], idx) => (
          <div key={idx} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Input
                value={key}
                onChange={(e) => {
                  const currentData = getValue('data', {});
                  const newData = { ...currentData };
                  delete newData[key];
                  newData[e.target.value] = value;
                  updateField('data', newData);
                }}
                placeholder="Key"
                className="flex-1 mr-2"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  const currentData = getValue('data', {});
                  const newData = { ...currentData };
                  delete newData[key];
                  updateField('data', newData);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={value as string}
              onChange={(e) => {
                const currentData = getValue('data', {});
                updateField('data', { ...currentData, [key]: e.target.value });
              }}
              placeholder="Value"
              rows={3}
            />
          </div>
        ))}

        {dataEntries.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No data entries. Click "Add Entry" to add configuration data.
          </p>
        )}
      </div>
    </div>
  );
}
