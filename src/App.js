import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import AddCourse from "./pages/AddCourse";
import CourseList from "./pages/CourseList";
import Enrollments from "./pages/Enrollment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import InstructorCourses from "./pages/InstructorCourses";
import EditCourse from "./pages/EditCourse";
import CourseContent from "./pages/CourseContent";
import DashboardLayout from "./components/DashboardLayout";
import { AuthProvider, AuthContext } from "./AuthContext";
import StripeConnect from "./pages/StripeConnect";
import PaymentSuccess from "./pages/PaymentSuccess";
// import PaymentCancelled from "./pages/PaymentCancelled"; //  OPTIONAL

const stripePromise = loadStripe('pk_test_51RVZ2n4CtuxFChJ2p7kbZHjGN5Mli9vN1WqG75EtvltkkIhNU9GwGgsLokElc80PNmIB5Q1SAFOQRF9qd6JZcFGD00qzuDwCU8');

function AppRoutes() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const dashboardPaths = [
    "/student-dashboard",
    "/instructor-dashboard",
    "/courses",
    "/enrollments",
    "/profile",
    "/instructor",
    "/add-course",
    "/edit-course",
    "/course",
  ];

  const hideFooter = dashboardPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            user?.role === "student" ? (
              <Navigate to="/student-dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ STRIPE CONNECT ROUTE */}
        <Route path="/stripe-connect" element={<StripeConnect />} />

        {/* ✅ PAYMENT SUCCESS + CANCEL ROUTES */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* <Route path="/payment-cancelled" element={<PaymentCancelled />} /> */}

        {/* Dashboard routes */}
        <Route element={<DashboardLayout />}>
          {/* Student */}
          <Route path="/student-dashboard" element={user ? <StudentDashboard /> : <Navigate to="/login" />} />
          <Route path="/courses" element={user ? <CourseList /> : <Navigate to="/login" />} />
          <Route path="/enrollments" element={user ? <Enrollments /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

          {/* Instructor */}
          <Route path="/instructor-dashboard" element={
            user?.role === "instructor" ? (
              <InstructorDashboard />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/add-course" element={
            user?.role === "instructor" ? (
              <AddCourse />
            ) : (
              <Navigate to="/" />
            )
          } />
          <Route path="/instructor/courses" element={
            user?.role === "instructor" ? (
              <InstructorCourses />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route
            path="/edit-course/:courseId"
            element={user ? <EditCourse /> : <Navigate to="/login" />}
          />
          <Route path="/course/:courseId" element={<CourseContent />} />
        </Route>
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Elements stripe={stripePromise}>
          <AppRoutes />
        </Elements>
      </Router>
    </AuthProvider>
  );
}
