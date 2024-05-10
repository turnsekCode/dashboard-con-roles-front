import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import { toast, Toaster } from "sonner";
import { Oval } from "react-loader-spinner";

function LoginPage() {
  const navigateTo = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setLoading, loading } =
    useAuth();

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.76:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", data.username);
        navigateTo("/");
        setIsAuthenticated(true);
        setLoading(false);
        toast.success("Inicio de sesion correcto");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {!loading ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
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
      </Formik>
      <Toaster richColors />
    </div>
  );
}

export default LoginPage;
