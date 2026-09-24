import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMsg("");

		try {
			const resp = await fetch(`${BACKEND_URL}/api/signup`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});

			const data = await resp.json();

			if (!resp.ok) {
				setErrorMsg(data.message || data.msg || "No se pudo crear la cuenta");
				return;
			}

			// Registro exitoso: el README pide redirigir al login, no auto-loguear
			navigate("/login");
		} catch (error) {
			console.error(error);
			setErrorMsg("No se pudo conectar con el servidor.");
		}
	};

	return (
		<div className="container mt-5" style={{ maxWidth: "400px" }}>
			<h2 className="text-center mb-4">Crear cuenta</h2>

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Correo electrónico</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Contraseña</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				{errorMsg && <p className="text-danger">{errorMsg}</p>}

				<button type="submit" className="btn btn-primary w-100">
					Registrarme
				</button>
			</form>

			<p className="text-center mt-3">
				¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
			</p>
		</div>
	);
};