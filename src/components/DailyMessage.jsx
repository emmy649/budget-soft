import { getMessageForToday } from "../utils/messages";

export default function DailyMessage() {
  const message = getMessageForToday();

  return (
    <div className="card">
      <p
        style={{
          fontSize: 16,
          color: "var(--text-muted)",
          margin: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 22,
            marginRight: 4,
          }}
        >
          „
        </span>
        {message}
        <span
          style={{
            fontSize: 22,
            marginLeft: 4,
          }}
        >
          “
        </span>
      </p>
    </div>
  );
}
