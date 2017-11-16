(function() {
  'use strict'
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


  let host = ''
  let bearer_token = ''
  let base = ''
  const assign_from_msg = (msg) => {
    bearer_token = msg.token
    host = msg.host
    base = msg.base
  }
  browser.runtime.onMessage.addListener(assign_from_msg)


  const update_display_name = (name, token) => {
    const update = host + 'api/v1/accounts/update_credentials'
    console.log(update)

    const xhr = new XMLHttpRequest()

    xhr.open('PATCH', update)
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.timeout = '3000'

    const patch = 'display_name=' + encodeURIComponent(name).replace(/%20/, '+')
    xhr.send(patch)
  }

  const decoder = new TextDecoder('utf-8');
  const listen_toot = (details) => {
    console.log('onBefore detected')
    if (details.method === 'POST') {
      const filter = browser.webRequest.filterResponseData(details.requestId)

      filter.ondata = (event) => {
        console.log('ondata detected')
        const resp_str = decoder.decode(event.data, {stream: true})
        const resp_json = JSON.parse(resp_str)
        const count = resp_json['account']['statuses_count']
        const name = base + '[' + String(count) + ']'

        filter.write(event.data)
        filter.close();

        update_display_name(name, bearer_token)
      }

      return {}
    }
  }
  chrome.webRequest.onBeforeRequest.addListener(
    listen_toot,
    {urls: listenUrls},
    ['blocking']
  )
})()
