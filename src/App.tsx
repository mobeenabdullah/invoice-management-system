import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import CompanyDetails from "./components/CompanyDetails"
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./utils/protectedRoutes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="company-details" element={<Protected component={<CompanyDetails/>} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
