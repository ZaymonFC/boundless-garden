import React, { useState } from "react";
import { useEffect } from "react";
import { ReferenceSet, useReferenceLinker } from "../hooks/useReferenceLinker";

export type Source = { year?: number; url?: string; author?: string };

type InlineReferenceProps = { id: string; citation: string };

export const Inline = ({ id, citation }: InlineReferenceProps) => {
  const [position, setPosition] = useState<string>("?");

  const references = useReferenceLinker((s) => s.references[id]);

  useEffect(() => {
    if (references) {
      const index = Object.keys(references).indexOf(citation);

      if (index != null) {
        setPosition(`${index + 1}`);
      }
    }
  }, [references, setPosition, citation]);

  return <sup>{position}</sup>;
};

type ReferencesProps = { id: string; references: ReferenceSet };

export const References = ({ id, references }: ReferencesProps) => {
  const addReferences = useReferenceLinker((s) => s.addReferences);
  addReferences(id, references);
  return null;
};

const SourceLine = ({
  position,
  source,
}: {
  position: number;
  source: Source;
}) => {
  return (
    <div>
      {source && (
        <p>
          {position}. {source.year}, {source.author} —{source.url}
        </p>
      )}
    </div>
  );
};

export const Bibliography = ({ id }: { id: string }) => {
  const [references, setReferences] = useState<ReferenceSet | undefined>(
    undefined
  );

  const referenceSet = useReferenceLinker((s) => s.references[id]);

  return (
    <>
      {references &&
        Object.entries(references).map(([position, source], idx) => (
          <SourceLine key={idx} position={parseInt(position)} source={source} />
        ))}
    </>
  );
};
