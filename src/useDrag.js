import { useState, useEffect } from 'react';

const useDrag = (ref, deps = [], options) => {
  const {
    onMouseDown = () => {},
    onMouseUp = () => {},
    onMouseMove = () => {},
    onDrag = () => {},
  } = options;  

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);

    onMouseDown(e);
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);

    onMouseUp(e);
  };

  const handleMouseMove = (e) => {
    onMouseMove(e);

    if (isDragging) {
      onDrag(e);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => {};
  }, [...deps, isDragging]);

  return { isDragging };
};

export default useDrag;