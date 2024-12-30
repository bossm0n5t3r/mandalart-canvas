'use client';

import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Editor = dynamic(
  () => import('react-simple-code-editor').then((mod) => mod.default),
  { ssr: false },
);

interface JSONEditorProps {
  value: string;
  onImport: (json: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onImport }) => {
  const [editorContent, setEditorContent] = useState(value);
  const [prism, setPrism] = useState<any>(null);

  useEffect(() => {
    import('prismjs').then((Prism) => {
      import('prismjs/components/prism-json');
      import('prismjs/themes/prism.css');
      setPrism(Prism.default);
    });
  }, []);

  const handleImport = () => {
    onImport(editorContent);
  };

  const handleExport = () => {
    const blob = new Blob([editorContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mandal-art-grid.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!prism) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full flex flex-col">
      <div className="flex justify-between mb-4">
        <Button onClick={handleImport}>Import JSON</Button>
        <Button onClick={handleExport}>Export JSON</Button>
      </div>
      <div className="flex-grow overflow-auto">
        <Editor
          value={editorContent}
          onValueChange={setEditorContent}
          highlight={(code) =>
            prism.highlight(code, prism.languages.json, 'json')
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            height: '100%',
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>
    </div>
  );
};

export default JSONEditor;
