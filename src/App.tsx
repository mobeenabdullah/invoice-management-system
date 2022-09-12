import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import CompanyDetails from "./components/CompanyDetails"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="company-details" element={<CompanyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
