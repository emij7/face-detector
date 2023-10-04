"use client";
//Libraries
import "tachyons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { url } from "@/utils/connection";

export default function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerMensaje, setRegisterMensaje] = useState("");
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      setRegisterMensaje("Please fill in all fields");
      return;
    }
    if (newUser.name.length < 2) {
      setRegisterMensaje("Name must be at least 2 characters long");
      return;
    }
    if (!newUser.email.match(/^\S+@\S+\.\S+$/)) {
      setRegisterMensaje("Invalid email address");
      return;
    }
    if (newUser.password.length < 6) {
      setRegisterMensaje("Password must be at least 6 characters long");
      return;
    }
    try {
      const response = await fetch(url + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.status !== 200) {
        setRegisterMensaje("Error registering user");
        throw new Error(`${response.status} ${response.statusText}`);
      }
      setRegisterMensaje("User registered successfully");
      setNewUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e, user) => {
    try {
      if (response.status !== 200) {
        setLoginMensaje("Wrong credentials");
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      localStorage.setItem(
        "faceDetectUser",
        JSON.stringify({
          user: data.id,
        })
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
    if (registerMensaje !== "") setRegisterMensaje("");
  };

  return (
    <div className="vh-100 flex items-center">
      <article className="br3 bw2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-45-l mw6 center shadow-5 bg-blue">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 white center">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 white" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleNewUserChange}
                />
              </div>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6 white"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  className="pa2 input-reset ba hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={handleNewUserChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 white" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba  hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleNewUserChange}
                />
              </div>
            </fieldset>
            <p className="white f3 tc b pa1">{registerMensaje}</p>
            <div className="tc">
              <input
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white tc"
                value="Register account"
                onClick={handleRegister}
              />
            </div>
            <div className="lh-copy mt3 tc">
              <Link href="/signin" className="f6 link dim black db white">
                Sign In
              </Link>
            </div>
          </form>
        </main>
      </article>
    </div>
  );
}
