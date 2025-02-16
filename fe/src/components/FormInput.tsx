import React from 'react';
import { isEqual, isFrontBiggerThanRear } from 'utils/capsuledConditions';

interface FormInputProps {
  type: string;
  name: string;
  text: string;
  placeholder?: string;
  className: string;
  isValid?: boolean;
  checkValidation: (target: string, validationResult: boolean) => void;
  regexRule?: RegExp;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const {
      type,
      name,
      text,
      placeholder,
      className,
      isValid,
      checkValidation,
      regexRule,
    } = props;

    const inputValueCount = React.useRef<number>(0);

    const validationFailedString = isEqual(name, 'passwordCheck')
      ? '비밀번호가 일치하지 않습니다.'
      : '입력한 값이 형식과 맞지 않습니다.';

    const validationCondition =
      isFrontBiggerThanRear(inputValueCount.current, 0) && !isValid;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (regexRule && regexRule instanceof RegExp) {
        const regexResult = regexRule.test(event.currentTarget.value);
        const numberOfValidInputs = event.currentTarget.value.length;
        inputValueCount.current += numberOfValidInputs;
        checkValidation(name, regexResult);
      }
    }

    return (
      <label htmlFor={name} className={className}>
        <div className="flex items-center w-full h-[30px]">
          <span className="basis-1/4">{text}</span>
          <p className="basis-3/4 text-red-500 font-semibold">
            {validationCondition && validationFailedString}
          </p>
        </div>
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`login-input w-full ml-0 ${
            validationCondition
              ? 'border border-solid border-red-500'
              : 'border-none'
          }`}
          onChange={handleChange}
        />
      </label>
    );
  },
);

export default React.memo(FormInput);
