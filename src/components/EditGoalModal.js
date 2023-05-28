import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function EditGoalModal({ show, goalId, handleClose }) {
  const nameRef = useRef();
  const targetRef = useRef();
  const { goals, editGoal } = useBudgets();

  // const defaultName = goals.find((goal) => goal.id === goalId).name;
  // const defaultTarget = goals.find((goal) => goal.id === goalId).max;

  function handleSubmit(e) {
    e.preventDefault();
    editGoal({
      name: nameRef.current.value,
      target: parseFloat(targetRef.current.value),
      goalId: goalId,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Goal & Target</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={nameRef}
              type="text"
              // defaultValue={defaultName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="target">
            <Form.Label>Target</Form.Label>
            <Form.Control
              ref={targetRef}
              type="number"
              required
              min={0}
              step={1}
              // defaultValue={defaultTarget}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="success" type="submit">
              Save
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
