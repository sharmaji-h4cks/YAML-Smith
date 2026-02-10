"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelmChartGenerator = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
class HelmChartGenerator {
    input;
    constructor(input) {
        this.input = input;
    }
    generate() {
        const output = {
            'Chart.yaml': this.generateChartYaml(),
            'values.yaml': this.generateValuesYaml(),
        };
        if (this.input.options?.includeHelpers !== false) {
            output['templates/_helpers.tpl'] = this.generateHelpers();
        }
        // Generate template files
        output['templates/deployment.yaml'] = this.generateDeploymentTemplate();
        output['templates/service.yaml'] = this.generateServiceTemplate();
        if (this.input.values?.ingress?.enabled) {
            output['templates/ingress.yaml'] = this.generateIngressTemplate();
        }
        if (this.input.values?.autoscaling?.enabled) {
            output['templates/hpa.yaml'] = this.generateHPATemplate();
        }
        if (this.input.values?.serviceAccount?.create) {
            output['templates/serviceaccount.yaml'] = this.generateServiceAccountTemplate();
        }
        if (this.input.values?.configMaps && this.input.values.configMaps.length > 0) {
            output['templates/configmap.yaml'] = this.generateConfigMapTemplate();
        }
        if (this.input.values?.secrets && this.input.values.secrets.length > 0) {
            output['templates/secret.yaml'] = this.generateSecretTemplate();
        }
        if (this.input.options?.includePodDisruptionBudget) {
            output['templates/poddisruptionbudget.yaml'] = this.generatePodDisruptionBudgetTemplate();
        }
        if (this.input.options?.includeServiceMonitor) {
            output['templates/servicemonitor.yaml'] = this.generateServiceMonitorTemplate();
        }
        if (this.input.options?.includeNetworkPolicy) {
            output['templates/networkpolicy.yaml'] = this.generateNetworkPolicyTemplate();
        }
        if (this.input.options?.includeNotes !== false) {
            output['templates/NOTES.txt'] = this.generateNotes();
        }
        if (this.input.options?.includeTests !== false) {
            output['templates/tests/test-connection.yaml'] = this.generateTestConnection();
        }
        output['.helmignore'] = this.generateHelmignore();
        // Generate environment-specific values files
        if (this.input.options?.generateEnvironmentValues && this.input.environments) {
            this.input.environments.forEach(env => {
                output[`values-${env.name}.yaml`] = this.generateEnvironmentValues(env);
            });
        }
        return output;
    }
    generateChartYaml() {
        const chart = {
            apiVersion: this.input.metadata.apiVersion,
            name: this.input.metadata.name,
            description: this.input.metadata.description || `A Helm chart for ${this.input.metadata.name}`,
            type: this.input.metadata.type,
            version: this.input.metadata.version,
            appVersion: this.input.metadata.appVersion || '1.0.0',
        };
        if (this.input.metadata.keywords && this.input.metadata.keywords.length > 0) {
            chart.keywords = this.input.metadata.keywords;
        }
        if (this.input.metadata.home) {
            chart.home = this.input.metadata.home;
        }
        if (this.input.metadata.sources && this.input.metadata.sources.length > 0) {
            chart.sources = this.input.metadata.sources;
        }
        if (this.input.metadata.maintainers && this.input.metadata.maintainers.length > 0) {
            chart.maintainers = this.input.metadata.maintainers;
        }
        if (this.input.metadata.icon) {
            chart.icon = this.input.metadata.icon;
        }
        if (this.input.metadata.deprecated) {
            chart.deprecated = true;
        }
        if (this.input.metadata.annotations && Object.keys(this.input.metadata.annotations).length > 0) {
            chart.annotations = this.input.metadata.annotations;
        }
        if (this.input.dependencies && this.input.dependencies.length > 0) {
            chart.dependencies = this.input.dependencies;
        }
        return js_yaml_1.default.dump(chart, { lineWidth: 120, quotingType: '"' });
    }
    generateValuesYaml() {
        const values = {};
        // Image configuration
        values.image = {
            repository: this.input.values?.image?.repository || 'nginx',
            pullPolicy: this.input.values?.image?.pullPolicy || 'IfNotPresent',
            tag: this.input.values?.image?.tag || '',
        };
        values.imagePullSecrets = [];
        values.nameOverride = '';
        values.fullnameOverride = '';
        // Service account
        values.serviceAccount = {
            create: this.input.values?.serviceAccount?.create ?? true,
            annotations: this.input.values?.serviceAccount?.annotations || {},
            name: this.input.values?.serviceAccount?.name || '',
        };
        // Pod annotations
        values.podAnnotations = this.input.values?.annotations || {};
        // Security context
        values.podSecurityContext = this.input.values?.securityContext || {
            runAsNonRoot: true,
            runAsUser: 1000,
            fsGroup: 1000,
        };
        values.securityContext = {
            capabilities: {
                drop: ['ALL'],
            },
            readOnlyRootFilesystem: true,
            runAsNonRoot: true,
            runAsUser: 1000,
        };
        // Service configuration
        values.service = {
            type: this.input.values?.service?.type || 'ClusterIP',
            port: this.input.values?.service?.port || 80,
            targetPort: this.input.values?.service?.targetPort || 8080,
        };
        // Ingress configuration
        values.ingress = {
            enabled: this.input.values?.ingress?.enabled || false,
            className: this.input.values?.ingress?.className || '',
            annotations: this.input.values?.ingress?.annotations || {},
            hosts: this.input.values?.ingress?.hosts || [
                {
                    host: `${this.input.metadata.name}.local`,
                    paths: [
                        {
                            path: '/',
                            pathType: 'Prefix',
                        },
                    ],
                },
            ],
            tls: this.input.values?.ingress?.tls || [],
        };
        // Resources
        values.resources = this.input.values?.resources || {
            limits: {
                cpu: '100m',
                memory: '128Mi',
            },
            requests: {
                cpu: '100m',
                memory: '128Mi',
            },
        };
        // Autoscaling
        values.autoscaling = {
            enabled: this.input.values?.autoscaling?.enabled || false,
            minReplicas: this.input.values?.autoscaling?.minReplicas || 1,
            maxReplicas: this.input.values?.autoscaling?.maxReplicas || 10,
            targetCPUUtilizationPercentage: this.input.values?.autoscaling?.targetCPUUtilizationPercentage || 80,
        };
        if (this.input.values?.autoscaling?.targetMemoryUtilizationPercentage) {
            values.autoscaling.targetMemoryUtilizationPercentage = this.input.values.autoscaling.targetMemoryUtilizationPercentage;
        }
        // Replica count (only if autoscaling disabled)
        if (!values.autoscaling.enabled) {
            values.replicaCount = this.input.values?.replicaCount || 1;
        }
        // Probes
        if (this.input.values?.livenessProbe?.enabled !== false) {
            values.livenessProbe = {
                httpGet: {
                    path: this.input.values?.livenessProbe?.httpGet?.path || '/health',
                    port: 'http',
                },
                initialDelaySeconds: this.input.values?.livenessProbe?.initialDelaySeconds || 30,
                periodSeconds: this.input.values?.livenessProbe?.periodSeconds || 10,
            };
        }
        if (this.input.values?.readinessProbe?.enabled !== false) {
            values.readinessProbe = {
                httpGet: {
                    path: this.input.values?.readinessProbe?.httpGet?.path || '/ready',
                    port: 'http',
                },
                initialDelaySeconds: this.input.values?.readinessProbe?.initialDelaySeconds || 5,
                periodSeconds: this.input.values?.readinessProbe?.periodSeconds || 5,
            };
        }
        // Environment variables
        if (this.input.values?.env && this.input.values.env.length > 0) {
            values.env = this.input.values.env;
        }
        // Node selector
        values.nodeSelector = this.input.values?.nodeSelector || {};
        // Tolerations
        values.tolerations = this.input.values?.tolerations || [];
        // Affinity
        values.affinity = this.input.values?.affinity || {};
        return js_yaml_1.default.dump(values, { lineWidth: 120, quotingType: '"' });
    }
    generateHelpers() {
        const chartName = this.input.metadata.name;
        return `{{/*
Expand the name of the chart.
*/}}
{{- define "${chartName}.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "${chartName}.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "${chartName}.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "${chartName}.labels" -}}
helm.sh/chart: {{ include "${chartName}.chart" . }}
{{ include "${chartName}.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "${chartName}.selectorLabels" -}}
app.kubernetes.io/name: {{ include "${chartName}.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "${chartName}.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "${chartName}.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
`;
    }
    generateDeploymentTemplate() {
        const chartName = this.input.metadata.name;
        return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "${chartName}.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      labels:
        {{- include "${chartName}.selectorLabels" . | nindent 8 }}
    spec:
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: {{ include "${chartName}.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      containers:
      - name: {{ .Chart.Name }}
        securityContext:
          {{- toYaml .Values.securityContext | nindent 12 }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - name: http
          containerPort: {{ .Values.service.targetPort }}
          protocol: TCP
        {{- if .Values.livenessProbe }}
        livenessProbe:
          {{- toYaml .Values.livenessProbe | nindent 12 }}
        {{- end }}
        {{- if .Values.readinessProbe }}
        readinessProbe:
          {{- toYaml .Values.readinessProbe | nindent 12 }}
        {{- end }}
        resources:
          {{- toYaml .Values.resources | nindent 12 }}
        {{- if .Values.env }}
        env:
          {{- toYaml .Values.env | nindent 12 }}
        {{- end }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
`;
    }
    generateServiceTemplate() {
        const chartName = this.input.metadata.name;
        return `apiVersion: v1
kind: Service
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
  - port: {{ .Values.service.port }}
    targetPort: http
    protocol: TCP
    name: http
  selector:
    {{- include "${chartName}.selectorLabels" . | nindent 4 }}
`;
    }
    generateIngressTemplate() {
        const chartName = this.input.metadata.name;
        return `{{- if .Values.ingress.enabled -}}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
  {{- with .Values.ingress.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  {{- if .Values.ingress.className }}
  ingressClassName: {{ .Values.ingress.className }}
  {{- end }}
  {{- if .Values.ingress.tls }}
  tls:
    {{- range .Values.ingress.tls }}
    - hosts:
        {{- range .hosts }}
        - {{ . | quote }}
        {{- end }}
      secretName: {{ .secretName }}
    {{- end }}
  {{- end }}
  rules:
    {{- range .Values.ingress.hosts }}
    - host: {{ .host | quote }}
      http:
        paths:
          {{- range .paths }}
          - path: {{ .path }}
            pathType: {{ .pathType }}
            backend:
              service:
                name: {{ include "${chartName}.fullname" $ }}
                port:
                  number: {{ $.Values.service.port }}
          {{- end }}
    {{- end }}
{{- end }}
`;
    }
    generateHPATemplate() {
        const chartName = this.input.metadata.name;
        return `{{- if .Values.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "${chartName}.fullname" . }}
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
  metrics:
    {{- if .Values.autoscaling.targetCPUUtilizationPercentage }}
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetCPUUtilizationPercentage }}
    {{- end }}
    {{- if .Values.autoscaling.targetMemoryUtilizationPercentage }}
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetMemoryUtilizationPercentage }}
    {{- end }}
{{- end }}
`;
    }
    generateServiceAccountTemplate() {
        const chartName = this.input.metadata.name;
        return `{{- if .Values.serviceAccount.create -}}
apiVersion: v1
kind: ServiceAccount
metadata:
  name: {{ include "${chartName}.serviceAccountName" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
  {{- with .Values.serviceAccount.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
{{- end }}
`;
    }
    generateConfigMapTemplate() {
        const chartName = this.input.metadata.name;
        return `{{- if .Values.configMaps }}
{{- range .Values.configMaps }}
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "${chartName}.fullname" $ }}-{{ .name }}
  labels:
    {{- include "${chartName}.labels" $ | nindent 4 }}
data:
  {{- toYaml .data | nindent 2 }}
{{- end }}
{{- end }}
`;
    }
    generateSecretTemplate() {
        const chartName = this.input.metadata.name;
        return `{{- if .Values.secrets }}
{{- range .Values.secrets }}
---
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "${chartName}.fullname" $ }}-{{ .name }}
  labels:
    {{- include "${chartName}.labels" $ | nindent 4 }}
type: Opaque
data:
  {{- range $key, $value := .data }}
  {{ $key }}: {{ $value | b64enc }}
  {{- end }}
{{- end }}
{{- end }}
`;
    }
    generatePodDisruptionBudgetTemplate() {
        const chartName = this.input.metadata.name;
        return `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  minAvailable: 1
  selector:
    matchLabels:
      {{- include "${chartName}.selectorLabels" . | nindent 6 }}
`;
    }
    generateServiceMonitorTemplate() {
        const chartName = this.input.metadata.name;
        return `apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  selector:
    matchLabels:
      {{- include "${chartName}.selectorLabels" . | nindent 6 }}
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
`;
    }
    generateNetworkPolicyTemplate() {
        const chartName = this.input.metadata.name;
        return `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  podSelector:
    matchLabels:
      {{- include "${chartName}.selectorLabels" . | nindent 6 }}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector: {}
    ports:
    - protocol: TCP
      port: {{ .Values.service.targetPort }}
  egress:
  - to:
    - podSelector: {}
`;
    }
    generateNotes() {
        const chartName = this.input.metadata.name;
        return `1. Get the application URL by running these commands:
{{- if .Values.ingress.enabled }}
{{- range $host := .Values.ingress.hosts }}
  {{- range .paths }}
  http{{ if $.Values.ingress.tls }}s{{ end }}://{{ $host.host }}{{ .path }}
  {{- end }}
{{- end }}
{{- else if contains "NodePort" .Values.service.type }}
  export NODE_PORT=$(kubectl get --namespace {{ .Release.Namespace }} -o jsonpath="{.spec.ports[0].nodePort}" services {{ include "${chartName}.fullname" . }})
  export NODE_IP=$(kubectl get nodes --namespace {{ .Release.Namespace }} -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT
{{- else if contains "LoadBalancer" .Values.service.type }}
     NOTE: It may take a few minutes for the LoadBalancer IP to be available.
           You can watch the status of by running 'kubectl get --namespace {{ .Release.Namespace }} svc -w {{ include "${chartName}.fullname" . }}'
  export SERVICE_IP=$(kubectl get svc --namespace {{ .Release.Namespace }} {{ include "${chartName}.fullname" . }} --template "{{"{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"}}")
  echo http://$SERVICE_IP:{{ .Values.service.port }}
{{- else if contains "ClusterIP" .Values.service.type }}
  export POD_NAME=$(kubectl get pods --namespace {{ .Release.Namespace }} -l "app.kubernetes.io/name={{ include "${chartName}.name" . }},app.kubernetes.io/instance={{ .Release.Name }}" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace {{ .Release.Namespace }} $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace {{ .Release.Namespace }} port-forward $POD_NAME 8080:$CONTAINER_PORT
{{- end }}
`;
    }
    generateTestConnection() {
        const chartName = this.input.metadata.name;
        return `apiVersion: v1
kind: Pod
metadata:
  name: "{{ include "${chartName}.fullname" . }}-test-connection"
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
  annotations:
    "helm.sh/hook": test
spec:
  containers:
  - name: wget
    image: busybox
    command: ['wget']
    args: ['{{ include "${chartName}.fullname" . }}:{{ .Values.service.port }}']
  restartPolicy: Never
`;
    }
    generateHelmignore() {
        return `# Patterns to ignore when building packages.
# This supports shell glob matching, relative path matching, and
# negation (prefixed with !). Only one pattern per line.
.DS_Store
# Common VCS dirs
.git/
.gitignore
.bzr/
.bzrignore
.hg/
.hgignore
.svn/
# Common backup files
*.swp
*.bak
*.tmp
*.orig
*~
# Various IDEs
.project
.idea/
*.tmproj
.vscode/
`;
    }
    generateEnvironmentValues(env) {
        const envValues = {
            replicaCount: env.replicas || 1,
        };
        if (env.namespace) {
            envValues.namespace = env.namespace;
        }
        if (env.imageTag) {
            envValues.image = {
                tag: env.imageTag,
            };
        }
        if (env.resources) {
            envValues.resources = env.resources;
        }
        if (env.ingress) {
            envValues.ingress = env.ingress;
        }
        if (env.env) {
            envValues.env = Object.entries(env.env).map(([name, value]) => ({ name, value }));
        }
        return js_yaml_1.default.dump(envValues, { lineWidth: 120, quotingType: '"' });
    }
    validate() {
        const warnings = [];
        const suggestions = [];
        // Check chart name
        if (this.input.metadata.name.length > 53) {
            warnings.push({
                severity: 'high',
                message: 'Chart name should be less than 53 characters for DNS compatibility',
                file: 'Chart.yaml',
            });
        }
        // Check version format
        const semverRegex = /^\d+\.\d+\.\d+$/;
        if (!semverRegex.test(this.input.metadata.version)) {
            warnings.push({
                severity: 'medium',
                message: 'Chart version should follow semantic versioning (e.g., 1.0.0)',
                file: 'Chart.yaml',
            });
        }
        // Check for description
        if (!this.input.metadata.description) {
            warnings.push({
                severity: 'low',
                message: 'Consider adding a description to your chart',
                file: 'Chart.yaml',
            });
        }
        // Check for maintainers
        if (!this.input.metadata.maintainers || this.input.metadata.maintainers.length === 0) {
            warnings.push({
                severity: 'low',
                message: 'Consider adding maintainers to your chart',
                file: 'Chart.yaml',
            });
        }
        // Check resource limits
        if (!this.input.values?.resources?.limits) {
            warnings.push({
                severity: 'medium',
                message: 'Resource limits are not set - recommended for production',
                file: 'values.yaml',
            });
            suggestions.push('Set resource limits to prevent resource exhaustion');
        }
        // Check security context
        if (!this.input.values?.securityContext?.runAsNonRoot) {
            warnings.push({
                severity: 'high',
                message: 'Running as root user is a security risk',
                file: 'values.yaml',
            });
            suggestions.push('Enable runAsNonRoot in securityContext');
        }
        // Check probes
        if (this.input.values?.livenessProbe?.enabled === false) {
            warnings.push({
                severity: 'medium',
                message: 'Liveness probe is disabled - recommended for production',
                file: 'values.yaml',
            });
        }
        // Suggestions
        suggestions.push('Install chart with: helm install my-release ./' + this.input.metadata.name);
        suggestions.push('Upgrade chart with: helm upgrade my-release ./' + this.input.metadata.name);
        suggestions.push('Test chart with: helm test my-release');
        if (this.input.options?.generateEnvironmentValues && this.input.environments && this.input.environments.length > 0) {
            this.input.environments.forEach(env => {
                suggestions.push(`Deploy to ${env.name}: helm install my-release ./${this.input.metadata.name} -f values-${env.name}.yaml`);
            });
        }
        return {
            valid: warnings.filter(w => w.severity === 'high').length === 0,
            warnings,
            suggestions,
        };
    }
}
exports.HelmChartGenerator = HelmChartGenerator;
//# sourceMappingURL=helmChartGenerator.js.map