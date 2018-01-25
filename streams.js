import { getUserData, getStreamData } from './fetchData'

export const offlineMessage = 'Offline'

/**
 * Displays the image, username and message for a single Twitch stream
 * Extra styling is applied to offline streams.
 *
 */
export const displayStream = stream => {
  const { display_name, profile_image_url, message } = stream
  const offline = message === offlineMessage ? 'offline' : ''
  return `
  <div class="icon">
    <img src="${profile_image_url}" alt="${display_name} profile image">
  </div>
  <div class="user">
    <a target="_blank" href="https://www.twitch.tv/${display_name}">
      <div class="username">${display_name}</div>
    </a>
    <div class="status ${offline}">${message}</div>
  </div>
`
}

/**
 * Merges information from User and Stream sources into a single
 * coherent data structure.
 *
 */
const mergeInfo = (userInfo, streamInfo) =>
  userInfo.map(info => {
    const liveStream = streamInfo.filter(stream => stream.id === info.id)
    const message = liveStream.length > 0 ? liveStream[0].title : offlineMessage
    return Object.assign({}, info, {
      message,
    })
  })

/**
 * Loads asynchronous User and Stream data from the server, then
 * filters and merges data into single data structure.
 */

export const loadData = async () => {
  const userData = await getUserData()
  const streamData = await getStreamData()

  const userInfo = userData.data.map(user => ({
    id: user.id,
    display_name: user.display_name,
    profile_image_url: user.profile_image_url,
  }))

  const streamInfo = streamData.data.map(stream => ({
    id: stream.user_id,
    type: stream.type,
    title: stream.title,
  }))

  return mergeInfo(userInfo, streamInfo)
}
