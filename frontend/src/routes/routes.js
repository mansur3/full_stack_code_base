import Root from "./root";
import {
  // createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorPage from "../pages/errorpage/error-page";
import LoginPage from "../pages/user/login";
import SignUp from "../pages/user/signup";
import ProfilePage from "../pages/user/profile";
import TaskManager from "../pages/task-manager/task-manager";

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Example of a public route component
const PublicRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
};

export const RoutesList = (props) => {
  const { isAuthenticated } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute
              element={LoginPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute element={SignUp} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute element={Root} isAuthenticated={isAuthenticated} />
          }>
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="" element={<TaskManager />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//       {
//         path: "signup",
//         element: <SignUp />,
//       },
//       {
//         path: "profile",
//         element: <ProfilePage />,
//       },
//     ],
//   },
// ]);

// export default router;
