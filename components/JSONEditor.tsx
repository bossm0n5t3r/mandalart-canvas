'use client';

import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

const Editor = dynamic(
  () => import('react-simple-code-editor').then((mod) => mod.default),
  { ssr: false },
);

interface JSONEditorProps {
  value: string;
  onImport: (json: string) => void;
  isMobile: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({
  value,
  onImport,
  isMobile,
}) => {
  const [editorContent, setEditorContent] = useState(value);
  const [prism, setPrism] = useState<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPrism = async () => {
      try {
        const Prism = await import('prismjs');
        await import('prismjs/components/prism-json');
        await import('prismjs/themes/prism.css');

        if (Prism.languages && !Prism.languages.json) {
          Prism.languages.json = {
            property: {
              pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
              greedy: true,
            },
            string: {
              pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
              greedy: true,
            },
            comment: /\/\/.*|\/\*[\s\S]*?\*\//,
            number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
            punctuation: /[{}[\],]/,
            operator: /:/,
            boolean: /\b(?:true|false)\b/,
            null: {
              pattern: /\bnull\b/,
              alias: 'keyword',
            },
          };
        }

        setPrism(Prism);
      } catch (error) {
        console.error('Failed to load Prism:', error);
      }
    };
    loadPrism();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.scrollBehavior = 'smooth';
    }
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

  const highlightCode = (code: string) => {
    if (prism && prism.highlight && prism.languages.json) {
      return prism.highlight(code, prism.languages.json, 'json');
    }
    return code;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow ${
        isMobile ? 'w-full' : 'h-full'
      } flex flex-col`}
    >
      <div className="flex justify-between p-4 border-b">
        <Button onClick={handleImport} className="min-h-[44px]">
          Import JSON
        </Button>
        <Button onClick={handleExport} className="min-h-[44px]">
          Export JSON
        </Button>
      </div>
      <div
        ref={editorRef}
        className={`flex-grow overflow-y-auto overflow-x-hidden p-4 ${
          isMobile ? 'h-[40vh]' : 'h-full'
        } editor-scrollbar`}
      >
        <Editor
          value={editorContent}
          onValueChange={setEditorContent}
          highlight={highlightCode}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: isMobile ? '14px' : '16px',
            minHeight: '100%',
          }}
          textareaClassName="editor-textarea"
          preClassName="editor-pre"
        />
      </div>
    </div>
  );
};

export default JSONEditor;
