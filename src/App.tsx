import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
 
import { PublicLayout } from "@/layouts/public-layout";
import AuthenticationLayout from "@/layouts/auth-layout";
import ProtectedRoutes from "@/layouts/protected-routes";

import { MainLayout } from "@/layouts/main-layout";

import HomePage from "@/routes/home";
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";
import { Generate } from "./components/generate";
import { Dashboard } from "./routes/dashboaard";
import { CreateEditPage } from "./routes/create-edit-page";
import { MockLoadPage } from "./routes/mock-load-page";
import { MockInterviewPage } from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import ContactPage from "./routes/contact";
import AboutPage from "./routes/about";
import ServicesPage from "./routes/services";

const App = () => {
  return (
    <Router> 
      <Routes>
        {/* Public Routes*/}
        <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        </Route>
        {/* Authenticat layout */}
        <Route element={<AuthenticationLayout />}>
        <Route path="/signin/*" element={<SignInPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />

        </Route>


        {/* Protected Route */}
        <Route element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>


      {/*add all the protect routes*/ }
      <Route element={<Generate />} path="/generate">
      <Route index element={<Dashboard />} /> 
<Route path=":interviewId" element={<CreateEditPage />} />

<Route path="interview/:interviewId" element={<MockLoadPage />} />
<Route
              path="interview/:interviewId/start"
              element={<MockInterviewPage />}
            />
                        <Route path="feedback/:interviewId" element={<Feedback />} />

      </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App