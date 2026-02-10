import { useState } from 'react';
import { Box, Github, Sparkles, FileCode, Container, Package, Workflow } from 'lucide-react';
import ManifestForm from './components/ManifestForm';
import ManifestOutput from './components/ManifestOutput';
import DockerfileForm from './components/forms/DockerfileForm';
import DockerfileOutput from './components/DockerfileOutput';
import HelmChartForm from './components/forms/HelmChartForm';
import HelmChartOutput from './components/HelmChartOutput';
import CICDForm from './components/forms/CICDForm';
import CICDOutput from './components/CICDOutput';
import { dockerfileApi, DockerfileInput, helmChartApi, HelmChartInput, cicdApi, CICDPipelineInput } from './lib/api';

type GeneratorTab = 'kubernetes' | 'dockerfile' | 'helm' | 'cicd';

function App() {
  const [activeTab, setActiveTab] = useState<GeneratorTab>('kubernetes');

  // K8s state
  const [generatedManifest, setGeneratedManifest] = useState<string>('');
  const [k8sWarnings, setK8sWarnings] = useState<string[]>([]);
  const [k8sSuggestions, setK8sSuggestions] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<{ resourceType: string } | null>(null);
  const [dependencies, setDependencies] = useState<Array<{ resourceType: string; reason: string; required: boolean }>>([]);
  const [relatedResources, setRelatedResources] = useState<Array<{ resourceType: string; reason: string }>>([]);
  const [deploymentCommands, setDeploymentCommands] = useState<Array<{ description: string; command: string }>>([]);
  const [deploymentOrder, setDeploymentOrder] = useState<Array<{ step: number; resources: string[]; description: string }>>([]);

  // Dockerfile state
  const [generatedDockerfile, setGeneratedDockerfile] = useState<string>('');
  const [generatedDockerignore, setGeneratedDockerignore] = useState<string>('');
  const [dockerWarnings, setDockerWarnings] = useState<Array<{
    severity: 'low' | 'medium' | 'high';
    message: string;
    category: string;
  }>>([]);
  const [dockerSuggestions, setDockerSuggestions] = useState<string[]>([]);
  const [isDockerLoading, setIsDockerLoading] = useState(false);

  // Helm Chart state
  const [generatedHelmFiles, setGeneratedHelmFiles] = useState<Record<string, string>>({});
  const [helmWarnings, setHelmWarnings] = useState<Array<{
    severity: 'low' | 'medium' | 'high';
    message: string;
    file?: string;
  }>>([]);
  const [helmSuggestions, setHelmSuggestions] = useState<string[]>([]);
  const [isHelmLoading, setIsHelmLoading] = useState(false);

  // CI/CD state
  const [generatedCICDFiles, setGeneratedCICDFiles] = useState<Record<string, string>>({});
  const [cicdWarnings, setCicdWarnings] = useState<Array<{
    severity: 'low' | 'medium' | 'high';
    message: string;
    platform?: string;
  }>>([]);
  const [cicdSuggestions, setCicdSuggestions] = useState<string[]>([]);
  const [isCicdLoading, setIsCicdLoading] = useState(false);

  const handleK8sGenerate = (
    manifest: string,
    warnings: string[],
    suggestions: string[],
    metadata: { resourceType: string },
    deps: Array<{ resourceType: string; reason: string; required: boolean }> = [],
    related: Array<{ resourceType: string; reason: string }> = [],
    commands: Array<{ description: string; command: string }> = [],
    order: Array<{ step: number; resources: string[]; description: string }> = []
  ) => {
    setGeneratedManifest(manifest);
    setK8sWarnings(warnings);
    setK8sSuggestions(suggestions);
    setMetadata(metadata);
    setDependencies(deps);
    setRelatedResources(related);
    setDeploymentCommands(commands);
    setDeploymentOrder(order);
  };

  const handleDockerfileGenerate = async (data: DockerfileInput) => {
    setIsDockerLoading(true);
    try {
      // Generate Dockerfile
      const generateResponse = await dockerfileApi.generate(data);
      setGeneratedDockerfile(generateResponse.dockerfile);
      setGeneratedDockerignore(generateResponse.dockerignore || '');

      // Validate and get warnings
      const validateResponse = await dockerfileApi.validate(data);
      setDockerWarnings(validateResponse.validation.warnings);
      setDockerSuggestions(validateResponse.validation.suggestions);
    } catch (error) {
      console.error('Error generating Dockerfile:', error);
      alert('Failed to generate Dockerfile. Please try again.');
    } finally {
      setIsDockerLoading(false);
    }
  };

  const handleHelmChartGenerate = async (data: HelmChartInput) => {
    setIsHelmLoading(true);
    try {
      // Generate Helm Chart
      const generateResponse = await helmChartApi.generate(data);
      setGeneratedHelmFiles(generateResponse.files);

      // Validate and get warnings
      const validateResponse = await helmChartApi.validate(data);
      setHelmWarnings(validateResponse.validation.warnings);
      setHelmSuggestions(validateResponse.validation.suggestions);
    } catch (error) {
      console.error('Error generating Helm Chart:', error);
      alert('Failed to generate Helm Chart. Please try again.');
    } finally {
      setIsHelmLoading(false);
    }
  };

  const handleCICDGenerate = async (data: CICDPipelineInput) => {
    setIsCicdLoading(true);
    try {
      // Generate CI/CD Pipeline
      const generateResponse = await cicdApi.generate(data);
      setGeneratedCICDFiles(generateResponse.files);

      // Validate and get warnings
      const validateResponse = await cicdApi.validate(data);
      setCicdWarnings(validateResponse.validation.warnings);
      setCicdSuggestions(validateResponse.validation.suggestions);
    } catch (error) {
      console.error('Error generating CI/CD Pipeline:', error);
      alert('Failed to generate CI/CD Pipeline. Please try again.');
    } finally {
      setIsCicdLoading(false);
    }
  };

  const getHeroContent = () => {
    if (activeTab === 'kubernetes') {
      return {
        badge: 'Production-Ready Kubernetes YAML',
        title: 'Generate K8s Manifests Instantly',
        description: 'Create production-ready Kubernetes manifests with security best practices, resource limits, and health checks. Support for Deployments, Services, ConfigMaps, and more.',
      };
    } else if (activeTab === 'dockerfile') {
      return {
        badge: 'Optimized Multi-Stage Dockerfiles',
        title: 'Generate Dockerfiles Instantly',
        description: 'Create production-ready, multi-stage Dockerfiles with security best practices, non-root users, and health checks. Support for 8 languages including Node.js, Python, Go, and more.',
      };
    } else if (activeTab === 'helm') {
      return {
        badge: 'Complete Helm Charts with Best Practices',
        title: 'Generate Helm Charts Instantly',
        description: 'Create production-ready Helm charts with 15+ files including templates, values, tests, and monitoring. Multi-environment support with security and HA features built-in.',
      };
    } else {
      return {
        badge: 'Enterprise-Grade CI/CD Pipelines',
        title: 'Generate CI/CD Pipelines Instantly',
        description: 'Create production-ready CI/CD pipelines for GitHub Actions, GitLab CI, Jenkins, CircleCI, and Azure DevOps. Includes builds, tests, security scanning, and deployment workflows.',
      };
    }
  };

  const heroContent = getHeroContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-2 rounded-lg">
                <Box className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  YAML Smith
                </h1>
                <p className="text-sm text-muted-foreground">
                  Cloud-Native DevOps Automation Platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-900 dark:text-pink-100">
              {heroContent.badge}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {heroContent.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {heroContent.description}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border bg-white dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('kubernetes')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'kubernetes'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Box className="h-5 w-5" />
              <span className="font-medium">Kubernetes</span>
            </button>
            <button
              onClick={() => setActiveTab('dockerfile')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'dockerfile'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Container className="h-5 w-5" />
              <span className="font-medium">Dockerfile</span>
            </button>
            <button
              onClick={() => setActiveTab('helm')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'helm'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Package className="h-5 w-5" />
              <span className="font-medium">Helm Chart</span>
            </button>
            <button
              onClick={() => setActiveTab('cicd')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'cicd'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Workflow className="h-5 w-5" />
              <span className="font-medium">CI/CD</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="order-2 lg:order-1">
            {activeTab === 'kubernetes' ? (
              <ManifestForm onGenerate={handleK8sGenerate} />
            ) : activeTab === 'dockerfile' ? (
              <DockerfileForm onSubmit={handleDockerfileGenerate} isLoading={isDockerLoading} />
            ) : activeTab === 'helm' ? (
              <HelmChartForm onSubmit={handleHelmChartGenerate} isLoading={isHelmLoading} />
            ) : (
              <CICDForm onSubmit={handleCICDGenerate} isLoading={isCicdLoading} />
            )}
          </div>

          {/* Output */}
          <div className="order-1 lg:order-2">
            {activeTab === 'kubernetes' ? (
              <ManifestOutput
                manifest={generatedManifest}
                warnings={k8sWarnings}
                suggestions={k8sSuggestions}
                metadata={metadata}
                dependencies={dependencies}
                relatedResources={relatedResources}
                deploymentCommands={deploymentCommands}
                deploymentOrder={deploymentOrder}
              />
            ) : activeTab === 'dockerfile' ? (
              <DockerfileOutput
                dockerfile={generatedDockerfile}
                dockerignore={generatedDockerignore}
                warnings={dockerWarnings}
                suggestions={dockerSuggestions}
              />
            ) : activeTab === 'helm' ? (
              <HelmChartOutput
                files={generatedHelmFiles}
                warnings={helmWarnings}
                suggestions={helmSuggestions}
              />
            ) : (
              <CICDOutput
                files={generatedCICDFiles}
                warnings={cicdWarnings}
                suggestions={cicdSuggestions}
              />
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {activeTab === 'kubernetes' ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Box className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Multiple Resources</h3>
                <p className="text-muted-foreground text-sm">
                  Deployments, Services, ConfigMaps, Secrets, Ingress, PVCs, and HPAs
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Best Practices</h3>
                <p className="text-muted-foreground text-sm">
                  Security-first with resource limits, probes, and validation
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Production Ready</h3>
                <p className="text-muted-foreground text-sm">
                  Battle-tested patterns for enterprise deployments
                </p>
              </div>
            </>
          ) : activeTab === 'dockerfile' ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileCode className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">8 Languages</h3>
                <p className="text-muted-foreground text-sm">
                  Node.js, Python, Go, Java, Rust, .NET, PHP, and Ruby
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Container className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Multi-Stage Builds</h3>
                <p className="text-muted-foreground text-sm">
                  Optimized images with build and runtime stages for minimal size
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Security First</h3>
                <p className="text-muted-foreground text-sm">
                  Non-root users, distroless images, and health checks by default
                </p>
              </div>
            </>
          ) : activeTab === 'helm' ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">15+ Files Generated</h3>
                <p className="text-muted-foreground text-sm">
                  Complete Helm chart with templates, values, tests, and helpers
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Multi-Environment</h3>
                <p className="text-muted-foreground text-sm">
                  Generate separate values files for dev, staging, and production
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Production Grade</h3>
                <p className="text-muted-foreground text-sm">
                  ServiceMonitor, PDB, NetworkPolicy, and security built-in
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Workflow className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">5 CI/CD Platforms</h3>
                <p className="text-muted-foreground text-sm">
                  GitHub Actions, GitLab CI, Jenkins, CircleCI, and Azure DevOps
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Complete Workflows</h3>
                <p className="text-muted-foreground text-sm">
                  Build, test, security scanning, and deployment automation
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Enterprise Ready</h3>
                <p className="text-muted-foreground text-sm">
                  Multi-environment deployments, GitOps, and notification integrations
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for the DevOps community
              </p>
              <p className="text-xs text-muted-foreground">
                Created by <a href="https://github.com/sharmaji-h4cks" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline">Shivanshu Sharma</a>
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                API Reference
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Examples
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
