export function getMonthKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function getCurrentMonthKey() {
  return getMonthKey(new Date());
}

// ако искаш, може да си остане – сега не го ползваме, но не пречи
export function listMonthsAround(yearsBack = 2, yearsForward = 1) {
  const months = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  for (let y = currentYear - yearsBack; y <= currentYear + yearsForward; y++) {
    for (let m = 1; m <= 12; m++) {
      months.push({
        key: `${y}-${String(m).padStart(2, "0")}`,
        label: `${String(m).padStart(2, "0")}.${y}`,
      });
    }
  }

  return months;
}

export function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy} г.`;
}

export function shiftMonthKey(monthKey, delta) {
  const [yStr, mStr] = monthKey.split("-");
  let year = parseInt(yStr, 10);
  let month = parseInt(mStr, 10); // 1–12

  month += delta;

  while (month < 1) {
    month += 12;
    year -= 1;
  }
  while (month > 12) {
    month -= 12;
    year += 1;
  }

  return `${year}-${String(month).padStart(2, "0")}`;
}

export function getMonthLabelBg(monthKey) {
  const monthNames = [
    "януари",
    "февруари",
    "март",
    "април",
    "май",
    "юни",
    "юли",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември",
  ];
  const [, mStr] = monthKey.split("-");
  const m = parseInt(mStr, 10); // 1–12
  const name = monthNames[m - 1] || "";
  return name;
}
