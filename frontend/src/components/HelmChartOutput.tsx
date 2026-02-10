import { useState } from 'react';
import { Copy, Download, Check, AlertTriangle, Info, FolderTree, File } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Textarea } from './ui/Textarea';
import { copyToClipboard, downloadFile } from '../lib/utils';

interface HelmChartOutputProps {
  files: Record<string, string>;
  warnings: Array<{
    severity: 'low' | 'medium' | 'high';
    message: string;
    file?: string;
  }>;
  suggestions: string[];
}

export default function HelmChartOutput({ files, warnings, suggestions }: HelmChartOutputProps) {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('Chart.yaml');

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
    downloadFile(content, selectedFile, 'text/yaml');
  };

  const handleDownloadAll = () => {
    // Create a text representation of all files
    const allContent = Object.entries(files)
      .map(([filename, content]) => {
        return `# ================================\n# ${filename}\n# ================================\n\n${content}\n\n`;
      })
      .join('\n');

    downloadFile(allContent, 'helm-chart-all-files.txt', 'text/plain');
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

  // Organize files by directory structure
  const fileTree: Record<string, string[]> = {
    root: [],
    templates: [],
    'templates/tests': [],
  };

  Object.keys(files).forEach((filename) => {
    if (filename.startsWith('templates/tests/')) {
      fileTree['templates/tests'].push(filename);
    } else if (filename.startsWith('templates/')) {
      fileTree['templates'].push(filename);
    } else {
      fileTree['root'].push(filename);
    }
  });

  if (!files || Object.keys(files).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generated Helm Chart</CardTitle>
          <CardDescription>Your Helm chart will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-full mb-4">
              <FolderTree className="h-12 w-12 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Helm Chart Generated Yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Configure your chart settings and click "Generate Helm Chart" to create a
              complete, production-ready Helm chart.
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
              <span>Warnings & Recommendations</span>
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
                  {warning.file && (
                    <p className="text-xs text-muted-foreground mt-1">
                      File: {warning.file}
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
              <span>Installation Instructions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    {suggestion}
                  </code>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Helm Chart Files */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Helm Chart Files</CardTitle>
              <CardDescription>
                {Object.keys(files).length} files generated
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAll}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download All</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {/* File Tree Sidebar */}
            <div className="col-span-1 space-y-2 border-r pr-4 max-h-[600px] overflow-y-auto">
              <div className="space-y-1">
                <div className="font-semibold text-sm text-muted-foreground mb-2">Root</div>
                {fileTree.root.map((filename) => (
                  <button
                    key={filename}
                    onClick={() => setSelectedFile(filename)}
                    className={`w-full text-left text-sm px-2 py-1 rounded flex items-center space-x-2 ${
                      selectedFile === filename
                        ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <File className="h-3 w-3" />
                    <span className="truncate">{filename}</span>
                  </button>
                ))}
              </div>

              {fileTree.templates.length > 0 && (
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-muted-foreground mb-2 mt-4">
                    Templates
                  </div>
                  {fileTree.templates.map((filename) => (
                    <button
                      key={filename}
                      onClick={() => setSelectedFile(filename)}
                      className={`w-full text-left text-sm px-2 py-1 rounded flex items-center space-x-2 ${
                        selectedFile === filename
                          ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-medium'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <File className="h-3 w-3" />
                      <span className="truncate">{filename.replace('templates/', '')}</span>
                    </button>
                  ))}
                </div>
              )}

              {fileTree['templates/tests'].length > 0 && (
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-muted-foreground mb-2 mt-4">
                    Tests
                  </div>
                  {fileTree['templates/tests'].map((filename) => (
                    <button
                      key={filename}
                      onClick={() => setSelectedFile(filename)}
                      className={`w-full text-left text-sm px-2 py-1 rounded flex items-center space-x-2 ${
                        selectedFile === filename
                          ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-medium'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <File className="h-3 w-3" />
                      <span className="truncate">{filename.replace('templates/tests/', '')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* File Content Viewer */}
            <div className="col-span-3">
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
