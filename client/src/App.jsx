import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import MainLayout from "./components/Layout/MainLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GoogleCallback from "./pages/GoogleCallback";
import AuthCallback from "./pages/AuthCallback";
import ExtensionDashboard from "./pages/ExtensionDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<ExtensionDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
