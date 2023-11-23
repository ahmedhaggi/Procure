import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Admin from './pages/Admin';
import UserAdminDashboard from './pages/UserAdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPayment from './pages/payment/userPayment';
import PaymentView from './pages/payment/paymentView';
import RequisitionDashboard from './pages/requisition/requisitionDashboard';
import RequisitionRequest from './pages/requisition/requisitionRequest';
import RequisitionReqEdit from './pages/requisition/requisitionReqEdit';
import ItemAdd from './pages/item/itemAdd';
import ItemEdit from './pages/item/itemEdit';
import RequisitionReqReport from './pages/requisition/requisitionReqReport';
import Supplier from './pages/suppliers/supplier.add';
import Supplier_edit from './pages/suppliers/supplier.edit';
import SupplierProfile from './pages/supplierProfile/profile';

function App() {
  // Retrieve the loading state from Redux
  const { loading } = useSelector(state => state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status">
            {/* Add loading spinner or loading animation here */}
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><UserAdminDashboard /></ProtectedRoute>} />
        <Route path="/requisition_dash" element={<ProtectedRoute><RequisitionDashboard /></ProtectedRoute>} />
        <Route path="/requisition_request" element={<ProtectedRoute><RequisitionRequest /></ProtectedRoute>} />
        <Route path="/requisition_req_edit" element={<ProtectedRoute><RequisitionReqEdit /></ProtectedRoute>} />
        <Route path="/requisition_req_report" element={<ProtectedRoute><RequisitionReqReport /></ProtectedRoute>} />
        <Route path="/supplier_add" element={<ProtectedRoute><Supplier /></ProtectedRoute>} />
        <Route path="/supplier_edit" element={<ProtectedRoute><Supplier_edit /></ProtectedRoute>} />
        <Route path="/itemadd" element={<ProtectedRoute><ItemAdd /></ProtectedRoute>} />
        <Route path="/itemedit" element={<ProtectedRoute><ItemEdit /></ProtectedRoute>} />
        <Route path="/supplierpro" element={<ProtectedRoute><SupplierProfile /></ProtectedRoute>} />
        <Route path="/PaymentView" element={<ProtectedRoute><PaymentView /></ProtectedRoute>} />
        <Route path="/Payment" element={<ProtectedRoute><UserPayment /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
