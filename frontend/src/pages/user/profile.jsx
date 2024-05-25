import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../context/auth-context";
import { AxiosInterceptor } from "../../config/axios-interceptor";
import { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
const baseUrl = process.env.BACKEND_BASE_URL || "http://localhost:2233";

export default function Profile() {
  const contextData = useContext(AuthContext);
  const { data, setData } = contextData;
  const { user } = data;
  const [initialValues, setInitialValues] = useState({
    country: user.country || "",
    email: user.email || "",
    ["first-name"]: user.first_name || "",
    ["last-name"]: user.last_name || "",
    ["phone-number"]: user.phone_number || "",
    about: user.about_your_self || "",
    street: user.street || "",
    city: user?.city || "",
    state: user.state || "",
    zip: user.zip || "",
  });
  const handleSubmit = async (values, setSubmitting) => {
    try {
      const formData = {
        first_name: values["first-name"],
        last_name: values["last-name"],
        email: values["email"],
        country: values["country"],
        phone_number: values["phone-number"],
        about_your_self: values.about || "",
        street: values.street || "",
        city: values.city || "",
        state: values.state || "",
        zip: values.zip || "",
        password: user.password,
      };
      const response = await AxiosInterceptor.patch(
        `/api/user/${user?._id}`,
        formData
      );
      if (response.status == 200) {
        setData({
          ...data,
          user: response.data.data,
        });
        Swal.fire({
          title: "",
          text: "User updated successfully",
          icon: "success",
        }).then(() => {
          // setData({
          //   isAuthenticated: true,
          //   user: response?.data?.user,
          //   token: response?.data?.token,
          // });
          // sessionStorage.setItem(
          //   "userToken",
          //   JSON.stringify(response?.data?.token)
          // );
          // navigate("/");
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
  };

  useEffect(() => {
    const { user } = data;
    const value = {
      country: user.country || "",
      email: user.email || "",
      ["first-name"]: user.first_name || "",
      ["last-name"]: user.last_name || "",
      ["phone-number"]: user.phone_number || "",
      about: user.about_your_self || "",
      street: user.street || "",
      city: user?.city || "",
      state: user.state || "",
      zip: user.zip || "",
    };
    setInitialValues(value);
  }, []);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await AxiosInterceptor.post(
        `/api/profile/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setData({
          ...data,
          user: response.data.data,
        });

        // alert("File uploaded successfully");
      }
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
        }) => {
          return (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(event);
              }}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["about"]}
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a few sentences about yourself.
                      </p>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Photo
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        {user.profile ? (
                          <img
                            src={`${baseUrl}/${user.profile
                              .split("\\")
                              .join("/")} `}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <UserCircleIcon
                            className="h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}

                        {/* <button
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Change
                        </button> */}
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="photo"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("photo").click()
                          }
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={handleFileUpload}
                          className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["first-name"]}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["last-name"]}
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["email"]}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
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
                        {errors["country"] &&
                          touched["country"] &&
                          errors["country"]}
                      </span>
                      <span className="text-red-500">
                        {" "}
                        {errors["phone-number"] &&
                          touched["phone-number"] &&
                          errors["phone-number"]}
                      </span>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["street"]}
                          id="street"
                          autoComplete="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["city"]}
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["state"]}
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="zip"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["zip"]}
                          id="zip"
                          autoComplete="zip"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  disabled={!dirty}
                  className="disabled:opacity-75 text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!dirty}
                  className="disabled:opacity-75 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Save
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
