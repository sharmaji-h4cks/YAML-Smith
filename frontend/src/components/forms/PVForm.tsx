import { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

interface PVFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function PVForm({ data, onChange }: PVFormProps) {
  const [volumeSourceType, setVolumeSourceType] = useState('hostPath');

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

  const toggleAccessMode = (mode: string) => {
    const accessModes = getValue('accessModes', ['ReadWriteOnce']);
    const currentModes = [...accessModes];
    const index = currentModes.indexOf(mode);

    if (index > -1) {
      if (currentModes.length > 1) {
        currentModes.splice(index, 1);
      }
    } else {
      currentModes.push(mode);
    }

    updateField('accessModes', currentModes);
  };

  // Initialize defaults
  if (!data.metadata) {
    onChange({
      metadata: { name: 'pv-storage', labels: {} },
      capacity: { storage: '10Gi' },
      accessModes: ['ReadWriteOnce'],
      persistentVolumeReclaimPolicy: 'Retain',
      hostPath: { path: '/mnt/data' },
    });
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> PersistentVolume is cluster-scoped. Consider using StorageClass for dynamic provisioning instead of static PVs.
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-4">
        <h3 className="font-semibold">Metadata</h3>
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={getValue('metadata.name')}
            onChange={(e) => updateField('metadata.name', e.target.value)}
            placeholder="pv-storage"
            required
          />
        </div>
      </div>

      {/* Capacity */}
      <div>
        <Label htmlFor="capacity">Storage Capacity *</Label>
        <Input
          id="capacity"
          value={getValue('capacity.storage')}
          onChange={(e) => updateField('capacity.storage', e.target.value)}
          placeholder="10Gi"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Examples: 1Gi, 10Gi, 100Gi, 1Ti
        </p>
      </div>

      {/* Access Modes */}
      <div>
        <Label>Access Modes *</Label>
        <div className="space-y-2 mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={getValue('accessModes', ['ReadWriteOnce']).includes('ReadWriteOnce')}
              onChange={() => toggleAccessMode('ReadWriteOnce')}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              <strong>ReadWriteOnce (RWO)</strong> - Single node read-write
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={getValue('accessModes', ['ReadWriteOnce']).includes('ReadOnlyMany')}
              onChange={() => toggleAccessMode('ReadOnlyMany')}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              <strong>ReadOnlyMany (ROX)</strong> - Multiple nodes read-only
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={getValue('accessModes', ['ReadWriteOnce']).includes('ReadWriteMany')}
              onChange={() => toggleAccessMode('ReadWriteMany')}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              <strong>ReadWriteMany (RWX)</strong> - Multiple nodes read-write (requires NFS or cloud-specific storage)
            </span>
          </label>
        </div>
      </div>

      {/* Reclaim Policy */}
      <div>
        <Label>Reclaim Policy</Label>
        <select
          value={getValue('persistentVolumeReclaimPolicy', 'Retain')}
          onChange={(e) => updateField('persistentVolumeReclaimPolicy', e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="Retain">Retain - Keep data after PVC deletion</option>
          <option value="Recycle">Recycle - Basic scrub (deprecated)</option>
          <option value="Delete">Delete - Remove data permanently</option>
        </select>
        <p className="text-xs text-muted-foreground mt-1">
          Retain is recommended for important data
        </p>
      </div>

      {/* Storage Class Name (optional) */}
      <div>
        <Label htmlFor="storageClassName">Storage Class Name (optional)</Label>
        <Input
          id="storageClassName"
          value={getValue('storageClassName')}
          onChange={(e) => updateField('storageClassName', e.target.value)}
          placeholder="Leave empty for default or manual binding"
        />
      </div>

      {/* Volume Source Type Selector */}
      <div className="space-y-4">
        <h3 className="font-semibold">Volume Source</h3>
        <div className="flex gap-2 flex-wrap">
          {['hostPath', 'nfs', 'awsElasticBlockStore', 'gcePersistentDisk'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setVolumeSourceType(type);
                // Clear other volume sources
                const newData = { ...data };
                delete newData.hostPath;
                delete newData.nfs;
                delete newData.awsElasticBlockStore;
                delete newData.gcePersistentDisk;
                onChange(newData);
              }}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                volumeSourceType === type
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-accent'
              }`}
            >
              {type === 'awsElasticBlockStore' ? 'AWS EBS' :
               type === 'gcePersistentDisk' ? 'GCE PD' :
               type === 'hostPath' ? 'Host Path' :
               'NFS'}
            </button>
          ))}
        </div>

        {/* hostPath */}
        {volumeSourceType === 'hostPath' && (
          <div className="space-y-4 border rounded-lg p-4 bg-yellow-50">
            <p className="text-sm text-yellow-900">
              ⚠️ <strong>Warning:</strong> hostPath is tied to a specific node and unsuitable for production. Use cloud storage instead.
            </p>
            <div>
              <Label htmlFor="hostPath">Host Path *</Label>
              <Input
                id="hostPath"
                value={getValue('hostPath.path')}
                onChange={(e) => updateField('hostPath.path', e.target.value)}
                placeholder="/mnt/data"
                required
              />
            </div>
            <div>
              <Label htmlFor="hostPathType">Type (optional)</Label>
              <select
                id="hostPathType"
                value={getValue('hostPath.type', '')}
                onChange={(e) => updateField('hostPath.type', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              >
                <option value="">Not specified</option>
                <option value="Directory">Directory</option>
                <option value="DirectoryOrCreate">DirectoryOrCreate</option>
                <option value="File">File</option>
                <option value="FileOrCreate">FileOrCreate</option>
              </select>
            </div>
          </div>
        )}

        {/* NFS */}
        {volumeSourceType === 'nfs' && (
          <div className="space-y-4 border rounded-lg p-4">
            <div>
              <Label htmlFor="nfsServer">NFS Server *</Label>
              <Input
                id="nfsServer"
                value={getValue('nfs.server')}
                onChange={(e) => updateField('nfs.server', e.target.value)}
                placeholder="nfs-server.example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="nfsPath">NFS Path *</Label>
              <Input
                id="nfsPath"
                value={getValue('nfs.path')}
                onChange={(e) => updateField('nfs.path', e.target.value)}
                placeholder="/exported/path"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="nfsReadOnly"
                checked={getValue('nfs.readOnly', false)}
                onChange={(e) => updateField('nfs.readOnly', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="nfsReadOnly" className="cursor-pointer">
                Read Only
              </Label>
            </div>
          </div>
        )}

        {/* AWS EBS */}
        {volumeSourceType === 'awsElasticBlockStore' && (
          <div className="space-y-4 border rounded-lg p-4">
            <div>
              <Label htmlFor="volumeID">Volume ID *</Label>
              <Input
                id="volumeID"
                value={getValue('awsElasticBlockStore.volumeID')}
                onChange={(e) => updateField('awsElasticBlockStore.volumeID', e.target.value)}
                placeholder="vol-0123456789abcdef"
                required
              />
            </div>
            <div>
              <Label htmlFor="fsType">Filesystem Type</Label>
              <Input
                id="fsType"
                value={getValue('awsElasticBlockStore.fsType', 'ext4')}
                onChange={(e) => updateField('awsElasticBlockStore.fsType', e.target.value)}
                placeholder="ext4"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ebsReadOnly"
                checked={getValue('awsElasticBlockStore.readOnly', false)}
                onChange={(e) => updateField('awsElasticBlockStore.readOnly', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="ebsReadOnly" className="cursor-pointer">
                Read Only
              </Label>
            </div>
          </div>
        )}

        {/* GCE Persistent Disk */}
        {volumeSourceType === 'gcePersistentDisk' && (
          <div className="space-y-4 border rounded-lg p-4">
            <div>
              <Label htmlFor="pdName">Disk Name *</Label>
              <Input
                id="pdName"
                value={getValue('gcePersistentDisk.pdName')}
                onChange={(e) => updateField('gcePersistentDisk.pdName', e.target.value)}
                placeholder="my-disk-name"
                required
              />
            </div>
            <div>
              <Label htmlFor="gceFsType">Filesystem Type</Label>
              <Input
                id="gceFsType"
                value={getValue('gcePersistentDisk.fsType', 'ext4')}
                onChange={(e) => updateField('gcePersistentDisk.fsType', e.target.value)}
                placeholder="ext4"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="gceReadOnly"
                checked={getValue('gcePersistentDisk.readOnly', false)}
                onChange={(e) => updateField('gcePersistentDisk.readOnly', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="gceReadOnly" className="cursor-pointer">
                Read Only
              </Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
