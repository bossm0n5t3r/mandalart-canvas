import React from 'react';
import Split from 'react-split';

interface ResizableSplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const ResizableSplitLayout: React.FC<ResizableSplitLayoutProps> = ({
  left,
  right,
}) => {
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

export default ResizableSplitLayout;
