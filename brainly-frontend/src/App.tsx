import { useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Card } from "./components/Card";

function App() {
  // load Twitter widgets script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-4 justify-end">
        <Button
          startIcon={<PlusIcon size="lg" />}
          endIcon={<ShareIcon size="md" />}
          size="sm"
          variant="secondary"
          text="share"
        />
        <Button
          startIcon={<ShareIcon size="lg" />}
          endIcon={<ShareIcon size="md" />}
          size="sm"
          variant="primary"
          text="Add to Content"
        />
      </div>
      <div className="flex gap-4">
        <Card
        type="twitter"
        link="https://x.com/RitikaNayak_/status/1967563005216043076"
        title="First tweet"
      />

      <Card
        type="youtube"
        link="https://www.youtube.com/watch?v=W1H1DDMWPdg"
        title="First video"
      />
      </div>
    </div>
  );
}

export default App;
