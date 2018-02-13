import clientID from './twitchInfo.js'

const twitchStreams = [
  'ESL_SC2',
  'Adam13531',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'noopkat',
  'storbeck',
  'SirMrE',
  'RobotCaleb',
  'funfunfunction',
]

const twitchUrlPrefix = 'https://api.twitch.tv/helix'
const usersUrlPrefix = twitchUrlPrefix + '/users'
const streamsUrlPrefix = twitchUrlPrefix + '/streams'

/**
 * Builds the Url parameter string using the given string tag and
 * list of twitch stream display names.
 */
const buildParameters = (tag, streams) => {
  return streams
    .reduceRight((acc, stream) => {
      // login names are lowercase
      return acc + `${tag}=${stream.toLowerCase()}&`
    }, '?')
    .slice(0, -1)
}

const usersUrl = usersUrlPrefix + buildParameters('login', twitchStreams)
const streamsUrl =
  streamsUrlPrefix + buildParameters('user_login', twitchStreams)

const fetchData = async url => {
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Client-ID': clientID,
      }),
    })
    if (resp.ok) {
      return await resp.json()
    }
    throw new Error(resp.statusText)
  } catch (err) {
    console.error('fetchData Server Error: ', err.message)
  }
}

export const getUserData = () => fetchData(usersUrl)
export const getStreamData = () => fetchData(streamsUrl)
