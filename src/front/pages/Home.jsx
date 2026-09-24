import { Link } from "react-router-dom";

export const Home = () => {
	const isLoggedIn = Boolean(sessionStorage.getItem("token"));

	if (isLoggedIn) {
		return (
			<div className="container text-center mt-5" style={{ maxWidth: "420px" }}>
				<h1 className="mb-3">Bienvenido de nuevo</h1>
				<Link to="/private" className="btn btn-primary w-100">
					Ir a mi área privada
				</Link>
			</div>
		);
	}

	return (
		<div className="container text-center mt-5" style={{ maxWidth: "420px" }}>
			<h1 className="mb-3">Bienvenido</h1>
			<p className="text-muted mb-4">
				Autenticación con JWT hecha con Flask y React.
			</p>

			<Link to="/login" className="btn btn-primary w-100">
				Iniciar sesión
			</Link>

			<p className="mt-3">
				¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
			</p>
		</div>
	);
};