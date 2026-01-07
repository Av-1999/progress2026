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

function getTimeLeft() {
  const now = new Date();
  const end = new Date(END);
  let diff = end.getTime() - now.getTime();

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  diff -= months * (1000 * 60 * 60 * 24 * 30);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  return { months, days, hours, minutes, seconds };
}

export default function App() {
  const [percent, setPercent] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const update = () => {
      setPercent(Number(calculatePercent().toFixed(2)));
      setTimeLeft(getTimeLeft());
    };

    update();
    const id = setInterval(update, 1000);
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
            <circle className="track" cx="100" cy="100" r={radius} />
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

          <div className="time-left">
            {timeLeft.months}m {timeLeft.days}d {timeLeft.hours}h{" "}
            {timeLeft.minutes}m {timeLeft.seconds}s
          </div>

          <p>Time already lived in 2026</p>

          <p className="copyright">Updated by: @karinamanoukian</p>
          <p className="copyright">© crated by: @av_10_99</p>
        </div>
      </section>
    </main>
  );
}
