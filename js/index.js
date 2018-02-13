import '../css/style.scss'

import { displayStream, loadData, offlineMessage } from './streams'

const streams = document.querySelector('.streams')
const selectors = document.querySelectorAll('.selector')
const allStreamsElement = document.querySelector('#select .all')
const onlineStreamsElement = document.querySelector('#select .online')
const offlineStreamsElement = document.querySelector('#select .offline')

// Set / Clear Status Styles
const clearActive = () =>
  selectors.forEach(selector => (selector.style.color = 'black'))

const setActive = element => (element.style.color = 'white')

const setStreamActive = element => {
  clearActive()
  setActive(element)
}

const start = async () => {
  // load asynchronous server data
  const mergedInfo = await loadData().catch(err =>
    console.error('start: ', err.message)
  )

  const onlineStreams = mergedInfo.filter(
    stream => stream.message !== offlineMessage
  )
  const offlineStreams = mergedInfo.filter(
    stream => stream.message === offlineMessage
  )

  // Display Streams
  const header = `
<div class="stream heading">Icon</div>
<div class="stream heading">Username</div>
<div class="stream heading">Status</div>
`
  streams.innerHTML = header

  function displayAllStreams() {
    setStreamActive(this)
    streams.innerHTML = mergedInfo.map(displayStream).join('')
  }
  function displayOnlineStreams() {
    setStreamActive(this)
    streams.innerHTML = onlineStreams.map(displayStream).join('')
  }

  function displayOfflineStreams() {
    setStreamActive(this)
    streams.innerHTML = offlineStreams.map(displayStream).join('')
  }

  // Event handlers
  allStreamsElement.addEventListener('click', displayAllStreams)
  onlineStreamsElement.addEventListener('click', displayOnlineStreams)
  offlineStreamsElement.addEventListener('click', displayOfflineStreams)

  // Initially display all streams
  // allStreamsElement.click()
}

start()
