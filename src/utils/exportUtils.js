import { formatDisplayDate } from "./dateUtils";

export function exportExpensesToCsv(monthKey, expenses) {
  if (!expenses || expenses.length === 0) {
    alert("Няма записи за този месец.");
    return;
  }

  // Заглавия на колони на български
  const header = ["Дата", "Сума", "Категория", "Бележка"];

  // Редове
  const rows = expenses.map((e) => [
    formatDisplayDate(e.date), // 02.12.25 г.
    Number(e.amount).toFixed(2).replace(".", ","), // 12,50
    e.category || "",
    (e.note || "").replace(/"/g, '""'),
  ]);

  // Използваме ; като разделител – по-добре за BG Excel
  const lines = [
    header.join(";"),
    ...rows.map((r) =>
      r
        .map((cell) => `"${(cell ?? "").toString()}"`)
        .join(";")
    ),
  ];

  // Добавяме BOM за да разпознае кирилицата правилно
  const csvContent = "\uFEFF" + lines.join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `razhodi-${monthKey}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
