import { getMonthLabelBg, shiftMonthKey } from "../utils/dateUtils";

export default function MonthSelector({ monthKey, onChange }) {
  const label = getMonthLabelBg(monthKey);

  const goPrev = () => {
    onChange(shiftMonthKey(monthKey, -1));
  };

  const goNext = () => {
    onChange(shiftMonthKey(monthKey, 1));
  };

  return (
    <div className="card month-card">
      <div className="month-nav">
        <button
          type="button"
          className="month-arrow"
          onClick={goPrev}
          aria-label="Предишен месец"
        >
          ‹
        </button>
        <div className="month-label">{label}</div>
        <button
          type="button"
          className="month-arrow"
          onClick={goNext}
          aria-label="Следващ месец"
        >
          ›
        </button>
      </div>
    </div>
  );
}
