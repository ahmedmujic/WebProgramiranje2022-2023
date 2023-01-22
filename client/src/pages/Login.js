import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useContext } from 'react'
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const { setAuthState } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsernameState(event.target.value)
    }

    const handlePassword = (event) => {
        setPasswordState(event.target.value)
    }

    const login = async (event) => {
        event.preventDefault()
        let data = {
            username: usernameState,
            password: passwordState
        }
        axios.post('http://localhost:3001/api/auth/login', data).then((response) => {
            let responseData = response.data
            localStorage.setItem("accessToken", responseData.accessToken)
            setAuthState({
                id: responseData.id,
                username: responseData.username,
                isLoggedIn: true
            })
            navigate("/")
        }).catch((error) => {
            if (error.response.status === 401) {
                toast.error("Incorrect username or password");
            }
            else {
                toast.error(error.response.data.msg)
            }
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <ToastContainer />
            <div className="w-75 d-flex justify-content-center">
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={handleUsername} />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={handlePassword} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        </div>
    );
}

export default Login;
