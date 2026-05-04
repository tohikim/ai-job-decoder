import { tokens } from "../tokens.stylex";

export const skillStatuses = [
  {
    label: "Click to set",
    background: "transparent",
    progress: undefined,
    color: tokens["--color-primary"],
    borderColor: tokens["--color-third"],
  },
  {
    label: "I know this",
    background: "#EBF9EB",
    progress: 1,
    color: "#137729",
    borderColor: "#B7DFBA",
  },
  {
    label: "Learning",
    background: "#FFFAE1",
    progress: 0.5,
    color: "#946A01",
    borderColor: "#F8D87C",
  },
  {
    label: "No clue",
    background: "#FFF0EE",
    progress: 0,
    color: "#B23015",
    borderColor: "#FAC7BE",
  },
];
