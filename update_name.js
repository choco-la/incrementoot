(function() {
  'use strict'
  const initState = JSON.parse(document.getElementById('initial-state').textContent)
  const bearerToken = initState.meta['access_token']
  const myNumId = initState.meta['me']


  const tootCount = String(Number(countArea.innerText) + 1)
  const displayName = initState.accounts[myNumId]['display_name']
  // display_name without toot count.
  const base = displayName.replace(/(?:\[[0-9]+\])+$/, '')
  const suffixCount = '[' + tootCount.toString() + ']'


  const countArea = document.getElementsByClassName('toot-count')[0]
  countArea.innerText = tootCount





  const update_display_name = (name, token) => {
    const host = location.origin + '/'
    const update = host + 'api/v1/accounts/update_credentials'

    const xhr = new XMLHttpRequest()

    xhr.open('PATCH', update)
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.timeout = '3000'

    const patch = 'display_name=' + encodeURIComponent(name).replace(/%20/, '+')
    xhr.send(patch)
  }

  update_display_name(base + suffixCount, bearerToken)
})()
