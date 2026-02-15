import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
}

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      console.log("Register payload:", payload);

      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || "Daftar gagal!");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Registration Success, please login.");
      navigate({ to: "/login" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
