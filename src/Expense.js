import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetsContext";
import Navbar from "./components/Navbar";
import ExpenseCard from "./components/ExpenseCard";

function Expense() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  let lastDisplayedDate;
  let expenseNumber = 0;
  const { expenses } = useBudgets();
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Expense</h1>
          <Button variant="success" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <div>
            {expenses.map((expense) => {
              const expenseDate = new Date(expense.time);
              let dateToDisplay;
              if (lastDisplayedDate !== expenseDate.toDateString()) {
                dateToDisplay = expenseDate.toDateString();
                lastDisplayedDate = dateToDisplay;
              }
              expenseNumber++;
              return (
                <ExpenseCard
                  key={expense.id}
                  date={dateToDisplay}
                  desc={expense.description}
                  amount={expense.amount}
                />
              );
            })}
          </div>
          <TotalBudgetCard />
        </div>
      </Container>
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default Expense;
