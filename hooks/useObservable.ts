import { Observable } from "rxjs";
import { useState, useEffect } from "react";

const useObservable = <T>(observable: Observable<T>, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const sub = observable.subscribe({
      next: (value: T) => setState(value),
    });
    return () => sub.unsubscribe();
  }, [setState, observable]);

  return state;
};

export default useObservable;
