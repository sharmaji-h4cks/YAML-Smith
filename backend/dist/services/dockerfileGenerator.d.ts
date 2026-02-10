import { DockerfileInput, DockerfileValidation } from '../schemas/dockerfileSchemas';
interface GeneratedFiles {
    dockerfile: string;
    dockerignore?: string;
}
export declare class DockerfileGenerator {
    private input;
    constructor(input: DockerfileInput);
    generate(): GeneratedFiles;
    private generateDockerfile;
    private generateNodejsDockerfile;
    private generatePythonDockerfile;
    private generateGoDockerfile;
    private generateJavaDockerfile;
    private generateRustDockerfile;
    private generateDotnetDockerfile;
    private generatePhpDockerfile;
    private generateRubyDockerfile;
    private getBaseImageVariant;
    private addNonRootUser;
    private addEnvironmentVariables;
    private addHealthCheck;
    private addLabels;
    private generateDockerignore;
    validate(): DockerfileValidation;
}
export {};
//# sourceMappingURL=dockerfileGenerator.d.ts.map