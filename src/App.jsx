import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getCurrentMonthKey, formatDisplayDate } from "./utils/dateUtils";
import { exportExpensesToCsv } from "./utils/exportUtils";

import MonthSelector from "./components/MonthSelector";
import DailyMessage from "./components/DailyMessage";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategorySummary from "./components/CategorySummary";
import CategoryManager from "./components/CategoryManager";
import Modal from "./components/Modal";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [month, setMonth] = useState(getCurrentMonthKey());

  const [allExpenses, setAllExpenses] = useLocalStorage("expenses", {});
  const [categories, setCategories] = useLocalStorage("categories", [
    "Храна",
    "Транспорт",
    "Сметки",
    "Дом",
    "Забавление",
    "Здраве",
    "Друго",
  ]);

  const monthExpenses = allExpenses[month] || [];
  const total = monthExpenses.reduce((acc, x) => acc + Number(x.amount), 0);

  const addExpense = (expense) => {
    setAllExpenses((prev) => {
      const current = prev[month] || [];
      return {
        ...prev,
        [month]: [...current, expense],
      };
    });
  };

  const deleteExpense = (id) => {
    setAllExpenses((prev) => {
      const current = prev[month] || [];
      return {
        ...prev,
        [month]: current.filter((e) => e.id !== id),
      };
    });
  };

  const handleExport = () => {
    exportExpensesToCsv(month, monthExpenses);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-top">
          <div>
            <div className="app-title">Budget Soft</div>
            <div className="app-subtitle">
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="tabs">
              <button
                className={`tab-button ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Начало
              </button>
              <button
                className={`tab-button ${
                  activeTab === "analytics" ? "active" : ""
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                Анализи
              </button>
            </div>

            <button
              type="button"
              className="icon-button"
              onClick={handleExport}
              disabled={monthExpenses.length === 0}
              title="Експорт на записите (CSV)"
            >
              ⭳
            </button>
          </div>
        </div>
      </header>

      <main className="app-content">
        {activeTab === "dashboard" ? (
          <DashboardPage
            month={month}
            setMonth={setMonth}
            expenses={monthExpenses}
            total={total}
            categories={categories}
            onAddExpense={addExpense}
            onDeleteExpense={deleteExpense}
          />
        ) : (
          <AnalyticsPage
            month={month}
            setMonth={setMonth}
            expenses={monthExpenses}
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </main>
    </div>
  );
}

function DashboardPage({
  month,
  setMonth,
  expenses,
  total,
  categories,
  onAddExpense,
  onDeleteExpense,
}) {
  return (
    <>
      <MonthSelector monthKey={month} onChange={setMonth} />
      <DailyMessage />

      <ExpenseForm categories={categories} onAdd={onAddExpense} total={total} />

      <ExpenseList expenses={expenses} onDelete={onDeleteExpense} />
    </>
  );
}

function AnalyticsPage({
  month,
  setMonth,
  expenses,
  categories,
  setCategories,
}) {
  const [modalData, setModalData] = useState(null);

  const openCategory = (category, items) => {
    setModalData({ category, items });
  };

  const closeModal = () => setModalData(null);

  return (
    <>
      <MonthSelector monthKey={month} onChange={setMonth} />

      <CategorySummary expenses={expenses} onCategoryClick={openCategory} />

      <CategoryManager
        categories={categories}
        onChange={setCategories}
      />

      {modalData && (
        <Modal
          title={`Разходи в категория "${modalData.category}"`}
          onClose={closeModal}
        >
          {modalData.items.length === 0 ? (
            <p
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              Няма записи.
            </p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                maxHeight: "260px",
                overflowY: "auto",
              }}
            >
              {modalData.items.map((e) => (
                <li
                  key={e.id}
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid var(--border-soft)",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span>{formatDisplayDate(e.date)}</span>
                    <span
                      style={{ fontWeight: 600 }}
                    >{`${Number(e.amount).toFixed(2)} EUR`}</span>
                  </div>
                  {e.note && (
                    <div
                      style={{
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {e.note}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
