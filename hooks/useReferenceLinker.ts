import create from "zustand";
import { Source } from "../components/References";

export type ReferenceSet = { [citation: string]: Source };
export type InlinePosition = [string, [number, number]];

const initialState = {
  references: {} as { [id: string]: ReferenceSet },
  inlinePositions: {} as { [id: string]: InlinePosition[] },
};

type ReferenceLinkerState = typeof initialState & {
  addReferences: (id: string, references: ReferenceSet) => void;
  addInlineReferencePosition: (id: string, inlinePosition: InlinePosition) => void;
};

export const useReferenceLinker = create<ReferenceLinkerState>((set) => ({
  ...initialState,
  addReferences: (id, references) =>
    set((state) => ({
      references: { ...state.references, [id]: references },
    })),
  addInlineReferencePosition: (id, inlinePosition) =>
    set((state) => {
      const inlinePositions = state.inlinePositions[id] || [];

      const notIndexed =
        inlinePositions.findIndex(([citation, _]) => citation === inlinePosition[0]) === -1;

      if (notIndexed) {
        const updatedInlinePositions = inlinePositions.concat([inlinePosition]);

        updatedInlinePositions.sort(([_ida, [ax, ay]], [_idb, [bx, by]]) => {
          if (ay === by) {
            return ax - bx;
          } else {
            return ay - by;
          }
        });

        return {
          inlinePositions: {
            ...state.inlinePositions,
            [id]: updatedInlinePositions,
          },
        };
      } else {
        return state;
      }
    }),
}));
