import React, {useState} from "react";
import axios from "axios";
import {useAuth} from "../../../contexts/AuthContext"; // Adjust the import path as necessary
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import route from "../../../utils/route";


const Login = () => {
    const [email, setEmail] = useState("1johndoe@example.com");
    const [password, setPassword] = useState("hashedpassword1");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const {setToken, login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(route('login'), {
                email,
                password,
                rememberMe
            });
            console.log(
                response
            )
            if (response.data.token && response.data.user) {
                login(response.data.token, response.data.user);
                navigate("/home");
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            console.log(
                error.response.data
            )

        } finally {
            setLoading(false);
        }
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(!rememberMe);
    };
    return (
        <div className="">
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-10 col-sm-9 col-md-5">
                        <form onSubmit={handleSubmit} className="">
                            <div className="text-center mb-4">
                                <Logo width={300} height={80}/>
                            </div>

                            {errorMessage && <div style={{color: "red"}} className="mb-3">{errorMessage}</div>}

                            <div className="form-label-group mb-3">
                                <label htmlFor="inputEmail">Email address</label>
                                <input
                                    type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-label-group mb-3">
                                <label htmlFor="inputPassword">Password</label>
                                <input
                                    type="password"
                                    id="inputPassword"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="checkbox mb-3">
                                <label>
                                    <input onChange={handleRememberMeChange} checked={rememberMe} type="checkbox"
                                           value="remember-me"
                                           disabled={loading}/> Remember me
                                </label>
                            </div>

                            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Sign in"}
                            </button>

                            <p className="mt-3 mb-3  ">
                                Don't have an account?
                                <Link to={'/register'}> Sign Up </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
