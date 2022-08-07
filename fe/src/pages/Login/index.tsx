import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from 'components/FormInput';
import { handleSubmit } from './controllers';
import { emailRule, passwordRule } from './utils';

interface InputValidState {
  email: boolean;
  password: boolean;
}

export default function Login() {
  const [inputValidState, setInputValidState] = React.useState<InputValidState>(
    {
      email: false,
      password: false,
    },
  );

  const checkValidation = (target: string, validationResult: boolean) => {
    setInputValidState((previousState: InputValidState) => ({
      ...previousState,
      [target]: validationResult,
    }));
  };

  return (
    <main className="main-base">
      <form className="form-base" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          text="이메일"
          placeholder="ex) abcd@email.com"
          className="login-input-area"
          isValid={inputValidState.email}
          regexRule={emailRule}
          checkValidation={checkValidation}
        />
        <FormInput
          type="password"
          name="password"
          text="비밀번호"
          placeholder="8자리 이상"
          className="login-input-area"
          isValid={inputValidState.password}
          regexRule={passwordRule}
          checkValidation={checkValidation}
        />
        <div className="flex-center flex-col w-full py-5">
          <input
            type="submit"
            name="login_button"
            value="로그인"
            disabled={!(inputValidState.email && inputValidState.password)}
            className={`login-area-buttons mb-3 bg-blue-300 cursor-pointer ${
              !(inputValidState.email && inputValidState.password)
                ? 'opacity-50 cursor-default'
                : 'opacity-100 cursor-pointer'
            }`}
          />
          <Link to="/signup" className="login-area-buttons bg-red-300">
            회원가입
          </Link>
        </div>
      </form>
    </main>
  );
}
