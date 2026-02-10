import React from 'react';

export function Login() {
  return (
    <main className="home-main">
        <h1>Login</h1>
        <div><input type="email" placeholder="Email"/></div>
        <div><input type="password" placeholder="Password"/></div>
        <div className="button-row">
            <button type="submit">Login</button>
            <button type="submit">Register</button>
        </div>
    </main>
  );
}