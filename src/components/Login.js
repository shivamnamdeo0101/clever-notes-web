// src/components/Login.js
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./comp.css"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        provider.setCustomParameters({ prompt: "select_account" }); // 👈 Force choose account
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }));
            navigate("/home");
        } catch (error) {
            console.error("Login Failed:", error.message);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginBox">
                <h2>Clever Notes</h2>

                <div className="loginButton">
                    <img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google Icon" />
                    <button onClick={handleGoogleLogin}>Sign in with Google</button>
                </div>

            </div>
        </div>
    );
};

export default Login;
