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
    <div className={'container'}>
      <Navbar />

      <h1 className={'title'}>Add blog</h1>
      <form onSubmit={onSubmit.bind(this)}>
        <h4 className={'subtitle'}>Title</h4>
        <input type="text" name="title" className={"input_style"}/>

        <h4 className={'subtitle'}>Content</h4>
        <textarea type="text" name="content" rows="5" className={"input_style_textArea"}/>

        <div className={'center_buttons'}>
          <Link to="/blogs">
            <button className="btn-grey">Back</button>
          </Link>
          <input className={'input_button'} type="submit" value="Submit" />
        </div>
      </form>

      <br />
    </div>
  );
};

export default AddBlog;
