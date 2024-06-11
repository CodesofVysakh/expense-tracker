import React, { useEffect, useState } from "react";
import styles from './Home.module.css'
import PieChart from "../charts/PieChart";

function HomePage() {
    const [data, setData] = useState([
        {
            "title": "Movie Ticket",
            "date": "2024-06-10",
            "category": "Entertainment",
            "amount": 15.50,
            "id": 1
          },
          {
            "title": "Grocery Shopping",
            "date": "2024-06-09",
            "category": "Food",
            "amount": 78.25,
            "id": 2
          },
          {
            "title": "Coffee Shop Visit",
            "date": "2024-06-08",
            "category": "Food",
            "amount": 5.25,
            "id": 3
          },
          {
            "title": "Restaurant Dinner",
            "date": "2024-06-04",
            "category": "Food",
            "amount": 67.80,
            "id": 7
          },
          {
            "title": "Movie Streaming Service",
            "date": "2024-06-02",
            "category": "Entertainment",
            "amount": 14.99,
            "id": 9
          },
          {
            "title": "Lunch with Colleague",
            "date": "2024-05-27",
            "category": "Food",
            "amount": 11.25,
            "id": 15
          }
    ]);

    return (
        <section className={styles.homePage}>
            <div className={styles.topContainer}>
                <h3>Expense Tracker</h3>
                <div className={styles.contentContainer}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h3 className={styles.walletHeading}>Wallet Balance: <span className={styles.balance}>₹4500</span></h3>
                            <button className={`${styles.addButton} ${styles.incomeButton}`}>Add Income</button>
                        </div>
                        <div className={styles.card}>
                            <h3 className={styles.walletHeading}>Expenses: <span className={styles.expense}>₹500</span></h3>
                            <button className={`${styles.addButton} ${styles.expenseButton}`}>Add Expense</button>
                        </div>
                    </div>
                    <div className="chart">
                        <PieChart />
                    </div>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.leftContainer}>
                    <h3>Recent Transactions</h3>
                    <ul className={styles.transactionList}>
                        {
                            data.map((item, i) => (
                                <li className={styles.transactionRow} >
                                    <div className={styles.rowChild}>
                                        <div className={styles.icon}>Ok</div>
                                        <div className="content">
                                            <h6 className={styles.rowTitle}>{item.title}</h6>
                                            <small className={styles.rowDate}>{item.date}</small>
                                        </div>
                                    </div>
                                    <div className={styles.rowChild}>
                                        <span>₹{item.amount}</span>
                                        <div className="delete-icon">D</div>
                                        <div className="edit-icon">E</div>
                                    </div>
                                </li>
                            ))
                        }
                        <div className="pagination">
                            page 1
                        </div>
                    </ul>
                </div>
                <div className={styles.rightContainer}>
                    <h3>Top Expenses</h3>
                    <div className="level-chart-container">

                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
