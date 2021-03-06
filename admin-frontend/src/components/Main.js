import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Blogs from './Blogs';
import About from './About';
import BlogDetails from './BlogDetails';
import AddBlog from './AddBlog';
import EditBlog from './EditBlog';
import Login from './Login';
import AddUser from './AddUser'

const Main = () => {
  return (
    <div>
      <main>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/addUser" component={AddUser} />
          <Route exact path="/about" component={About} />
          <Route exact path="/blogs/add" component={AddBlog} />
          <Route exact path="/blogs/edit/:id" component={EditBlog} />
          <Route exact path="/blogs/:id" component={BlogDetails} />
        </Switch>
      </main>
    </div>
  );
};

export default Main;
