import { Info } from 'lucide-react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Checkbox } from '../ui/Checkbox';

interface PVCFormProps {
  data: any;
  onChange: (data: any) => void;
}

const ACCESS_MODES = [
  { value: 'ReadWriteOnce', label: 'ReadWriteOnce (RWO)', description: 'Volume can be mounted read-write by a single node' },
  { value: 'ReadOnlyMany', label: 'ReadOnlyMany (ROX)', description: 'Volume can be mounted read-only by many nodes' },
  { value: 'ReadWriteMany', label: 'ReadWriteMany (RWX)', description: 'Volume can be mounted read-write by many nodes' },
];

export default function PVCForm({ data, onChange }: PVCFormProps) {
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
      metadata: { name: 'app-data', namespace: 'default' },
      accessModes: ['ReadWriteOnce'],
      resources: { requests: { storage: '10Gi' } },
      volumeMode: 'Filesystem',
      storageClassName: 'standard',
    });
    return null;
  }

  const accessModes = getValue('accessModes', ['ReadWriteOnce']);
  const volumeMode = getValue('volumeMode', 'Filesystem');

  const toggleAccessMode = (mode: string) => {
    const currentModes = [...accessModes];
    const index = currentModes.indexOf(mode);

    if (index > -1) {
      // Don't allow removing if it's the last one
      if (currentModes.length > 1) {
        currentModes.splice(index, 1);
      }
    } else {
      currentModes.push(mode);
    }

    updateField('accessModes', currentModes);
  };

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

      {/* Storage Configuration */}
      <div className="space-y-4">
        <h3 className="font-semibold">Storage Configuration</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="storage">Storage Size *</Label>
            <Input
              id="storage"
              value={getValue('resources.requests.storage')}
              onChange={(e) => updateField('resources.requests.storage', e.target.value)}
              placeholder="10Gi"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Examples: 1Gi, 10Gi, 100Gi, 1Ti
            </p>
          </div>
          <div>
            <Label htmlFor="storageClass">Storage Class Name</Label>
            <Input
              id="storageClass"
              value={getValue('storageClassName', '')}
              onChange={(e) => updateField('storageClassName', e.target.value)}
              placeholder="standard"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Common: standard, gp2, fast, ssd
            </p>
          </div>
        </div>
      </div>

      {/* Access Modes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label>Access Modes *</Label>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Select at least one access mode. Not all storage classes support all modes.
        </p>

        <div className="space-y-3">
          {ACCESS_MODES.map((mode) => (
            <div key={mode.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                id={mode.value}
                checked={accessModes.includes(mode.value)}
                onCheckedChange={() => toggleAccessMode(mode.value)}
                disabled={accessModes.length === 1 && accessModes.includes(mode.value)}
              />
              <div className="flex-1">
                <Label htmlFor={mode.value} className="font-normal cursor-pointer">
                  {mode.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {mode.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {accessModes.includes('ReadWriteMany') && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md text-sm">
            <Info className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="text-amber-900 dark:text-amber-200">
              <strong>Note:</strong> ReadWriteMany (RWX) is not supported by all storage classes. Verify your storage provider supports this mode.
            </span>
          </div>
        )}
      </div>

      {/* Volume Mode */}
      <div className="space-y-3">
        <Label>Volume Mode</Label>
        <p className="text-sm text-muted-foreground">
          Choose how the volume should be consumed by pods.
        </p>

        <div className="space-y-2">
          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              id="filesystem"
              name="volumeMode"
              value="Filesystem"
              checked={volumeMode === 'Filesystem'}
              onChange={(e) => updateField('volumeMode', e.target.value)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="filesystem" className="font-normal cursor-pointer">
                Filesystem
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Volume is mounted into pods as a filesystem directory (default)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <input
              type="radio"
              id="block"
              name="volumeMode"
              value="Block"
              checked={volumeMode === 'Block'}
              onChange={(e) => updateField('volumeMode', e.target.value)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="block" className="font-normal cursor-pointer">
                Block
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Volume is provided as a raw block device (for databases with direct block access)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
