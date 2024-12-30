import { Button } from '@/components/ui/button';
import React from 'react';

interface MandalArtGridProps {
  grid: string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  onSave: () => void;
  onReset: () => void;
}

const MandalArtGrid: React.FC<MandalArtGridProps> = ({
  grid,
  setGrid,
  onSave,
  onReset,
}) => {
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
    setGrid(newGrid);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mandalart Canvas</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-1">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                onChange={(e) =>
                  handleCellChange(rowIndex, colIndex, e.target.value)
                }
                className={`w-full h-12 p-2 text-sm border rounded ${
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
        <Button onClick={onReset} variant="outline">
          Reset
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default MandalArtGrid;