import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useRegister } from "../modules/auth/hooks/useRegister";

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});

function RegisterPage() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate: submitRegister, isPending } = useRegister();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		submitRegister({ email, password, full_name: fullName });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-lg shadow-md w-90 space-y-4"
			>
				<h1 className="text-2xl font-bold text-center">Sign Up</h1>

				<input
					type="text"
					placeholder="Full Name"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>

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
					placeholder="Password (min 8 chars)"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded"
					required
					minLength={8}
				/>

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
				>
					{isPending ? "Registering..." : "Register"}
				</button>

				<p className="text-center text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600 hover:underline">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
