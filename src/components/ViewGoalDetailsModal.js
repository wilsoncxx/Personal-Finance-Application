import { useState } from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";
import EditGoalModal from "./EditGoalModal";

export default function ViewGoalDetailsModal({ goalId, handleClose }) {
  const { getGoalDetails, goals, deleteGoal, deleteGoalDetail } = useBudgets();
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);

  const goalDetails = getGoalDetails(goalId);
  const goal = goals.find((b) => b.id === goalId);
  console.log(goalId);

  return (
    <Modal show={goalId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Savings - {goal?.name}</div>
            {goalId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => setShowEditGoalModal(true)}
                variant="outline-success"
              >
                Edit
              </Button>
            )}
            {goalId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteGoal(goal);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {goalDetails.map((goalDetail) => (
            <Stack direction="horizontal" gap="2" key={goalDetail.id}>
              <div className="me-auto fs-4">{goalDetail.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(goalDetail.amount)}
              </div>
              <Button
                onClick={() => deleteGoalDetail(goalDetail)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
      <EditGoalModal
        show={showEditGoalModal}
        goalId={goalId}
        handleClose={() => setShowEditGoalModal(false)}
      />
    </Modal>
  );
}
