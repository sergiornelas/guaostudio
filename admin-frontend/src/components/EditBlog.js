import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class EditBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      date: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
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
        }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  editBlog(newBlog){
    axios
      .request({
        method: 'put',
        url: `http://localhost:3000/blogs/${this.state.id}`,
        data: newBlog,
      })
      .then(response => {
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    e.preventDefault();
    const newBlog = {
      title: e.target[0].value,
      content: e.target[1].value,
      date: e.target[2].value,
    };
    this.editBlog(newBlog);
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <br />
        <button className="btn-grey">
          <Link to="/">Back</Link>
        </button>
        <h1>Edit Blog</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="title" ref="title" defaultValue={this.state.title}
          onChange={this.handleInputChange} />
          <label htmlFor="title">Title</label>

          <input type="text" name="content" ref="content" defaultValue={this.state.content} 
          onChange={this.handleInputChange}/>
          <label htmlFor="content">Content</label>

          <input type="text" name="date" ref="date" defaultValue={this.state.date} 
          onChange={this.handleInputChange}/>
          <label htmlFor="date">Date</label>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default EditBlog;