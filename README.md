# 🚀 Imposter Syndrome Killer (ISK 1.0)

**Imposter Syndrome Killer** is a minimalist, logic-driven React application designed to strip away the intimidation of job hunting. By deconstructing complex job descriptions (JDs) into manageable technical checklists, it provides a data-backed confidence boost for applicants.

---

## 🌐 Try it Live

This project is deployed and ready for immediate use. You do not need to install anything locally to test the features:

👉 **[Live Demo on Vercel](https://imposter-syndrome-killer.vercel.app/)**

---

## ✨ Features & Logic

- **Honest Job Decoder:** Translates jargon-heavy JDs into a concise, one-paragraph summary.
- **Dynamic Readiness Score:** A visual gauge (Doughnut Chart) that tracks readiness in real-time.
- **Three-Tier Skill Assessment:** Uses a custom "Click to set" logic:
  - **I know this:** 1.0 point
  - **Learning:** 0.5 points
  - **No clue:** 0 points
- **Integrated Learning Path:** Each action item links directly to a YouTube search result for the specific task.
- **Native Sharing:** Share your readiness status via the Web Share API.
- **Privacy-First:** Every session is a fresh start—no data persisted, no sign-up required.

---

## 🛠️ Technical Implementation

### **Core Stack**

- **Frontend:** React (Vite)
- **Styling:** `@stylexjs/stylex` for type-safe, maintainable CSS-in-JS.
- **Visuals:** `Chart.js` for the dynamic readiness gauge.
- **Interactivity:** Intersection Observer API for scroll-based triggers.

---

### **Project Structure Highlights**

- **`Skill.jsx`**: Manages the "Click to set" state and score mapping.
- **`HonestDecoder.jsx`**: Handles smooth height transitions for JD summaries.
- **`Sharebutton.jsx`**: Implements native sharing with a clipboard fallback.

---

Developed by **Tohi Kim**
