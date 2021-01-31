import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const AddBlog = (props) => {
  //const [token, setToken] = useState("");

  // let [token, setToken] = useState("");
  // let isLogged = false;

  let [userId, setuserId] = useState("");

  const addBlog = (newBlog) => {
    // console.log(token);
    const tokenCookie = localStorage.getItem('accToken');
    // console.log(tokenCookie);

    // setToken(token=tokenCookie)

    

    // //Validate user is logged in.
    // axios.interceptors.request.use(
    //   config => {
    //     config.headers.authorization = `Bearer ${token}`;
    //     return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   }
    // );

    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/blogs',
        data: newBlog,
      })
      .then(response => {
        // this.props.history.push('/');
        console.log("CONGRATULATIONS!")
        props.history.push('/blogs');
      })
      .catch(err => console.log(err));
  }

  // let user = ""

  //get userID
  axios
  .request({
    method: 'get',
    url: 'http://localhost:3000/whoAmI',
    // data: newBlog,
  })
  .then(response => {
    // this.props.history.push('/');
    console.log("usuario: ", response)
    // props.history.push('/blogs');
    setuserId(userId=response.data);
  })
  .catch(err => console.log(err))
  

  const onSubmit = e => {
    e.preventDefault();
    const newBlog = {
      title: e.target[0].value,
      content: e.target[1].value,
      
      date: new Date(),
      // user: "Pepito"
      user: userId
    };
    addBlog(newBlog);
  }

  //-------------------------------------------  

  // const getToken = (credentials) => {
  //   axios
  //     .request({
  //       method: 'post',
  //       url: 'http://localhost:3000/users/login',
  //       data: credentials,
  //     })
  //     .then(response => {
  //       //this.props.history.push('/');
        
  //       // setToken(response.data.token);
  //       setToken(token = response.data.token);


  //       localStorage.setItem('accToken', token);
  //       // isLogged=true;
  //       console.log("logged!")

  //     })
  //     .catch(err => console.log(err));
  // }

  // const login = (e) => {
  //   e.preventDefault();
  //   const credentials = {
  //     email: e.target[0].value,
  //     password: e.target[1].value,
  //   }
  //   getToken(credentials);
  // }

  // const logout = () => {
  //   console.log("logged out!")
  //   // localStorage.setItem('accToken', "");
  //   localStorage.removeItem('accToken');
  // }

  return (
    <div>
      <Navbar />
      <br />
      <button className="btn-grey">
        <Link to="/blogs">Back</Link>
      </button>

      {/* <h1>Login</h1>
      <form onSubmit={login.bind(this)}>
        <input type="email" name="email" /> */}
        {/* <label htmlFor="email">Email</label> */}
        {/* <br />
        <input type="password" name="password" /> */}
        {/* <label htmlFor="password">Password</label> */}

        {/* <input type="submit" value="Save" onClick={this.login.bind(this)} /> */}
        {/* <input type="submit" value="Save" />
      </form> */}

      <br />
      <br />
      <br />
      <h1>Add blog</h1>
      <form onSubmit={onSubmit.bind(this)}>
        <input type="text" name="title" />
        <label htmlFor="title">Title</label>

        <input type="text" name="content" />
        <label htmlFor="content">Content</label>

        <input type="submit" value="Save" />
      </form>

      <br />
      {/* <button className="btn-grey" onClick={logout}>
        Log Out
      </button> */}
    </div>
  );
}

export default AddBlog;
