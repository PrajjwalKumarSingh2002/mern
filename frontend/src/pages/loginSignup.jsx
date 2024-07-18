import React, { useState } from "react";

// css
import "./CSS/loginSignup.css";

const LoginSignupPage = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
    });

    const handleLogin = async () => {
        // console.log("login function executed");
        // console.log(formData);

        let response = {};

        await fetch("http://localhost:4000/login", {
            method : "POST",
            headers : {                
                Accept : "application/form-data",
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(formData)
        })
        .then(res => {return res.json()})
        .then(data => {response = data});

        if(response.success){
            localStorage.setItem("auth-token", response.token);
            window.location.replace("/");       // for redirecting to home page
            alert("Successfully logged-in");
        }
        else{
            alert(response.error);
        }
    }
    const handleSignup = async () => {
        // console.log("signup function executed");
        // console.log(formData);

        let response = {};

        await fetch("http://localhost:4000/signup", {
            method : "POST",
            headers : {                
                Accept : "application/form-data",
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(formData)
        })
        .then(res => {return res.json()})
        .then(data => {response = data});

        if(response.success){
            localStorage.setItem("auth-token", response.token);
            window.location.replace("/");       // for redirecting to home page
            alert("Successfully signed-up");
        }
        else{
            alert("Trouble signing-up, user with this e-mail already exist");
        }
    }

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        // console.log(formData);
    }

    return (
        <div className="login-page-container">
            <div className="loginSignup">
            {/* <div>Login-SignUp Page</div> */}

            <h1>{state}</h1>

            <div className="details-container">
                {state === "Signup" ? <input type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="Your Name" autoFocus/> : <></>}
                <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="E-mail Address"/>
                <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password"/>
            </div>

            <div className="privacy-policy-checkbox">
                <input type="checkbox" id="terms-and-policy"/>
                <label htmlFor="terms-and-policy">By continuing, I agree to the terms of use & privacy policy</label>
            </div>
            
            <button onClick={() => state === "Login" ? handleLogin() : handleSignup()}>Continue</button>

            {state === "Signup" ? <p>Already have an account ? 
                <span className="text-highlight" onClick={() => setState("Login")}> Login here</span></p>
                 : <></>}
            {state === "Login" ? <p>Create an account ? 
                <span className="text-highlight" onClick={() => setState("Signup")}> Click here</span></p> 
                : <></>}

            </div>
        </div>
    )
}

export default LoginSignupPage;