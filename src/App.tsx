import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import CompanyDetails from "./components/CompanyDetails"
import Dashboard from './components/Dashboard'
import Invoices from './components/Invoices'
import Clients from './components/Clients'
import CreateClient from './components/CreateClient'
import CreateInvoice from './components/CreateInvoice'
import Protected from "./components/protectedRoutes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Protected component={<Dashboard /> } />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />        
        <Route path="/company-details" element={<Protected component={<CompanyDetails/>} />} />
        <Route path="/invoices" element={<Protected component={<Invoices/>} />} />
        <Route path="/clients" element={<Protected component={<Clients/>} />} />
        <Route path="/create-client" element={<Protected component={<CreateClient />} />} />
        <Route path="/clients/:clientId" element={<Protected component={<CreateClient />} />} />
        <Route path="/create-invoice" element={<Protected component={<CreateInvoice />} />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
