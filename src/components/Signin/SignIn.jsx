"use client";

import Link from "next/link";
import React, { useState } from "react";
const SignIn = ({ errorMessage, dispatch, pending }) => {
  return (
    <article className="br3 bw2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-45-l mw6 center shadow-5 bg-blue">
      <main className="pa4 black-80">
        <form className="measure center" action={dispatch}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 white center">Login</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 white" htmlFor="email">
                Email
              </label>
              <input
                className="pa2 input-reset ba hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                required
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
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </fieldset>

          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white "
              type="submit"
              value="Login"
              aria-disabled={pending}
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
