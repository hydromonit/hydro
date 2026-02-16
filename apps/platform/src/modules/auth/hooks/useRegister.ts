import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { client } from "@/utils/client";

export const useRegister = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (payload: {
			email: string;
			password: string;
			full_name: string;
		}) => {
			const res = await client.users.$post({ json: payload });
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Error");
			}
			return res.json();
		},
		onSuccess: () => {
			toast.success("Registratsi berhasil, silakan login.");
			navigate({ to: "/login" });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};
