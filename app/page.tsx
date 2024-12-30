'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import JSONEditor from '../components/JSONEditor';
import MandalArtGrid from '../components/MandalArtGrid';
import ResponsiveLayout from '../components/ResponsiveLayout';
import { DEFAULT_MANDALART_MAP } from '../lib/utils';

export default function Home() {
  const [mandalartMap, setMandalartMap] = useState(DEFAULT_MANDALART_MAP);
  const [isMobile, setIsMobile] = useState(false);

  const mobileQuery = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsMobile(mobileQuery);
  }, [mobileQuery]);

  const handleSave = () => {
    console.log('Saving grid:', mandalartMap);
  };

  const handleReset = () => {
    setMandalartMap(DEFAULT_MANDALART_MAP);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-base sm:text-lg md:text-xl">
      <ResponsiveLayout
        isMobile={isMobile}
        left={
          <MandalArtGrid
            mandalartMap={mandalartMap}
            setMandalartMap={setMandalartMap}
            onSave={handleSave}
            onReset={handleReset}
            isMobile={isMobile}
          />
        }
        right={
          <JSONEditor
            mandalartMap={mandalartMap}
            setMandalartMap={setMandalartMap}
            isMobile={isMobile}
          />
        }
      />
    </main>
  );
}
