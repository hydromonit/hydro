import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLogin } from "@/modules/auth/hooks/useLogin";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate: submitLogin, isPending } = useLogin();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		submitLogin({ email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
			>
				<h1 className="text-2xl font-bold text-center">Login</h1>

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
				>
					{isPending ? "Logging in..." : "Login"}
				</button>

				<p className="text-center text-sm">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-600 hover:underline">
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
}
