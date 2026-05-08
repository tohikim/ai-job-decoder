# 🚀 Imposter Syndrome Killer (ISK 1.0)

**Imposter Syndrome Killer** is a minimalist, logic-driven React application designed to strip away the intimidation of job hunting. By deconstructing complex job descriptions (JDs) into manageable technical checklists, it provides a data-backed confidence boost for applicants.

<br>
<h2> 🌐 Try it Live </h2>

This project is deployed and ready for immediate use. You do not need to install anything locally to test the features:

👉 **[Live Demo on Vercel](https://imposter-syndrome-killer.vercel.app/)**

<br>
<h2>✨ Features & Logic</h2>

- **Honest Job Decoder:** Translates jargon-heavy JDs into a concise, one-paragraph summary.
- **Dynamic Readiness Score:** A visual gauge (Doughnut Chart) that tracks readiness in real-time.
- **Three-Tier Skill Assessment:** Uses a custom "Click to set" logic:
  - **I know this:** 1.0 point
  - **Learning:** 0.5 points
  - **No clue:** 0 points
- **Integrated Learning Path:** Each action item links directly to a YouTube search result for the specific task.
- **Native Sharing:** Share your readiness status via the Web Share API.
- **Privacy-First:** Every session is a fresh start—no data persisted, no sign-up required.

<br>
<h2>🛠️ Technical Implementation</h2>

### **Core Stack**

- **Frontend:** React (Vite)
- **Styling:** `@stylexjs/stylex` for type-safe, maintainable CSS-in-JS.
- **Visuals:** `Chart.js` for the dynamic readiness gauge.
- **Interactivity:** Intersection Observer API for scroll-based triggers.


### **Project Structure Highlights**

- **`Skill.jsx`**: Manages the "Click to set" state and score mapping.
- **`HonestDecoder.jsx`**: Handles smooth height transitions for JD summaries.
- **`Sharebutton.jsx`**: Implements native sharing with a clipboard fallback.

<br>
<h2>📦 Installation & Setup</h2> 

If you want to run the project locally for development or customization, follow these steps:

1. **Clone the repository:**
   Open your terminal and run the following command to download the source code:
   ```bash
   git clone https://github.com/tohikim/imposter-syndrome-killer/
   cd imposter-syndrome-killer
   
2. **Install dependencies**
   This project uses Vite and specific libraries for styling and charts. Install everything with:
   ```bash
   npm install
   
3. **Verify core packages**
   Ensure the following key libraries are initialized:
   * **StyleX:** For the type-safe CSS-in-JS.
   * **Chart.js:** For the dynamic readiness gauge.

4. **Start the development server**
   Launch the local environment to see your changes in real-time:
   ```bash
   npm run dev

<br>

---

Developed by **Tohi Kim**
