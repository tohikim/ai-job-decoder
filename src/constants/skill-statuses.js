import { tokens } from "../tokens.stylex";

export const skillStatuses = [
  {
    label: "Click to set",
    backgroundColor: "transparent",
    progress: undefined,
    color: tokens["--color-primary"],
    borderColor: tokens["--color-third"],
  },
  {
    label: "I know this",
    backgroundColor: "#EBF9EB",
    progress: 1,
    color: "#137729",
    borderColor: "#B7DFBA",
  },
  {
    label: "Learning",
    backgroundColor: "#FFFAE1",
    progress: 0.5,
    color: "#946A01",
    borderColor: "#F8D87C",
  },
  {
    label: "No clue",
    backgroundColor: "#FFF0EE",
    progress: 0,
    color: "#B23015",
    borderColor: "#FAC7BE",
  },
];
