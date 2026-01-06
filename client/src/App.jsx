import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import MainLayout from "./components/Layout/MainLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import GoogleCallback from "./pages/GoogleCallback";
import AuthCallback from "./pages/AuthCallback";
import ExtensionDashboard from "./pages/ExtensionDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivacyPolicyGuard from "./components/PrivacyPolicyGuard";
import AuthInitializer from "./components/AuthInitializer";
import LandingPage from "./pages/LandingPage";
import FeedbackPage from "./pages/FeedbackPage";
import BackupPage from "./pages/BackupPage";

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Router>
          <MainLayout>
            <Navbar />
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
                  <PrivacyPolicyGuard>
                    <ExtensionDashboard />
                  </PrivacyPolicyGuard>
                }
              />
              <Route
                path="/backup"
                element={
                  <PrivacyPolicyGuard>
                    <BackupPage />
                  </PrivacyPolicyGuard>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </MainLayout>
        </Router>
      </AuthInitializer>
    </Provider>
  );
}

export default App;
