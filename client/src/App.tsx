import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";

import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { Toast } from "./components/common/Toast";
import { AuthModal } from "./components/auth/AuthModal";

import { Home } from "./pages/website/Home";
import { BrowsePGs } from "./pages/website/BrowsePGs";
import { PGDetails } from "./pages/website/PGDetails";
import { ComparePGs } from "./pages/website/ComparePGs";

import {
  About,
  HowItWorks,
  Pricing,
  Blog,
  FAQ,
  Contact,
} from "./pages/website/SecondaryPages";

import { PaymentCheckout } from "./pages/user/PaymentCheckout";
import { UserDashboard } from "./pages/user/UserDashboard";
import { OwnerDashboard } from "./pages/owner/OwnerDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

import api from "./mock/apiCall";
import { useAppDispatch } from "./redux/hooks";
import { getUserProfile } from "./redux/auth/authApi";


const Layout = () => {
    const dispatch = useAppDispatch();
    const fetchUser = async () => {
            dispatch(getUserProfile());
    };

    useEffect(() => {
        fetchUser();
    }, []);


  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">

      <Navbar />

      <main className="flex-1">

        <Routes>

          {/* Website */}
          <Route path="/" element={<Home />} />

          <Route 
            path="/browse"
            element={<BrowsePGs />}
          />

          <Route 
            path="/pg/:id"
            element={<PGDetails />}
          />

          <Route 
            path="/compare"
            element={<ComparePGs />}
          />


          {/* Secondary Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />


          {/* User */}
          <Route 
            path="/user/dashboard"
            element={<UserDashboard />}
          />

          <Route
            path="/checkout"
            element={<PaymentCheckout />}
          />


          {/* Owner */}
          <Route
            path="/owner/dashboard"
            element={<OwnerDashboard />}
          />


          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />


          {/* 404 */}
          <Route
            path="*"
            element={<Home />}
          />


        </Routes>

      </main>


      <Footer />

      <Toast />

      <AuthModal />

    </div>
  );
};



export default function App(){

  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );

}