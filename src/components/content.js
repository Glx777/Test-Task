import React, {Component} from 'react'
import Photos from './photos'
import fetchJsonp from 'fetch-jsonp'

export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      firstName: '',
      firstComponentVis: true,
      secondComponentVis: false,
      activeAlbum: '',
      albumName: '',
      time: '',
      text: ''
    }
  }
  showSecondComponent() {
    this.setState({
      firstComponentVis: false,
      secondComponentVis: true
    })
  }
  hideSecondComponent() {
    this.setState({
      firstComponentVis: true,
      secondComponentVis: false
    })
  }
  chooseAlbum(id) {
    this.setState({
      activeAlbum: id
    })
  }
  chooseAlbumName(id) {
    this.setState({
      albumName: id
    })
  }
  componentDidMount() {
    var {token} = this.props
    if (token) {
      fetchJsonp('https://api.vk.com/method/photos.getAlbums?need_covers=1,photo_sizes=1&access_token=' + token + '&v=5.52')
      .then(response => response.json())
      .then(json => {
        this.setState({
          albums: json.response.items
        })
      })
      .catch(error => console.log('parsing failed', error))
      fetchJsonp('https://api.vk.com/method/users.get?fields=first_name&access_token=' + token + '&v=5.52')
      .then(response => response.json())
      .then(lol => {
        this.setState({
          firstName: lol.response[0].first_name
        })
      })
      .catch(error => console.log('getting first name failed', error))
    }
  }
  render() {
    var {albums, firstName, firstComponentVis, secondComponentVis, token, activeAlbum} = this.state
    return (
      <div id="content">
      { firstComponentVis ?
        <div>
        {this.props.token ?
        <h1>Welcome, {firstName}.</h1> : '' }
         <ul id="albums">
          {albums.map((album) => (
            <li key={album.aid} onClick={(e) => {
              this.chooseAlbum(album.id)
              this.chooseAlbumName(album.title)
              this.showSecondComponent(e)
            }}>
              <div className="insideInfo">
                <img className="thumbnail" src={album.thumb_src} />
                <div className="albumInfo">
                  <h2>{album.title}</h2>
                  { album.size === 1 ?
                    <p><img className="icon" src="./img/file.png" />{album.size} file</p> :
                    <p><img className="icon" src="./img/file.png" />{album.size} files</p>
                  }
                  <p><img className="icon" src="./img/time.png" />{album.updated}</p>
                </div>
                <img className="doubleAngleBracket" src="./img/doubleAngleBracket.png" />
              </div>
            </li>
          ))}
         </ul>
         </div> : ''
        }
         {secondComponentVis ?
         <div>
          <Photos
            hideSecondComponent={this.hideSecondComponent.bind(this)}
            token={this.props.token}
            album_id={this.state.activeAlbum}
            album_title={this.state.albumName}
          />
         </div> : ''
        }
      </div>
    )
  }
}
