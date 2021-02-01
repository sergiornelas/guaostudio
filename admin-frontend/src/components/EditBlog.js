import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

export class EditBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      date: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.getBlogDetails();
  }

  getBlogDetails() {
    let blogId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/blogs/${blogId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          date: response.data.date,
        });
      })
      .catch(err => console.log(err));
  }

  editBlog(newBlog) {
    axios
      .request({
        method: 'patch',
        url: `http://localhost:3000/blogs/${this.state.id}`,
        data: newBlog,
      })
      .then(response => {
        this.props.history.push('/blogs');
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    e.preventDefault();
    const newBlog = {
      title: e.target[0].value,
      content: e.target[1].value,
      date: new Date(),
    };
    this.editBlog(newBlog);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className={'container'}>
        <Navbar />
        <br />

        <h1 className={'title'}>Edit Blog</h1>

        <form onSubmit={this.onSubmit.bind(this)}>
          <h4 className={'subtitle'}>Title</h4>
          <input
            className={"input_style"}
            type="text"
            name="title"
            ref="title"
            defaultValue={this.state.title}
            onChange={this.handleInputChange}
          />

          <h4 className={'subtitle'}>Content</h4>
          <textarea
            className={"input_style_textArea"}
            rows="5"
            type="text"
            name="content"
            ref="content"
            defaultValue={this.state.content}
            onChange={this.handleInputChange}
          />

          <div className={"center_buttons"}>
            <Link to="/blogs">
              <button className="btn-grey">Back</button>
            </Link>

            <input
              className={"input_button"}
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditBlog;
