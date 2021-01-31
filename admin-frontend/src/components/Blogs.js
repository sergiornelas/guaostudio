// MEET UPS.JS
// import React, {Component, useState, useEffect} from 'react';
import React, {Component} from 'react';
import axios from 'axios';
import BlogItem from './BlogItem'
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

class Blogs extends Component{
  constructor(){
    super();
    this.state={
      blogs : []
    }
  }

  componentDidMount(){

    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${localStorage.getItem('accToken')}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.getBlogs();
  }

  getBlogs(){
    axios.get('http://localhost:3000/blogs')
      .then(response => {
        this.setState({blogs: response.data}, () => {
          // console.log(this.state);
        })
    })
    .catch(err => console.log(err));
  }

  render(){
    const blogItems = this.state.blogs.map((blog, i) => {
      return(
        <BlogItem key={blog.id} item={blog}/>
      )
    })
    return (
      <div>
        <Navbar />
        <h1>Blogs</h1>
        <ul>
          {blogItems}
        </ul>
        <button className="btn-grey">
          <Link to="/blogs/add">Add blog</Link>
        </button>
      </div>
    );
  }
}

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   const getBlogs = () => {
//     axios
//       .get('http://localhost:3000/blogs')
//       .then((response) => {
//         setBlogs({
//           bloggs: response.data
//         });
//       })
//       .catch((err) => console.log("error mi estimao: ", err));
//       // console.log(blogs);
//   }

//   useEffect(() => {
//     getBlogs();
    
    
//     // console.log(blogs);
//   }, [blogs]);

export default Blogs;
