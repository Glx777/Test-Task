import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'

export default class Photo extends Component {
  constructor() {
    super()
    this.state = {
      time: ''
    }
  }
  componentDidMount() {
    this.changeTime()
  }
  changeTime() {
    var time = this.props.img_date
    var date = new Date(time * 1000)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()
    var formattedTime = day + "." + month + "." + year
    this.setState({
      time: formattedTime
    })
  }
  render() {
    return (
      <div>
        <div className="navigation">
          <img className="sign" src="./img/lessThanSign.png" onClick={() => this.props.hideThirdComponent()} />
        </div>
        <div id="photo">
          <div className="photoContainer">
            <img src={this.props.img_link} />
          </div>
          <table>
            <tr>
              <td className="boldText">Description:</td>
              <td>{this.props.img_text}</td>
            </tr>
            <tr>
              <td className="boldText">Date created:</td>
              <td>{this.state.time}</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}
