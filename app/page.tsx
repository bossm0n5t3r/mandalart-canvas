'use client';

import { useState } from 'react';
import JSONEditor from '../components/JSONEditor';
import MandalArtGrid from '../components/MandalArtGrid';
import ResizableSplitLayout from '../components/ResizableSplitLayout';

export default function Home() {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));

  const handleSave = () => {
    // Implement save functionality (e.g., to localStorage or backend)
    console.log('Saving grid:', grid);
  };

  const handleReset = () => {
    setGrid(Array(9).fill(Array(9).fill('')));
  };

  const handleImport = (json: string) => {
    try {
      const importedGrid = JSON.parse(json);
      if (
        Array.isArray(importedGrid) &&
        importedGrid.length === 9 &&
        importedGrid.every((row) => Array.isArray(row) && row.length === 9)
      ) {
        setGrid(importedGrid);
      } else {
        throw new Error('Invalid grid format');
      }
    } catch (error) {
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const handleExport = () => {
    return JSON.stringify(grid, null, 2);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <ResizableSplitLayout
        left={
          <MandalArtGrid
            grid={grid}
            setGrid={setGrid}
            onSave={handleSave}
            onReset={handleReset}
          />
        }
        right={<JSONEditor value={handleExport()} onImport={handleImport} />}
      />
    </main>
  );
}
