import { useState } from 'react';
import { Download, Copy, Check, AlertTriangle, Lightbulb, FileCode, Link2, Layers, Terminal } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { downloadFile, copyToClipboard } from '@/lib/utils';

interface ManifestOutputProps {
  manifest: string;
  warnings: string[];
  suggestions: string[];
  metadata: { resourceType: string } | null;
  dependencies?: Array<{ resourceType: string; reason: string; required: boolean }>;
  relatedResources?: Array<{ resourceType: string; reason: string }>;
  deploymentCommands?: Array<{ description: string; command: string }>;
  deploymentOrder?: Array<{ step: number; resources: string[]; description: string }>;
}

export default function ManifestOutput({
  manifest,
  warnings,
  suggestions,
  metadata,
  dependencies = [],
  relatedResources = [],
  deploymentCommands = [],
  deploymentOrder = [],
}: ManifestOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(manifest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = metadata?.resourceType
      ? `${metadata.resourceType.toLowerCase()}.yaml`
      : 'manifest.yaml';
    downloadFile(manifest, filename);
  };

  if (!manifest) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <FileCode className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">No Manifest Generated Yet</h3>
            <p className="text-muted-foreground">
              Configure your Kubernetes resource and click "Generate Manifest" to see your YAML here.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Metadata */}
      {metadata && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{metadata.resourceType}</span>
                </div>
                <div className="inline-flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-medium text-green-900 dark:text-green-100">
                    Valid
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manifest Output */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Manifest</CardTitle>
          <CardDescription>Production-ready Kubernetes YAML</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs md:text-sm overflow-x-auto max-h-[500px] overflow-y-auto">
            <code>{manifest}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Dependencies */}
      {dependencies.length > 0 && (
        <Card className="border-purple-200 dark:border-purple-900">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Link2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-purple-900 dark:text-purple-100">Dependencies</CardTitle>
            </div>
            <CardDescription>Resources this manifest depends on</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dependencies.map((dep, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                        {dep.resourceType}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          dep.required
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                        }`}
                      >
                        {dep.required ? 'REQUIRED' : 'OPTIONAL'}
                      </span>
                    </div>
                    <p className="text-xs text-purple-800 dark:text-purple-200 mt-1">{dep.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-900">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              <CardTitle className="text-yellow-900 dark:text-yellow-100">Warnings</CardTitle>
            </div>
            <CardDescription>Things to consider for production</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-yellow-600 dark:text-yellow-500 mt-0.5">•</span>
                  <span className="text-sm text-yellow-900 dark:text-yellow-100">{warning}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="border-blue-200 dark:border-blue-900">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-blue-900 dark:text-blue-100">Suggestions</CardTitle>
            </div>
            <CardDescription>Ways to improve your manifest</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span className="text-sm text-blue-900 dark:text-blue-100">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <Card className="border-teal-200 dark:border-teal-900">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <CardTitle className="text-teal-900 dark:text-teal-100">Related Resources</CardTitle>
            </div>
            <CardDescription>Complementary resources to consider</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {relatedResources.map((resource, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-teal-600 dark:text-teal-400 mt-0.5">•</span>
                  <div>
                    <span className="text-sm font-medium text-teal-900 dark:text-teal-100">
                      {resource.resourceType}
                    </span>
                    <p className="text-xs text-teal-800 dark:text-teal-200 mt-1">{resource.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Deployment Commands */}
      {deploymentCommands.length > 0 && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <CardTitle className="text-gray-900 dark:text-gray-100">Deployment Commands</CardTitle>
            </div>
            <CardDescription>Resource-specific kubectl commands</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {deploymentCommands.map((cmd, idx) => (
                <li key={idx} className="space-y-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400"># {cmd.description}</p>
                  <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    {cmd.command}
                  </code>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Deployment Order */}
      {deploymentOrder.length > 0 && (
        <Card className="border-indigo-200 dark:border-indigo-900">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <CardTitle className="text-indigo-900 dark:text-indigo-100">Deployment Order</CardTitle>
            </div>
            <CardDescription>Recommended deployment sequence for multi-resource applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {deploymentOrder.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 dark:bg-indigo-400 text-white dark:text-indigo-900 rounded-full flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </span>
                  <div>
                    <div className="font-medium text-indigo-900 dark:text-indigo-100">
                      {step.resources.join(', ')}
                    </div>
                    <p className="text-xs text-indigo-800 dark:text-indigo-200 mt-1">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
