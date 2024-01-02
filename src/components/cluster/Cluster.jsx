import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import ImgElement from './ImgElement';

const generateShapes = () => {
  return [...Array(50)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    imgSrc: 'https://udupicitycentre.com/wp-content/uploads/2019/01/vneck-tee-2.jpg',
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Cluster = () => {
  const [images, setImages] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setImages(
      images.map((img) => {
        return {
          ...img,
          isDragging: img.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setImages(
      images.map((img) => {
        return {
          ...img,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight - 50}>
      <Layer>
        <Text text="Try to drag images" fontSize={16} />
        {images.map((img) => (
          <ImgElement
            key={img.id}
            src={img.imgSrc}
            x={img.x}
            y={img.y}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Cluster;
