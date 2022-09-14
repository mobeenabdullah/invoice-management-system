import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import CompanyDetails from "./components/CompanyDetails"
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard'
import Invoices from './components/Invoices'
import Clients from './components/Clients'
import CreateClient from './components/CreateClient'
import CreateInvoice from './components/CreateInvoice'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />        
        <Route path="/company-details" element={<CompanyDetails/>} />
        <Route path="/invoices" element={<Invoices/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/create-client" element={<CreateClient />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
      </Routes>
    </BrowserRouter>  
    
    </>
        
  );
}

export default App;
