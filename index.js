import './style.scss'

// TODO: remove Dev Data
import users from './data/user_data'
import streams from './data/stream_data'

const container = document.querySelector('#container')
const offlineMessage = 'Offline'

const userInfo = users.data.map(user => ({
  id: user.id,
  display_name: user.display_name,
  profile_image_url: user.profile_image_url,
}))

const streamInfo = streams.data.map(stream => ({
  id: stream.user_id,
  type: stream.type,
  title: stream.title,
}))

/**
 * Merges information from User and Stream sources into a single
 * coherent data structure.
 *
 */
const mergedInfo = userInfo.map(info => {
  const liveStream = streamInfo.filter(stream => stream.id === info.id)
  const message = liveStream.length > 0 ? liveStream[0].title : offlineMessage
  return Object.assign({}, info, {
    message,
  })
})

/**
 * Displays the image, username and message for a single Twitch stream
 * Extra styling is applied to offline streams.
 *
 */
const displayStream = stream => {
  const { display_name, profile_image_url, message } = stream
  const offline = message === offlineMessage ? 'offline' : ''
  return `
  <div class="icon">
    <img src="${profile_image_url}" alt="${display_name} profile image">
  </div>
  <div class="user">
    <div class="username">${display_name}</div>
    <div class="status ${offline}">${message}</div>
  </div>
`
}

const onlineStreams = mergedInfo.filter(
  stream => stream.message !== offlineMessage
)
const offlineStreams = mergedInfo.filter(
  stream => stream.message === offlineMessage
)

container.innerHTML = mergedInfo.map(displayStream).join('')
