import '../App.css';
import Navbar from './Navbar';
import React from 'react';
import axios from 'axios';

const About = () => {


    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${localStorage.getItem(
          'accToken',
        )}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

  return (
    <div>
      <Navbar />
      <h1>About</h1>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  );
};

export default About;
