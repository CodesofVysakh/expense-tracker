import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import PieChart from "../charts/PieChart";
import TransactionList from "./TransactionList/TransactionList";
import BarChartComponent from "../charts/BarChart";
import ModalWrapper from "../Modal/Modal";
import ExpenseForm from "../Forms/ExpenseForm";
import AddBalanceForm from "../Forms/AddBalanceForm";

function HomePage() {
    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    const [isOpenExpense, setIsOpenExpense] = useState(false);
    const [isOpenBalance, setIsOpenBalance] = useState(false);

    const [categorySpends, setCategorySpends] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    });
    const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    });

    useEffect(() => {
        //Check localStorage
        const localBalance = localStorage.getItem("balance");

        if (localBalance) {
            setBalance(Number(localBalance));
        } else {
            setBalance(5000);
            localStorage.setItem("balance", 5000);
        }

        const items = JSON.parse(localStorage.getItem("expenses"));

        setExpenseList(items || []);
        setIsMounted(true);
    }, []);

    // saving expense list in localStorage
    useEffect(() => {
        if (expenseList.length > 0 || isMounted) {
            localStorage.setItem("expenses", JSON.stringify(expenseList));
        }

        if (expenseList.length > 0) {
            setExpense(
                expenseList.reduce(
                    (accumulator, currentValue) =>
                        accumulator + Number(currentValue.price),
                    0
                )
            );
        } else {
            setExpense(0);
        }

        let foodSpends = 0,
            entertainmentSpends = 0,
            travelSpends = 0;
        let foodCount = 0,
            entertainmentCount = 0,
            travelCount = 0;

        expenseList.forEach((item) => {
            if (item.category == "food") {
                foodSpends += Number(item.price);
                foodCount++;
            } else if (item.category == "entertainment") {
                entertainmentSpends += Number(item.price);
                entertainmentCount++;
            } else if (item.category == "travel") {
                travelSpends += Number(item.price);
                travelCount++;
            }
        });

        setCategorySpends({
            food: foodSpends,
            travel: travelSpends,
            entertainment: entertainmentSpends,
        });

        setCategoryCount({
            food: foodCount,
            travel: travelCount,
            entertainment: entertainmentCount,
        });
    }, [expenseList]);

    // saving balance in localStorage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("balance", balance);
        }
    }, [balance]);

    return (
        <section className={styles.homePage}>
            <div className={styles.topContainer}>
                <h3>Expense Tracker</h3>
                <div className={styles.contentContainer}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h3 className={styles.walletHeading}>
                                Wallet Balance:{" "}
                                <span className={styles.balance}>
                                    ₹{balance}
                                </span>
                            </h3>
                            <button
                                className={`${styles.addButton} ${styles.incomeButton}`}
                                onClick={() => setIsOpenBalance(true)}
                            >
                                Add Income
                            </button>
                        </div>
                        <div className={styles.card}>
                            <h3 className={styles.walletHeading}>
                                Expenses:{" "}
                                <span className={styles.expense}>
                                    ₹{expense}
                                </span>
                            </h3>
                            <button
                                className={`${styles.addButton} ${styles.expenseButton}`}
                                onClick={() => setIsOpenExpense(true)}
                            >
                                Add Expense
                            </button>
                        </div>
                    </div>
                    <div className={styles.chart}>
                        <PieChart
                            data={[
                                { name: "Food", value: categorySpends.food },
                                {
                                    name: "Entertainment",
                                    value: categorySpends.entertainment,
                                },
                                {
                                    name: "Travel",
                                    value: categorySpends.travel,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.transactionsWrapper}>
                <TransactionList
                    transactions={expenseList}
                    editTransactions={setExpenseList}
                    title="Recent Transactions"
                    balance={balance}
                    setBalance={setBalance}
                />

                <BarChartComponent
                    data={[
                        { name: "Food", value: categorySpends.food },
                        {
                            name: "Entertainment",
                            value: categorySpends.entertainment,
                        },
                        { name: "Travel", value: categorySpends.travel },
                    ]}
                />
            </div>
            <ModalWrapper isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
                <ExpenseForm
                    setIsOpen={setIsOpenExpense}
                    expenseList={expenseList}
                    setExpenseList={setExpenseList}
                    setBalance={setBalance}
                    balance={balance}
                />
            </ModalWrapper>

            <ModalWrapper isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
                <AddBalanceForm
                    setIsOpen={setIsOpenBalance}
                    setBalance={setBalance}
                />
            </ModalWrapper>
        </section>
    );
}

export default HomePage;
