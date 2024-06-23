import styles from "./TransactionCard.module.css";
import {
    IoMdBriefcase,
    IoMdCloseCircleOutline,
    IoMdPizza,
    IoMdGift,
    IoMdCreate,
} from "react-icons/io";

export default function TransactionCard({ details, handleDelete, handleEdit }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardIcon}>
                    {details.category == "food" && <IoMdPizza />}
                    {details.category == "entertainment" && <IoMdGift />}
                    {details.category == "travel" && <IoMdBriefcase />}
                </div>
                <div className={styles.cardInfo}>
                    <h5>{details.title}</h5>
                    <p>{details.date}</p>
                </div>
            </div>

            <div className={styles.cardInner}>
                <p className={styles.cardPrice}>{`₹${details.price}`}</p>
                <div className={styles.cardButtonWrapper}>
                    <button
                        className={styles.cardDelete}
                        onClick={handleDelete}
                    >
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className={styles.cardEdit} onClick={handleEdit}>
                        <IoMdCreate />
                    </button>
                </div>
            </div>
        </div>
    );
}
