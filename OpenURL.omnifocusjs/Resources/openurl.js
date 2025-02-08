/* global PlugIn Form */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    const lib = this.openURLlib
    const task = selection.tasks[0] || selection.projects[0].task

    const regex = /\b[a-zA-Z][a-zA-Z0-9+\-.]*:[^ \t\n\r:][a-zA-Z0-9.@\/?_=\-\&%~#\[\]!\$'\(\)\*\+]*(\b)?/gm // eslint-disable-line

    // Match all URLs in the task note
    const urls = [...task.note.matchAll(regex)].map(match => {
      try {
        return decodeURIComponent(match[0]) // Decode the URL
      } catch (error) {
        console.error(`Failed to decode URL: ${match[0]}`, error)
        return match[0] // Use the original if decoding fails
      }
    })

    if (urls.length === 0) {
      new Alert('No URLs found', 'There were no URLs found in the note of the selected task.').show()
    } else if (urls.length === 1) {
      lib.openURL(urls[0])
    } else if (urls.length > 1) {
      const form = new Form()
      form.addField(new Form.Field.MultipleOptions('urls', 'URLs', urls, urls, urls))
      await form.show('Select URLs to Open', 'Open')
      for (const url of form.values.urls) {
        lib.openURL(url)
      }
    }
  })

  action.validate = function (selection, sender) {
    return selection.tasks.length === 1 || selection.projects.length === 1
  }

  return action
})()
