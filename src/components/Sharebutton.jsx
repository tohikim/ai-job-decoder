import * as stylex from "@stylexjs/stylex";
import shareicon from "../assets/share.png";

const Sharebutton = () => {
  const handleShare = async () => {
    const shareData = {
      title: "Imposter Syndrome Killer",
      text: `Turns out I’m actually a great fit for this role. Checked the requirements with the Imposter Syndrome Killer.`,
      url: window.location.href,
    };

    // 2. Check if the user's browser/OS supports the Web Share API
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Successfully shared");
      } catch (error) {
        // This catches errors, but also triggers if the user closes the share sheet without sharing
        console.log("Error sharing:", error);
      }
    } else {
      // 3. Fallback for desktop browsers that don't support native sharing
      // A common fallback is copying the link to the clipboard
      try {
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`,
        );
        alert("Link copied to clipboard!"); // Replace with a nice toast notification in your actual app
      } catch (clipboardError) {
        console.error("Fallback clipboard copy failed", clipboardError);
      }
    }
  };

  return (
    <button onClick={handleShare} {...stylex.props(styles.button)}>
      <img src={shareicon} {...stylex.props(styles.icon)} />
    </button>
  );
};

const styles = stylex.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: "0",
    alignItems: "right",
  },
  icon: {
    height: 70,
    width: 70,
    margin: 0,
    padding: 0,
  },
});

export default Sharebutton;
