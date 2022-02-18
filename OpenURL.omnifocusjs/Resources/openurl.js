/* global PlugIn Form */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const lib = this.openURLlib
    const task = selection.tasks[0]

    const regex = /\b\S*\:\/{2,3}[a-zA-Z./?_=\-\&%0-9~#\[\]!\$'\(\)\*\+]*(\b)?/gm // eslint-disable-line

    const urls = [...task.note.matchAll(regex)].map(match => match[0])

    // TODO: Alert if no URL found

    if (urls.length === 1) lib.openURL(urls[0])

    else if (urls.length > 1) {
      const form = new Form()
      form.addField(new Form.Field.MultipleOptions('urls', 'URLs', urls, urls, urls))
      await form.show('Select URLs to Open', 'Open')
      for (const url of form.values.urls) lib.openURL(url)
    }
  })

  action.validate = function (selection, sender) {
    return selection.tasks.length === 1
  }

  return action
})()
