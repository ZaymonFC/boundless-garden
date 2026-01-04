import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { merge, Subject } from "rxjs";
import { debounceTime, filter, map, scan } from "rxjs/operators";
import useSWR from "swr";
import { fetcher } from "../lib/requests";
import { useFirstDefinedValue } from "./useFirstDefinedValue";

// --- Server Interaction ------------------------------------------------------
const incrementClaps = async (postId: string, clapsDiff: number) => {
  try {
    await fetch(`/api/claps?postId=${postId}`, {
      method: "POST",
      body: JSON.stringify({ clapsDiff }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("An error occurred while incrementing claps:", error);
  }
};

// --- Client Side State ------------------------------------------------------

type ClientClaps = Record<string, number>;
const key = "client-post-claps";

export const clapAtom = atomWithStorage(key, {} as ClientClaps);

const useIncrementClaps = (postId: string) => {
  const claps$ = useMemo(() => new Subject<number>(), [postId]);
  const reset$ = useMemo(() => new Subject<void>(), [postId]);

  const claps = useAtomValue(clapAtom);
  const clapsForPost = claps[postId];

  // When a clap comes in, push a new value to the claps$ observable
  useEffect(() => {
    if (clapsForPost > 0) {
      claps$.next(1);
    }
  }, [clapsForPost]);

  useEffect(() => {
    const clapsWithReset$ = merge(claps$, reset$.pipe(map((_) => 0)));

    const subscription = clapsWithReset$
      .pipe(
        filter((claps) => claps !== undefined),
        scan((acc, curr) => (curr === 0 ? 0 : acc + curr), 0),
        debounceTime(850),
        filter((claps) => claps > 0),
      )
      .subscribe((claps) => {
        incrementClaps(postId, claps);
        reset$.next(); // Trigger a reset to accumulation
      });

    return () => subscription.unsubscribe();
  }, [claps$, reset$]);
};

export const useClaps = (postId: string) => {
  const [claps, setClaps] = useAtom(clapAtom);
  const [globalClaps, setGlobalClaps] = useState(0);
  const { data } = useSWR("/api/claps?postId=" + postId, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const previousClaps = useFirstDefinedValue(claps[postId]);

  const adjustedClaps = globalClaps - (previousClaps || 0);

  useIncrementClaps(postId);

  useEffect(() => {
    if (data?.claps) {
      setGlobalClaps(data.claps);
    }
  }, [data]);

  useEffect(() => {
    if (!claps[postId]) {
      setClaps((claps) => ({ ...claps, [postId]: 0 }));
    }
  }, [postId]);

  const clap = () => setClaps((claps) => ({ ...claps, [postId]: claps[postId] + 1 }));

  return { claps: claps[postId] + adjustedClaps, clap };
};
