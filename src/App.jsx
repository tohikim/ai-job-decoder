import { useState } from "react";
import Home from "./routes/Home";
import Result from "./routes/Result";
import "./index.css";

const routes = {
  home: Home,
  result: Result,
};

function App() {
  const [route, setRoute] = useState("home");
  const [jobDescription, setJobDescription] = useState("");
  const [llmResult, setLlmResult] = useState();

  const Route = routes[route];

  return (
    <div>
      <Route
        setRoute={setRoute}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        llmResult={llmResult}
        setLlmResult={setLlmResult}
      />
    </div>
  );
}

export default App;
