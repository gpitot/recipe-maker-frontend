import React, { useState } from "react";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import { Link } from "react-router-dom";

import { validatePassword } from "utils/validation";
import API from "rest/api";
import Information from "components/Information";
import Input from "components/Input";
import Button from "components/Button";
import style from "pages/CreateUser/style.module.scss";

const Login = () => {
  const { showFlag } = useFlags();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validatePassword(password);

    if (valid && token) {
      setLoading(true);
      API.users
        .resetPassword({ password, token })
        .then((res) => {
          if (res.success) {
            setPassword("");
            showFlag({
              isAutoDismiss: true,
              title: "Reset password",
              icon: <SuccessIcon label="success" secondaryColor={G400} />,
              appearance: "success",
            });
          } else {
            showFlag({
              isAutoDismiss: true,
              title: "Could not reset password",
              icon: <ErrorIcon label="error" secondaryColor={R400} />,

              appearance: "error",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showFlag({
        isAutoDismiss: true,
        title: "Password must be more than 5 chars long",
        icon: <ErrorIcon label="error" secondaryColor={R400} />,

        appearance: "error",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  if (loading) {
    return (
      <Information>
        <h1>Resetting...</h1>
      </Information>
    );
  }

  return (
    <Information>
      <h1>Reset your password</h1>

      <form>
        <div className={style.inputWrapper}>
          <Input
            label="Password"
            value={password}
            handleChange={handleChange}
            name="password"
            type="password"
          />
        </div>
        <Button text="Reset" handleClick={handleSubmit} />
      </form>

      <Link to="/create" className={style.login}>
        Need to make an account? Create one here here
      </Link>
    </Information>
  );
};

export default Login;
