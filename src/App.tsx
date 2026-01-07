import { useEffect, useState } from "react";
import "./App.css";

const START = new Date("2026-01-01T00:00:00").getTime();
const END = new Date("2026-12-31T23:59:59").getTime();

function calculatePercent(): number {
  const now = Date.now();
  const total = END - START;
  const passed = now - START;

  return Math.min(Math.max((passed / total) * 100, 0), 100);
}

export default function App(): JSX.Element {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      setPercent(Number(calculatePercent().toFixed(2)));
    };

    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <main className="app">
      <section className="content">
        <h1>2026 Loading…</h1>

        <div className="progress-container">
          <svg viewBox="0 0 200 200">
            <circle
              className="track"
              cx="100"
              cy="100"
              r={radius}
            />
            <circle
              className="indicator"
              cx="100"
              cy="100"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="percentage">{percent}%</div>
        </div>

        <p>Time already lived in 2026</p>
      </section>
    </main>
  );
}
