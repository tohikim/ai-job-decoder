import * as stylex from "@stylexjs/unplugin";
import { useEffect, useState } from "react";

const defaultHeight = "100";

const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button {...props.stylex(styles.btnToggle)} onClick={onClick}>
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
    const element = document.querySelector(".text-display");
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
    <div {...props.stylex(styles.singleColumnDiv)}>
      <h4 {...props.stylex(styles.h4)}>{props.llmResult.decoder.roleTitle}</h4>
      <div
        className={`${isExpanded ? "expanded" : "collapsed"} text-display`}
        {...props.stylex(styles.textDisplay, {
          height: `${heightCurrent}px`,
          animation: isExpanded
            ? "mask-expanding 0.5s"
            : "mask-collapsing 0.5s",
          maskImage: isExpanded
            ? "linear-gradient(black 100%, transparent)"
            : "linear-gradient(black 50%, transparent)",
        })}
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
    width: "100%",
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
    fontSize: "24px",
    paddingBottom: "0.7rem",
    textAlign: "left",
    padding: 0,
    margin: 0,
    marginBottom: "1rem",
    fontWeight: "400",
    color: "var(--color-navy)",
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
    color: "var(--color-secondary)",
  },
  btnToggle: {
    border: 0,
    backgroundColor: "transparent",
    color: "var(--color-navy)",
    fontSize: "18px",
    textDecoration: "underline",
    alignSelf: "center",
    padding: 0,
    fontWeight: "400",
    margin: "0.5rem 0 1rem 0",
  },
  textDisplay: {
    fontSize: "18px",
    textAlign: "left",
    padding: "0",
    margin: "0",
    fontWeight: "100",
    marginBottom: "1rem",
    lineHeight: "1.6rem",
    overflow: "hidden",
    transition: "height 0.5s ease-in-out",
  },
});

export default HonestDecoder;
