import { ManifestInput } from '../schemas/k8sSchemas';
export declare class ManifestGenerator {
    private input;
    constructor(input: ManifestInput);
    generate(): string;
    private generateNamespace;
    private generateDeployment;
    private generateContainer;
    private generateProbe;
    private generateVolume;
    private generateService;
    private generateConfigMap;
    private generateSecret;
    private generateIngress;
    private generatePVC;
    private generateHPA;
    private getNamespace;
    private cleanObject;
    getWarnings(): string[];
    private getDeploymentWarnings;
    private getServiceWarnings;
    private getSecretWarnings;
    private getIngressWarnings;
    getSuggestions(): string[];
}
//# sourceMappingURL=manifestGenerator.d.ts.map