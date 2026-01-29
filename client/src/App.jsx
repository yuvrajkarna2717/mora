import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { lazy, Suspense } from "react";

import MainLayout from "./components/Layout/MainLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthInitializer from "./components/AuthInitializer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicyGuard from "./components/PrivacyPolicyGuard";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const GoogleCallback = lazy(() => import("./pages/GoogleCallback"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const ExtensionDashboard = lazy(() => import("./pages/ExtensionDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const BackupPage = lazy(() => import("./pages/BackupPage"));

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Navbar />
            <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route
                  path="/auth/google/callback"
                  element={<GoogleCallback />}
                />
                <Route path="/auth/callback" element={<AuthCallback />} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <PrivacyPolicyGuard>
                        <ExtensionDashboard />
                      </PrivacyPolicyGuard>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/backup"
                  element={
                    <ProtectedRoute>
                      <PrivacyPolicyGuard>
                        <BackupPage />
                      </PrivacyPolicyGuard>
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </MainLayout>
        </Router>
      </AuthInitializer>
    </Provider>
  );
}

export default App;