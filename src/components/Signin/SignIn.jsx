import React from "react";

const SignIn = () => {
  return (
    <article className="br3 bw2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-45-l mw6 center shadow-5 bg-blue">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 white center">Sign In</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6 white"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-white hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-white hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white "
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3 tc">
            <a href="#0" className="f6 link dim black db white">
              Sign up
            </a>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
