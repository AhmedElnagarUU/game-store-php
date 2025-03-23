import logo from './logo.svg';
import styles from './App.module.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Browse from './pages/Browse/Browse';
import GamePage from './pages/GamePage/GamePage';
import NotFound from './pages/NotFound/NotFound';
import { AnimatePresence } from "framer-motion";
import filterNames from './utils/filterNames';
import templateGame from './utils/templateGame';
import AddGmae from './admain/AddGame/AddGame';
import Buyment from './buyment/buy';
import Done from "./buyment/done"
import Login from "./login/login"
import LoginAdmain from "./login-admain/login"

function App() {
  
  const [allGames, setAllGames] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("none");
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [shownGames, setShownGames] = useState([]);
  const [reviewDisplay, setReviewDisplay] = useState(false);
  const [cartDisplayed, setCartDisplayed] = useState(false);
  const [search, setSearch] = useState("");
  const [overlap, setOverlap] = useState(false);
  const [searching, setSearching] = useState(false);
  const [browsing, setBrowsing] = useState(true);
  const [selectedGame, setSelectedGame] = useState(false);
  const [extended, setExtended] = useState(false);
  const [textExtended, setTextExtended] = useState(false);
  const [hoverState, setHoverState] = useState(Array(25).fill({ hovered: false, selected: false }));

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch games data when the component mounts
  useEffect(() => {
    fetch("http://localhost/Game-Store-E-Commerce-main/src/index.php")
      .then((response) => response.json())
      .then((data) => {
        setAllGames(data.data); // Update the state with fetched data
        setShownGames(data.data); // Initialize shownGames with the fetched data
        setSelectedGame(data.data)
        setCart(data.data)
        window.localStorage.setItem("all_item", JSON.stringify(data.data));

      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  // Log allGames whenever it changes
  useEffect(() => {
    console.log(allGames);
    
  }, [allGames]);
setTimeout(() => {
  setCart([])
}, 2000);
  // Set selectedGame based on the URL path
  useEffect(() => {
    if (location.pathname !== "/react-ecommerce-store/browse" && selectedGame === false) {
      const surname = location.pathname.substring(29);
      const currentGame = allGames.find(game => game.surname === surname);
      setSelectedGame(currentGame || templateGame);
    }
  }, [location.pathname, allGames, selectedGame]);

  // Handle browsing
  const handleBrowse = () => {
    setExtended(false);
    setTextExtended(false);
    setCartDisplayed(false);
    setHoverState([...hoverState, (hoverState[21].hovered = false)]);
    navigate('/react-ecommerce-store/browse');
  };

  // Handle home navigation
  const handleHome = () => {
    setExtended(false);
    setTextExtended(false);
    setCartDisplayed(false);
    setHoverState([...hoverState, (hoverState[21].hovered = false)]);
    navigate('/react-ecommerce-store/browse');
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearching(false);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    setCurrentFilter("none");
    e.preventDefault();
    setSearching(true);

    if (location.pathname !== "/react-ecommerce-store/browse") {
      navigate('/react-ecommerce-store/browse');
    }
  };

  // Handle filter selection
  const handleSelect = (e) => {
    setCurrentFilter(filterNames[e.target.id - 8]);
  };

  // Handle game selection
  const handleSelectGame = (e) => {
    if (e.target.tagName === "BUTTON") {
      return  
    } else if (e.target.classList[0] !== "AddToCart_addToCart__zbJPe") {
      setSelectedGame(shownGames[e.target.parentNode.id]);

      
      for (let index = 0; index < shownGames.length; index++) {
        const element = shownGames[index];
     console.log(e.target.parentNode.id); 

     
        if (element.id === parseInt(e.target.parentNode.id)) {
          console.log(shownGames.length);
          navigate(`/react-ecommerce-store/games/${element.surname}`);
        }
        
      }
      
    }
  };

  // Handle like button
  const handleLike = (e) => {
    const gameId = Number(e.target.id); // تحويل `id` إلى رقم
    console.log("Liked game ID:", gameId);
  
    // البحث عن اللعبة داخل `allGames`
    const game = allGames.find((game) => game.id === gameId);
  
    if (game) {
      // قلب حالة الإعجاب (toggle)
      game.liked = !game.liked;
      
      // تحديث حالة `allGames` (إذا كانت مخزنة في `state`)
      setAllGames([...allGames]);
  
      // حفظ التغييرات في `localStorage` (إذا كنت تستخدمه)
      window.localStorage.setItem("allGames", JSON.stringify(allGames));
  
      console.log(`Game ${gameId} liked:`, game.liked);
    } else {
      console.log("Game not found!");
    }
  };
  

  // Clear filter
  const clearFilter = () => {
    setCurrentFilter("none");
    setSearch("");
    setReviewDisplay(false);
  };

  // Open game page
  const openGamePage = (e) => {
    setCartDisplayed(false);
    const selectedGameSurname = e.target.id;
    navigate(`/react-ecommerce-store/games/${selectedGameSurname}`);
  };

  // Handle hover state
  const handleHover = (e) => {
    if (hoverState[e.target.id].selected) {
      return;
    }

    const newHoverState = hoverState.map((element, i) => {
      if (e.target.id == i) {
        element.hovered = !element.hovered;
        return element;
      } else {
        return element;
      }
    });

    setHoverState(newHoverState);
  };

  // Handle game hover
  const handleHoverGame = (e) => {
    const handledHoveredGame = allGames.map((game, i) => {
      if (e.target.id == i) {
        game.isHovered = !game.isHovered;
        return game;
      } else {
        return game;
      }
    });

    setAllGames(handledHoveredGame);
  };

  // Handle adding to cart
  const handleAddToCart = (e) => {
    if (location.pathname === "/react-ecommerce-store/browse") {
      console.log(e.target.id);
  
      // البحث عن اللعبة المحددة
      const selectedGame1 = allGames.find((game) => game.name === e.target.id);
      if (!selectedGame1) return;
  
      console.log(selectedGame1);
  
      // جلب القائمة القديمة من localStorage أو إنشاء قائمة فارغة إذا لم تكن موجودة
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // التحقق مما إذا كانت اللعبة مضافة بالفعل لتجنب التكرار
      const isAlreadyInCart = cartItems.some(game => game.name === selectedGame1.name);
      if (!isAlreadyInCart) {
        // إضافة اللعبة الجديدة إلى القائمة
        selectedGame1.inCart = true;
        cartItems.push(selectedGame1);
  
        // تحديث Local Storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
        // تحديث حالة السلة
        setCart(cartItems);
        setCartAmount(cartItems.length);
  
        // تحديث حالة اللعبة بأنها في السلة
       
  
        // تحديث حالة allGames
        setAllGames(allGames.map(game =>
          game.name === selectedGame1.name ? { ...game, inCart: true } : game
        ));
      }
    }
  };
  
  

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cartItems"); // يحذف البيانات المخزنة تحت المفتاح "cartItems"
    window.location.reload()

  };

  // Handle removing from cart
  const handleRemoveFromCart = (e) => {
    // جلب القائمة من localStorage
    let allop = JSON.parse(window.localStorage.getItem("cartItems")) || [];
  
    // تصفية القائمة لإزالة العنصر المطلوب
    let newall = allop.filter((item) => item.id != e.target.id);
  
    // تحديث localStorage بالقائمة الجديدة
    window.localStorage.setItem("cartItems", JSON.stringify(newall));
  
    // العثور على الفهرس للعبة المحذوفة
    const removedIndex = cart.findIndex((game) => game.id == e.target.id);
  
    // تحديث حالة allGames
    const newAllGames = allGames.map((game) =>
      game.id == e.target.id ? { ...game, inCart: false, isHovered: false } : game
    );
  
    setAllGames(newAllGames);
  
    // تحديث حالة السلة (إزالة العنصر)
    const newCart = cart.filter((game) => game.id != e.target.id);
    setCart(newCart);
    setCartAmount(cartAmount - 1);
  
    // تحديث حالة hoverState بشكل صحيح
    const newHoverState = hoverState.map((state, index) =>
      index === 21 ? { ...state, hovered: false } : state
    );
    setHoverState(newHoverState);
  };
  

  // Handle overlap and browsing state
  useEffect(() => {
    setOverlap(false);

    if (location.pathname === "/react-ecommerce-store/") {
      setBrowsing(false);
    } else {
      setBrowsing(true);
    }

    if (location.pathname !== "/react-ecommerce-store/browse") {
      document.body.style.overflow = "hidden";
    } else if (location.pathname === "/react-ecommerce-store/browse") {
      document.body.style.overflow = "scroll";
    }
  }, [location.pathname]);

  // Handle opening cart
  const handleOpenCart = () => {
    setCartDisplayed(true);
  };

  // Handle closing cart
  const handleCloseCart = () => {
    setCartDisplayed(false);
  };

  // Log selectedGame whenever it changes
  useEffect(() => {
    console.log(selectedGame);
  }, [selectedGame]);

  // Handle cart display overflow
  useEffect(() => {
    if (cartDisplayed) {
      document.body.style.overflow = "hidden !important";
    } else {
      document.body.style.overflow = "scroll !important";
    }
  }, [cartDisplayed]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key="/react-ecommerce-store/browse" location={location}>
        <Route
          path="/react-ecommerce-store/browse"
          element={
            <Browse
              cart={cart}
              cartAmount={cartAmount}
              handleHover={handleHover}
              handleSelect={handleSelect}
              hoverState={hoverState}
              currentFilter={currentFilter}
              shownGames={shownGames}
              setShownGames={setShownGames}
              clearFilter={clearFilter}
              reviewDisplay={reviewDisplay}
              setReviewDisplay={setReviewDisplay}
              allGames={allGames}
              setAllGames={setAllGames}
              handleLike={handleLike}
              handleHoverGame={handleHoverGame}
              handleAddToCart={handleAddToCart}
              handleSelectGame={handleSelectGame}
              handleSearch={handleSearch}
              handleSearchSubmit={handleSearchSubmit}
              search={search}
              searching={searching}
              browsing={browsing}
              handleBrowse={handleBrowse}
              handleHome={handleHome}
              cartDisplayed={cartDisplayed}
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              setHoverState={setHoverState}
              openGamePage={openGamePage}
            />
          }
        />
        <Route
          path="/react-ecommerce-store/games/:gameId"
          element={
            <GamePage
              cart={cart}
              cartAmount={cartAmount}
              handleHover={handleHover}
              hoverState={hoverState}
              handleLike={handleLike}
              handleAddToCart={handleAddToCart}
              handleSelectGame={handleSelectGame}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
              handleSearch={handleSearch}
              handleSearchSubmit={handleSearchSubmit}
              search={search}
              searching={searching}
              browsing={browsing}
              handleBrowse={handleBrowse}
              handleHome={handleHome}
              setHoverState={setHoverState}
              allGames={allGames}
              extended={extended}
              setExtended={setExtended}
              textExtended={textExtended}
              setTextExtended={setTextExtended}
              cartDisplayed={cartDisplayed}
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
            />
          }
        />
        <Route
          path="*"
          element={
            <NotFound
              cartDisplayed={cartDisplayed}
              handleCloseCart={handleCloseCart}
              handleOpenCart={handleOpenCart}
              cartAmount={cartAmount}
              clearCart={clearCart}
              hoverState={hoverState}
              handleHome={handleHome}
              handleHover={handleHover}
              cart={cart}
              browsing={browsing}
              search={search}
              searching={searching}
              handleSearch={handleSearch}
              handleSearchSubmit={handleSearchSubmit}
              handleBrowse={handleBrowse}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
            />
          }
        />





<Route path="/" element={<Login/>}/>
<Route path="/addgame" element={<AddGmae/>}/>
<Route path="/loginadmin" element={<LoginAdmain/>}/>
<Route path="/buy/:money" element={<Buyment/>}/>
<Route path="/done" element={<Done/>}/>



      </Routes>
      
    </AnimatePresence>
  );
}

export default App;