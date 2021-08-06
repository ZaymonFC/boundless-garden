import React from "react";
import create from "zustand";
import { Source } from "../components/References";

export type ReferenceSet = { [key: string]: Source };

const initialState = {
  references: {} as { [id: string]: ReferenceSet },
  linkRefs: {} as {
    [key: string]: { [position: number]: React.MutableRefObject<any> };
  },
};

type ReferenceLinkerState = typeof initialState & {
  addReferences: (id: string, references: ReferenceSet) => void;
  addLinkRef: (
    id: string,
    key: string,
    ref: React.MutableRefObject<any>
  ) => void;
};

export const useReferenceLinker = create<ReferenceLinkerState>((set) => ({
  ...initialState,
  addReferences: (id, references) =>
    set((state) => ({
      references: { ...state.references, [id]: references },
    })),
  addLinkRef: (key, position, ref) =>
    set((state) => ({
      linkRefs: { ...state.linkRefs, [key]: { [position]: ref } },
    })),
}));
