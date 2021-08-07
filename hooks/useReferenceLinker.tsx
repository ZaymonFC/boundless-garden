import create from "zustand";
import { Source } from "../components/References";

export type ReferenceSet = { [citation: string]: Source };

const initialState = {
  references: {} as { [id: string]: ReferenceSet },
};

type ReferenceLinkerState = typeof initialState & {
  addReferences: (id: string, references: ReferenceSet) => void;
};

export const useReferenceLinker = create<ReferenceLinkerState>((set) => ({
  ...initialState,
  addReferences: (id, references) =>
    set((state) => ({
      references: { ...state.references, [id]: references },
    })),
}));
