import '../css/style.scss'

import { displayStream, loadData, offlineMessage } from './streams'

const streams = document.querySelector('.streams')
const selectors = document.querySelectorAll('.selector')
const allStreamsElement = document.querySelector('.selector.all')
const onlineStreamsElement = document.querySelector('.selector.online')
const offlineStreamsElement = document.querySelector('.selector.offline')

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
  const displayHeader = () => {
    streams.innerHTML = `
<div class="stream heading">Icon</div>
<div class="stream heading">Username</div>
<div class="stream heading">Status</div>
`
  }

  function displayAllStreams() {
    setStreamActive(this)
    displayHeader()
    streams.innerHTML += mergedInfo.map(displayStream).join('')
  }
  function displayOnlineStreams() {
    displayHeader()
    setStreamActive(this)
    streams.innerHTML += onlineStreams.map(displayStream).join('')
  }

  function displayOfflineStreams() {
    displayHeader()
    setStreamActive(this)
    streams.innerHTML += offlineStreams.map(displayStream).join('')
  }

  // Event handlers
  allStreamsElement.addEventListener('click', displayAllStreams)
  onlineStreamsElement.addEventListener('click', displayOnlineStreams)
  offlineStreamsElement.addEventListener('click', displayOfflineStreams)

  // Initially display all streams
  allStreamsElement.click()
}

start()
