import { Router } from 'express'
import React from 'react'
import { createStore } from 'redux'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import App from './components/app'

const router = Router()

router.get('*', (request, response) => {
    const initialState = { title: 'Universal React' }
    const store = createStore(state => state, initialState)

    const context = {}
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={request.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )

    if (context.status >= 400) {
        response.status(context.status).send(html)
    } else if (context.url) {
        response.redirect(context.status, context.url)
    } else {
        response.send(html)
    }
})

export default router
