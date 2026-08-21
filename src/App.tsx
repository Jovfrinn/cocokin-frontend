import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import AnswerQuizPage from "./pages/AnswerQuizPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
          <Route path="/quiz/:id" element={<AnswerQuizPage />} />
          <Route path="/match/:id" element={<MatchDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/create" element={<CreateQuizPage />} />
        </Route>
          <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Layout>
  );
}

export default App;
