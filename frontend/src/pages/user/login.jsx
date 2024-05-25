import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { AxiosInterceptor } from "../../config/axios-interceptor";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters long")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

export default function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };
  const [initialValue, setInitialValues] = useState(initialValues);
  const navigate = useNavigate();
  const contextData = useContext(AuthContext);
  const { data, setData } = contextData;

  const handleLogin = async (value, setSubmitting) => {
    try {
      const response = await AxiosInterceptor.post("/api/login", value);

      if (response.status == 200) {
        setData({
          isAuthenticated: true,
          user: response?.data?.user,
          token: response?.data?.token,
        });
        sessionStorage.setItem(
          "userToken",
          JSON.stringify(response?.data?.token)
        );
        navigate("/");
      } else {
        Swal.fire({
          // title: "Good job!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values, setSubmitting);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              className="space-y-6"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(event);
              }}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Email address<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="one text-red-500">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Password<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="two text-red-500">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Click here to Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
