import { useState, useCallback } from 'react';

const useBooleanState = (
  initialValue = false,
): [boolean, () => void, () => void] => {
  const [state, setState] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setState(true), [state]);

  const setFalse = useCallback(() => setState(false), [state]);

  return [state, setTrue, setFalse];
};

export default useBooleanState;
