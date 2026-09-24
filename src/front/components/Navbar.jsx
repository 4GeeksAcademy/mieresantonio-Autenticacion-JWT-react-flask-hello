import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const isLoggedIn = Boolean(sessionStorage.getItem("token"));

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">App Autenticación JWT</span>
				</Link>

				<div className="d-flex gap-2">
					{isLoggedIn ? (
						<button className="btn btn-outline-danger" onClick={handleLogout}>
							Cerrar sesión
						</button>
					) : (
						<>
							<Link to="/login" className="btn btn-outline-primary">
								Iniciar sesión
							</Link>
							<Link to="/signup" className="btn btn-primary">
								Registrarme
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};