import './style.scss'

import { displayStream, loadData, offlineMessage } from './streams'

const container = document.querySelector('#streams')
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
  const mergedInfo = await loadData()

  const onlineStreams = mergedInfo.filter(
    stream => stream.message !== offlineMessage
  )
  const offlineStreams = mergedInfo.filter(
    stream => stream.message === offlineMessage
  )

  function displayAllStreams() {
    setStreamActive(this)
    container.innerHTML = mergedInfo.map(displayStream).join('')
  }
  function displayOnlineStreams() {
    setStreamActive(this)
    container.innerHTML = onlineStreams.map(displayStream).join('')
  }

  function displayOfflineStreams() {
    setStreamActive(this)
    container.innerHTML = offlineStreams.map(displayStream).join('')
  }

  // Event handlers
  allStreamsElement.addEventListener('click', displayAllStreams)
  onlineStreamsElement.addEventListener('click', displayOnlineStreams)
  offlineStreamsElement.addEventListener('click', displayOfflineStreams)

  // Initially display all streams
  allStreamsElement.click()
}

start()
