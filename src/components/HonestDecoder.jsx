import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import { tokens } from "../tokens.stylex";

const EXPANDABLE_SECTION_ID = "expandable-toggle";
const defaultHeight = "100";

const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button {...stylex.props(styles.btnToggle)} onClick={onClick}>
      {isExpanded ? "Show less" : "Show more"}
    </button>
  );
};

const HonestDecoder = (props) => {
  const text = props.llmResult.decoder.roleOverview;
  const [heightCurrent, setHeightCurrent] = useState(defaultHeight);
  const [heightMax, setHeightMax] = useState(defaultHeight);
  const [heightMin, setHeightMin] = useState(defaultHeight);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const element = document.getElementById(EXPANDABLE_SECTION_ID);
    const heightClient = element?.clientHeight || defaultHeight;
    const scrollClient = element?.scrollHeight || defaultHeight;

    if (heightClient !== scrollClient) {
      setIsOverflow(true);
      setHeightMax(scrollClient);
      setHeightMin(heightClient);
      setHeightCurrent(heightClient);
    }
  }, [text]);

  const handleClickBtn = () => {
    setHeightCurrent(isExpanded ? heightMin : heightMax);
    setIsExpanded((prev) => !prev);
  };

  return (
    <div {...stylex.props(styles.singleColumnDiv)}>
      <h4 {...stylex.props(styles.h4)}>{props.llmResult.decoder.roleTitle}</h4>
      <div
        id={EXPANDABLE_SECTION_ID}
        {...stylex.props(styles.textDisplay(heightCurrent, isExpanded))}
      >
        {text}
      </div>
      {isOverflow && (
        <ToggleButton isExpanded={isExpanded} onClick={handleClickBtn} />
      )}
    </div>
  );
};

const styles = stylex.create({
  singleColumnDiv: {
    gap: "1rem",
    textAlign: "left",
    width: {
      "@media (max-width: 800px)": "100%",
      "@media (min-width: 801px)": "80%",
    },
    minHeight: "100px",
    padding: "4px",
    marginBottom: "1rem",
  },
  columnTitleDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    verticalAlign: "center",
  },
  h4: {
    fontSize: {
      "@media (max-width: 800px)": "24px",
      "@media (min-width: 801px)": "34px",
    },
    paddingBottom: "0.7rem",
    textAlign: "left",
    padding: 0,
    margin: 0,
    marginBottom: "1rem",
    fontWeight: "400",
    color: tokens["--color-navy"],
  },
  h6: {
    fontSize: "18px",
    padding: 0,
    margin: 0,
    marginBottom: "0.7rem",
    textAlign: "left",
    fontWeight: "400",
  },
  p: {
    fontSize: "18px",
    textAlign: "left",
    padding: "0",
    margin: "0",
    fontWeight: "100",
    marginBottom: "1rem",
    lineHeight: "1.6rem",
    color: tokens["--color-secondary"],
  },
  btnToggle: {
    borderWidth: 0,
    backgroundColor: "transparent",
    color: tokens["--color-navy"],
    fontSize: "18px",
    textDecoration: "underline",
    alignSelf: "center",
    padding: 0,
    fontWeight: "400",
    margin: "0.5rem 0 1rem 0",
  },
  textDisplay: (heightCurrent, isExpanded) => ({
    fontSize: "18px",
    textAlign: "left",
    padding: "0",
    margin: "0",
    fontWeight: "100",
    marginBottom: "1rem",
    lineHeight: "1.6rem",
    overflow: "hidden",
    transition: "height 0.5s ease-in-out",
    height: `${heightCurrent}px`,
    animation: isExpanded ? "mask-expanding 0.5s" : "mask-collapsing 0.5s",
    maskImage: isExpanded
      ? "linear-gradient(black 100%, transparent)"
      : "linear-gradient(black 50%, transparent)",
  }),
});

export default HonestDecoder;
