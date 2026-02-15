import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { authApi, setToken } from "@/services/api";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: { email: string; password: string }) => {
      return authApi.login(payload);
    },
    onSuccess: (data) => {
      setToken(data.token);
      toast.success("Login Berhasil!");
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
