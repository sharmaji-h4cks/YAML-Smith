import { useState } from 'react';
import { Copy, Download, Check, AlertTriangle, Info, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Textarea } from './ui/Textarea';
import { copyToClipboard, downloadFile } from '../lib/utils';

interface DockerfileOutputProps {
  dockerfile: string;
  dockerignore?: string;
  warnings: Array<{
    severity: 'low' | 'medium' | 'high';
    message: string;
    category: string;
  }>;
  suggestions: string[];
}

export default function DockerfileOutput({
  dockerfile,
  dockerignore,
  warnings,
  suggestions,
}: DockerfileOutputProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'dockerfile' | 'dockerignore'>('dockerfile');

  const handleCopy = async () => {
    const content = activeTab === 'dockerfile' ? dockerfile : dockerignore || '';
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (activeTab === 'dockerfile') {
      downloadFile(dockerfile, 'Dockerfile', 'text/plain');
    } else if (dockerignore) {
      downloadFile(dockerignore, '.dockerignore', 'text/plain');
    }
  };

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  if (!dockerfile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generated Dockerfile</CardTitle>
          <CardDescription>Your Dockerfile will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-full mb-4">
              <FileText className="h-12 w-12 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Dockerfile Generated Yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Configure your application settings and click "Generate Dockerfile" to create an
              optimized Docker configuration.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Security & Best Practices</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {warnings.map((warning, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 p-3 rounded-lg border ${getSeverityColor(
                  warning.severity
                )}`}
              >
                {getSeverityIcon(warning.severity)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{warning.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Category: {warning.category}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-500" />
              <span>Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Dockerfile Output */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Files</CardTitle>
              <CardDescription>Ready to use in your project</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center space-x-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex space-x-2 mb-4 border-b">
            <button
              onClick={() => setActiveTab('dockerfile')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'dockerfile'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dockerfile
            </button>
            {dockerignore && (
              <button
                onClick={() => setActiveTab('dockerignore')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'dockerignore'
                    ? 'border-b-2 border-pink-600 text-pink-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                .dockerignore
              </button>
            )}
          </div>

          {/* Content */}
          <Textarea
            value={activeTab === 'dockerfile' ? dockerfile : dockerignore || ''}
            readOnly
            className="min-h-[500px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
