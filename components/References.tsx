import { css, cx } from "@emotion/css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { InlinePosition, ReferenceSet, useReferenceLinker } from "../hooks/useReferenceLinker";

export type Source = {
  year?: number;
  url?: string;
  author?: string;
  title?: string;
  publisher?: string;
};

const ReferenceContext = React.createContext("");
export const ReferenceProvider = ReferenceContext.Provider;

type ReferencesProps = { id: string; references: ReferenceSet };

export const References = ({ references }: ReferencesProps) => {
  const id = useContext(ReferenceContext);

  const addReferences = useReferenceLinker((s) => s.addReferences);
  addReferences(id, references);
  return null;
};

const useCitation = (citation: string) => {
  const id = useContext(ReferenceContext);
  const inlinePositions = useReferenceLinker((s) => s.inlinePositions[id]);
  const references = useReferenceLinker((s) => s.references[id]);

  const [position, setPosition] = useState<number>(-1);
  const [source, setSource] = useState<Source | undefined>();

  useEffect(() => {
    if (inlinePositions && references) {
      const source = references[citation];
      const index = inlinePositions.findIndex(([c, _]) => {
        return c === citation;
      });

      if (source && index >= 0) {
        setSource(source);
        setPosition(index + 1);
      }
    }
  }, [references, id, inlinePositions, setSource, citation, setPosition]);

  return { position, source };
};

type InlineReferenceProps = { citation: string };

export const Inline = ({ citation }: InlineReferenceProps) => {
  const id = useContext(ReferenceContext);

  const addInlineReferencePosition = useReferenceLinker((s) => s.addInlineReferencePosition);

  const { position } = useCitation(citation);
  const posRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (posRef.current) {
      const { left, top } = posRef.current.getBoundingClientRect();
      addInlineReferencePosition(id, [citation, [left, top]]);
    }
  }, [id, posRef, citation, addInlineReferencePosition]);

  return (
    <sup ref={posRef}>
      <a id={`${citation}-inline`} href={`#${citation}-source`}>
        [{position}]
      </a>
    </sup>
  );
};

const SourceLineStyles = css`
  p {
    font-family: "Cardo";
  }
  strong {
    font-weight: 700;
  }
`;

type SourceLineProps = { citation: string };

const SourceLine = ({ citation }: SourceLineProps) => {
  const { position, source } = useCitation(citation);

  return (
    <div id={`${citation}-source`} className={cx(SourceLineStyles)}>
      {position !== undefined && source && (
        <p>
          <strong>{position}</strong>. {source.publisher ? `${source.publisher}, ` : ""}
          {source.year ? `${source.year}, ` : ""}
          {source.author ? `${source.author}, ` : ""}
          <em>{source.title ? `${source.title}. ` : ""}</em>
          {source.url ? <a href={source.url}>{source.url}</a> : null}{" "}
          <a href={`#${citation}-inline`}>
            <sup>[In text]</sup>
          </a>
        </p>
      )}
    </div>
  );
};

const useInlinePositions = (id: string) => {
  const [inlinePositions, setInlinePositions] = useState<InlinePosition[] | undefined>();
  const inlinePositionArray = useReferenceLinker((s) => s.inlinePositions[id]);

  useEffect(() => {
    if (inlinePositionArray) {
      setInlinePositions(inlinePositionArray);
    }
  }, [inlinePositionArray, setInlinePositions]);

  return inlinePositions;
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

export const Bibliography = () => {
  const id = useContext(ReferenceContext);
  const inlinePositions = useInlinePositions(id);

  if (inlinePositions) {
    return (
      <>
        <h2>References</h2>
        <div className={cx(bibliographyStyles)}>
          {inlinePositions.map(([citation, _], idx) => (
            <SourceLine key={idx} citation={citation} />
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};
