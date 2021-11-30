import { IUserCreate, IUserLogin } from "rest/users";

export const validateEmail = (email: string): boolean => {
  return email.includes("@");
};

const validateName = (name: string): boolean => {
  return name.length > 2;
};

const validatePassword = (password: string): boolean => {
  return password.length > 5;
};

const validatePasswordMatch = (
  password1: string,
  password2: string
): boolean => {
  return password1 === password2;
};

const validateAccountCreate = ({
  email,
  firstname,
  lastname,
  password,
  password2,
}: IUserCreate) => {
  if (!validateEmail(email))
    return {
      success: false,
      err: "Email needs an @",
    };

  if (!validateName(firstname))
    return {
      success: false,
      err: "First name needs to be longer than 3 characters",
    };

  if (!validateName(lastname))
    return {
      success: false,
      err: "Last name needs to be longer than 3 characters",
    };

  if (!validatePassword(password))
    return {
      success: false,
      err: "Password must be longer than 5 characters",
    };

  if (!validatePasswordMatch(password, password2))
    return {
      success: false,
      err: "Passwords do not match",
    };
  return {
    success: true,
  };
};

const validateAccountLogin = ({ email, password }: IUserLogin) => {
  if (!validateEmail(email))
    return {
      success: false,
      err: "Email needs an @",
    };

  if (!validatePassword(password))
    return {
      success: false,
      err: "Password must be longer than 5 characters",
    };

  return {
    success: true,
  };
};

export { validateAccountCreate, validateAccountLogin, validatePassword };
