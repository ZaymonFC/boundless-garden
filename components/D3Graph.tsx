import { useRef, useState, useEffect, useCallback, useReducer } from "react";
import { Graph } from "react-d3-graph";

export const d3GraphConfig = (width: number | undefined) => ({
  width: width ? width : 375,
  nodeHighlightBehavior: true,
  d3: {
    linkLength: 250,
    gravity: -400,
  },
  maxZoom: 1,
  minZoom: 1,
  node: {
    size: 1000,
    color: "#ff8f8f",
    highlightColor: "#7d8aff",
    fontColor: "rgb(241, 200, 146)",
    fontSize: 18,
    highlightFontSize: 18,
  },
  link: {
    color: "white",
    highlightColor: "lightblue",
    labelProperty: "label",
    renderLabel: true,
    fontColor: "rgb(241, 200, 146)",
    fontSize: 18,
  },
});

const initialState = { isResizing: false, needToResize: false };
type D3GraphState = typeof initialState;

type D3GraphAction = "startedResizing" | "finishedResizing" | "sizeUpdated";

const d3GraphReducer = (_state: D3GraphState, action: D3GraphAction) => {
  switch (action) {
    case "startedResizing":
      return { isResizing: true, needToResize: false };
    case "finishedResizing":
      return { isResizing: false, needToResize: true };
    case "sizeUpdated":
      return initialState;
  }
};

const D3Graph = ({ id, data }: any) => {
  const ref = useRef<any>();
  const [firstUpdate, setFirstUpdate] = useState(true);
  const [config, setConfig] = useState(d3GraphConfig(undefined));
  const [state, dispatch] = useReducer(d3GraphReducer, initialState);

  useEffect(() => {
    if ((state.needToResize || firstUpdate) && ref.current) {
      setConfig(d3GraphConfig(ref.current.offsetWidth));
      dispatch("sizeUpdated");
      setFirstUpdate(false);
    }
  }, [state, firstUpdate, setFirstUpdate, dispatch, ref, setConfig]);

  useEffect(() => {
    if (state.isResizing) {
      const handler = setTimeout(() => {
        dispatch("finishedResizing");
      }, 50);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [state, dispatch]);

  const onResize = useCallback(() => {
    if (!state.isResizing) {
      console.log("Starting");

      dispatch("startedResizing");
    }
  }, [state, dispatch]);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", onResize);
  }

  return (
    <div style={{ width: "100%" }} ref={ref}>
      <Graph id={id} data={data} config={config} />
    </div>
  );
};

export default D3Graph;
