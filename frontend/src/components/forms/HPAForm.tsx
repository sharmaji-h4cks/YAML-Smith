import { useState } from 'react';
import { Plus, Trash2, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface HPAFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function HPAForm({ data, onChange }: HPAFormProps) {
  const [advancedMode, setAdvancedMode] = useState(false);

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
      metadata: { name: 'app-hpa', namespace: 'default' },
      scaleTargetRef: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        name: 'myapp',
      },
      minReplicas: 2,
      maxReplicas: 10,
      targetCPUUtilizationPercentage: 80,
    });
    return null;
  }

  const metrics = getValue('metrics', []);
  const targetKind = getValue('scaleTargetRef.kind', 'Deployment');

  const addMetric = () => {
    const currentMetrics = getValue('metrics', []);
    updateField('metrics', [
      ...currentMetrics,
      {
        type: 'Resource',
        resource: {
          name: 'cpu',
          target: {
            type: 'Utilization',
            averageUtilization: 80,
          },
        },
      },
    ]);
  };

  const removeMetric = (index: number) => {
    const currentMetrics = getValue('metrics', []);
    const newMetrics = currentMetrics.filter((_: any, i: number) => i !== index);
    updateField('metrics', newMetrics);
  };

  const updateMetric = (index: number, field: string, value: any) => {
    const currentMetrics = [...getValue('metrics', [])];
    const keys = field.split('.');
    let current = currentMetrics[index];

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    updateField('metrics', currentMetrics);
  };

  const toggleMode = () => {
    if (!advancedMode) {
      // Switching to advanced mode: remove targetCPUUtilizationPercentage, add basic metric
      const newData = { ...data };
      delete newData.targetCPUUtilizationPercentage;
      newData.metrics = [
        {
          type: 'Resource',
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization',
              averageUtilization: getValue('targetCPUUtilizationPercentage', 80),
            },
          },
        },
      ];
      onChange(newData);
    } else {
      // Switching to simple mode: remove metrics, add targetCPUUtilizationPercentage
      const newData = { ...data };
      delete newData.metrics;
      newData.targetCPUUtilizationPercentage = 80;
      onChange(newData);
    }
    setAdvancedMode(!advancedMode);
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

      {/* Scale Target */}
      <div className="space-y-4">
        <h3 className="font-semibold">Scale Target</h3>
        <p className="text-sm text-muted-foreground">
          Specify the workload to scale (must exist in the cluster)
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="targetKind">Target Kind *</Label>
            <select
              id="targetKind"
              value={targetKind}
              onChange={(e) => {
                updateField('scaleTargetRef.kind', e.target.value);
                // Update apiVersion based on kind
                if (e.target.value === 'StatefulSet' || e.target.value === 'Deployment' || e.target.value === 'ReplicaSet') {
                  updateField('scaleTargetRef.apiVersion', 'apps/v1');
                }
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Deployment">Deployment</option>
              <option value="StatefulSet">StatefulSet</option>
              <option value="ReplicaSet">ReplicaSet</option>
            </select>
          </div>
          <div>
            <Label htmlFor="targetName">Target Name *</Label>
            <Input
              id="targetName"
              value={getValue('scaleTargetRef.name')}
              onChange={(e) => updateField('scaleTargetRef.name', e.target.value)}
              placeholder="myapp"
              required
            />
          </div>
        </div>
      </div>

      {/* Replica Limits */}
      <div className="space-y-4">
        <h3 className="font-semibold">Replica Limits</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minReplicas">Minimum Replicas *</Label>
            <Input
              id="minReplicas"
              type="number"
              min="1"
              value={getValue('minReplicas', 1)}
              onChange={(e) => updateField('minReplicas', parseInt(e.target.value) || 1)}
              required
            />
          </div>
          <div>
            <Label htmlFor="maxReplicas">Maximum Replicas *</Label>
            <Input
              id="maxReplicas"
              type="number"
              min="1"
              value={getValue('maxReplicas', 10)}
              onChange={(e) => updateField('maxReplicas', parseInt(e.target.value) || 10)}
              required
            />
          </div>
        </div>
        {getValue('minReplicas', 1) < 2 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md text-sm">
            <Info className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="text-amber-900 dark:text-amber-200">
              <strong>Warning:</strong> Setting minReplicas to less than 2 may impact high availability.
            </span>
          </div>
        )}
      </div>

      {/* Scaling Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Scaling Metrics</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={toggleMode}
          >
            {advancedMode ? 'Switch to Simple Mode' : 'Switch to Advanced Mode'}
          </Button>
        </div>

        {!advancedMode ? (
          // Simple Mode - Just CPU percentage
          <div className="space-y-3">
            <Label htmlFor="cpuTarget">Target CPU Utilization (%)</Label>
            <p className="text-sm text-muted-foreground">
              Scale when average CPU usage exceeds this percentage
            </p>
            <Input
              id="cpuTarget"
              type="number"
              min="1"
              max="100"
              value={getValue('targetCPUUtilizationPercentage', 80)}
              onChange={(e) => updateField('targetCPUUtilizationPercentage', parseInt(e.target.value) || 80)}
            />
            <div className="p-3 bg-muted rounded-md text-sm">
              <strong>Preview:</strong> Will scale between {getValue('minReplicas', 1)}-{getValue('maxReplicas', 10)} replicas when CPU &gt; {getValue('targetCPUUtilizationPercentage', 80)}%
            </div>
          </div>
        ) : (
          // Advanced Mode - Custom metrics
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Configure custom scaling metrics (CPU, memory, or custom metrics)
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addMetric}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Metric
              </Button>
            </div>

            {metrics.map((metric: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Metric {index + 1}</h4>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeMetric(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Metric Type</Label>
                    <select
                      value={metric.type || 'Resource'}
                      onChange={(e) => updateMetric(index, 'type', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Resource">Resource (CPU/Memory)</option>
                      <option value="Pods">Pods</option>
                      <option value="Object">Object</option>
                      <option value="External">External</option>
                    </select>
                  </div>

                  {metric.type === 'Resource' && (
                    <>
                      <div>
                        <Label>Resource Name</Label>
                        <select
                          value={metric.resource?.name || 'cpu'}
                          onChange={(e) => updateMetric(index, 'resource.name', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="cpu">CPU</option>
                          <option value="memory">Memory</option>
                        </select>
                      </div>

                      <div>
                        <Label>Target Type</Label>
                        <select
                          value={metric.resource?.target?.type || 'Utilization'}
                          onChange={(e) => updateMetric(index, 'resource.target.type', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="Utilization">Utilization (%)</option>
                          <option value="AverageValue">Average Value</option>
                        </select>
                      </div>

                      <div>
                        <Label>Target Value</Label>
                        {metric.resource?.target?.type === 'Utilization' ? (
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={metric.resource?.target?.averageUtilization || 80}
                            onChange={(e) => updateMetric(index, 'resource.target.averageUtilization', parseInt(e.target.value) || 80)}
                            placeholder="80"
                          />
                        ) : (
                          <Input
                            type="text"
                            value={metric.resource?.target?.averageValue || ''}
                            onChange={(e) => updateMetric(index, 'resource.target.averageValue', e.target.value)}
                            placeholder="500m or 512Mi"
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {metrics.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No metrics configured. Click "Add Metric" to add scaling metrics.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
