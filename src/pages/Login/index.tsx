import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import { validateAccountLogin } from "utils/validation";
import API from "rest/api";
import { IUserLogin } from "rest/users";
import Information from "components/Information";
import Input from "components/Input";
import Button from "components/Button";
import style from "pages/CreateUser/style.module.scss";

const emptyUser = {
  email: "",

  password: "",
} as IUserLogin;

const Login = () => {
  const history = useHistory();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const redirect = params.get("redirect");
  const path = redirect ? redirect : "/";
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IUserLogin>(emptyUser);

  if (user.id) {
    history.push(path);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateAccountLogin(form);

    if (valid.success) {
      setLoading(true);
      API.users
        .login(form)
        .then((res) => {
          if (res.success) {
            setUser(res.user);
            window.localStorage.setItem("token", res.user.accessToken);
            toast.success("Logged in");

            history.push(path);
          } else {
            toast.error("Invalid login details");
          }
        })
        .finally(() => {
          setLoading(false);
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
        <h1>Logging you in...</h1>
      </Information>
    );
  }

  return (
    <Information>
      <h1>Log in</h1>

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
            label="Password"
            value={form["password"]}
            handleChange={handleChange}
            name="password"
            type="password"
          />
        </div>
        <Button text="Log in" handleClick={handleSubmit} />
      </form>

      <Link to="/create" className={style.login}>
        Need to make an account? Create one here here
      </Link>
    </Information>
  );
};

export default Login;
