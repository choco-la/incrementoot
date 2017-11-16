(function() {
  'use strict'
  const initState = JSON.parse(document.getElementById('initial-state').textContent)
  const bearerToken = initState.meta['access_token']
  const myNumId = initState.meta['me']


  const displayName = initState.accounts[myNumId]['display_name']
  // display_name without toot count.
  const base = displayName.replace(/(?:\[[0-9]+\])+$/, '')


  let msg = browser.runtime.sendMessage(
    {
      'token': bearerToken,
      'host': location.origin + '/',
      'base': base
    }
  )
})()
