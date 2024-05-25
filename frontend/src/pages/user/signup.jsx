import { useState, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AxiosInterceptor } from "../../config/axios-interceptor";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/auth-context";
import { useNavigate, Link } from "react-router-dom";

const validationSchema = Yup.object({
  "first-name": Yup.string()
    .min(3, "Must be 3 characters long")
    .required("Required"),
  "last-name": Yup.string()
    .min(3, "Must be 3 characters long")
    .required("Required"),
  "phone-number": Yup.string()
    .min(9, "Must be 9 characters long")
    .max(13, "Must be 13 character long or less")
    .required("Required"),
  country: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters long")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  // agree: Yup.bool().oneOf([true], "Field must be checked"),
});

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const initialValues = {
  "first-name": "",
  "last-name": "",
  email: "",
  country: "",
  "phone-number": "",
  password: "",
  // agree: "",
};
export default function Signup() {
  const [agreed, setAgreed] = useState(false);
  const [initialValue, setInitialValues] = useState(initialValues);
  const contextData = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, setData } = contextData;
  const handleSubmitSignup = async (value, setSubmitting) => {
    if (agreed) {
      try {
        const formData = {
          first_name: value["first-name"],
          last_name: value["last-name"],
          email: value["email"],
          password: value["password"],
          country: value["country"],
          phone_number: value["phone-number"],
        };

        const response = await AxiosInterceptor.post("/api/signup", formData);
        if (response.status == 201) {
          Swal.fire({
            title: "",
            text: "User created successfully",
            icon: "success",
          }).then(() => {
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
          });
        } else {
          Swal.fire({
            // title: "Good job!",
            text: "Something went wrong",
            icon: "error",
          });
        }
      } catch (err) {
        Swal.fire({
          // title: "Good job!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true">
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div> */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Sign UP
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          You are welcome to sign up for accessing further
        </p>
      </div>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmitSignup(values, setSubmitting);
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
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
            className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="first-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values["first-name"]}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="text-red-500">
                  {" "}
                  {errors["first-name"] &&
                    touched["first-name"] &&
                    errors["first-name"]}
                </span>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="last-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values["last-name"]}
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="text-red-500">
                  {" "}
                  {errors["last-name"] &&
                    touched["last-name"] &&
                    errors["last-name"]}
                </span>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values["email"]}
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="text-red-500">
                  {" "}
                  {errors["email"] && touched["email"] && errors["email"]}
                </span>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values["country"]}
                      className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                      <option disabled selected>
                        Select
                      </option>
                      <option value="US">US</option>
                      <option value="CA">CA</option>
                      <option value="EU">EU</option>
                    </select>
                    {/* <ChevronDownIcon
                      className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </div>

                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values["phone-number"]}
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="text-red-500">
                  {" "}
                  {errors["country"] && touched["country"] && errors["country"]}
                </span>
                <span className="text-red-500">
                  {" "}
                  {errors["phone-number"] &&
                    touched["phone-number"] &&
                    errors["phone-number"]}
                </span>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values["password"]}
                    id="password"
                    autoComplete="password"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span className="text-red-500">
                  {" "}
                  {errors["password"] &&
                    touched["password"] &&
                    errors["password"]}
                </span>
              </div>
              <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? "bg-indigo-600" : "bg-gray-200",
                      "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    )}>
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? "translate-x-3.5" : "translate-x-0",
                        "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </div>
                <Switch.Label className="text-sm leading-6 text-gray-600">
                  <span className="text-red-500">{"*"}</span>
                  By selecting this, you agree to our{" "}
                  <a href="#" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </a>
                  .
                </Switch.Label>
              </Switch.Group>
              {!agreed && Object.keys(errors).length > 0 && (
                <span className="text-red-500">{" Required field"}</span>
              )}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={!agreed && isSubmitting}
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up
              </button>
            </div>
          </form>
        )}
      </Formik>
      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Click here
        </Link>
      </p>
    </div>
  );
}
