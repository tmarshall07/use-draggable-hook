import { useState, useEffect } from 'react';

const useDrag = (ref, deps = [], options) => {
  const {
    onPointerDown = () => {},
    onPointerUp = () => {},
    onPointerMove = () => {},
    onDrag = () => {},
  } = options;  

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);

    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);

    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    onPointerMove(e);

    if (isDragging) {
      onDrag(e);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('pointerdown', handlePointerDown);
      element.addEventListener('pointerup', handlePointerUp);
      element.addEventListener('pointermove', handlePointerMove);

      return () => {
        element.removeEventListener('pointerdown', handlePointerDown);
        element.removeEventListener('pointerup', handlePointerUp);
        element.removeEventListener('pointermove', handlePointerMove);
      };
    }

    return () => {};
  }, [...deps, isDragging]);

  return { isDragging };
};

export default useDrag;