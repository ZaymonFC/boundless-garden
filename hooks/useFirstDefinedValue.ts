import { useEffect, useRef } from "react";

export function useFirstDefinedValue<T>(otherState: T): T | undefined {
  const firstDefinedRef = useRef<T>();

  useEffect(() => {
    if (otherState !== undefined && firstDefinedRef.current === undefined) {
      firstDefinedRef.current = otherState;
    }
  }, [otherState]);

  return firstDefinedRef.current;
}
