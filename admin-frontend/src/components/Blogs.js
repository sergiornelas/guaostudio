import React, {Component} from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
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
    this.getBlogs();
  }

  getBlogs() {
    axios
      .get('http://localhost:3000/blogs')
      .then(response => {
        this.setState({blogs: response.data}, () => {});
      })
      .catch(err => console.log(err));
  }

  render() {
    const blogItems = this.state.blogs.map((blog, i) => {
      return <BlogItem key={blog.id} item={blog} />;
    });
    return (
      <div className={"container"}>
        <Navbar />
        <h1 className={"title"}>Blogs</h1>

        {blogItems}
        <button className="btn-grey">
          <Link to="/blogs/add">Add blog</Link>
        </button>
      </div>
    );
  }
}

export default Blogs;
