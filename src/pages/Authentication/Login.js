import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, withRouter } from "react-router-dom";
import { Col, Row, Card, Alert } from "reactstrap";
import PropTypes from "prop-types";

import bg from "../../assets/images/bg.jpeg";
import logoDark from "../../assets/images/svg/logo.svg";
import { connect } from "react-redux";
import { loginUser } from "../../store/auth/login/actions";
import { isArray } from "lodash";
const Login = props => {
  const [authForm, setAuthForm] = useState({
    email: "admin@sk-inno.ru",
    password: "12345678",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [authForm]);

  useEffect(() => {
    const { error } = props.error;
    if (error) {
      setErrors(
        isArray(error.response.data.message)
          ? error.response.data.message
          : [error.response.data.message]
      );
      return true;
    }
    setErrors([]);
  }, [props.error]);

  const submitForm = e => {
    e.preventDefault();
    props.loginUser(authForm, props.history);
  };

  return (
    <React.Fragment>
      <div className="account-pages">
        <MetaTags>
          <title>Авторизация | Спортивный Комплекс «Innopolis»</title>
        </MetaTags>

        <div
          className="accountbg"
          style={{
            background: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="wrapper-page account-page-full">
          <Card className="shadow-none">
            <div className="card-block">
              <div className="account-box">
                <div className="card-box shadow-none p-4">
                  <div className="p-2">
                    <div className="text-center mt-4">
                      <Link to="/">
                        <img src={logoDark} height="22" alt="logo" />
                      </Link>
                    </div>

                    <h4 className="font-size-18 mt-5 text-center">
                      Добро пожаловать!
                    </h4>
                    <p className="text-muted text-center">
                      Войдите, чтобы перейти в систему.
                    </p>
                    {errors.map((msg, index) => {
                      return (
                        <Alert key={index} color="danger">
                          {msg}
                        </Alert>
                      );
                    })}
                    <form className="mt-4" onSubmit={submitForm}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          value={authForm.email}
                          onChange={e =>
                            setAuthForm({ ...authForm, email: e.target.value })
                          }
                          className="form-control"
                          id="email"
                          placeholder="Укажите email"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">
                          Пароль
                        </label>
                        <input
                          type="password"
                          value={authForm.password}
                          onChange={e =>
                            setAuthForm({
                              ...authForm,
                              password: e.target.value,
                            })
                          }
                          className="form-control"
                          id="userpassword"
                          placeholder="Укажите пароль"
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Запомнить меня
                            </label>
                          </div>
                        </Col>

                        <Col sm="6" className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Войти
                          </button>
                        </Col>
                      </Row>
                    </form>

                    <div className="mt-5 pt-4 text-center">
                      <p>© {new Date().getFullYear()} INNOPOLIS.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const error = state.Login;
  return { error };
};

export default withRouter(connect(mapStateToProps, { loginUser })(Login));

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
};
