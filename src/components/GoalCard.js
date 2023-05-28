import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function GoalCard({
  name,
  amount,
  max,
  date,
  gray,
  hideButtons,
  onAddSavingClick,
  onViewDetailsClick,
}) {
  const classNames = [];
  var status = "";
  var today = new Date();
  const maxDate = new Date(date);

  var dif =
    Math.floor((maxDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) +
    1;

  var daysLeft;

  if (dif > 0) daysLeft = dif;
  else if (dif == 0) daysLeft = 0;
  else daysLeft = -1;

  if (daysLeft >= 0 && amount >= max) {
    classNames.push("bg-success", "bg-opacity-10");
    status += "(succeed)";
  } else if (amount < max && daysLeft < 0) {
    classNames.push("bg-danger", "bg-opacity-10");
    status += "(failed)";
  } else {
    classNames.push("bg-light");
    status += "(...processing...)";
  }

  const percent = (amount / max) * 100;
  const percentage = percent > 100 ? 100 : percent;

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
            label={Math.floor(percentage) + "%"}
          />
        )}
        {max && <div className="me-2 pt-3">Target date: {date}</div>}
        {max && <div className="me-2">Days Left: {daysLeft}</div>}
        {max && <div className="me-2">{status}</div>}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-success"
              className="ms-auto"
              onClick={onAddSavingClick}
            >
              Add Saving
            </Button>
            <Button onClick={onViewDetailsClick} variant="outline-secondary">
              View Details
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.25) return "danger";
  if (ratio < 0.5) return "warning";
  if (ratio < 1) return "info";
  return "success";
}
