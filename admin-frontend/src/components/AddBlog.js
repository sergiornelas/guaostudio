import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class AddBlog extends Component {
  addBlog(newBlog) {
    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/blogs',
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

    this.addBlog(newBlog);
  }

  render() {
    return (
      <div>
        <br />
        <button className="btn-grey">
          <Link to="/">Back</Link>
        </button>
        <h1>Add Blog</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="title" ref="title" />
          <label htmlFor="title">Title</label>

          <input type="text" name="content" ref="content" />
          <label htmlFor="content">Content</label>

          <input type="text" name="date" ref="date" />
          <label htmlFor="date">Date</label>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default AddBlog;
