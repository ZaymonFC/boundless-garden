import { css, cx } from "@emotion/css";
import { colours } from "../styles/tokens";

const DefinitionListStyles = css`
  padding: 0;
  padding-right: 2rem;
  padding-bottom: 1.5rem;
  margin: 0;
  margin-left: 4rem;

  li {
    font-size: 1rem;
    font-family: "Jetbrains Mono";
  }
  li + li {
    margin-top: 10px;
  }
`;

const DefinitionList = ({ definitions }: { definitions: string[] }) => {
  return (
    <ol className={cx(DefinitionListStyles)}>
      {definitions.map((definition, idx) => (
        <li key={idx}>{definition}</li>
      ))}
    </ol>
  );
};

const DefinitionStyles = css`
  border: solid 1px ${colours.primary};
  border-radius: 4px;

  margin: 30px 0;

  backdrop-filter: blur(1px);

  h2 {
    display: inline-block;
    padding: 0;
    margin: 0;

    font-weight: 300;
  }
`;

const DefinitionTopic = css`
  padding: 1px 4px;
  color: ${colours.primary};
  border-radius: 3px;
  border: 1px solid ${colours.primary};
  vertical-align: top;
  margin-left: 4px;
  font-family: "Jetbrains Mono";
  font-size: 0.8rem;
`;

const DefinitionHeaderPadding = css`
  padding: 1.5rem;
`;

type DefinitionProps = { word: string; definitions: string[]; topic?: string };

export default function Definition({ word, topic, definitions }: DefinitionProps) {
  return (
    <div className={cx(DefinitionStyles)}>
      <div className={cx(DefinitionHeaderPadding)}>
        <h2>{word}</h2>

        {topic && <span className={cx(DefinitionTopic)}>{topic}</span>}
      </div>

      <DefinitionList definitions={definitions} />
    </div>
  );
}
