import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Transformer, Ellipse, RegularPolygon } from 'react-konva';

const shapes = [
  {
    x: 20,
    y: 50,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect',
  },
  {
    x: 200,
    y: 100,
    radius: 50,
    fill: 'green',
    id: 'circle',
  },
  {
    x: 250,
    y: 300,
    radius: {
      x: 80,
      y: 40,
    },
    fill: 'blue',
    id: 'ellipse',
  },
  {
    x: 20,
    y: 300,
    points: [0, 0, 100, 0, 100, 100],
    tension: 0.5,
    stroke: 'black',
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
    closed: true,
    id: 'polygon',
  },
];

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef?.current]}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

const Circular = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: Math.max(5, node.radius() * scaleX),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef?.current]}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
        />
      )}
    </Fragment>
  );
};

const Elliptical = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Ellipse
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: {
              x: Math.max(5, node.radiusX() * scaleX),
              y: Math.max(5, node.radiusY() * scaleY),
            }
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef?.current]}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

const Polygon = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Line
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            points: [
              node.points()[0] * scaleX,
              node.points()[1] * scaleY,
              node.points()[2] * scaleX,
              node.points()[3] * scaleY,
              node.points()[4] * scaleX,
              node.points()[5] * scaleY,

            ],
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef?.current]}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

const Shapes = () => {
  const [rectangle, setRectangle] = useState(shapes[0]);
  const [circular, setCircular] = useState(shapes[1]);
  const [elliptical, setElliptical] = useState(shapes[2]);
  const [polygon, setPolygon] = useState(shapes[3]);
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  return (
    <Stage
    width={window.innerWidth}
    height={window.innerHeight - 50}
    onMouseDown={checkDeselect}
    onTouchStart={checkDeselect}
    >
      <Layer>
        <Text text="Here are some shapes" fontSize={16} />
        <Rectangle
              shapeProps={rectangle}
              isSelected={rectangle.id === selectedId}
              onSelect={() => {
                selectShape(rectangle.id);
              }}
              onChange={(newAttrs) => {
                setRectangle(newAttrs);
              }}
            />
        <Circular
          shapeProps={circular}
          isSelected={circular.id === selectedId}
          onSelect={() => {
            selectShape(circular.id);
          }}
          onChange={(newAttrs) => {
            setCircular(newAttrs);
          }}
      />
      <Elliptical
          shapeProps={elliptical}
          isSelected={elliptical.id === selectedId}
          onSelect={() => {
            selectShape(elliptical.id);
          }}
          onChange={(newAttrs) => {
            setElliptical(newAttrs);
          }}
      />
      <Polygon
        shapeProps={polygon}
        isSelected={polygon.id === selectedId}
        onSelect={() => {
          selectShape(polygon.id);
        }}
        onChange={(newAttrs) => {
          setPolygon(newAttrs);
        }}
      />
      </Layer>
    </Stage>
  );
};

export default Shapes;


