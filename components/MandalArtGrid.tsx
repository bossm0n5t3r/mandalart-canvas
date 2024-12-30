'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { gridToMap, mapToGrid } from '../lib/utils';

interface MandalArtGridProps {
  mandalartMap: Map<string, { core: string; values: string[] }>;
  setMandalartMap: (
    value: React.SetStateAction<
      Map<string, { core: string; values: string[] }>
    >,
  ) => void;
  onSave: () => void;
  onReset: () => void;
  isMobile: boolean;
}

const MandalArtGrid: React.FC<MandalArtGridProps> = ({
  mandalartMap,
  setMandalartMap,
  onSave,
  onReset,
  isMobile,
}) => {
  const [grid, setGrid] = useState(mapToGrid(mandalartMap));

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? value : cell,
      ),
    );
    if (colIndex === 4) {
      newGrid[4][rowIndex] = value;
    }
    if (rowIndex === 4) {
      newGrid[colIndex][4] = value;
    }
    setGrid(newGrid);
    setMandalartMap(gridToMap(newGrid));
  };

  useEffect(() => {
    setGrid(mapToGrid(mandalartMap));
  }, [mandalartMap]);

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow ${isMobile ? 'w-full' : ''}`}
    >
      <h2 className="text-2xl font-bold mb-4">Mandal-art Planner</h2>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-1 sm:gap-2">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                onChange={(e) =>
                  handleCellChange(rowIndex, colIndex, e.target.value)
                }
                className={`w-full h-12 p-2 text-sm sm:text-base border rounded min-h-[44px] ${
                  rowIndex === 4 && colIndex === 4
                    ? 'bg-yellow-100 font-bold'
                    : 'bg-gray-50'
                }`}
                placeholder={
                  rowIndex === 4 && colIndex === 4 ? 'Main Goal' : ''
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={onReset} variant="outline" className="min-h-[44px]">
          Reset
        </Button>
        <Button onClick={onSave} className="min-h-[44px]">
          Save
        </Button>
      </div>
    </div>
  );
};

export default MandalArtGrid;
