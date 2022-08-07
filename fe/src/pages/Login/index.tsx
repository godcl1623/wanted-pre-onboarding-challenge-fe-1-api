import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main className="main-base">
      <form className="form-base">
        <label htmlFor="id_input" className="login-input-area">
          Email:
          <input type="text" name="id_input" className="login-input" />
        </label>
        <label htmlFor="password_input" className="login-input-area">
          PW:
          <input
            type="password"
            name="password_input"
            className="login-input"
          />
        </label>
        <div className="flex-center flex-col w-full py-5">
          <input
            type="submit"
            name="login_button"
            value="로그인"
            className="login-area-buttons mb-3 bg-blue-300"
          />
          <Link to="/signup" className="login-area-buttons bg-red-300">
            회원가입
          </Link>
        </div>
      </form>
    </main>
  );
}
