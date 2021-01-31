import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class BlogItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item:props.item
    }
  }

  render() {
    return (
      <li>
        <Link to={`/blogs/${this.state.item.id}`}>{this.state.item.title}</Link>
      </li>
    )
  }
}

export default BlogItem
