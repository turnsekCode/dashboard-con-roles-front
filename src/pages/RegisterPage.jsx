import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, Toaster } from "sonner";
import { Oval } from "react-loader-spinner";
import { useAuth } from "./../context/AuthContext";

function RegisterPage() {
  const navigateTo = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await fetch("https://dashboard-con-roles-back.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, redirigir a la página de inicio de sesión
        navigateTo("/login");
        toast.success("Registro realizado correctamente");
        setLoading(false);
      } else {
        // En caso de respuesta no exitosa, mostrar un mensaje de error
        const errorData = await response.json();
        toast.error(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar usuario");
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Username is required";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                name="username"
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            {!loading ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Register
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center"
              >
                <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </button>
            )}
          </Form>
        )}
      </Formik>
      <Toaster richColors />
    </div>
  );
}

export default RegisterPage;
