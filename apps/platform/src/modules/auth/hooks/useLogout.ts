import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { removeToken } from "@/utils/storage";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      removeToken();
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast.success("Logged out");
      navigate({ to: "/login" });
    },
  });
};
