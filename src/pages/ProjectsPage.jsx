import React, { useEffect, useState } from "react";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://192.168.1.76:4000/api/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data); // Actualiza el estado con los proyectos recibidos de la respuesta
        } else {
          // En caso de respuesta no exitosa, mostrar un mensaje de error
          const errorData = await response.json();
          alert(errorData.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al obtener la lista de proyectos");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
