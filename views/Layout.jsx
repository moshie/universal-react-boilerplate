import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Layout extends React.Component {
    _handleClick() {
        alert()
    }
    render() {
        var custom = this.props.custom
        return (
            <html>
                <head>
                    <title>{custom.title}</title>
                    <link rel='stylesheet' href='/style.css' />
                </head>
                <body>
                    <h1>{custom.title}</h1>
                    <p>Isnt server-side rendering remarkable?</p>
                    <button onClick={this._handleClick}>Click Me</button>
                    {this.props.children}
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                    </ul>
                    <script dangerouslySetInnerHTML={{
                        __html: 'window.PROPS=' + JSON.stringify(custom)
                    }} />
                    <script src='/bundle.js' />
                </body>
            </html>
        )
    }
}

var wrapper = connect(
    function(state) {
        return { custom: state };
    }
);

module.exports = wrapper(Layout)
