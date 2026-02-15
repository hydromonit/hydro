import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { setToken } from "@/utils/storage";
import toast from "react-hot-toast";

interface LoginPayload {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal masuk");
      }

      return data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      toast.success("Login Success!");
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
