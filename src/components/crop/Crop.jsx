import React, { useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer, Text } from 'react-konva';
import useImage from 'use-image';

const Crop = ({ imageUrl }) => {
  const [image] = useImage(imageUrl);
  const [crop, setCrop] = useState({ x: 50, y: 50, width: 100, height: 100 });
  const [selected, setSelected] = useState(false);

  const handleDragEnd = () => {
    const rect = rectRef.current;
    if (rect) {
      setCrop({
        x: rect.x(),
        y: rect.y(),
        width: rect.width(),
        height: rect.height(),
      });
    }
  };

  const handleTransform = () => {
    const node = rectRef.current;
    if (node) {
      setCrop({
        x: node.x(),
        y: node.y(),
        width: node.width() * node.scaleX(),
        height: node.height() * node.scaleY(),
      });
    }
  };

  const rectRef = React.useRef();
  const trRef = React.useRef();

  return (
    <div style={{ display: 'flex' }}>
      <Stage width={window.innerWidth / 2} height={window.innerHeight - 20}>
        <Layer>
          <Image image={image} />
          <Rect
            x={crop.x}
            y={crop.y}
            width={crop.width}
            height={crop.height}
            draggable
            stroke="red"
            strokeWidth={2}
            ref={rectRef}
            onDragEnd={handleDragEnd}
            onTransform={handleTransform}
            onClick={() => setSelected(!selected)}
          />
          {selected && <Transformer ref={trRef} />}
          <Text text="Try to drag box on the image" fontSize={16} />
        </Layer>
      </Stage>
      <Stage width={window.innerWidth / 2} height={window.innerHeight}>
        <Layer>
          <Image image={image} crop={crop} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Crop;
