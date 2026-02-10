import { CICDPipelineInput, CICDPipelineOutput, CICDValidation } from '../schemas/cicdSchemas';
export declare class CICDPipelineGenerator {
    private input;
    constructor(input: CICDPipelineInput);
    generate(): CICDPipelineOutput;
    private generateGitHubActions;
    private generateGitLabCI;
    private generateJenkinsfile;
    private generateCircleCI;
    private generateAzureDevOps;
    private generateReadme;
    private getGitHubTriggers;
    private getEnvironmentVariables;
    private getLanguageSetup;
    private getLanguageImage;
    private getTestSteps;
    private getTestCommands;
    private getRegistryLogin;
    private getImageTags;
    private getDeploymentSteps;
    private getDeploymentCommands;
    validate(): CICDValidation;
}
//# sourceMappingURL=cicdGenerator.d.ts.map