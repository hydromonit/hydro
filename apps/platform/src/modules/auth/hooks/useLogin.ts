import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { client } from "@/utils/client";
import { setToken } from "@/utils/storage";

export const useLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (payload: { email: string; password: string }) => {
			const res = await client.auth.login.$post({ json: payload });
			const data = (await res.json()) as { error?: string; token?: string };
			if (!res.ok) {
				throw new Error(data.error || "Login gagal");
			}
			return data;
		},
		onSuccess: (data) => {
			setToken((data as { token: string }).token);
			toast.success("Login Berhasil!");
			navigate({ to: "/" });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};
