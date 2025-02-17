import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import loginImage from "./login-removebg-preview.png";

const Login = ({ onLogin }) => {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("jwttoken");
        if (token) {
            onLogin();
        }
    }, [onLogin]);

    useEffect(() => {
        console.log("Welcome Message:", t("welcome_message"));
    }, [t]);

    const inputChangeHandler = (field, value) => {
        if (field === "username") {
            setUsername(value);
        } else if (field === "password") {
            setPassword(value);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa(username + ":" + password),
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    toast.error(t("invalid_credentials"), { position: "top-center" });
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || t("login_failed"), { position: "top-center" });
                }
            } else {
                const data = response.headers.get("Authorization");
                console.log(data);
                sessionStorage.setItem("jwttoken", data);
                toast.success(t("login_successful"), { position: "top-center" });
                onLogin();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section id="login" className="login-container">
            <Toaster />
            <div className="login-form-container">
                {/* ✅ Welcome Message */}
                <h1 className="welcome-message">{t("welcome_message")}</h1>

                <h2 className="login-title">
                    {t("login_to")} <span className="highlight">{t("app_name")}</span>
                </h2>

                <form className="login-form" onSubmit={loginHandler}>
                    <div className="input-group">
                        <div className="input-icon">
                            <FaUser />
                            <input
                                type="text"
                                required
                                onChange={(e) => inputChangeHandler("username", e.target.value)}
                                value={username}
                                placeholder={t("username")} // ✅ Translated placeholder
                            />
                        </div>
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                onChange={(e) => inputChangeHandler("password", e.target.value)}
                                value={password}
                                placeholder={t("password")} // ✅ Translated placeholder
                            />
                            {showPassword ? (
                                <FaEyeSlash className="view-password-icon" onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className="view-password-icon" onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="login-button">
                            <FaSignInAlt className="button-icon" /> {t("login")} {/* ✅ Translated button */}
                        </button>
                    </div>
                </form>

                {/* ✅ Language Switcher */}
                <div className="language-switcher">
                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                    <button onClick={() => i18n.changeLanguage("hi")}>हिन्दी</button>
                    <button onClick={() => i18n.changeLanguage("mr")}>मराठी</button>
                </div>
            </div>
            <div className="login-image-container">
                <img src={loginImage} alt="Login" className="login-image" />
            </div>
        </section>
    );
};

export default Login;
