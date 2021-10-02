import React from "react";

type EmojiProps = {
  symbol: string;
  label?: string;
  spaceRight?: boolean;
  spaceLeft?: boolean;
};

const Space = () => <span>&nbsp;&nbsp;</span>;

export default function Emoji(props: EmojiProps) {
  const inner = (
    <>
      {props.spaceLeft && <Space></Space>}
      {props.symbol}
      {props.spaceRight && <Space></Space>}
    </>
  );

  const attributes = {
    "aria-label": props.label ? props.label : "",
    "aria-hidden": props.label ? false : true,
    role: "img",
    className: "emoji",
  };

  return <span {...attributes}>{inner}</span>;
}
