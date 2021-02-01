import React, {useState} from 'react';
import axios from 'axios';
import loginCSS from '../styles/login.module.css';

const Login = props => {
  let [token, setToken] = useState('');
  const getToken = credentials => {
    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: credentials,
      })
      .then(response => {
        setToken((token = response.data.token));
        console.log(token);
        localStorage.setItem('accToken', token);
        axios.interceptors.request.use(
          config => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
          },
          error => {
            return Promise.reject(error);
          },
        );
        console.log('logged!');
        props.history.push('/blogs');
      })
      .catch(err => console.log(err));
  };

  const login = e => {
    e.preventDefault();
    const credentials = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    getToken(credentials);
  };

  return (
    <div className={loginCSS.login_all}>
      <h1 className={"title"}>Create your own Blog!</h1>

      <div className={loginCSS.container_login}>
        <form onSubmit={login.bind(this)}>
          <h1 className={"subtitle"}>Login</h1>
          <ul>
            <li className={loginCSS.list_element}>
              <input
                placeholder={'Email'}
                className={loginCSS.input_text}
                type="email"
                name="email"
              />
            </li>
            <li className={loginCSS.list_element}>
              <input
                placeholder={'Password'}
                className={loginCSS.input_text}
                type="password"
                name="password"
              />
            </li>
            <li className={loginCSS.list_element}>
              <input
                className={loginCSS.input_button}
                type="submit"
                value="Enter"
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Login;
