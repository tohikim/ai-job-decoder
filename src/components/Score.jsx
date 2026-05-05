import * as stylex from "@stylexjs/stylex";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Score = (props) => {
  const completed = Math.round((props.currentScore / props.totalScore) * 100);
  const percentage = `${completed}%`;

  let bgcolor = {};

  if (completed < 40) {
    bgcolor = "#FAC7BE";
  } else if (completed < 70) {
    bgcolor = "#F8D87C";
  } else if (completed < 99) {
    bgcolor = "#B7DFBA";
  } else if (completed === 100) {
    bgcolor = "#002e57";
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.doughnutContainer)}>
        <Doughnut
          data={{
            datasets: [
              {
                data: [
                  props.currentScore,
                  props.totalScore - props.currentScore,
                ],
                backgroundColor: [bgcolor, "#f0efef"],
                circumference: 180,
                borderWidth: 0,
                rotation: 270,
              },
            ],
          }}
          plugins={[
            {
              id: "centerText",
              afterDatasetsDraw(chart, _args, pluginOptions) {
                const { ctx } = chart;
                const meta = chart.getDatasetMeta(0);
                const x = meta.data[0].x;
                const y = meta.data[0].y;

                ctx.save();
                ctx.font = "bold 50px Arial";
                ctx.fillStyle = "#002e57";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.fillText(pluginOptions.value, x, y + 5);
                ctx.restore();
              },
            },
          ]}
          options={{
            cutout: "87%",
            aspectRatio: 2,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
              centerText: {
                value: percentage,
              },
            },
          }}
          styles={{
            width: `${GRAPH_WIDTH_IN_VIEW_WIDTH}vw`,
          }}
        />
      </div>
      <div {...stylex.props(styles.textContainer)}>
        <h6 {...stylex.props(styles.h6)}>Your Readiness Score</h6>
        <p {...stylex.props(styles.p)}>
          Improve your job readiness score by assessing your technical skills 👇
        </p>
      </div>
    </div>
  );
};

const GRAPH_WIDTH_IN_VIEW_WIDTH = 70;

const styles = stylex.create({
  container: {
    borderRadius: "15px",
    marginBottom: "1rem",
    padding: "1rem",
    width: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "80%",
    },
  },
  doughnutContainer: {
    position: "relative",
    padding: "2rem 0 0 0",
  },
  textsContainer: {
    alignSelf: "center",
    textAlign: "center",
  },
  h6: {
    fontSize: "18px",
    paddingBottom: "0.7rem",
    marginBottom: "0.2rem",
    fontWeight: "400",
    textAlign: "center",
  },
  p: {
    display: {
      "@media (max-width: 800px)": "block",
      "@media (min-width: 801px)": "none",
    },
    fontSize: "18px",
    textAlign: "center",
    width: "100%",
    padding: "0",
    margin: "0",
    fontWeight: "100",
    marginBottom: "3rem",
    lineHeight: "1.6rem",
  },
});

export default Score;
