import React, { useState } from "react";
import { useEffect } from "react";
import { ReferenceSet, useReferenceLinker } from "../hooks/useReferenceLinker";

export type Source = { year?: number; url?: string; author?: string };

export const References = ({ id, references }: ReferencesProps) => {
  const addReferences = useReferenceLinker((s) => s.addReferences);
  addReferences(id, references);
  return null;
};

type InlineReferenceProps = { id: string; citation: string };

const useCitation = (references: ReferenceSet, citation: string) => {
  const [position, setPosition] = useState<number>(-1);
  const [source, setSource] = useState<Source | undefined>();

  useEffect(() => {
    if (references) {
      const source = references[citation];
      const index = Object.keys(references).indexOf(citation);
      if (source && index >= 0) {
        setSource(source);
        setPosition(index + 1);
      }
    }
  }, [references, setSource, citation, setPosition]);

  return { position, source };
};

export const Inline = ({ id, citation }: InlineReferenceProps) => {
  const references = useReferenceLinker((s) => s.references[id]);
  const { position } = useCitation(references, citation);

  return (
    <a id={`${citation}-inline`} href={`#${citation}-source`}>
      <sup>{position}</sup>
    </a>
  );
};

type ReferencesProps = { id: string; references: ReferenceSet };

type SourceLineProps = { id: string; citation: string };

const SourceLine = ({ id, citation }: SourceLineProps) => {
  const references = useReferenceLinker((s) => s.references[id]);
  const { position, source } = useCitation(references, citation);

  return (
    <a href={`#${citation}-inline`}>
      <div id={`${citation}-source`}>
        {position !== undefined && source && (
          <p>
            {position}. {source.year}, {source.author} —{source.url}
          </p>
        )}
      </div>
    </a>
  );
};

const useReferences = (id: string) => {
  const [references, setReferences] = useState<ReferenceSet | undefined>();
  const referenceSet = useReferenceLinker((s) => s.references[id]);

  useEffect(() => {
    if (referenceSet) {
      setReferences(referenceSet);
    }
  }, [referenceSet, setReferences]);

  return references;
};

export const Bibliography = ({ id }: { id: string }) => {
  const references = useReferences(id);

  return (
    <>
      <h2>Sources</h2>
      {references &&
        Object.keys(references).map((citation, idx) => (
          <SourceLine key={idx} id={id} citation={citation} />
        ))}
    </>
  );
};
