import React, {useState} from 'react'
// import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

  let [token, setToken] = useState("");


    const getToken = (credentials) => {
      axios
        .request({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: credentials,
        })
        .then(response => {
          




          setToken(token = response.data.token);
          console.log(token);
          localStorage.setItem('accToken', token);



          axios.interceptors.request.use(
            config => {
              config.headers.authorization = `Bearer ${token}`;
              return config;
            },
            error => {
              return Promise.reject(error);
            }
          );




          console.log("logged!")
          props.history.push('/blogs');
        })
        .catch(err => console.log(err));
    }
  
    const login = (e) => {
      e.preventDefault();
      const credentials = {
        email: e.target[0].value,
        password: e.target[1].value,
      }
      getToken(credentials);
    }


  return (
    <div>
      <br />
      <h1>Login</h1>
      <form onSubmit={login.bind(this)}>
        <input type="email" name="email" />
        <br />
        <input type="password" name="password" />

        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default Login
