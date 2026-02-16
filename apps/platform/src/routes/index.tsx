import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "@/utils/storage";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const token = getToken();
		if (!token) {
			throw redirect({ to: "/login" });
		}
	},
	component: Dashboard,
});

function Dashboard() {
	return (
		<div>
			<header>This the header!</header>
			<h1>Hello Platform!</h1>
		</div>
	);
}
