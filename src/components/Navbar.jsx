import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user, setIsAuthenticated, role } = useAuth();
  return (
    <nav className="bg-zinc-200 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Project Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user} |</li>
            {role === "superadmin" && (
              <li>
                <Link
                  to="/create-project"
                  className="bg-indigo-300 px-4 py-1 rounded-sm"
                >
                  Add project
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/projects"
                className="bg-indigo-300 px-4 py-1 rounded-sm"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                  setIsAuthenticated(false);
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-300 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-300 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
