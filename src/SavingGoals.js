import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddGoalModal from "./components/AddGoalModal";
import AddGoalDetailModal from "./components/AddGoalDetailModal";
import ViewGoalDetailsModal from "./components/ViewGoalDetailsModal";
import GoalCard from "./components/GoalCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import Navbar from "./components/Navbar";

function SavingGoals() {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddGoalDetailModal, setShowAddGoalDetailModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState();
  const [addGoalDetailModalGoalId, setAddGoalDetailModalGoalId] = useState();
  const { goals, getGoalDetails } = useBudgets();

  function openAddSavingModal(goalId) {
    setShowAddGoalDetailModal(true);
    setAddGoalDetailModalGoalId(goalId);
  }

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Saving Goals</h1>
          <Button variant="success" onClick={() => setShowAddGoalModal(true)}>
            Add Goals
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
          {goals.map((goal) => {
            const amount = getGoalDetails(goal.id).reduce(
              (total, goalDetail) => total + goalDetail.amount,
              0
            );
            return (
              <GoalCard
                key={goal.id}
                name={goal.name}
                amount={amount}
                max={goal.max}
                date={goal.date}
                onAddSavingClick={() => openAddSavingModal(goal.id)}
                onViewDetailsClick={() => setViewDetailsModal(goal.id)}
              />
            );
          })}
        </div>
      </Container>
      <AddGoalModal
        show={showAddGoalModal}
        handleClose={() => setShowAddGoalModal(false)}
      />
      <AddGoalDetailModal
        show={showAddGoalDetailModal}
        defaultGoalId={addGoalDetailModalGoalId}
        handleClose={() => setShowAddGoalDetailModal(false)}
      />
      <ViewGoalDetailsModal
        goalId={viewDetailsModal}
        handleClose={() => setViewDetailsModal()}
      />
    </>
  );
}

export default SavingGoals;
