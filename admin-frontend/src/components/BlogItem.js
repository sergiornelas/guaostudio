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
    const x = () => {
      // const formattedDate = new Date(this.state.item.date)
      return this.state.item.date;
    };
    return (
      <Link to={`/blogs/${this.state.item.id}`} className={'no-decoration'}>
        <div className={blogsCSS.box_container}>
          {
            <div className={blogsCSS.box_content_title}>
              Title: {this.state.item.title}
            </div>
          }
          {
            <div className={blogsCSS.box_content}>
              <span className={"bold"}>Author ID: </span>
              {this.state.item.user}
            </div>
          }
          {
            <div className={blogsCSS.box_content}>
              <span className={"bold"}>Created date: </span> {x()}
            </div>
          }
        </div>
      </Link>
    );
  }
}

export default BlogItem;
