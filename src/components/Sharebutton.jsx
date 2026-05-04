import stylex from "@stylexjs/unplugin";
import * as shareicon from "../assets/share.png";

const Sharebutton = () => {
  const handleShare = async () => {
    const shareData = {
      title: "Imposter Syndrome Killer",
      text: "I decoded the job description using this site!",
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
    <button onClick={handleShare} {...props.stylex(styles.button)}>
      <img src={shareicon} {...props.stylex(styles.icon)} />
    </button>
  );
};

const styles = stylex.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: "0",
    alignItems: "right",
  },
  icon: { height: 70, width: 70, margin: 0, padding: 0 },
});

export default Sharebutton;
