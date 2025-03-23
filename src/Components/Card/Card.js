import styles from './Card.module.css';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Like } from "../../assets/image/like.svg";
import { motion } from "framer-motion";
import AddToCart from '../AddToCart/AddToCart';
import AddedToCart from '../AddedToCart/AddedToCart';
import { useLocation } from 'react-router-dom';

const Card = (props) => {
    const { 
        game,
        handleAddToCart,
        handleHover,
        hoverState,
        handleHoverGame,
        handleSelectGame
    } = props;

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    // استرجاع بيانات السلة
    let all_io = JSON.parse(window.localStorage.getItem("cartItems")) || [];

    // التحقق مما إذا كان العنصر في السلة
    const isInCart = all_io.some(item => item.id === game.id);

    // **حالة لحفظ `liked`**
    const [isLiked, setIsLiked] = useState(false);

    // **تحميل حالة `liked` عند فتح الصفحة**
    useEffect(() => {
        const likedItem = all_io.find(item => item.id === game.id);
        if (likedItem) {
            setIsLiked(likedItem.liked || false);
        }
    }, [game.id]);

    // **تحديث حالة الإعجاب عند النقر**
    const handleLike = (e) => {
        e.stopPropagation(); // منع تفعيل `onClick` الخاص بـ `motion.div`

        // تحديث الحالة في `localStorage`
        let updatedCart = [...all_io];
        const index = updatedCart.findIndex(item => item.id === game.id);

        if (index !== -1) {
            // إذا كان العنصر موجودًا، نقلب `liked`
            updatedCart[index].liked = !updatedCart[index].liked;
        } else {
            // إذا لم يكن موجودًا، نضيفه مع `liked: true`
            updatedCart.push({ ...game, liked: true });
        }

        // تحديث `localStorage` وتحديث الحالة
        window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setIsLiked(!isLiked);
    };

    const location = useLocation();

    // تحسين `className`
    const cardClass = 
        hoverState[1].selected === false ? styles.card :
        game.id === 26 ? styles.fifa :
        game.id === 12 ? styles.tombraider :
        game.id === 3 ? styles.mariokart :
        game.id === 11 ? styles.minecraft :
        styles.cardHome;

    return (
        <motion.div 
            className={cardClass}
            onClick={handleSelectGame}
            id={game.id}
            style={{ margin: 0, padding: 0 }}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <img src={game.cover} className={styles.img} alt="Game Cover Image" />

            <div className={styles.price}>
                {isInCart ? (
                    <AddedToCart />
                ) : (
                    <AddToCart 
                        game={game} 
                        handleHoverGame={handleHoverGame} 
                        handleAddToCart={handleAddToCart} 
                    />
                )}
                <span>${game.price}</span>
            </div>

            <h2 className={styles.name}>{game.name}</h2>

            <button 
                className={styles.like} 
                id={game.id} 
                onClick={handleLike} 
                aria-label="Like"
            >
                <Like 
                    style={{ fill: isLiked ? "#F53333" : "#cccccc" }} 
                    className={styles.likeSVG}
                />
            </button>
        </motion.div>
    );
};

export default Card;
