import { Card } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function ExpenseCard({ date, name, desc, amount }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div>{name}</div>
          <div style={{ fontWeight: "bold" }}>{date}</div>
        </Card.Title>
        <div>{"Description : " + desc}</div>
        <div>{currencyFormatter.format(amount)}</div>
      </Card.Body>
    </Card>
  );
}
