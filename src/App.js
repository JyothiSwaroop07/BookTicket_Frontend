import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContextProvider";
import CitySelectPopup from "./components/CitySelectionPopup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import SeatSelection from "./pages/SeatSelection";
import MovieDetail from "./pages/MovieDetail"
import BookingSummary from "./pages/BookingSummary";
import Payment from "./pages/Payment"

function App() {

  return (
    <AppProvider>
      <CitySelectPopup />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/shows" element={<Shows />} />
            <Route path="/movies/selectseats/:showId" element={<SeatSelection />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} />
            <Route path="/order" element={<BookingSummary />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Router>
      </AppProvider>
  );
}

export default App;