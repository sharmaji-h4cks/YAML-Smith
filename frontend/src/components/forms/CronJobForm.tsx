import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface CronJobFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function CronJobForm({ data, onChange }: CronJobFormProps) {
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

  const cronPresets = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Daily at midnight', value: '0 0 * * *' },
    { label: 'Daily at 6 AM', value: '0 6 * * *' },
    { label: 'Weekly on Sunday', value: '0 0 * * 0' },
    { label: 'First day of month', value: '0 0 1 * *' },
  ];

  // Initialize defaults
  if (!data.metadata) {
    onChange({
      metadata: { name: 'scheduled-job', namespace: 'default', labels: { app: 'scheduled-job' } },
      schedule: '0 0 * * *',
      concurrencyPolicy: 'Forbid',
      suspend: false,
      successfulJobsHistoryLimit: 3,
      failedJobsHistoryLimit: 1,
      jobTemplate: {
        completions: 1,
        parallelism: 1,
        backoffLimit: 6,
        restartPolicy: 'Never',
        containers: [
          {
            name: 'scheduled-task',
            image: 'busybox:latest',
            command: ['sh', '-c', 'echo Running scheduled task && date'],
          },
        ],
      },
    });
    return null;
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900">
          CronJobs run Jobs on a schedule (like cron). Use for periodic tasks: backups, reports, cleanups.
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

      {/* Schedule Configuration */}
      <div className="space-y-4">
        <h3 className="font-semibold">Schedule Configuration</h3>

        <div>
          <Label htmlFor="schedule">Cron Schedule *</Label>
          <Input
            id="schedule"
            value={getValue('schedule', '0 0 * * *')}
            onChange={(e) => updateField('schedule', e.target.value)}
            placeholder="0 0 * * *"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Format: minute hour day month weekday (e.g., "0 0 * * *" = daily at midnight)
          </p>
          <a
            href="https://crontab.guru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
          >
            Test your cron expression <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div>
          <Label>Schedule Presets</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {cronPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => updateField('schedule', preset.value)}
                className="px-2 py-1 text-xs rounded-md border hover:bg-accent transition-colors text-left"
              >
                <div className="font-medium">{preset.label}</div>
                <div className="text-muted-foreground">{preset.value}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="concurrencyPolicy">Concurrency Policy</Label>
            <select
              id="concurrencyPolicy"
              value={getValue('concurrencyPolicy', 'Forbid')}
              onChange={(e) => updateField('concurrencyPolicy', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Forbid">Forbid - Skip if previous job still running</option>
              <option value="Allow">Allow - Run concurrently</option>
              <option value="Replace">Replace - Cancel previous and start new</option>
            </select>
          </div>
          <div>
            <Label htmlFor="startingDeadlineSeconds">Starting Deadline (seconds, optional)</Label>
            <Input
              id="startingDeadlineSeconds"
              type="number"
              min="0"
              value={getValue('startingDeadlineSeconds', '')}
              onChange={(e) => updateField('startingDeadlineSeconds', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="No deadline"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Deadline to start missed jobs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="successfulJobsHistoryLimit">Successful Jobs History</Label>
            <Input
              id="successfulJobsHistoryLimit"
              type="number"
              min="0"
              value={getValue('successfulJobsHistoryLimit', 3)}
              onChange={(e) => updateField('successfulJobsHistoryLimit', parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Keep last N successful jobs
            </p>
          </div>
          <div>
            <Label htmlFor="failedJobsHistoryLimit">Failed Jobs History</Label>
            <Input
              id="failedJobsHistoryLimit"
              type="number"
              min="0"
              value={getValue('failedJobsHistoryLimit', 1)}
              onChange={(e) => updateField('failedJobsHistoryLimit', parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Keep last N failed jobs
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="suspend"
            checked={getValue('suspend', false)}
            onChange={(e) => updateField('suspend', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="suspend" className="cursor-pointer">
            Suspend CronJob (temporarily pause execution)
          </Label>
        </div>
      </div>

      {/* Job Template */}
      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold">Job Template</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="completions">Completions</Label>
            <Input
              id="completions"
              type="number"
              min="1"
              value={getValue('jobTemplate.completions', 1)}
              onChange={(e) => updateField('jobTemplate.completions', parseInt(e.target.value) || 1)}
            />
          </div>
          <div>
            <Label htmlFor="parallelism">Parallelism</Label>
            <Input
              id="parallelism"
              type="number"
              min="1"
              value={getValue('jobTemplate.parallelism', 1)}
              onChange={(e) => updateField('jobTemplate.parallelism', parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="backoffLimit">Backoff Limit</Label>
          <Input
            id="backoffLimit"
            type="number"
            min="0"
            value={getValue('jobTemplate.backoffLimit', 6)}
            onChange={(e) => updateField('jobTemplate.backoffLimit', parseInt(e.target.value) || 0)}
          />
        </div>

        <div>
          <Label>Restart Policy</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="restartPolicy"
                value="Never"
                checked={getValue('jobTemplate.restartPolicy', 'Never') === 'Never'}
                onChange={(e) => updateField('jobTemplate.restartPolicy', e.target.value)}
                className="h-4 w-4"
              />
              <span className="text-sm">Never</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="restartPolicy"
                value="OnFailure"
                checked={getValue('jobTemplate.restartPolicy', 'Never') === 'OnFailure'}
                onChange={(e) => updateField('jobTemplate.restartPolicy', e.target.value)}
                className="h-4 w-4"
              />
              <span className="text-sm">OnFailure</span>
            </label>
          </div>
        </div>
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
              const containers = getValue('jobTemplate.containers', []);
              updateField('jobTemplate.containers', [
                ...containers,
                {
                  name: `container-${containers.length + 1}`,
                  image: 'busybox:latest',
                  command: ['sh', '-c', 'echo Scheduled task && date'],
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Container
          </Button>
        </div>

        {getValue('jobTemplate.containers', []).map((container: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-4 space-y-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Container {idx + 1}</h4>
              {getValue('jobTemplate.containers', []).length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const containers = getValue('jobTemplate.containers', []);
                    updateField(
                      'jobTemplate.containers',
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
                    const containers = [...getValue('jobTemplate.containers', [])];
                    containers[idx] = { ...containers[idx], name: e.target.value };
                    updateField('jobTemplate.containers', containers);
                  }}
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Image *</Label>
                <Input
                  value={container.image || ''}
                  onChange={(e) => {
                    const containers = [...getValue('jobTemplate.containers', [])];
                    containers[idx] = { ...containers[idx], image: e.target.value };
                    updateField('jobTemplate.containers', containers);
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
                  const containers = [...getValue('jobTemplate.containers', [])];
                  containers[idx] = {
                    ...containers[idx],
                    command: e.target.value ? e.target.value.split(' ') : undefined,
                  };
                  updateField('jobTemplate.containers', containers);
                }}
                placeholder='sh -c "echo Task complete && date"'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
