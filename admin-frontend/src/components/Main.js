import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Blogs from './Blogs'
import About from './About'

const Main = () => {
  return (
    <div>
      <main>
        <Switch>
          <Route exact path='/' component={Blogs} />
          <Route exact path='/about' component={About} />
        </Switch>
      </main>
    </div>
  )
}

export default Main
