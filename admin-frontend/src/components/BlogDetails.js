import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class BlogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: '',
    };
  }

  componentDidMount() {
    this.getBlog();
  }

  getBlog() {
    let blogId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/blogs/${blogId}`)
      .then(response => {
        this.setState({details: response.data}, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <br />
        <button className="btn-grey">
          <Link  to="/">
            Back
          </Link>
        </button>
        <h1>{this.state.details.title}</h1>
        <ul>
          <li>Content: {this.state.details.content}</li>
          <li>Date: {this.state.details.date}</li>
        </ul>
        
        <button className="btn-grey">
          <Link to={`/blogs/edit/${this.state.details.id}`}>Edit</Link>
        </button>

      </div>
    );
  }
}

export default BlogItem;
