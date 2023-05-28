import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { auth, db } from "../firebase.js";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const time = new Date().toLocaleString();

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [goals, setGoals] = useLocalStorage("goals", []);
  const [goalDetails, setGoalDetails] = useLocalStorage("goalDetails", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function getGoalDetails(goalDetailsId) {
    return goalDetails.filter(
      (goalDetails) => goalDetails.goalId === goalDetailsId
    );
  }
  async function addExpense({ description, amount, budgetId }) {
    // const newGoalRef = collection(db, "expenses");
    // await addDoc(newGoalRef, { desc: description, amount: amount });

    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), time, description, amount, budgetId },
      ];
    });
  }
  async function addBudget({ name, max }) {
    // const newGoalRef = collection(db, "budgets");
    // await addDoc(newGoalRef, { name: name, max: max });

    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), time, name, max }];
    });
  }
  function addGoalDetail({ description, amount, goalId }) {
    setGoalDetails((prevGoalDetails) => {
      return [
        ...prevGoalDetails,
        { id: uuidV4(), description, amount, goalId },
      ];
    });
  }
  async function addGoal({ name, max, date }) {
    // const newGoalRef = collection(db, "goals");
    // await addDoc(newGoalRef, { date: date, max: max, name: name });

    setGoals((prevGoals) => {
      if (prevGoals.find((goal) => goal.name === name)) {
        return prevGoals;
      }
      return [...prevGoals, { id: uuidV4(), name, max, date }];
    });
  }

  function editGoal({ name, target, goalId }) {
    // setGoals((prevGoals) => {
    //   var tempGoals = prevGoals.map((goal) => {
    //     if (goal.id === goalId) {
    //       goal.name = name;
    //       goal.max = target;
    //     }
    //   });
    //   return tempGoals;
    // });
    // var tempGoals = goals.map((goal) => {
    //   if (goal.id === goalId) {
    //     goal.name = name;
    //     goal.max = target;
    //   }
    // });
    // setGoals(tempGoals);

    goals.forEach((goal) => {
      if (goal.id === goalId) {
        goal.name = name;
        goal.max = target;
      }
    });
  }

  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteGoal({ id }) {
    setGoalDetails((prevGoalDetails) => {
      return prevGoalDetails.map((goalDetail) => {
        if (goalDetail.goalId !== id) return goalDetail;
        deleteGoalDetail(goalDetail.id);
      });
    });

    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  function deleteGoalDetail({ id }) {
    setGoalDetails((prevGoalDetails) => {
      return prevGoalDetails.filter((goalDetail) => goalDetail.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        goals,
        getBudgetExpenses,
        getGoalDetails,
        addExpense,
        addBudget,
        addGoalDetail,
        addGoal,
        editGoal,
        deleteBudget,
        deleteGoal,
        deleteExpense,
        deleteGoalDetail,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
