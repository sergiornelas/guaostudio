import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const AddBlog = () => {
  //const [token, setToken] = useState("");

  let [token, setToken] = useState("");
  let isLogged = false;

  const addBlog = (newBlog) => {

    console.log(token);
    // const tokenCookie = localStorage.getItem('accToken');
    // console.log(tokenCookie);

    // if(isLogged===false){
    //   // localStorage.setItem('accToken', "");
    //   setToken(token="")
    // } else {
    //   setToken(token=tokenCookie)
    // }

    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/blogs',
        data: newBlog,
      })
      .then(response => {
        // this.props.history.push('/');
        console.log("CONGRATULATIONS!")
      })
      .catch(err => console.log(err));
  }

  const onSubmit = e => {
    e.preventDefault();
    const newBlog = {
      title: e.target[0].value,
      content: e.target[1].value,
      date: e.target[2].value,
    };
    addBlog(newBlog);
  }

  //-------------------------------------------  

  const getToken = (credentials) => {
    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: credentials,
      })
      .then(response => {
        //this.props.history.push('/');
        
        // setToken(response.data.token);
        setToken(token = response.data.token);


        // localStorage.setItem('accToken', token);
        isLogged=true;
        console.log("logged!")

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
      <button className="btn-grey">
        <Link to="/">Back</Link>
      </button>

      <h1>Login</h1>
      <form onSubmit={login.bind(this)}>
        <input type="email" name="email" />
        {/* <label htmlFor="email">Email</label> */}
        <br />
        <input type="password" name="password" />
        {/* <label htmlFor="password">Password</label> */}

        {/* <input type="submit" value="Save" onClick={this.login.bind(this)} /> */}
        <input type="submit" value="Save" />
      </form>

      <br />
      <br />
      <br />
      <br />
      <form onSubmit={onSubmit.bind(this)}>
        <input type="text" name="title" />
        <label htmlFor="title">Title</label>

        <input type="text" name="content" />
        <label htmlFor="content">Content</label>

        <input type="text" name="date" />
        <label htmlFor="date">Date</label>
        <input type="submit" value="Save" />
      </form>

    </div>
  );
}

export default AddBlog;
