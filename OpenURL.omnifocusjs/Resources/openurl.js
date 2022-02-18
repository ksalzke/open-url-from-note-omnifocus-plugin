/* global PlugIn Form */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const task = selection.tasks[0]

    const regex = /\b\S*\:\/{2,3}[a-zA-Z./?_=\-\&%0-9~#\[\]!\$'\(\)\*\+]*(\b)?/gm

    const urls = [...task.note.matchAll(regex)].map(match => match[0])

    if (urls.length === 1) URL.fromString(urls[0]).open()

    else if (urls.length > 1) {
      const form = new Form()
      form.addField(new Form.Field.MultipleOptions('urls', 'URLs', urls, urls, urls))
      await form.show('Select URLs to Open', 'Open')
      for (const url of form.values.urls) URL.fromString(url).open()
    }
  })

  action.validate = function (selection, sender) {
    return selection.tasks.length > 0
  }

  return action
})()
