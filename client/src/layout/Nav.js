import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(authState)
    }, [authState])

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            id: 0,
            username: '',
            isLoggedIn: false
        });
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {
                            authState.isLoggedIn ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <p className="nav-link">{authState.username}</p>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/posts">Posts</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={logout} className="btn btn-primary">Logout</button>
                                        </li>
                                    </>
                                ) :
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/registration">Registration</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                    </>
                                )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
