import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from './Layout'
import About from './About'
import Index from './Index'
import NotFound from './NotFound'

export default () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Index} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
        </Switch>
    </Layout>
)
