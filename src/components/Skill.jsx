import youtube from "../assets/youtube.png";
import { useEffect, useState } from "react";
import { skillStatuses } from "../constants/skill-statuses";
import { formatArrayToTargetObject } from "../utils/format-array-to-target-object";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";

const Skill = (props) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [checked, setChecked] = useState(
    formatArrayToTargetObject(props.skill.actionItems, false),
  );

  useEffect(() => {
    switch (statusIndex) {
      case 1:
        setChecked(formatArrayToTargetObject(props.skill.actionItems, true));
        break;
      case 2:
        const allAreTrue = props.skill.actionItems.every(
          (item) => checked[item],
        );

        if (allAreTrue) {
          setChecked(formatArrayToTargetObject(props.skill.actionItems, false));
        }
        break;
      case 3:
        setChecked(formatArrayToTargetObject(props.skill.actionItems, false));
        break;
      default:
        break;
    }
  }, [statusIndex]);

  useEffect(() => {
    const skillsToUpdateCount = props.skill.actionItems.reduce((acc, cur) => {
      if (checked[cur]) {
        acc += 1;

        return acc;
      }

      return acc;
    }, 0);

    props.updateSkillScore(skillsToUpdateCount);

    if (props.skill.actionItems.length === skillsToUpdateCount) {
      setStatusIndex(1);
      return;
    } else if (skillsToUpdateCount > 0) {
      setStatusIndex(2);
      return;
    }
  }, [checked]);

  return (
    <div key={props.skill.label} {...stylex.props(styles.container)}>
      <div
        {...stylex.props(styles.topSection, {
          backgroundColor: skillStatuses[statusIndex].background,
        })}
      >
        <h6 {...stylex.props(styles.h6)}>{props.skill.label}</h6>
        <form>
          <select
            value={statusIndex}
            {...stylex.props(styles.statusIndex)}
            onChange={(e) => {
              e.preventDefault();
              setStatusIndex(+e.target.value);
            }}
          >
            {skillStatuses.map((status, index) => {
              const isDefault = index === 0;
              return (
                <option
                  key={status.label}
                  disabled={isDefault}
                  defaultValue={isDefault}
                  value={index}
                  {...stylex.props(styles.option)}
                >
                  {status.label}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div {...stylex.props(styles.skillDiv)}>
        {props.skill.actionItems.map((item) => {
          // const lastIndex = index === props.skill.actionItems.length - 1;
          const isChecked = checked[item];
          const link = () => {
            const url = "https://www.youtube.com/results?search_query=" + item;
            return window.open(url);
          };
          return (
            <div
              key={item}
              {...stylex.props(styles.section, {
                color: isChecked
                  ? tokens["--color-third"]
                  : tokens["--color-secondary"],
                borderBottom: 0,
              })}
            >
              <input
                type="checkbox"
                value={item}
                checked={isChecked}
                onChange={() => {
                  setChecked((prev) => {
                    return {
                      ...prev,
                      [item]: !isChecked,
                    };
                  });
                }}
                {...stylex.props(styles.checkbox, isChecked && styles.checked)}
              />
              <button
                onClick={() => {
                  setChecked((prev) => {
                    return {
                      ...prev,
                      [item]: !isChecked,
                    };
                  });
                }}
                {...stylex.props(styles.inputValue, {
                  textDecoration: isChecked
                    ? `line-through ${tokens["--color-third"]}`
                    : undefined,
                  color: isChecked
                    ? tokens["--color-third"]
                    : tokens["--color-secondary"],
                })}
              >
                {item}
              </button>
              <button onClick={link} {...stylex.props(styles.button)}>
                <img
                  alt="Youtube link"
                  src={youtube}
                  {...stylex.props(styles.img, {
                    opacity: isChecked ? 0.2 : 0.7,
                  })}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    marginBottom: 28,
    width: "100%",
    border: `1px solid ${tokens["--color-third"]}`,
    borderRadius: 15,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottom: `1px solid ${tokens["--color-third"]}`,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    textAlign: "left",
    padding: "1rem",
    gap: "1rem",
    position: "relative",
  },
  checkbox: {
    appearance: "none",
    width: "1.6rem",
    height: "1.6rem",
    padding: "0.8rem",
    textAlign: "left",
    border: `1px solid ${tokens["--color-fourth"]}`,
    backgroundColor: tokens["--color-fourth"],
    borderRadius: "50px",
  },
  checked: {
    padding: "0.8rem",
    borderColor: tokens["--color-third"],
    backgroundColor: tokens["--color-third"],
  },
  inputValue: {
    fontSize: "18px",
    textAlign: "left",
    padding: "0",
    margin: "0",
    fontWeight: "300",
    lineHeight: "1.4rem",
    marginBottom: "0.5rem",
    marginRight: "0.3rem",
    position: "relative",
    background: "transparent",
    border: "0",
  },
  img: {
    height: "15px",
    width: "15px",
    margin: 0,
    paddingTop: "0.3rem",
    alignItems: "center",
  },
  h6: {
    fontSize: "18px",
    paddingBottom: "0.7rem",
    marginBottom: "0.2rem",
    textAlign: "left",
    fontWeight: "400",
    padding: 0,
    margin: 0,
  },
  skillDiv: {
    borderRadius: "15px",
    marginTop: "0.6rem",
    textAlign: "left",
  },
  statusIndex: {
    border: 0,
    background: "transparent",
    fontSize: "18px",
    paddingRight: "1rem",
  },
  button: {
    border: 0,
    background: "transparent",
  },
});

export default Skill;
