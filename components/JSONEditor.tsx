'use client';

import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';
import React, { useEffect, useRef, useState } from 'react';
import { mapToJson } from '../lib/utils';

const Editor = dynamic(
  () => import('react-simple-code-editor').then((mod) => mod.default),
  { ssr: false },
);

interface JSONEditorProps {
  mandalartMap: Map<string, { core: string; values: string[] }>;
  setMandalartMap: (
    value: React.SetStateAction<
      Map<string, { core: string; values: string[] }>
    >,
  ) => void;
  isMobile: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({
  mandalartMap,
  setMandalartMap,
  isMobile,
}) => {
  const [editorContent, setEditorContent] = useState(mapToJson(mandalartMap));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [prism, setPrism] = useState<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPrism = async () => {
      try {
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

  useEffect(() => {
    setEditorContent(mapToJson(mandalartMap));
  }, [mandalartMap]);

  const handleImport = () => {
    const parsedObj = JSON.parse(editorContent);
    const newMap = new Map<string, { core: string; values: string[] }>(
      Object.entries(parsedObj) as [
        string,
        { core: string; values: string[] },
      ][],
    );
    for (let i = 1; i <= 8; i++) {
      const key = `${i}`;
      if (mandalartMap.get(key)?.core !== newMap.get(key)?.core) {
        const currentCoreValues = newMap.get('core')?.values || [];
        currentCoreValues[i - 1] = newMap.get(key)?.core || '';
        newMap.set('core', {
          core: newMap.get('core')?.core || '',
          values: currentCoreValues,
        });
        break;
      }
    }
    setMandalartMap(newMap);
  };

  const handleExport = () => {
    const json = mapToJson(mandalartMap);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mandalart.json';
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
          Import / Apply JSON
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
