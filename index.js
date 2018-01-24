import './style.scss'

// dev data
import users from './data/user_data'
import streams from './data/stream_data'

const images = document.querySelectorAll('.icon img')
const usernames = document.querySelectorAll('.user .username')
const statuses = document.querySelectorAll('.user .status')

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

const mergedInfo = userInfo.map(info => {
  const liveStream = streamInfo.filter(stream => stream.id === info.id)
  const message = liveStream.length > 0 ? liveStream[0].title : 'offline'
  return Object.assign({}, info, {
    message,
  })
})

const userIndex = 1
const { display_name, profile_image_url } = userInfo[userIndex]
const { message } = mergedInfo[userIndex]

// Intialise user icons according to their profile_image_url
images.forEach(img => {
  img.src = profile_image_url
  img.alt = `${display_name} profile image`
})
usernames.forEach(username => (username.innerText = display_name))
statuses.forEach(status => (status.innerText = message))
