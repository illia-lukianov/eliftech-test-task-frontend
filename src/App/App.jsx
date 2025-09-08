import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ConfirmUser from "../components/ConfirmUser/ConfirmUser";
import GoogleRedirect from "../components/GoogleRedirect/GoogleRedirect";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "../components/PrivateRoute";
import RestrictedRoute from "../components/RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const CartPage = lazy(() => import("../pages/CartPage/CartPage"));
const RecipeViewPage = lazy(() =>
  import("../pages/RecipeViewPage/FlowerViewPage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));

const LoginForm = lazy(() => import("../components/LoginForm/LoginForm"));
const RegistrationForm = lazy(() =>
  import("../components/RegistrationForm/RegistrationForm")
);
const RequestResetForm = lazy(() =>
  import("../components/RequestResetForm/RequestResetForm")
);
const ResetPasswordForm = lazy(() =>
  import("../components/ResetPasswordForm/ResetPasswordForm")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/cart"
            element={<PrivateRoute component={<CartPage />} />}
          />
          <Route path="/flowers/:id" element={<RecipeViewPage />} />
          <Route
            path="/profile/:recipeType"
            element={<PrivateRoute component={<ProfilePage />} />}
          />
          <Route
            path="/auth"
            element={<RestrictedRoute component={<AuthPage />} />}
          >
            <Route path="register" element={<RegistrationForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="request-reset" element={<RequestResetForm />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordForm />}
            />
            <Route path="confirm-email/:token" element={<ConfirmUser />} />
            <Route path="google-redirect" element={<GoogleRedirect />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
