import React, {Component} from 'react'
import Content from './content'

export default class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: ''
    }
  }

  componentWillMount() {
    if (window.location.href.length > 100) {
      this.getUrl()
    }
  }

  logout(e) {
    this.setState({
      token: ''
    })
    var url = window.location.href
    var nextUrl = url.substring(0, url.indexOf("#"))
    e.preventDefault()
    window.location.href = nextUrl
  }

  getUrl() {
    if (window.location.href.length > 100) {
      var url = window.location.href
      var nextUrl = url.substring(url.indexOf("="), url.indexOf("&"))
      var token = nextUrl.substring(1)
      this.setState({
        token: token
      })
    }
  }

  render() {
    return (
      <div>
        <div id="header">
          <div className="center">
            <h1>Photo App</h1>
            {this.state.token == '' ?
            <a href="https://oauth.vk.com/authorize?client_id=6746746&display=popup&redirect_uri=http://localhost/react-test-task/src&scope=photos&response_type=token&v=5.87">Login</a>
            : <a href="#" onClick={this.logout.bind(this)}>Logout</a>
            }
          </div>
        </div>
        <Content
          token = {this.state.token}
        />
      </div>
    )
  }
}
