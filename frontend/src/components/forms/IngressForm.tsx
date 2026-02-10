import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface IngressFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function IngressForm({ data, onChange }: IngressFormProps) {
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
      metadata: { name: 'myapp-ingress', namespace: 'default' },
      ingressClassName: 'nginx',
      rules: [
        {
          host: 'example.com',
          http: {
            paths: [
              {
                path: '/',
                pathType: 'Prefix',
                backend: {
                  service: {
                    name: 'myapp-service',
                    port: { number: 80 },
                  },
                },
              },
            ],
          },
        },
      ],
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

      {/* Ingress Class */}
      <div>
        <Label htmlFor="ingressClass">Ingress Class</Label>
        <Input
          id="ingressClass"
          value={getValue('ingressClassName', 'nginx')}
          onChange={(e) => updateField('ingressClassName', e.target.value)}
          placeholder="nginx"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Common values: nginx, traefik, alb
        </p>
      </div>

      {/* Rules */}
      <div className="space-y-2">
        <Label>Rules</Label>
        {getValue('rules', []).map((rule: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Rule {idx + 1}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  const rules = getValue('rules', []);
                  updateField(
                    'rules',
                    rules.filter((_: any, i: number) => i !== idx)
                  );
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Label className="text-xs">Host</Label>
              <Input
                value={rule.host || ''}
                onChange={(e) => {
                  const rules = [...getValue('rules', [])];
                  rules[idx] = { ...rules[idx], host: e.target.value };
                  updateField('rules', rules);
                }}
                placeholder="example.com"
              />
            </div>

            <div>
              <Label className="text-xs">Path</Label>
              <Input
                value={rule.http?.paths?.[0]?.path || '/'}
                onChange={(e) => {
                  const rules = [...getValue('rules', [])];
                  rules[idx] = {
                    ...rules[idx],
                    http: {
                      ...rules[idx].http,
                      paths: [
                        {
                          ...rules[idx].http?.paths?.[0],
                          path: e.target.value,
                        },
                      ],
                    },
                  };
                  updateField('rules', rules);
                }}
                placeholder="/"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Service Name</Label>
                <Input
                  value={rule.http?.paths?.[0]?.backend?.service?.name || ''}
                  onChange={(e) => {
                    const rules = [...getValue('rules', [])];
                    rules[idx] = {
                      ...rules[idx],
                      http: {
                        ...rules[idx].http,
                        paths: [
                          {
                            ...rules[idx].http?.paths?.[0],
                            backend: {
                              service: {
                                ...rules[idx].http?.paths?.[0]?.backend?.service,
                                name: e.target.value,
                              },
                            },
                          },
                        ],
                      },
                    };
                    updateField('rules', rules);
                  }}
                  placeholder="myapp-service"
                />
              </div>
              <div>
                <Label className="text-xs">Service Port</Label>
                <Input
                  type="number"
                  value={rule.http?.paths?.[0]?.backend?.service?.port?.number || ''}
                  onChange={(e) => {
                    const rules = [...getValue('rules', [])];
                    rules[idx] = {
                      ...rules[idx],
                      http: {
                        ...rules[idx].http,
                        paths: [
                          {
                            ...rules[idx].http?.paths?.[0],
                            backend: {
                              service: {
                                ...rules[idx].http?.paths?.[0]?.backend?.service,
                                port: { number: parseInt(e.target.value) },
                              },
                            },
                          },
                        ],
                      },
                    };
                    updateField('rules', rules);
                  }}
                  placeholder="80"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
