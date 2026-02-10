import { useState } from 'react';
import { Copy, Download, Check, AlertTriangle, Info, Workflow, File } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Textarea } from './ui/Textarea';
import { copyToClipboard, downloadFile } from '../lib/utils';

interface CICDOutputProps {
  files: Record<string, string>;
  warnings: Array<{
    severity: 'low' | 'medium' | 'high';
    message: string;
    platform?: string;
  }>;
  suggestions: string[];
}

export default function CICDOutput({ files, warnings, suggestions }: CICDOutputProps) {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');

  // Set initial selected file when files change
  if (files && Object.keys(files).length > 0 && !selectedFile) {
    const fileKeys = Object.keys(files);
    // Prefer the main pipeline file over README
    const mainFile = fileKeys.find(f => !f.includes('README')) || fileKeys[0];
    setSelectedFile(mainFile);
  }

  const handleCopy = async () => {
    const content = files[selectedFile] || '';
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = files[selectedFile] || '';
    const ext = selectedFile.endsWith('.md') ? 'text/markdown' : 'text/yaml';
    downloadFile(content, selectedFile.split('/').pop() || selectedFile, ext);
  };

  const handleDownloadAll = () => {
    const allContent = Object.entries(files)
      .map(([filename, content]) => {
        return `# ================================\n# ${filename}\n# ================================\n\n${content}\n\n`;
      })
      .join('\n');

    downloadFile(allContent, 'cicd-pipeline-all-files.txt', 'text/plain');
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

  const getFileIcon = (filename: string) => {
    if (filename.includes('README')) {
      return <Info className="h-3 w-3" />;
    }
    return <File className="h-3 w-3" />;
  };

  if (!files || Object.keys(files).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generated CI/CD Pipeline</CardTitle>
          <CardDescription>Your pipeline will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-full mb-4">
              <Workflow className="h-12 w-12 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Pipeline Generated Yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Configure your CI/CD settings and click "Generate CI/CD Pipeline" to create a
              production-ready pipeline for your chosen platform.
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
              <span>Configuration Warnings</span>
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
                  {warning.platform && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Platform: {warning.platform}
                    </p>
                  )}
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
              <span>Setup Instructions</span>
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

      {/* Pipeline Files */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Pipeline Files</CardTitle>
              <CardDescription>
                {Object.keys(files).length} file{Object.keys(files).length !== 1 ? 's' : ''} generated
              </CardDescription>
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
              {Object.keys(files).length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadAll}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download All</span>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {/* File List Sidebar */}
            <div className="col-span-1 space-y-1 border-r pr-4 max-h-[600px] overflow-y-auto">
              {Object.keys(files).map((filename) => (
                <button
                  key={filename}
                  onClick={() => setSelectedFile(filename)}
                  className={`w-full text-left text-sm px-2 py-2 rounded flex items-center space-x-2 ${
                    selectedFile === filename
                      ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {getFileIcon(filename)}
                  <span className="truncate text-xs">{filename}</span>
                </button>
              ))}
            </div>

            {/* File Content Viewer */}
            <div className="col-span-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                  {selectedFile}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {files[selectedFile]?.split('\n').length || 0} lines
                </span>
              </div>
              <Textarea
                value={files[selectedFile] || ''}
                readOnly
                className="min-h-[500px] font-mono text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
