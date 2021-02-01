import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import blogsCSS from '../styles/blogs.module.css';

export class BlogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
  }

  render() {
    return (
      <div className={blogsCSS.box_container}>
        <Link to={`/blogs/${this.state.item.id}`} className={"no-decoration"}>
          {<p className={blogsCSS.box_content}>Title: {this.state.item.title}</p>}
          <br/>
          {<p>Date created: {this.state.item.date}</p>}
        </Link>
      </div>
    );
  }
}

export default BlogItem;
