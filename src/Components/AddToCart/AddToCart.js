import styles from './AddToCart.module.css';
import React from 'react';
import { ReactComponent as Add } from "../../assets/image/add.svg";

const AddToCart = props => {
    const {
        game,
        handleHoverGame,
        handleAddToCart
    } = props;

    return (
          <div className={styles.addToCart} onMouseEnter={handleHoverGame} onMouseLeave={handleHoverGame} id={game.name} onClick={handleAddToCart}>
            <h4 style={{ color: game.isHovered ? "#92f" : "#999" }}>Add to cart</h4>
            <Add className={styles.add} style={{ fill: game.isHovered ? "#92f" : "#999" }} />
          </div>
    );
  }
  
  export default AddToCart;