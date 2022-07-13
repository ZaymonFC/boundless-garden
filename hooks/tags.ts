import { atom, useAtomValue, useSetAtom } from "jotai";

export type TagType = "author" | "date";
export type Tag = { type?: TagType; tag: string };

const uniqueByKey =
  <Obj>() =>
  <Property extends keyof Obj>(property: Property) =>
  (xs: Obj[]) => {
    return Array.from(new Map(xs.map((item) => [item[property], item])).values());
  };

const uniqueByLabel = uniqueByKey<Tag>()("tag");

const tagsAtom = atom<Tag[]>([]);
const uniqueTagsAtom = atom((get) => uniqueByLabel(get(tagsAtom)));

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
