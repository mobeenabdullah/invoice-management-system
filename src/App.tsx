import { BrowserRouter, Routes, Route } from "react-router-dom";

import Protected from "./components/protectedRoutes";

import {
  Home,
  CompanyDetail,
  Invoices,
  Clients,
  CreateClient,
  CreateInvoice,
  SignIn,
  Register,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected component={<Home />} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/company-detail"
          element={<Protected component={<CompanyDetail />} />}
        />
        <Route
          path="/invoices"
          element={<Protected component={<Invoices />} />}
        />
        <Route
          path="/clients"
          element={<Protected component={<Clients />} />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
