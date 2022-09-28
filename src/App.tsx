import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/protectedRoutes";
import { useEffect } from 'react'
import {
  Home,
  CompanyDetail,
  Invoices,
  Clients,
  CreateClient,
  CreateInvoice,
  SignIn,
  Register,
  ViewInvoice,
} from "./pages";

function App() {
  useEffect(() => {
    document.title = "Invoice Management System"
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Protected component={<Home />} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          path="/company-detail"
          element={<Protected component={<CompanyDetail /> } />}
        />
        <Route
          path="/invoices"
          element={<Protected component={<Invoices />} />}
        />
        <Route
          path="/clients"
          element={<Protected  component={<Clients />} />}
        />
        <Route
          path="/create-client"
          element={<Protected component={<CreateClient />} />}
        />
        <Route
          path="/clients/:clientId"
          element={<Protected component={<CreateClient />} />}
        />
        <Route
          path="/create-invoice"
          element={<Protected component={<CreateInvoice />} />}
        />
        <Route
          path="/invoice/:invoiceId/edit"
          element={<Protected component={<CreateInvoice />} />}
        />
        <Route
          path="/invoice/:invoiceId/view"
          element={<Protected component={<ViewInvoice />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
