import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Blogs from './Blogs'
import About from './About'
import BlogDetails from './BlogDetails'
import AddBlog from './AddBlog'
import EditBlog from './EditBlog'

const Main = () => {
  return (
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={Blogs} />
          <Route exact path='/about' component={About} />
          <Route exact path='/blogs/add' component={AddBlog} />
          <Route exact path='/blogs/edit/:id' component={EditBlog} />
          <Route exact path='/blogs/:id' component={BlogDetails} />
        </Switch>
      </main>
    </div>
  )
}

export default Main
