import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';

interface SecretFormProps {
  data: any;
  onChange: (data: any) => void;
}

const SECRET_TYPES = [
  { value: 'Opaque', label: 'Opaque', description: 'Generic secret (default)' },
  { value: 'kubernetes.io/service-account-token', label: 'Service Account Token', description: 'Service account token' },
  { value: 'kubernetes.io/dockercfg', label: 'Docker Config (legacy)', description: 'Legacy Docker registry' },
  { value: 'kubernetes.io/dockerconfigjson', label: 'Docker Config JSON', description: 'Docker registry credentials' },
  { value: 'kubernetes.io/basic-auth', label: 'Basic Auth', description: 'Username and password' },
  { value: 'kubernetes.io/ssh-auth', label: 'SSH Auth', description: 'SSH private key' },
  { value: 'kubernetes.io/tls', label: 'TLS', description: 'TLS certificate and key' },
];

export default function SecretForm({ data, onChange }: SecretFormProps) {
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
      metadata: { name: 'app-secret', namespace: 'default' },
      type: 'Opaque',
      stringData: { 'API_KEY': 'your-secret-here' },
    });
    return null;
  }

  const stringDataEntries = Object.entries(getValue('stringData', {}));
  const secretType = getValue('type', 'Opaque');

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

      {/* Secret Type */}
      <div className="space-y-2">
        <Label htmlFor="secretType">Secret Type</Label>
        <select
          id="secretType"
          value={secretType}
          onChange={(e) => updateField('type', e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {SECRET_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          {SECRET_TYPES.find(t => t.value === secretType)?.description}
        </p>
      </div>

      {/* Security Warning */}
      <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900 dark:text-amber-200">
          <strong>Security Note:</strong> stringData values are visible in the generated manifest.
          In production, use external secret management (Sealed Secrets, External Secrets Operator, etc.).
        </div>
      </div>

      {/* String Data */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Secret Data</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const currentData = getValue('stringData', {});
              updateField('stringData', { ...currentData, [`key${Date.now()}`]: '' });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </Button>
        </div>

        {stringDataEntries.map(([key, value], idx) => (
          <div key={idx} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Input
                value={key}
                onChange={(e) => {
                  const currentData = getValue('stringData', {});
                  const newData = { ...currentData };
                  delete newData[key];
                  newData[e.target.value] = value;
                  updateField('stringData', newData);
                }}
                placeholder="Key (e.g., API_KEY, username, tls.crt)"
                className="flex-1 mr-2"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  const currentData = getValue('stringData', {});
                  const newData = { ...currentData };
                  delete newData[key];
                  updateField('stringData', newData);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={value as string}
              onChange={(e) => {
                const currentData = getValue('stringData', {});
                updateField('stringData', { ...currentData, [key]: e.target.value });
              }}
              placeholder="Value"
              rows={3}
            />
          </div>
        ))}

        {stringDataEntries.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No secret entries. Click "Add Entry" to add secret data.
          </p>
        )}
      </div>

      {/* Type-Specific Hints */}
      {secretType === 'kubernetes.io/basic-auth' && (
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
          <strong>Basic Auth Hint:</strong> Include keys: <code className="bg-background px-1 py-0.5 rounded">username</code> and <code className="bg-background px-1 py-0.5 rounded">password</code>
        </div>
      )}
      {secretType === 'kubernetes.io/tls' && (
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
          <strong>TLS Hint:</strong> Include keys: <code className="bg-background px-1 py-0.5 rounded">tls.crt</code> and <code className="bg-background px-1 py-0.5 rounded">tls.key</code>
        </div>
      )}
      {secretType === 'kubernetes.io/ssh-auth' && (
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
          <strong>SSH Auth Hint:</strong> Include key: <code className="bg-background px-1 py-0.5 rounded">ssh-privatekey</code>
        </div>
      )}
      {secretType === 'kubernetes.io/dockerconfigjson' && (
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
          <strong>Docker Config Hint:</strong> Include key: <code className="bg-background px-1 py-0.5 rounded">.dockerconfigjson</code> with JSON formatted Docker credentials
        </div>
      )}
    </div>
  );
}
