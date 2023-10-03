import Link from "next/link";
import React, { useState } from "react";
const SignIn = ({ handleSubmit, loginMensaje, setLoginMensaje }) => {
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });
  const onChangeSignInUser = (e) => {
    setUserSignIn({ ...userSignIn, [e.target.name]: e.target.value });
    if (loginMensaje !== "") setLoginMensaje("");
  };
  return (
    <article className="br3 bw2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-45-l mw6 center shadow-5 bg-blue">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 white center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 white" htmlFor="email">
                Email
              </label>
              <input
                className="pa2 input-reset ba hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email"
                onChange={onChangeSignInUser}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onChangeSignInUser}
              />
            </div>
          </fieldset>
          {loginMensaje === "Wrong credentials" && (
            <p className="black f3 tc b pa1 ">Wrong credentials</p>
          )}
          {loginMensaje !== "Wrong credentials" && (
            <p className="white f3 tc b pa1">{loginMensaje}</p>
          )}
          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white "
              type="submit"
              value="Sign in"
              onClick={(e) => {
                handleSubmit(e, userSignIn);
              }}
            />
          </div>
          <div className="lh-copy mt3 tc">
            <Link href="/register" className="f6 link dim black db white">
              Register
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
