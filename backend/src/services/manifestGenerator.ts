import yaml from 'js-yaml';
import {
  ManifestInput,
  DeploymentInput,
  ServiceInput,
  ConfigMapInput,
  SecretInput,
  IngressInput,
  PVCInput,
  HPAInput,
  StorageClassInput,
  PVInput,
  StatefulSetInput,
  DaemonSetInput,
  JobInput,
  CronJobInput,
} from '../schemas/k8sSchemas';

export class ManifestGenerator {
  private input: ManifestInput;

  constructor(input: ManifestInput) {
    this.input = input;
  }

  generate(): string {
    const manifests: any[] = [];

    // Add namespace if requested
    if (this.input.includeNamespace) {
      const namespace = this.generateNamespace();
      if (namespace) manifests.push(namespace);
    }

    // Generate the requested resource type
    switch (this.input.resourceType) {
      case 'Deployment':
        if (this.input.deployment) {
          manifests.push(this.generateDeployment(this.input.deployment));
        }
        break;
      case 'Service':
        if (this.input.service) {
          manifests.push(this.generateService(this.input.service));
        }
        break;
      case 'ConfigMap':
        if (this.input.configMap) {
          manifests.push(this.generateConfigMap(this.input.configMap));
        }
        break;
      case 'Secret':
        if (this.input.secret) {
          manifests.push(this.generateSecret(this.input.secret));
        }
        break;
      case 'Ingress':
        if (this.input.ingress) {
          manifests.push(this.generateIngress(this.input.ingress));
        }
        break;
      case 'PersistentVolumeClaim':
        if (this.input.pvc) {
          manifests.push(this.generatePVC(this.input.pvc));
        }
        break;
      case 'HorizontalPodAutoscaler':
        if (this.input.hpa) {
          manifests.push(this.generateHPA(this.input.hpa));
        }
        break;
      case 'StorageClass':
        if (this.input.storageClass) {
          manifests.push(this.generateStorageClass(this.input.storageClass));
        }
        break;
      case 'PersistentVolume':
        if (this.input.pv) {
          manifests.push(this.generatePV(this.input.pv));
        }
        break;
      case 'StatefulSet':
        if (this.input.statefulSet) {
          manifests.push(this.generateStatefulSet(this.input.statefulSet));
        }
        break;
      case 'DaemonSet':
        if (this.input.daemonSet) {
          manifests.push(this.generateDaemonSet(this.input.daemonSet));
        }
        break;
      case 'Job':
        if (this.input.job) {
          manifests.push(this.generateJob(this.input.job));
        }
        break;
      case 'CronJob':
        if (this.input.cronJob) {
          manifests.push(this.generateCronJob(this.input.cronJob));
        }
        break;
    }

    // Convert to YAML
    return manifests.map(m => yaml.dump(m, { indent: 2, lineWidth: 120 })).join('---\n');
  }

  private generateNamespace(): any {
    const namespace = this.getNamespace();
    if (namespace === 'default') return null;

    return {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: namespace,
      },
    };
  }

  private generateDeployment(input: DeploymentInput): any {
    const manifest: any = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        replicas: input.replicas,
        selector: {
          matchLabels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
        },
        template: {
          metadata: {
            labels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
            annotations: this.cleanObject(input.metadata.annotations),
          },
          spec: {
            containers: input.containers.map(c => this.generateContainer(c)),
          },
        },
      },
    };

    // Add strategy
    if (input.strategy) {
      manifest.spec.strategy = {
        type: input.strategy.type,
      };
      if (input.strategy.type === 'RollingUpdate' && input.strategy.rollingUpdate) {
        manifest.spec.strategy.rollingUpdate = input.strategy.rollingUpdate;
      }
    }

    // Add init containers
    if (input.initContainers && input.initContainers.length > 0) {
      manifest.spec.template.spec.initContainers = input.initContainers.map(c => this.generateContainer(c));
    }

    // Add volumes
    if (input.volumes && input.volumes.length > 0) {
      manifest.spec.template.spec.volumes = input.volumes.map(v => this.generateVolume(v));
    }

    // Add service account
    if (input.serviceAccountName) {
      manifest.spec.template.spec.serviceAccountName = input.serviceAccountName;
    }

    // Add node selector
    if (input.nodeSelector && Object.keys(input.nodeSelector).length > 0) {
      manifest.spec.template.spec.nodeSelector = input.nodeSelector;
    }

    // Add tolerations
    if (input.tolerations && input.tolerations.length > 0) {
      manifest.spec.template.spec.tolerations = input.tolerations;
    }

    // Add affinity
    if (input.affinity) {
      manifest.spec.template.spec.affinity = input.affinity;
    }

    return this.cleanObject(manifest);
  }

  private generateContainer(container: any): any {
    const c: any = {
      name: container.name,
      image: container.image,
      imagePullPolicy: container.imagePullPolicy,
    };

    if (container.command && container.command.length > 0) {
      c.command = container.command;
    }

    if (container.args && container.args.length > 0) {
      c.args = container.args;
    }

    if (container.ports && container.ports.length > 0) {
      c.ports = container.ports.map((p: any) => this.cleanObject({
        name: p.name,
        containerPort: p.containerPort,
        protocol: p.protocol,
      }));
    }

    if (container.env && container.env.length > 0) {
      c.env = container.env.map((e: any) => this.cleanObject({
        name: e.name,
        value: e.value,
        valueFrom: e.valueFrom,
      }));
    }

    if (container.resources) {
      c.resources = this.cleanObject(container.resources);
    }

    if (container.volumeMounts && container.volumeMounts.length > 0) {
      c.volumeMounts = container.volumeMounts;
    }

    if (container.livenessProbe) {
      c.livenessProbe = this.generateProbe(container.livenessProbe);
    }

    if (container.readinessProbe) {
      c.readinessProbe = this.generateProbe(container.readinessProbe);
    }

    if (container.startupProbe) {
      c.startupProbe = this.generateProbe(container.startupProbe);
    }

    return this.cleanObject(c);
  }

  private generateProbe(probe: any): any {
    const p: any = {};

    if (probe.httpGet) {
      p.httpGet = this.cleanObject(probe.httpGet);
    } else if (probe.exec) {
      p.exec = probe.exec;
    } else if (probe.tcpSocket) {
      p.tcpSocket = probe.tcpSocket;
    }

    p.initialDelaySeconds = probe.initialDelaySeconds;
    p.periodSeconds = probe.periodSeconds;
    p.timeoutSeconds = probe.timeoutSeconds;
    p.successThreshold = probe.successThreshold;
    p.failureThreshold = probe.failureThreshold;

    return this.cleanObject(p);
  }

  private generateVolume(volume: any): any {
    const v: any = {
      name: volume.name,
    };

    switch (volume.type) {
      case 'emptyDir':
        v.emptyDir = {};
        break;
      case 'configMap':
        v.configMap = volume.configMap;
        break;
      case 'secret':
        v.secret = volume.secret;
        break;
      case 'persistentVolumeClaim':
        v.persistentVolumeClaim = volume.persistentVolumeClaim;
        break;
      case 'hostPath':
        v.hostPath = volume.hostPath;
        break;
    }

    return this.cleanObject(v);
  }

  private generateService(input: ServiceInput): any {
    const manifest: any = {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        type: input.type,
        selector: input.selector || { app: input.metadata.name },
        ports: input.ports.map(p => this.cleanObject({
          name: p.name,
          port: p.port,
          targetPort: p.targetPort || p.port,
          protocol: p.protocol,
          nodePort: p.nodePort,
        })),
        sessionAffinity: input.sessionAffinity,
      },
    };

    if (input.loadBalancerIP) {
      manifest.spec.loadBalancerIP = input.loadBalancerIP;
    }

    if (input.externalTrafficPolicy) {
      manifest.spec.externalTrafficPolicy = input.externalTrafficPolicy;
    }

    return this.cleanObject(manifest);
  }

  private generateConfigMap(input: ConfigMapInput): any {
    return this.cleanObject({
      apiVersion: 'v1',
      kind: 'ConfigMap',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      data: input.data,
      binaryData: input.binaryData,
    });
  }

  private generateSecret(input: SecretInput): any {
    return this.cleanObject({
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      type: input.type,
      data: input.data,
      stringData: input.stringData,
    });
  }

  private generateIngress(input: IngressInput): any {
    const manifest: any = {
      apiVersion: 'networking.k8s.io/v1',
      kind: 'Ingress',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        ingressClassName: input.ingressClassName,
        rules: input.rules,
      },
    };

    if (input.tls && input.tls.length > 0) {
      manifest.spec.tls = input.tls;
    }

    return this.cleanObject(manifest);
  }

  private generatePVC(input: PVCInput): any {
    return this.cleanObject({
      apiVersion: 'v1',
      kind: 'PersistentVolumeClaim',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        accessModes: input.accessModes,
        storageClassName: input.storageClassName,
        resources: input.resources,
        volumeMode: input.volumeMode,
      },
    });
  }

  private generateHPA(input: HPAInput): any {
    const manifest: any = {
      apiVersion: 'autoscaling/v2',
      kind: 'HorizontalPodAutoscaler',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        scaleTargetRef: input.scaleTargetRef,
        minReplicas: input.minReplicas,
        maxReplicas: input.maxReplicas,
      },
    };

    if (input.metrics && input.metrics.length > 0) {
      manifest.spec.metrics = input.metrics;
    } else if (input.targetCPUUtilizationPercentage) {
      manifest.spec.metrics = [
        {
          type: 'Resource',
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization',
              averageUtilization: input.targetCPUUtilizationPercentage,
            },
          },
        },
      ];
    }

    return this.cleanObject(manifest);
  }

  private generateStorageClass(input: StorageClassInput): any {
    return this.cleanObject({
      apiVersion: 'storage.k8s.io/v1',
      kind: 'StorageClass',
      metadata: {
        name: input.metadata.name,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      provisioner: input.provisioner,
      parameters: input.parameters,
      reclaimPolicy: input.reclaimPolicy,
      allowVolumeExpansion: input.allowVolumeExpansion,
      volumeBindingMode: input.volumeBindingMode,
      mountOptions: input.mountOptions,
    });
  }

  private generatePV(input: PVInput): any {
    const manifest: any = {
      apiVersion: 'v1',
      kind: 'PersistentVolume',
      metadata: {
        name: input.metadata.name,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        capacity: input.capacity,
        accessModes: input.accessModes,
        persistentVolumeReclaimPolicy: input.persistentVolumeReclaimPolicy,
        storageClassName: input.storageClassName,
        volumeMode: input.volumeMode,
      },
    };

    // Add volume source (only one should be present)
    if (input.hostPath) {
      manifest.spec.hostPath = input.hostPath;
    } else if (input.nfs) {
      manifest.spec.nfs = input.nfs;
    } else if (input.awsElasticBlockStore) {
      manifest.spec.awsElasticBlockStore = input.awsElasticBlockStore;
    } else if (input.gcePersistentDisk) {
      manifest.spec.gcePersistentDisk = input.gcePersistentDisk;
    }

    return this.cleanObject(manifest);
  }

  private generateStatefulSet(input: StatefulSetInput): any {
    const manifest: any = {
      apiVersion: 'apps/v1',
      kind: 'StatefulSet',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        serviceName: input.serviceName,
        replicas: input.replicas,
        selector: {
          matchLabels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
        },
        template: {
          metadata: {
            labels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
            annotations: this.cleanObject(input.metadata.annotations),
          },
          spec: {
            containers: input.containers.map(c => this.generateContainer(c)),
          },
        },
      },
    };

    if (input.podManagementPolicy) {
      manifest.spec.podManagementPolicy = input.podManagementPolicy;
    }

    if (input.updateStrategy) {
      manifest.spec.updateStrategy = input.updateStrategy;
    }

    if (input.initContainers && input.initContainers.length > 0) {
      manifest.spec.template.spec.initContainers = input.initContainers.map(c => this.generateContainer(c));
    }

    if (input.volumes && input.volumes.length > 0) {
      manifest.spec.template.spec.volumes = input.volumes.map(v => this.generateVolume(v));
    }

    if (input.volumeClaimTemplates && input.volumeClaimTemplates.length > 0) {
      manifest.spec.volumeClaimTemplates = input.volumeClaimTemplates;
    }

    if (input.serviceAccountName) {
      manifest.spec.template.spec.serviceAccountName = input.serviceAccountName;
    }

    if (input.nodeSelector && Object.keys(input.nodeSelector).length > 0) {
      manifest.spec.template.spec.nodeSelector = input.nodeSelector;
    }

    return this.cleanObject(manifest);
  }

  private generateDaemonSet(input: DaemonSetInput): any {
    const manifest: any = {
      apiVersion: 'apps/v1',
      kind: 'DaemonSet',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        selector: {
          matchLabels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
        },
        template: {
          metadata: {
            labels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
            annotations: this.cleanObject(input.metadata.annotations),
          },
          spec: {
            containers: input.containers.map(c => this.generateContainer(c)),
            hostNetwork: input.hostNetwork,
            hostPID: input.hostPID,
          },
        },
      },
    };

    if (input.updateStrategy) {
      manifest.spec.updateStrategy = input.updateStrategy;
    }

    if (input.initContainers && input.initContainers.length > 0) {
      manifest.spec.template.spec.initContainers = input.initContainers.map(c => this.generateContainer(c));
    }

    if (input.volumes && input.volumes.length > 0) {
      manifest.spec.template.spec.volumes = input.volumes.map(v => this.generateVolume(v));
    }

    if (input.serviceAccountName) {
      manifest.spec.template.spec.serviceAccountName = input.serviceAccountName;
    }

    if (input.nodeSelector && Object.keys(input.nodeSelector).length > 0) {
      manifest.spec.template.spec.nodeSelector = input.nodeSelector;
    }

    if (input.tolerations && input.tolerations.length > 0) {
      manifest.spec.template.spec.tolerations = input.tolerations;
    }

    if (input.priorityClassName) {
      manifest.spec.template.spec.priorityClassName = input.priorityClassName;
    }

    return this.cleanObject(manifest);
  }

  private generateJob(input: JobInput): any {
    const manifest: any = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        completions: input.completions,
        parallelism: input.parallelism,
        backoffLimit: input.backoffLimit,
        activeDeadlineSeconds: input.activeDeadlineSeconds,
        ttlSecondsAfterFinished: input.ttlSecondsAfterFinished,
        completionMode: input.completionMode,
        template: {
          metadata: {
            labels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
          },
          spec: {
            restartPolicy: input.restartPolicy,
            containers: input.containers.map(c => this.generateContainer(c)),
          },
        },
      },
    };

    if (input.initContainers && input.initContainers.length > 0) {
      manifest.spec.template.spec.initContainers = input.initContainers.map(c => this.generateContainer(c));
    }

    if (input.volumes && input.volumes.length > 0) {
      manifest.spec.template.spec.volumes = input.volumes.map(v => this.generateVolume(v));
    }

    if (input.serviceAccountName) {
      manifest.spec.template.spec.serviceAccountName = input.serviceAccountName;
    }

    return this.cleanObject(manifest);
  }

  private generateCronJob(input: CronJobInput): any {
    return this.cleanObject({
      apiVersion: 'batch/v1',
      kind: 'CronJob',
      metadata: {
        name: input.metadata.name,
        namespace: input.metadata.namespace,
        labels: this.cleanObject(input.metadata.labels),
        annotations: this.cleanObject(input.metadata.annotations),
      },
      spec: {
        schedule: input.schedule,
        concurrencyPolicy: input.concurrencyPolicy,
        successfulJobsHistoryLimit: input.successfulJobsHistoryLimit,
        failedJobsHistoryLimit: input.failedJobsHistoryLimit,
        startingDeadlineSeconds: input.startingDeadlineSeconds,
        suspend: input.suspend,
        jobTemplate: {
          spec: {
            completions: input.jobTemplate.completions,
            parallelism: input.jobTemplate.parallelism,
            backoffLimit: input.jobTemplate.backoffLimit,
            activeDeadlineSeconds: input.jobTemplate.activeDeadlineSeconds,
            ttlSecondsAfterFinished: input.jobTemplate.ttlSecondsAfterFinished,
            template: {
              metadata: {
                labels: this.cleanObject(input.metadata.labels) || { app: input.metadata.name },
              },
              spec: {
                restartPolicy: input.jobTemplate.restartPolicy,
                containers: input.jobTemplate.containers.map(c => this.generateContainer(c)),
                initContainers: input.jobTemplate.initContainers && input.jobTemplate.initContainers.length > 0
                  ? input.jobTemplate.initContainers.map(c => this.generateContainer(c))
                  : undefined,
                volumes: input.jobTemplate.volumes && input.jobTemplate.volumes.length > 0
                  ? input.jobTemplate.volumes.map(v => this.generateVolume(v))
                  : undefined,
              },
            },
          },
        },
      },
    });
  }

  private getNamespace(): string {
    switch (this.input.resourceType) {
      case 'Deployment':
        return this.input.deployment?.metadata.namespace || 'default';
      case 'Service':
        return this.input.service?.metadata.namespace || 'default';
      case 'ConfigMap':
        return this.input.configMap?.metadata.namespace || 'default';
      case 'Secret':
        return this.input.secret?.metadata.namespace || 'default';
      case 'Ingress':
        return this.input.ingress?.metadata.namespace || 'default';
      case 'PersistentVolumeClaim':
        return this.input.pvc?.metadata.namespace || 'default';
      case 'HorizontalPodAutoscaler':
        return this.input.hpa?.metadata.namespace || 'default';
      case 'StatefulSet':
        return this.input.statefulSet?.metadata.namespace || 'default';
      case 'DaemonSet':
        return this.input.daemonSet?.metadata.namespace || 'default';
      case 'Job':
        return this.input.job?.metadata.namespace || 'default';
      case 'CronJob':
        return this.input.cronJob?.metadata.namespace || 'default';
      // StorageClass and PersistentVolume are cluster-scoped (no namespace)
      case 'StorageClass':
      case 'PersistentVolume':
        return 'default';
      default:
        return 'default';
    }
  }

  private cleanObject(obj: any): any {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
      const cleaned = obj.map(item => this.cleanObject(item)).filter(item => item !== undefined);
      return cleaned.length > 0 ? cleaned : undefined;
    }

    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = this.cleanObject(value);
      if (cleanedValue !== undefined && cleanedValue !== null && cleanedValue !== '' &&
          !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)) {
        cleaned[key] = cleanedValue;
      }
    }

    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  getWarnings(): string[] {
    const warnings: string[] = [];

    switch (this.input.resourceType) {
      case 'Deployment':
        warnings.push(...this.getDeploymentWarnings());
        break;
      case 'Service':
        warnings.push(...this.getServiceWarnings());
        break;
      case 'Secret':
        warnings.push(...this.getSecretWarnings());
        break;
      case 'Ingress':
        warnings.push(...this.getIngressWarnings());
        break;
      case 'StorageClass':
        warnings.push(...this.getStorageClassWarnings());
        break;
      case 'PersistentVolume':
        warnings.push(...this.getPVWarnings());
        break;
      case 'StatefulSet':
        warnings.push(...this.getStatefulSetWarnings());
        break;
      case 'DaemonSet':
        warnings.push(...this.getDaemonSetWarnings());
        break;
      case 'Job':
        warnings.push(...this.getJobWarnings());
        break;
      case 'CronJob':
        warnings.push(...this.getCronJobWarnings());
        break;
    }

    return warnings;
  }

  private getDeploymentWarnings(): string[] {
    const warnings: string[] = [];
    const deployment = this.input.deployment;

    if (!deployment) return warnings;

    // Check for latest tag
    deployment.containers.forEach(container => {
      if (container.image.includes(':latest') || !container.image.includes(':')) {
        warnings.push(`Container "${container.name}": Using "latest" tag is not recommended for production.`);
      }
    });

    // Check for resource limits
    deployment.containers.forEach(container => {
      if (!container.resources?.limits) {
        warnings.push(`Container "${container.name}": No resource limits defined. This can lead to resource exhaustion.`);
      }
    });

    // Check for liveness/readiness probes
    deployment.containers.forEach(container => {
      if (!container.livenessProbe) {
        warnings.push(`Container "${container.name}": No liveness probe defined. Consider adding one for better reliability.`);
      }
      if (!container.readinessProbe) {
        warnings.push(`Container "${container.name}": No readiness probe defined. This affects traffic routing.`);
      }
    });

    // Check replicas
    if (deployment.replicas && deployment.replicas < 2) {
      warnings.push('Running with less than 2 replicas provides no high availability.');
    }

    return warnings;
  }

  private getServiceWarnings(): string[] {
    const warnings: string[] = [];
    const service = this.input.service;

    if (!service) return warnings;

    if (service.type === 'LoadBalancer') {
      warnings.push('LoadBalancer type creates cloud resources and may incur costs.');
    }

    if (service.type === 'NodePort') {
      warnings.push('NodePort exposes service on all nodes. Ensure firewall rules are configured.');
    }

    return warnings;
  }

  private getSecretWarnings(): string[] {
    const warnings: string[] = [];
    const secret = this.input.secret;

    if (!secret) return warnings;

    if (secret.stringData && Object.keys(secret.stringData).length > 0) {
      warnings.push('stringData is stored as plain text in manifests. Consider using sealed secrets or external secret operators.');
    }

    return warnings;
  }

  private getIngressWarnings(): string[] {
    const warnings: string[] = [];
    const ingress = this.input.ingress;

    if (!ingress) return warnings;

    if (!ingress.tls || ingress.tls.length === 0) {
      warnings.push('No TLS configuration. Consider enabling HTTPS for security.');
    }

    return warnings;
  }

  private getStorageClassWarnings(): string[] {
    const warnings: string[] = [];
    const sc = this.input.storageClass;

    if (!sc) return warnings;

    if (sc.reclaimPolicy === 'Delete') {
      warnings.push('Reclaim policy is "Delete". PVs will be deleted when PVCs are removed. Consider "Retain" for important data.');
    }

    if (sc.volumeBindingMode === 'Immediate') {
      warnings.push('volumeBindingMode is "Immediate". Consider "WaitForFirstConsumer" for better pod scheduling in multi-zone clusters.');
    }

    if (!sc.allowVolumeExpansion) {
      warnings.push('allowVolumeExpansion is false. You will not be able to resize volumes after creation.');
    }

    return warnings;
  }

  private getPVWarnings(): string[] {
    const warnings: string[] = [];
    const pv = this.input.pv;

    if (!pv) return warnings;

    if (pv.persistentVolumeReclaimPolicy === 'Delete') {
      warnings.push('Reclaim policy is "Delete". Volume will be deleted when PVC is removed. Use "Retain" for production data.');
    }

    if (pv.hostPath) {
      warnings.push('Using hostPath volume. This ties the volume to a specific node and is not recommended for production.');
    }

    const sourceCount = [pv.hostPath, pv.nfs, pv.awsElasticBlockStore, pv.gcePersistentDisk].filter(s => s).length;
    if (sourceCount === 0) {
      warnings.push('No volume source configured. PV must have one source (hostPath, nfs, awsElasticBlockStore, etc.).');
    }
    if (sourceCount > 1) {
      warnings.push('Multiple volume sources configured. PV should have exactly one source.');
    }

    return warnings;
  }

  private getStatefulSetWarnings(): string[] {
    const warnings: string[] = [];
    const sts = this.input.statefulSet;

    if (!sts) return warnings;

    // Check containers for common issues
    sts.containers.forEach(container => {
      if (container.image.includes(':latest') || !container.image.includes(':')) {
        warnings.push(`Container "${container.name}": Using "latest" tag is not recommended for StatefulSets.`);
      }
      if (!container.resources?.limits) {
        warnings.push(`Container "${container.name}": No resource limits defined. This can lead to resource exhaustion.`);
      }
    });

    // StatefulSet-specific warnings
    if (!sts.volumeClaimTemplates || sts.volumeClaimTemplates.length === 0) {
      warnings.push('No volumeClaimTemplates defined. Consider adding persistent storage for stateful applications.');
    }

    if (!sts.serviceName) {
      warnings.push('No serviceName specified. StatefulSet requires a headless Service (clusterIP: None).');
    }

    if (sts.replicas && sts.replicas < 2) {
      warnings.push('Running with less than 2 replicas provides no high availability for stateful workloads.');
    }

    return warnings;
  }

  private getDaemonSetWarnings(): string[] {
    const warnings: string[] = [];
    const ds = this.input.daemonSet;

    if (!ds) return warnings;

    ds.containers.forEach(container => {
      if (!container.resources?.limits) {
        warnings.push(`Container "${container.name}": DaemonSets run on every node. Resource limits are critical to prevent node instability.`);
      }
    });

    if (ds.hostNetwork) {
      warnings.push('Using hostNetwork=true exposes pod to host network. Ensure this is intentional and secure.');
    }

    if (ds.hostPID) {
      warnings.push('Using hostPID=true gives pod access to host processes. This is a security risk.');
    }

    if (!ds.tolerations || ds.tolerations.length === 0) {
      warnings.push('No tolerations defined. DaemonSet may not run on nodes with taints (e.g., master nodes).');
    }

    return warnings;
  }

  private getJobWarnings(): string[] {
    const warnings: string[] = [];
    const job = this.input.job;

    if (!job) return warnings;

    if (!job.activeDeadlineSeconds) {
      warnings.push('No activeDeadlineSeconds set. Job may run indefinitely if it hangs.');
    }

    if (!job.ttlSecondsAfterFinished) {
      warnings.push('No ttlSecondsAfterFinished set. Completed Jobs will not be automatically cleaned up.');
    }

    if (job.backoffLimit === 0) {
      warnings.push('backoffLimit is 0. Job will not retry on failure.');
    }

    return warnings;
  }

  private getCronJobWarnings(): string[] {
    const warnings: string[] = [];
    const cronJob = this.input.cronJob;

    if (!cronJob) return warnings;

    // Validate cron schedule format (basic check)
    const schedulePattern = /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/;

    if (!schedulePattern.test(cronJob.schedule)) {
      warnings.push(`Invalid cron schedule format: "${cronJob.schedule}". Use format: "* * * * *" (minute hour day month weekday). Verify at crontab.guru`);
    }

    if (cronJob.concurrencyPolicy === 'Allow') {
      warnings.push('concurrencyPolicy is "Allow". Multiple jobs may run concurrently, potentially causing conflicts.');
    }

    if (!cronJob.jobTemplate.ttlSecondsAfterFinished) {
      warnings.push('No ttlSecondsAfterFinished set in jobTemplate. Old Jobs will accumulate over time.');
    }

    if (!cronJob.startingDeadlineSeconds) {
      warnings.push('No startingDeadlineSeconds set. Missed jobs may queue indefinitely.');
    }

    return warnings;
  }

  getSuggestions(): string[] {
    const suggestions: string[] = [];

    // Add resource-specific suggestions based on the resource type
    switch (this.input.resourceType) {
      case 'Deployment':
        const deployment = this.input.deployment;
        suggestions.push('Consider adding a HorizontalPodAutoscaler for automatic scaling based on CPU/memory metrics.');
        suggestions.push('Use PodDisruptionBudgets to maintain availability during rolling updates and node maintenance.');
        suggestions.push('Set resource requests and limits for all containers to ensure proper scheduling and avoid OOM kills.');
        suggestions.push('Add readiness and liveness probes to enable zero-downtime deployments and automatic pod recovery.');
        suggestions.push('Use a RollingUpdate strategy with maxSurge and maxUnavailable for controlled deployments.');
        suggestions.push('Consider using separate ConfigMaps/Secrets for environment-specific configuration.');
        suggestions.push('Add pod anti-affinity rules to spread replicas across multiple nodes for high availability.');
        if (deployment && deployment.replicas && deployment.replicas < 2) {
          suggestions.push('⚠️ Single replica deployments have no redundancy. Consider using at least 2 replicas for production.');
        }
        suggestions.push('Use imagePullPolicy: Always for :latest tags, or IfNotPresent for specific version tags.');
        suggestions.push('Add labels and annotations for better organization and GitOps workflows.');
        break;

      case 'Service':
        const service = this.input.service;
        suggestions.push('Ensure Service selector labels match your Deployment/StatefulSet/DaemonSet pod labels.');
        suggestions.push('Use ClusterIP for internal services, LoadBalancer for external access, or NodePort for specific port access.');
        suggestions.push('Consider using NetworkPolicies to control which pods can access this Service.');
        suggestions.push('For production, use a LoadBalancer Service or Ingress instead of exposing NodePort publicly.');
        suggestions.push('Add health check endpoints to your application for Service health monitoring.');
        if (service?.type === 'LoadBalancer') {
          suggestions.push('LoadBalancer Services may incur cloud provider costs. Consider using Ingress with a single LoadBalancer for multiple services.');
        }
        if (service?.type === 'NodePort') {
          suggestions.push('NodePort services expose ports on all nodes. Ensure firewall rules are properly configured.');
        }
        suggestions.push('Use headless Services (clusterIP: None) for StatefulSets to enable DNS-based pod discovery.');
        break;

      case 'ConfigMap':
        suggestions.push('ConfigMaps store non-sensitive configuration. Use Secrets for passwords, API keys, and tokens.');
        suggestions.push('Reference ConfigMaps in Deployments via environment variables (envFrom) or volume mounts.');
        suggestions.push('Changes to ConfigMaps do not automatically trigger pod restarts. Use tools like Reloader or update deployment annotations.');
        suggestions.push('Use immutable: true for ConfigMaps that should not change after creation (better performance).');
        suggestions.push('Organize ConfigMaps by environment (dev, staging, prod) or by application component.');
        suggestions.push('Keep ConfigMap size under 1MB. For larger config files, use volume mounts from external sources.');
        suggestions.push('Version your ConfigMaps (e.g., myapp-config-v1, myapp-config-v2) for easier rollbacks.');
        break;

      case 'Secret':
        const secret = this.input.secret;
        suggestions.push('⚠️ Secrets are base64-encoded, NOT encrypted at rest by default. Enable encryption at rest in your cluster.');
        suggestions.push('Avoid committing Secrets to git. Use sealed-secrets, external-secrets-operator, or Vault for production.');
        suggestions.push('Use RBAC to restrict which ServiceAccounts can access Secrets.');
        suggestions.push('Consider using workload identity (AWS IAM Roles, GCP Workload Identity, Azure Managed Identity) instead of storing cloud credentials.');
        suggestions.push('Rotate secrets regularly and automate secret rotation where possible.');
        suggestions.push('Use immutable: true for Secrets that should not change (better security and performance).');
        if (secret?.type === 'kubernetes.io/tls') {
          suggestions.push('TLS Secrets require tls.crt and tls.key fields. Use cert-manager for automated certificate management.');
          suggestions.push('Ensure TLS certificates are valid and not expired. Set up monitoring for certificate expiration.');
        }
        if (secret?.type === 'kubernetes.io/dockerconfigjson') {
          suggestions.push('Docker registry Secrets enable pulling images from private registries. Reference in pod spec imagePullSecrets.');
        }
        suggestions.push('Use environment variables for simple secrets, volume mounts for files (certificates, config files).');
        break;

      case 'Ingress':
        const ingress = this.input.ingress;
        suggestions.push('Ingress requires an Ingress Controller (nginx, traefik, HAProxy, etc.) installed in your cluster.');
        suggestions.push('Use TLS termination at Ingress for HTTPS traffic. Create TLS Secrets and reference them in spec.tls.');
        suggestions.push('Add annotations for controller-specific features (rate limiting, CORS, rewrite rules).');
        suggestions.push('Use path-based routing (/api, /web) or host-based routing (api.example.com, web.example.com).');
        suggestions.push('Consider using cert-manager with Let\'s Encrypt for automatic TLS certificate provisioning.');
        suggestions.push('Set up DNS records (A or CNAME) pointing to your Ingress LoadBalancer IP.');
        if (ingress?.tls && ingress.tls.length > 0) {
          suggestions.push('Ensure TLS Secrets exist before applying Ingress. Ingress will not route traffic without valid certificates.');
        }
        suggestions.push('Use ingressClassName to specify which Ingress Controller should handle this Ingress.');
        suggestions.push('Add CORS, authentication, and rate limiting via Ingress annotations or external auth services.');
        break;

      case 'PersistentVolumeClaim':
        const pvc = this.input.pvc;
        suggestions.push('Verify StorageClass supports your required accessModes before creating PVC.');
        suggestions.push('Use volumeMode: Block for databases requiring raw block device access (e.g., MySQL, PostgreSQL).');
        suggestions.push('ReadWriteMany requires NFS or cloud-specific storage (AWS EFS, Azure Files, GCP Filestore).');
        suggestions.push('Monitor PVC usage with Prometheus metrics to right-size storage requests and avoid running out of space.');
        suggestions.push('Use allowVolumeExpansion: true in StorageClass to enable resizing PVCs without downtime.');
        if (pvc?.accessModes?.includes('ReadWriteMany')) {
          suggestions.push('⚠️ ReadWriteMany is not supported by all StorageClasses. Verify your cloud provider supports RWX access.');
        }
        suggestions.push('Set appropriate storage size. Under-provisioning causes failures, over-provisioning wastes costs.');
        suggestions.push('Use VolumeSnapshots to back up data before major changes or deletions.');
        suggestions.push('For StatefulSets, use volumeClaimTemplates instead of pre-created PVCs for automatic provisioning.');
        break;

      case 'HorizontalPodAutoscaler':
        const hpa = this.input.hpa;
        suggestions.push('Ensure Metrics Server is installed in your cluster for CPU/memory-based autoscaling.');
        suggestions.push('Set resource requests in target workload. HPA uses requests as the baseline for percentage calculations.');
        suggestions.push('Start with CPU-based scaling (targetCPUUtilizationPercentage) before adding custom metrics.');
        suggestions.push('Set minReplicas ≥ 2 for high availability. Single-replica apps have no redundancy during scaling.');
        if (hpa && hpa.minReplicas && hpa.minReplicas < 2) {
          suggestions.push('⚠️ minReplicas is set to 1. Consider using at least 2 replicas for production availability.');
        }
        suggestions.push('Use custom metrics (from Prometheus, Datadog, etc.) for application-specific scaling (queue length, request rate).');
        suggestions.push('Test HPA behavior under load to tune min/max replicas and target utilization values.');
        suggestions.push('Monitor HPA events with kubectl describe hpa to debug scaling decisions.');
        suggestions.push('Combine HPA with Cluster Autoscaler for automatic node scaling when pod resources are exhausted.');
        break;

      case 'StorageClass':
        const sc = this.input.storageClass;
        suggestions.push('StorageClass defines storage provisioners for dynamic PVC creation.');
        suggestions.push('Use reclaimPolicy: Retain for important data to prevent accidental deletion when PVC is deleted.');
        suggestions.push('Set allowVolumeExpansion: true to enable resizing PVCs without downtime.');
        suggestions.push('Use volumeBindingMode: WaitForFirstConsumer for multi-zone clusters to ensure volumes are created in the same zone as pods.');
        if (sc?.volumeBindingMode === 'Immediate') {
          suggestions.push('volumeBindingMode: Immediate may cause scheduling issues in multi-zone clusters. Consider WaitForFirstConsumer.');
        }
        suggestions.push('Configure storage parameters based on cloud provider (AWS: type=gp3, iops; GCP: type=pd-ssd; Azure: storageaccounttype).');
        suggestions.push('Test StorageClass with a sample PVC before using in production workloads.');
        suggestions.push('Set default StorageClass with annotation: storageclass.kubernetes.io/is-default-class: "true".');
        break;

      case 'PersistentVolume':
        const pv = this.input.pv;
        suggestions.push('PersistentVolumes are cluster-scoped. Use for static provisioning when StorageClass dynamic provisioning is not available.');
        suggestions.push('Use reclaimPolicy: Retain to preserve data after PVC deletion. Delete policy removes data permanently.');
        suggestions.push('Match PV accessModes with PVC accessModes for successful binding.');
        suggestions.push('Specify storageClassName to bind PV to specific StorageClass, or use empty string for default.');
        if (pv?.hostPath) {
          suggestions.push('⚠️ hostPath volumes are tied to specific nodes and unsuitable for production. Use cloud-based storage (EBS, GCE PD) or NFS.');
        }
        if (pv?.nfs) {
          suggestions.push('NFS volumes support ReadWriteMany. Ensure NFS server is highly available and network-accessible from all nodes.');
        }
        suggestions.push('Set nodeAffinity to restrict PV binding to specific nodes (useful for local storage).');
        suggestions.push('Use VolumeSnapshots and VolumeSnapshotClasses for backup and disaster recovery.');
        break;

      case 'StatefulSet':
        const sts = this.input.statefulSet;
        suggestions.push('StatefulSets require a headless Service (clusterIP: None) for stable network identity (pod-0.service.namespace.svc).');
        suggestions.push('Use volumeClaimTemplates for automatic PVC creation per replica. Each pod gets its own persistent storage.');
        suggestions.push('Set podManagementPolicy: Parallel for faster scaling, or OrderedReady for sequential pod creation.');
        suggestions.push('StatefulSets are ideal for databases (MySQL, PostgreSQL), message queues (Kafka, RabbitMQ), and stateful apps.');
        if (!sts?.serviceName) {
          suggestions.push('⚠️ serviceName is required for StatefulSets. Create a headless Service first.');
        }
        if (sts?.volumeClaimTemplates && sts.volumeClaimTemplates.length > 0) {
          suggestions.push('Ensure StorageClass exists for volumeClaimTemplates. PVCs will not be created if StorageClass is missing.');
        }
        suggestions.push('Use updateStrategy: RollingUpdate with partition for canary deployments and gradual rollouts.');
        suggestions.push('Set resource requests/limits and add liveness/readiness probes for stable operation.');
        suggestions.push('StatefulSet pods are not interchangeable. Ensure applications handle stable hostnames and persistent storage correctly.');
        break;

      case 'DaemonSet':
        const ds = this.input.daemonSet;
        suggestions.push('DaemonSets run one pod per node. Use for node-level services (logging agents, monitoring, CNI, storage).');
        suggestions.push('Add tolerations to run on control-plane/master nodes if needed (e.g., node-role.kubernetes.io/control-plane:NoSchedule).');
        if (ds?.hostNetwork) {
          suggestions.push('⚠️ hostNetwork: true allows pods to use host network. Ensure this is necessary and pods are trusted.');
        }
        if (ds?.hostPID) {
          suggestions.push('⚠️ hostPID: true allows access to host processes. Use only for trusted system-level workloads.');
        }
        suggestions.push('Use nodeSelector or nodeAffinity to target specific node types (e.g., nodes with GPUs, SSDs).');
        suggestions.push('DaemonSets automatically scale with cluster nodes. Monitor resource usage to avoid exhausting node resources.');
        suggestions.push('Common DaemonSet use cases: Fluentd/Fluent Bit (logging), Prometheus Node Exporter (monitoring), Calico/Cilium (networking).');
        suggestions.push('Set updateStrategy: RollingUpdate with maxUnavailable to control update rollout speed.');
        break;

      case 'Job':
        suggestions.push('Jobs run pods to completion. Use for batch processing, data migrations, backups, one-time tasks.');
        suggestions.push('Set completions for number of successful pod completions required (default: 1).');
        suggestions.push('Use parallelism to run multiple pods concurrently for faster processing.');
        suggestions.push('Set backoffLimit to limit retry attempts on pod failures (default: 6).');
        suggestions.push('Use activeDeadlineSeconds to timeout long-running jobs and prevent resource waste.');
        suggestions.push('Set ttlSecondsAfterFinished to automatically clean up completed Jobs (e.g., 3600 = 1 hour retention).');
        suggestions.push('Use restartPolicy: Never if job should not retry on failure, or OnFailure to retry failed containers.');
        suggestions.push('Monitor Job status with kubectl get jobs and kubectl logs job/<name> for debugging.');
        suggestions.push('Use initContainers for setup tasks (download data, wait for dependencies) before main job execution.');
        break;

      case 'CronJob':
        const cronJob = this.input.cronJob;
        suggestions.push('CronJobs run Jobs on a schedule (like cron). Use for periodic tasks: backups, reports, cleanups.');
        suggestions.push('Test cron schedule syntax at crontab.guru before deploying.');
        suggestions.push('Set concurrencyPolicy: Forbid to prevent overlapping job runs, or Allow for parallel execution.');
        if (cronJob?.concurrencyPolicy === 'Allow') {
          suggestions.push('concurrencyPolicy: Allow can cause resource contention if jobs run longer than schedule interval.');
        }
        suggestions.push('Set startingDeadlineSeconds to skip jobs if they miss their scheduled time (e.g., cluster downtime).');
        suggestions.push('Use successfulJobsHistoryLimit and failedJobsHistoryLimit to control job history retention (default: 3 and 1).');
        suggestions.push('Set suspend: true to temporarily pause CronJob execution without deleting it.');
        suggestions.push('Monitor CronJob execution with kubectl get cronjobs and kubectl get jobs to verify scheduled runs.');
        suggestions.push('Add resource limits to prevent runaway jobs from consuming excessive resources.');
        if (cronJob?.schedule) {
          suggestions.push(`Schedule: "${cronJob.schedule}". Verify this matches your intended frequency.`);
        }
        break;
    }

    // Add general suggestions for all resource types
    suggestions.push('Use kubectl apply -f manifest.yaml to deploy this resource to your cluster.');
    suggestions.push('Use kubectl describe and kubectl logs for troubleshooting deployment issues.');
    suggestions.push('Consider organizing manifests with Kustomize overlays or Helm charts for multi-environment management.');
    suggestions.push('Implement GitOps workflows with ArgoCD or FluxCD for automated deployments from git repositories.');
    suggestions.push('Add resource quotas and limit ranges at namespace level to prevent resource abuse.');
    suggestions.push('Use labels consistently (app, component, version, environment) for better organization and monitoring.');
    suggestions.push('Enable audit logging and monitor Kubernetes API access for security compliance.');

    return suggestions;
  }

  // ========== ENHANCED DEPENDENCY & SUGGESTION SYSTEM ==========

  /**
   * Returns list of resources that this resource depends on
   */
  getDependencies(): Array<{ resourceType: string; reason: string; required: boolean }> {
    const deps: Array<{ resourceType: string; reason: string; required: boolean }> = [];

    switch (this.input.resourceType) {
      case 'PersistentVolumeClaim':
        deps.push({
          resourceType: 'StorageClass',
          reason: 'Dynamic provisioning requires a StorageClass. Ensure the specified StorageClass exists or create one.',
          required: false,
        });
        deps.push({
          resourceType: 'PersistentVolume',
          reason: 'Static provisioning binds to a manually created PersistentVolume.',
          required: false,
        });
        break;

      case 'StatefulSet':
        const stsData = this.input.statefulSet;
        deps.push({
          resourceType: 'Service (Headless)',
          reason: 'StatefulSet requires a headless Service (clusterIP: None) for stable network identity.',
          required: true,
        });
        if (stsData?.volumeClaimTemplates && stsData.volumeClaimTemplates.length > 0) {
          deps.push({
            resourceType: 'StorageClass',
            reason: 'VolumeClaimTemplates require StorageClass for dynamic provisioning.',
            required: true,
          });
        }
        break;

      case 'Service':
        deps.push({
          resourceType: 'Deployment / StatefulSet / DaemonSet',
          reason: 'Service selector must match pod labels from a workload resource.',
          required: true,
        });
        break;

      case 'Ingress':
        deps.push({
          resourceType: 'Service',
          reason: 'Ingress routes traffic to Services. Ensure the backend Service exists.',
          required: true,
        });
        const ingressData = this.input.ingress;
        if (ingressData?.tls && ingressData.tls.length > 0) {
          deps.push({
            resourceType: 'Secret (TLS)',
            reason: 'TLS configuration requires a Secret containing tls.crt and tls.key.',
            required: true,
          });
        }
        break;

      case 'HorizontalPodAutoscaler':
        deps.push({
          resourceType: 'Deployment / StatefulSet',
          reason: 'HPA scales the target workload. Ensure the scaleTargetRef resource exists.',
          required: true,
        });
        deps.push({
          resourceType: 'Metrics Server',
          reason: 'HPA requires Metrics Server installed in the cluster for CPU/memory metrics.',
          required: true,
        });
        break;

      case 'PersistentVolume':
        const pvData = this.input.pv;
        if (pvData?.storageClassName) {
          deps.push({
            resourceType: 'StorageClass',
            reason: `PV references StorageClass "${pvData.storageClassName}" for classification.`,
            required: false,
          });
        }
        break;
    }

    return deps;
  }

  /**
   * Returns list of resources that would complement this resource
   */
  getRelatedResources(): Array<{ resourceType: string; reason: string }> {
    const related: Array<{ resourceType: string; reason: string }> = [];

    switch (this.input.resourceType) {
      case 'StorageClass':
        related.push({
          resourceType: 'PersistentVolumeClaim',
          reason: 'Use this StorageClass for dynamic volume provisioning in PVCs.',
        });
        related.push({
          resourceType: 'StatefulSet',
          reason: 'Use in volumeClaimTemplates for stateful application storage.',
        });
        break;

      case 'PersistentVolume':
        related.push({
          resourceType: 'PersistentVolumeClaim',
          reason: 'Bind a PVC to this PV for static provisioning.',
        });
        break;

      case 'PersistentVolumeClaim':
        related.push({
          resourceType: 'Deployment',
          reason: 'Mount this PVC in pod volumes for persistent storage.',
        });
        related.push({
          resourceType: 'StatefulSet',
          reason: 'Mount this PVC for stateful workload storage.',
        });
        related.push({
          resourceType: 'Job',
          reason: 'Mount this PVC for batch processing with persistent data.',
        });
        break;

      case 'ConfigMap':
        related.push({
          resourceType: 'Deployment',
          reason: 'Inject configuration via environment variables or volume mounts.',
        });
        related.push({
          resourceType: 'StatefulSet',
          reason: 'Mount config files for stateful applications.',
        });
        break;

      case 'Secret':
        related.push({
          resourceType: 'Deployment',
          reason: 'Inject secrets via environment variables or volume mounts.',
        });
        related.push({
          resourceType: 'Ingress',
          reason: 'Use for TLS certificate configuration.',
        });
        break;

      case 'Deployment':
      case 'StatefulSet':
      case 'DaemonSet':
        related.push({
          resourceType: 'Service',
          reason: 'Expose pods via Service for internal/external access.',
        });
        if (this.input.resourceType !== 'DaemonSet') {
          related.push({
            resourceType: 'HorizontalPodAutoscaler',
            reason: 'Enable automatic scaling based on CPU/memory metrics.',
          });
        }
        related.push({
          resourceType: 'ConfigMap',
          reason: 'Store configuration data separately from container images.',
        });
        related.push({
          resourceType: 'Secret',
          reason: 'Store sensitive data like passwords and API keys.',
        });
        break;

      case 'Service':
        related.push({
          resourceType: 'Ingress',
          reason: 'Expose Service externally with HTTP/HTTPS routing and load balancing.',
        });
        break;

      case 'Job':
        related.push({
          resourceType: 'CronJob',
          reason: 'Schedule this Job to run on a cron schedule for periodic execution.',
        });
        break;
    }

    return related;
  }

  /**
   * Returns resource-specific kubectl commands
   */
  getDeploymentCommands(): Array<{ description: string; command: string }> {
    const commands: Array<{ description: string; command: string }> = [];
    const resourceType = this.input.resourceType;
    const name = this.getResourceName();
    const namespace = this.getNamespace();

    // Apply command
    commands.push({
      description: 'Apply to cluster',
      command: 'kubectl apply -f manifest.yaml',
    });

    // Dry-run validation
    commands.push({
      description: 'Validate locally (dry-run)',
      command: 'kubectl apply --dry-run=client -f manifest.yaml',
    });

    // Resource-specific commands
    switch (resourceType) {
      case 'Deployment':
        commands.push({
          description: 'Watch deployment rollout',
          command: `kubectl rollout status deployment/${name} -n ${namespace}`,
        });
        commands.push({
          description: 'View deployment details',
          command: `kubectl get deployment ${name} -n ${namespace} -o wide`,
        });
        commands.push({
          description: 'View pod logs',
          command: `kubectl logs -f deployment/${name} -n ${namespace}`,
        });
        commands.push({
          description: 'Scale deployment',
          command: `kubectl scale deployment/${name} --replicas=5 -n ${namespace}`,
        });
        break;

      case 'StatefulSet':
        commands.push({
          description: 'Watch StatefulSet status',
          command: `kubectl rollout status statefulset/${name} -n ${namespace}`,
        });
        commands.push({
          description: 'View StatefulSet pods',
          command: `kubectl get pods -l app=${name} -n ${namespace} -o wide`,
        });
        commands.push({
          description: 'View persistent volumes',
          command: `kubectl get pvc -l app=${name} -n ${namespace}`,
        });
        break;

      case 'DaemonSet':
        commands.push({
          description: 'View DaemonSet status',
          command: `kubectl get daemonset ${name} -n ${namespace} -o wide`,
        });
        commands.push({
          description: 'View pods on each node',
          command: `kubectl get pods -l app=${name} -n ${namespace} -o wide`,
        });
        break;

      case 'Job':
        commands.push({
          description: 'Watch Job completion',
          command: `kubectl wait --for=condition=complete job/${name} -n ${namespace} --timeout=300s`,
        });
        commands.push({
          description: 'View Job status',
          command: `kubectl get job ${name} -n ${namespace}`,
        });
        commands.push({
          description: 'View Job logs',
          command: `kubectl logs job/${name} -n ${namespace}`,
        });
        break;

      case 'CronJob':
        commands.push({
          description: 'View CronJob schedule',
          command: `kubectl get cronjob ${name} -n ${namespace}`,
        });
        commands.push({
          description: 'View recent Job executions',
          command: `kubectl get jobs --selector=job-name=${name} -n ${namespace}`,
        });
        commands.push({
          description: 'Trigger Job manually',
          command: `kubectl create job --from=cronjob/${name} ${name}-manual-\${RANDOM} -n ${namespace}`,
        });
        break;

      case 'Service':
        commands.push({
          description: 'View Service details',
          command: `kubectl get service ${name} -n ${namespace} -o wide`,
        });
        commands.push({
          description: 'View Service endpoints',
          command: `kubectl get endpoints ${name} -n ${namespace}`,
        });
        commands.push({
          description: 'Test Service connectivity',
          command: `kubectl run test-pod --rm -it --image=busybox --restart=Never -- wget -O- ${name}.${namespace}.svc.cluster.local`,
        });
        break;

      case 'Ingress':
        commands.push({
          description: 'View Ingress details',
          command: `kubectl get ingress ${name} -n ${namespace}`,
        });
        commands.push({
          description: 'Describe Ingress (see events)',
          command: `kubectl describe ingress ${name} -n ${namespace}`,
        });
        break;

      case 'ConfigMap':
        commands.push({
          description: 'View ConfigMap data',
          command: `kubectl get configmap ${name} -n ${namespace} -o yaml`,
        });
        commands.push({
          description: 'Edit ConfigMap',
          command: `kubectl edit configmap ${name} -n ${namespace}`,
        });
        break;

      case 'Secret':
        commands.push({
          description: 'View Secret (data base64 encoded)',
          command: `kubectl get secret ${name} -n ${namespace} -o yaml`,
        });
        commands.push({
          description: 'Decode Secret data',
          command: `kubectl get secret ${name} -n ${namespace} -o jsonpath='{.data}' | jq -r 'to_entries[] | "\\(.key): \\(.value | @base64d)"'`,
        });
        break;

      case 'PersistentVolumeClaim':
        commands.push({
          description: 'View PVC status',
          command: `kubectl get pvc ${name} -n ${namespace}`,
        });
        commands.push({
          description: 'View bound PersistentVolume',
          command: `kubectl get pvc ${name} -n ${namespace} -o jsonpath='{.spec.volumeName}' | xargs kubectl get pv`,
        });
        break;

      case 'StorageClass':
        commands.push({
          description: 'View StorageClass details',
          command: `kubectl get storageclass ${name} -o wide`,
        });
        commands.push({
          description: 'View PVCs using this StorageClass',
          command: `kubectl get pvc --all-namespaces --field-selector spec.storageClassName=${name}`,
        });
        break;

      case 'PersistentVolume':
        commands.push({
          description: 'View PV status',
          command: `kubectl get pv ${name}`,
        });
        commands.push({
          description: 'View PV binding details',
          command: `kubectl describe pv ${name}`,
        });
        break;

      case 'HorizontalPodAutoscaler':
        commands.push({
          description: 'View HPA status',
          command: `kubectl get hpa ${name} -n ${namespace}`,
        });
        commands.push({
          description: 'Watch HPA metrics',
          command: `kubectl get hpa ${name} -n ${namespace} --watch`,
        });
        break;
    }

    // Common troubleshooting command
    if (['Deployment', 'StatefulSet', 'DaemonSet', 'Job', 'CronJob'].includes(resourceType)) {
      commands.push({
        description: 'Describe resource (troubleshooting)',
        command: `kubectl describe ${resourceType.toLowerCase()} ${name} -n ${namespace}`,
      });
    }

    return commands;
  }

  /**
   * Returns deployment order recommendations
   */
  getDeploymentOrder(): Array<{ step: number; resources: string[]; description: string }> {
    return [
      {
        step: 1,
        resources: ['Namespace', 'StorageClass'],
        description: 'Infrastructure: Create namespace and storage classes first',
      },
      {
        step: 2,
        resources: ['PersistentVolume'],
        description: 'Storage: Provision persistent volumes (for static provisioning)',
      },
      {
        step: 3,
        resources: ['ConfigMap', 'Secret'],
        description: 'Configuration: Create configuration and secrets before workloads',
      },
      {
        step: 4,
        resources: ['PersistentVolumeClaim'],
        description: 'Storage Claims: Claim storage before mounting in pods',
      },
      {
        step: 5,
        resources: ['Deployment', 'StatefulSet', 'DaemonSet', 'Job', 'CronJob'],
        description: 'Workloads: Deploy applications',
      },
      {
        step: 6,
        resources: ['Service'],
        description: 'Networking: Create services to expose workloads',
      },
      {
        step: 7,
        resources: ['Ingress'],
        description: 'External Access: Configure ingress for external traffic',
      },
      {
        step: 8,
        resources: ['HorizontalPodAutoscaler'],
        description: 'Scaling: Add autoscaling policies',
      },
    ];
  }

  /**
   * Helper to get resource name
   */
  private getResourceName(): string {
    const fieldName = this.getResourceFieldName();
    return (this.input as any)[fieldName]?.metadata?.name || 'resource-name';
  }

  /**
   * Helper to get resource field name from type
   */
  private getResourceFieldName(): string {
    const mapping: Record<string, string> = {
      'Deployment': 'deployment',
      'Service': 'service',
      'ConfigMap': 'configMap',
      'Secret': 'secret',
      'Ingress': 'ingress',
      'PersistentVolumeClaim': 'pvc',
      'HorizontalPodAutoscaler': 'hpa',
      'StorageClass': 'storageClass',
      'PersistentVolume': 'pv',
      'StatefulSet': 'statefulSet',
      'DaemonSet': 'daemonSet',
      'Job': 'job',
      'CronJob': 'cronJob',
    };
    return mapping[this.input.resourceType] || 'unknown';
  }
}
