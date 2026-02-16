import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { client } from "@/utils/client";
import { removeToken } from "@/utils/storage";

export const useLogout = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async () => {
			removeToken();
			const res = await client.auth.logout.$post();
			return res.json();
		},
		onSuccess: () => {
			toast.success("Logged out");
			navigate({ to: "/login" });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};
