import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/Home/Index";
import { Navbar } from "./components/Navbar";
import { FavoritesContext } from "./context/FavoritesContext";

export const App: React.FC = () => {
  const [favoritesList, setFavoritesList] = React.useState<number[]>([]);

  return (
    <FavoritesContext.Provider value={{ favoritesList, setFavoritesList }}>
      <Router>
        <Navbar />
        <Route path="/">
          <Home />
        </Route>
      </Router>
    </FavoritesContext.Provider>
  );
};
