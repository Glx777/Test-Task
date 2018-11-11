import React, {Component} from 'react'
import Photo from './photo'
import fetchJsonp from 'fetch-jsonp'

export default class Photos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      secondComponentVis: true,
      thirdComponentVis: false,
      img_link: '',
      img_text: '',
      img_date: '',
      time: '',
      count: 20
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  changeTime() {
    var time = this.state.img_date
    var date = new Date(time * 1000)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()
    var formattedTime = day + "." + month + "." + year
    this.setState({
      time: formattedTime
    })
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
    this.changeTime()
    fetchJsonp('https://api.vk.com/method/photos.get?album_id=' + this.props.album_id + '&count=16&access_token=' + this.props.token + '&v=5.52')
    .then(response => response.json())
    .then(photos => {
      this.setState({
        photos: photos.response.items
      })
    })
    .catch(error => console.log('parsing failed', error))
  }

  showThirdComponent() {
    this.setState({
      secondComponentVis: false,
      thirdComponentVis: true
    })
  }

  hideThirdComponent() {
    this.setState({
      secondComponentVis: true,
      thirdComponentVis: false
    })
  }

  getImageLink(id) {
    this.setState({
      img_link: id
    })
  }

  getImageText(id) {
    this.setState({
      img_text: id
    })
  }

  getImageDate(id) {
    this.setState({
      img_date: id
    })
  }

  handleScroll(){
    var {count} = this.state
    var {token} = this.props
    var scrollTop = document.documentElement.scrollTop
    var scrollHeight = document.documentElement.scrollHeight
    var clientHeight = document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if (scrolledToBottom) {
      fetchJsonp('https://api.vk.com/method/photos.get?album_id=257999382&offset=1&count=' + count + '&access_token=' + token + '&v=5.52')
      .then(response => response.json())
      .then(photos => {
        this.setState({
          photos: photos.response.items,
          count: count + 4
        })
      })
      .catch(error => console.log('parsing failed', error))
    }
  }

  render() {
    var {photos, secondComponentVis, thirdComponentVis} = this.state
    return (
      <div id="photos">
      { secondComponentVis ?
        <div>
          <div className="navigation">
            <img className="sign" src="./img/lessThanSign.png" onClick={this.props.hideSecondComponent.bind(this)} />
            <img className="sign" src="./img/folder.png" />
            <p>{this.props.album_title}</p>
          </div>
          <div id="container">
            <ul id="pictures">
              {photos.map(photo => (
                <li key={photo.id}>
                  <img className="photo" src={photo.photo_604} />
                  <div className="select">
                    <img src="./img/checkMark.png" />
                    <p onClick={(e) => {
                      this.getImageDate(photo.date)
                      this.getImageLink(photo.photo_604)
                      this.getImageText(photo.text)
                      this.showThirdComponent(e)
                    }}>Select</p>
                  </div>
                  <div className="tooltip">
                    <table>
                      <tr>
                        <td className="boldText">Description:</td>
                        <td>{photo.text}</td>
                      </tr>
                      <tr>
                        <td className="boldText">Date created:</td>
                        <td>{photo.date}</td>
                      </tr>
                    </table>
                  </div>
                </li>
            ))}
            </ul>
          </div>
        </div> : ''
      }
        { thirdComponentVis ?
          <Photo
            hideThirdComponent = {this.hideThirdComponent.bind(this)}
            thirdComponent = {this.state.thirdComponentVis}
            secondComponent = {this.state.secondComponentVis}
            photo_text = {this.state.photo_text}
            img_link = {this.state.img_link}
            img_text = {this.state.img_text}
            img_date = {this.state.img_date}
          /> : ''
        }
      </div>
    )
  }
}
