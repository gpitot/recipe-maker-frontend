import React, { useState, useContext } from "react";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import { validateEmail } from "utils/validation";
import API from "rest/api";
import { IUserGenerateUserPasswordReset } from "rest/users";
import Information from "components/Information";
import Input from "components/Input";
import Button from "components/Button";
import style from "pages/CreateUser/style.module.scss";

const emptyUser = {
  email: "",
} as IUserGenerateUserPasswordReset;

const ForgotPassword = () => {
  const history = useHistory();
  const { showFlag } = useFlags();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const redirect = params.get("redirect");
  const path = redirect ? redirect : "/";
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IUserGenerateUserPasswordReset>(emptyUser);

  if (user.id) {
    history.push(path);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateEmail(form.email);

    if (valid) {
      setLoading(true);
      API.users
        .userGenerateReset(form)
        .then((res) => {
          if (res.success) {
            showFlag({
              isAutoDismiss: true,
              title: "Send reset link to your phone",
              icon: <SuccessIcon label="success" secondaryColor={G400} />,
              appearance: "success",
            });
          } else {
            showFlag({
              isAutoDismiss: true,
              title: "You do not have a phone number linked",        
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
        title: "Please enter a valid email address",
        icon: <ErrorIcon label="error" secondaryColor={R400} />,
        appearance: "error",
      });
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
        <h1>Sending a reset link to your phone...</h1>
      </Information>
    );
  }

  return (
    <Information>
      <h1>Reset password</h1>

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
        <Button text="Send reset link to my phone" handleClick={handleSubmit} />
      </form>

      <Link to="/create" className={style.login}>
        Need to make an account? Create one here here
      </Link>

      <Link to="/login" className={style.login}>
        Already have an account? Log in here
      </Link>
    </Information>
  );
};

export default ForgotPassword;
