import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const AddUser = (props) => {
  const addNewUser = newUser => {
    
    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/signup',
        data: newUser,
      })
      .then(response => {
        props.history.push('/blogs');
      })
      .catch(err => console.log(err));
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    addNewUser(newUser);
  };

  return (
    <div className={'container'}>
      <Navbar />

      <h1 className={'title'}>Add blog</h1>
      <form onSubmit={onSubmit.bind(this)}>
        <h4 className={'subtitle'}>Email</h4>
        <input type="text" name="email" className={"input_style"}/>

        <h4 className={'subtitle'}>Password</h4>
        <input type="text" name="password" className={"input_style_textArea"}/>

        <div className={'center_buttons'}>
          <Link to="/blogs">
            <button className="btn-grey">Back</button>
          </Link>
          <input className='input_button' type="submit" value="Submit" />
        </div>
      </form>

      <br />
    </div>
  );
}

export default AddUser
