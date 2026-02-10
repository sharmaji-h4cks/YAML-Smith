import { HelmChartInput, HelmChartOutput, HelmChartValidation } from '../schemas/helmChartSchemas';
export declare class HelmChartGenerator {
    private input;
    constructor(input: HelmChartInput);
    generate(): HelmChartOutput;
    private generateChartYaml;
    private generateValuesYaml;
    private generateHelpers;
    private generateDeploymentTemplate;
    private generateServiceTemplate;
    private generateIngressTemplate;
    private generateHPATemplate;
    private generateServiceAccountTemplate;
    private generateConfigMapTemplate;
    private generateSecretTemplate;
    private generatePodDisruptionBudgetTemplate;
    private generateServiceMonitorTemplate;
    private generateNetworkPolicyTemplate;
    private generateNotes;
    private generateTestConnection;
    private generateHelmignore;
    private generateEnvironmentValues;
    validate(): HelmChartValidation;
}
//# sourceMappingURL=helmChartGenerator.d.ts.map