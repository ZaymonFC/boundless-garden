import { format } from "date-fns";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import Meta from "../data/Meta";
import { uniqueByKey } from "../utilities/uniqueByKey";

// === UTILITIES ==============================================================
export const formatTagDate = (date: Date) => format(date, "MMMM yyyy");

// == Domain Types ============================================================
export type TagType = "author" | "date";
export type Tag = { type?: TagType; tag: string };

// === ATOMS ==================================================================
const tagsAtom = atom<Tag[]>([]);
const uniqueByLabel = uniqueByKey<Tag>()("tag");

const uniqueTagsAtom = atom((get) => uniqueByLabel(get(tagsAtom)));
const uniqueLabelsAtom = atom((get) => get(uniqueTagsAtom).map((t) => t.tag));

// === HOOKS ==================================================================
export const useTag = (tag: Tag) => {
  const setAtom = useSetAtom(tagsAtom);

  return {
    addTag: () => setAtom((tags) => [...tags, tag]),
    removeTag: () => setAtom((tags) => tags.filter((t) => t.tag !== tag.tag)),
  };
};

export const useTags = () => {
  const setTagSet = useSetAtom(tagsAtom);
  const clear = () => setTagSet((_) => []);

  return { tags: useAtomValue(uniqueTagsAtom), clear };
};

export const useFilteredPostsByTags = () => {
  const tags = useAtomValue(uniqueLabelsAtom);

  const data = Object.entries(Meta).reverse();

  const filteredData = useMemo(() => {
    if (tags.length === 0) return data;

    return data.filter(([_, meta]) => {
      const postTags = [...meta.tags, meta.author, formatTagDate(meta.date)];
      return tags.every((t) => postTags.includes(t));
    });
  }, [tags]);

  return filteredData;
};
