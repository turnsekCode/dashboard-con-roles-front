import React from "react";
import { useAuth } from "./../context/AuthContext";
import { toast, Toaster } from "sonner";

const Home = () => {
  const { role } = useAuth();
  console.log("role", role);

  return (
    <div>
      Home
      <button
        onClick={() => {
          toast.success("My success toast");
        }}
      >
        Render my toast
        <Toaster richColors />
      </button>
    </div>
  );
};

export default Home;
