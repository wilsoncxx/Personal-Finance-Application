import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import { Button, Card, Stack, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { currencyFormatter } from "./utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"];
// const randomColors = budgets.map(() => randomColor());

export default function Analytics() {
  const { expenses, budgets } = useBudgets();
  const [SelectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [SelectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [amount, setAmount] = useState(0);

  const budgetNames = budgets.map((budget) => budget.name);
  const [chartData, setChartData] = useState({
    labels: budgetNames,
    datasets: [
      {
        data: budgets.map((budget) => budget.amount),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  });

  const [listGroupData, setListGroupData] = useState([]);
  useEffect(() => {
    let totalAmount = 0;
    let uncategorizedAmount = 0;
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.time);
      const month = expenseDate.getMonth();
      const year = expenseDate.getFullYear();
      if (month === SelectedMonth && year === SelectedYear) {
        if (expense.budgetId === UNCATEGORIZED_BUDGET_ID) {
          uncategorizedAmount += expense.amount;
          totalAmount += expense.amount;
        } else {
          totalAmount += expense.amount;
        }
      }
    });
    setAmount(totalAmount);
    let budgetAmounts = budgets.map((budget) => {
      let amount = 0;
      expenses.forEach((expense) => {
        if (expense.budgetId === budget.id) {
          const expenseDate = new Date(expense.time);
          const month = expenseDate.getMonth();
          const year = expenseDate.getFullYear();
          if (month === SelectedMonth && year === SelectedYear) {
            amount += expense.amount;
          }
        }
      });
      return {
        name: budget.name,
        amount: amount,
        percentage: ((amount / totalAmount) * 100).toFixed(2),
      };
    });
    setListGroupData([
      ...budgetAmounts,
      {
        name: "Uncategorized",
        amount: uncategorizedAmount,
        percentage: ((uncategorizedAmount / totalAmount) * 100).toFixed(2),
      },
    ]);
    setChartData({
      labels: [...budgetNames, "Uncategorized"],
      datasets: [
        {
          data: [
            ...budgetAmounts.map((budget) => budget.amount),
            uncategorizedAmount,
          ],
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    });
  }, [SelectedMonth, SelectedYear, expenses, budgets, budgetNames]);

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      position: "right",
      align: "center",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    center: [`Total: ${amount}`, 20],
    // center: [50, 50]
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handlePreviousClick = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      setSelectedMonth(11);
      setSelectedYear(SelectedYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
      setSelectedMonth(SelectedMonth - 1);
    }
  };

  const handleNextClick = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      setSelectedMonth(0);
      setSelectedYear(SelectedYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
      setSelectedMonth(SelectedMonth + 1);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <Button variant="success" onClick={handlePreviousClick}>
            &lt;
          </Button>
          <h1 className="text-center">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </h1>
          <Button variant="success" onClick={handleNextClick}>
            &gt;
          </Button>
        </Stack>
        <div style={{ width: "400px", height: "400px" }}>
          <Doughnut data={chartData} options={options} />
        </div>
        <Card>
          <Card.Body>
            <Card.Title>Total Expense</Card.Title>
            <Card.Text>{currencyFormatter.format(amount)}</Card.Text>
            <ListGroup>
              {listGroupData.map((budgetAmount, index) => (
                <ListGroup.Item key={index}>
                  {budgetAmount.name} - {"MYR " + budgetAmount.amount} -{" "}
                  {budgetAmount.percentage}%
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
