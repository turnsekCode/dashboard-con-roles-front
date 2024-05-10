import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreateProjectPage() {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://dashboard-con-roles-back.vercel.app/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Si la creación del proyecto es exitosa, redirigir a la página de proyectos
        window.location.href = "/projects";
      } else {
        // En caso de respuesta no exitosa, mostrar un mensaje de error
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el proyecto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Project</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          url: "",
          slug: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string(),
          url: Yup.string(),
          slug: Yup.string(),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-2">
              Title:
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-2">
              Description:
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block font-semibold mb-2">
              URL:
            </label>
            <Field
              type="text"
              name="url"
              id="url"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="url" component="div" className="error" />
          </div>
          <div className="mb-4">
            <label htmlFor="slug" className="block font-semibold mb-2">
              Slug:
            </label>
            <Field
              type="text"
              name="slug"
              id="slug"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="slug" component="div" className="error" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateProjectPage;
