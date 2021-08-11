import { css, cx } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { ReferenceSet, useReferenceLinker } from "../hooks/useReferenceLinker";

export type Source = {
  year?: number;
  url?: string;
  author?: string;
  title?: string;
  publisher?: string;
};

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
    <sup>
      <a id={`${citation}-inline`} href={`#${citation}-source`}>
        [{position}]
      </a>
    </sup>
  );
};

type ReferencesProps = { id: string; references: ReferenceSet };

type SourceLineProps = { id: string; citation: string };

const SourceLine = ({ id, citation }: SourceLineProps) => {
  const references = useReferenceLinker((s) => s.references[id]);
  const { position, source } = useCitation(references, citation);

  return (
    <div id={`${citation}-source`}>
      {position !== undefined && source && (
        <p>
          {position}. {source.publisher ? `${source.publisher}, ` : ""}
          {source.year ? `${source.year}, ` : ""}
          {source.author ? `${source.author}, ` : ""}
          {source.title ? `${source.title}. ` : ""}
          {source.url ? <a href={source.url}>—{source.url}</a> : null}{" "}
          <a href={`#${citation}-inline`}>
            <sup>[In text]</sup>
          </a>
        </p>
      )}
    </div>
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

const bibliographyStyles = css`
  /* Force wrapping of long URLs */
  a {
    white-space: pre; /* CSS 2.0 */
    white-space: pre-wrap; /* CSS 2.1 */
    white-space: pre-line; /* CSS 3.0 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: -moz-pre-wrap; /* Mozilla */
    word-wrap: break-word;
  }

  sup {
    vertical-align: top;
  }
`;

export const Bibliography = ({ id }: { id: string }) => {
  const references = useReferences(id);

  if (references) {
    return (
      <>
        <h2>References</h2>
        <div className={cx(bibliographyStyles)}>
          {Object.keys(references).map((citation, idx) => (
            <SourceLine key={idx} id={id} citation={citation} />
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};
