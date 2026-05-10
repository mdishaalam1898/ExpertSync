import { BrowserRouter, Routes, Route } from "react-router-dom";
import Experts from "./pages/Experts";
import ExpertDetail from "./pages/ExpertDetail";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import AddExpert from "./pages/AddExpert";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Experts />} />
     
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/add-expert" element={<AddExpert />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
