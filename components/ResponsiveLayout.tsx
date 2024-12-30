'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Split = dynamic(() => import('react-split'), { ssr: false });

interface ResponsiveLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  isMobile: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  left,
  right,
  isMobile,
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        {left}
        {right}
      </div>
    );
  }

  return (
    <Split
      sizes={[50, 50]}
      minSize={300}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      className="flex h-screen"
    >
      <div className="overflow-auto p-4">{left}</div>
      <div className="overflow-auto p-4">{right}</div>
    </Split>
  );
};

export default ResponsiveLayout;
