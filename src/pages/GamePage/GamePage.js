import styles from './GamePage.module.css';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AnimatedGamePage from '../AnimatedPage/AnimatedGamePage';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/navbar';
import { ReactComponent as Arrow } from "../../assets/image/arrow.svg";
import { ReactComponent as Up } from "../../assets/image/up.svg";
import { ReactComponent as Like } from "../../assets/image/like.svg";
import Slider from '../../Components/Slider/slider';
import AnimatedText from '../AnimatedPage/AnimatedText';
import { ReactComponent as Add } from "../../assets/image/add.svg";
import AddedToCartBig from '../../Components/AddedToCart/AddedToCartBig';
import Cart from '../../Components/Cart/cart';
import templateGame from '../../utils/templateGame';
import { Link } from 'react-router-dom';
import img112 from "./check_5610944.png"

const GamePage = props => {
      const navigate = useNavigate();
  
  if (!window.localStorage.getItem("LoginUser")) {
    navigate("/")
  }
  let { gameId } = useParams();
  let paid=JSON.parse(window.localStorage.getItem("paid"))
  let bought= false
  if (paid) {
  
 for (let index = 0; index < paid.length; index++) {
  const element = paid[index];
  // console.log(element.surname);
  
  if (element.surname == gameId) {
    bought=true
  }
  
 }
}
  
  const {
    handleHover,
    hoverState,
    handleHome,
    landingPage,
    cartAmount,
    cart,
    search,
    searching,
    handleSearch,
    handleSearchSubmit,
    browsing,
    handleBrowse,
    selectedGame,
    setSelectedGame,
    allGames,
    extended,
    setExtended,
    handleAddToCart,
    handleLike,
    textExtended,
    setTextExtended,
    handleOpenCart,
    handleCloseCart,
    cartDisplayed,
    clearCart,
    handleRemoveFromCart,
    openGamePage
  } = props;

 
  window.localStorage.setItem("name",gameId)
  const location = useLocation();
  const [carouselState, setCarouselState] = useState(0);

  const incrementCarousel = (e) => {
    if (carouselState === 3) {
      setCarouselState(0);
    } else {
      setCarouselState(carouselState + 1);
    }
  }

  const decrementCarousel = (e) => {
    if (carouselState === 0) {
      setCarouselState(3);
    } else {
      setCarouselState(carouselState - 1);
    }
  }

  const extendText = () => {
    setTextExtended(!textExtended);
  }

  const handleExtend = (e) => {
    if (document.getElementById("20").innerHTML === "More") {
      document.getElementById("20").className="aboutBottom";
    } else if (document.getElementById("20").innerHTML === "Hide") {
        document.getElementById("20").className="aboutBottomClosed";
    }
    setExtended(!extended);
    if (textExtended === false) {
      setTimeout(extendText, 500);
    } else {
        setTextExtended(!textExtended);
    }
  }
  
  return (
    <>
        <div className={styles.gamepage}>
            {cartDisplayed ? <Cart 
              cartDisplayed={cartDisplayed} 
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              cart={cart}
              cartAmount={cartAmount}
              handleHover={handleHover}
              hoverState={hoverState}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
            /> : null}

            <NavBar
              handleHover={handleHover}
              hoverState={hoverState}
              handleHome={handleHome}
              browsing={browsing}
              landingPage={landingPage}
              cartAmount={cartAmount}
              search={search}
              searching={searching}
              handleSearch={handleSearch}
              handleSearchSubmit={handleSearchSubmit}
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
            />

            <AnimatedGamePage>
              <div className={styles.gamepageContent}>
                <header>
                    <button 
                      style={{ color: hoverState[19].hovered ? "#92f" : "#cccccc" }} 
                      className={styles.goBack}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHover}
                      onClick={handleBrowse}
                      id="19"
                      aria-label='Back'
                    >
                        <Arrow style={{ fill: hoverState[19].hovered ? "#92f" : "#cccccc" }} className={styles.arrow} />
                        Store
                    </button>

                    <h1>{selectedGame ? selectedGame.name : templateGame.name}</h1>
                </header>

                <section className={styles.game}>
                  {<Slider 
                    selectedGame={selectedGame}
                    setSelectedGame={setSelectedGame}
                    allGames={allGames}
                    incrementCarousel={incrementCarousel}
                    decrementCarousel={decrementCarousel}
                    carouselState={carouselState}
                    setCarouselState={setCarouselState}
                    hoverState={hoverState}
                    handleHover={handleHover}
                  />}
                  <div className={styles.gameInfo}>
                    <div className={styles.about}>
                      <div className={styles.aboutTop}>
                        <h2>About</h2>
                        <p>{selectedGame ? selectedGame.desc1 : templateGame.desc}</p>
                      </div>
                      <div 
                        className={extended ? `${styles.conditionalOpen} ${styles.aboutBottom}` : `${styles.conditionalClose} ${styles.aboutBottomClosed}`} 
                        id="about"
                      >
                        <AnimatedText>
                             <div className={textExtended ? styles.open : styles.closed}>
                                 <a href={selectedGame ? selectedGame.link : templateGame.link} target="_blank">{selectedGame ? selectedGame.name : "No"} Website</a>
                                 <h4>Released: {selectedGame ? selectedGame.release1 : templateGame.release}</h4>
                                 <h4>Platforms: {selectedGame ? selectedGame.platforms : templateGame.platforms}</h4>
                                 <h4>Main Genre: {selectedGame ? selectedGame.genre : templateGame.genre}</h4>
                                 <h4>Developers: {selectedGame ? selectedGame.developers : templateGame.developers}</h4>
                                 <h4 className={styles.lastChild}>Publishers: {selectedGame ? selectedGame.publishers : templateGame.publishers}</h4>
                             </div>
                        </AnimatedText>

                        <button 
                          id="20" 
                          onClick={handleExtend} 
                          onMouseEnter={handleHover} 
                          onMouseLeave={handleHover} 
                          className={hoverState[20].hovered ? styles.buttonHovered : styles.buttonNotHovered} 
                          aria-label="Extend"
                        >
                          {extended ? "Hide" : "More"}
                          {extended ? <Up  className={styles.up} style={{ fill: hoverState[20].hovered ? "#fff" : "#cccccc" }}/> : <Up className={styles.down} style={{ fill: hoverState[20].hovered ? "#fff" : "#cccccc" }}/>}
                        </button>
                      </div>
                    </div>

                    <div className={styles.addToCart}>
                      <div className={styles.infos}>
                          <h3>${selectedGame ? selectedGame.price : templateGame.price}</h3>
                          <button id={selectedGame ? selectedGame.id : templateGame.id} onClick={handleLike} aria-label="Like">
                              <Like 
                                className={selectedGame ? selectedGame.isLiked ? styles.liked : styles.like : styles.like}
                              />
                          </button>
                      </div>
                      <Link 
  id="21" 
  onMouseEnter={handleHover} 
  onMouseLeave={handleHover} 
  className={styles.addToCartButton}
  style={{ color: hoverState[21].hovered ? "#92f" : "#999999" }} 
  onClick={handleAddToCart} 
  aria-label="Add"
  to={bought ? `/done` : `/BUY/${window.localStorage.getItem("name")}`}
>
  {bought ? (
    <div className="flex items-center gap-2">
      Bought <img src={img112} alt="Bought Icon" className="w-6 h-6" />
    </div>
  ) : (
    "BUY"
  )}
</Link>

                    </div>
                  </div>
                </section>
              </div>
            </AnimatedGamePage>
        </div>
    </>
  );
}

export default GamePage;