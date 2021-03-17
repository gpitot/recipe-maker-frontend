import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import { validateAccountCreate } from "utils/validation";
import API from "rest/api";
import { IUserCreate } from "rest/users";
import Information from "components/Information";
import Input from "components/Input";
import Button from "components/Button";
import style from "./style.module.scss";

const emptyUser = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  password2: "",
} as IUserCreate;

const CreateUser = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IUserCreate>(emptyUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateAccountCreate(form);

    if (valid.success) {
      setLoading(true);
      API.users.create(form).then((res) => {
        if (res.success) {
          setUser(res.user);
          window.localStorage.setItem("token", res.user.accessToken);
          toast.success("Account created");
          history.push("/");
        } else {
          toast.error("That email address is already in use");
        }
      });
    } else {
      toast.error(valid.err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <Information>
        <h1>Creating your account...</h1>
      </Information>
    );
  }

  return (
    <Information>
      <h1>Create an account</h1>

      <form>
        <div className={style.inputWrapper}>
          <Input
            label="Email address"
            value={form["email"]}
            handleChange={handleChange}
            name="email"
            type="email"
          />
        </div>
        <div className={style.inputWrapper}>
          <Input
            label="First name"
            value={form["firstname"]}
            handleChange={handleChange}
            name="firstname"
            type="text"
          />
        </div>
        <div className={style.inputWrapper}>
          <Input
            label="Last name"
            value={form["lastname"]}
            handleChange={handleChange}
            name="lastname"
            type="text"
          />
        </div>
        <div className={style.inputWrapper}>
          <Input
            label="Password"
            value={form["password"]}
            handleChange={handleChange}
            name="password"
            type="password"
          />
        </div>
        <div className={style.inputWrapper}>
          <Input
            label="Confirm password"
            value={form["password2"]}
            handleChange={handleChange}
            name="password2"
            type="password"
          />
        </div>
        <Button text="Create Account" handleClick={handleSubmit} />
      </form>

      <Link to="/login" className={style.login}>
        Already have an account? Log in here
      </Link>
    </Information>
  );
};

export default CreateUser;
