import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import blogsDetailCSS from '../styles/blogDetail.module.css';

export class BlogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: '',
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
    this.getBlog();
  }

  getBlog() {
    let blogId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/blogs/${blogId}`)
      .then(response => {
        this.setState({details: response.data});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className={'container'}>
        <Navbar />
        <h1 className={'title'}>{this.state.details.title}</h1>
        <br/>
        <p className={blogsDetailCSS.info}><span className={"bold"}>Date: </span>{this.state.details.date}</p>
        <p className={blogsDetailCSS.info}><span className={"bold"}>User ID: </span>{this.state.details.user}</p>
        <div className={blogsDetailCSS.detailContent}>
          {this.state.details.content}
        </div>

        <div className="center_buttons">
          <Link to="/blogs">
            <button className="btn-grey">Back</button>
          </Link>

          <Link to={`/blogs/edit/${this.state.details.id}`}>
            <button className="btn-grey-special">Edit </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BlogItem;
