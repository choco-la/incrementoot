(function() {
  'use strict'
  const updateNameJs = '/update_name.js'


  const instances = [
    'https://mstdn.jp/',
    'https://pawoo.net/',
    'https://friends.nico/'
  ]
  const listenUrls = []
  for (const instance of instances) {
    listenUrls.push(instance + 'api/v1/statuses')
    listenUrls.push(instance + 'api/v1/statuses/*/reblog')
  }


  const listen_toot = (event) => {
    console.log('onComplete detected')
    if (event.method === 'POST') {
      console.log('exec ' + updateNameJs)
      chrome.tabs.executeScript({file: updateNameJs})
    }
  }

  chrome.webRequest.onCompleted.addListener(
    listen_toot,
    {urls: listenUrls}
  )
})()
