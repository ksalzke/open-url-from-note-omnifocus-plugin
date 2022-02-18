/* global PlugIn Form */
(() => {
  const action = new PlugIn.Action(async function (selection, sender) {
    // get current preferences or set defaults if they don't yet exist
    const omniFocusOpen = this.openURLlib.getOmniFocusOpenPref()

    // create and show form
    const form = new Form()
    form.addField(new Form.Field.Option('omniFocusOpen', 'Open OmniFocus links in...', ['window', 'tab', 'neither'], ['New window', 'New tab', 'Current window and tab'], omniFocusOpen))
    await form.show('Preferences: Open URL(s)', 'OK')

    // save preferences
    const syncedPrefs = this.openURLlib.loadSyncedPrefs()
    syncedPrefs.write('omniFocusOpen', form.values.omniFocusOpen)
  })

  action.validate = function (selection, sender) {
    return true
  }

  return action
})()
