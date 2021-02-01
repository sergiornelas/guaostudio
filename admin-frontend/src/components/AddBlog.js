import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const AddBlog = props => {
  let [userId, setuserId] = useState('');
  const addBlog = newBlog => {
    // const tokenCookie = localStorage.getItem('accToken');
    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/blogs',
        data: newBlog,
      })
      .then(response => {
        // console.log('CONGRATULATIONS!');
        props.history.push('/blogs');
      })
      .catch(err => console.log(err));
  };

  axios
    .request({
      method: 'get',
      url: 'http://localhost:3000/whoAmI',
    })
    .then(response => {
      // console.log('usuario: ', response);
      setuserId((userId = response.data));
    })
    .catch(err => console.log(err));

  const onSubmit = e => {
    e.preventDefault();
    const newBlog = {
      title: e.target[0].value,
      content: e.target[1].value,

      date: new Date(),
      user: userId,
    };
    addBlog(newBlog);
  };

  return (
    <div>
      <Navbar />
      <br />
      <button className="btn-grey">
        <Link to="/blogs">Back</Link>
      </button>

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
    </div>
  );
};

export default AddBlog;
