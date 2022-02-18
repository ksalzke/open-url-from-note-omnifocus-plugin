/* global PlugIn Version Alert */
(() => {
  const openURLlib = new PlugIn.Library(new Version('1.0'))

  openURLlib.loadSyncedPrefs = () => {
    const syncedPrefsPlugin = PlugIn.find('com.KaitlinSalzke.SyncedPrefLibrary')

    if (syncedPrefsPlugin !== null) {
      const SyncedPref = syncedPrefsPlugin.library('syncedPrefLibrary').SyncedPref
      return new SyncedPref('com.KaitlinSalzke.OpenURL')
    } else {
      const alert = new Alert(
        'Synced Preferences Library Required',
        'For the \'Open URL(s)\' plug-in to work correctly, the \'Synced Preferences for OmniFocus\' plugin(https://github.com/ksalzke/synced-preferences-for-omnifocus) is also required and needs to be added to the plug-in folder separately. Either you do not currently have this plugin installed, or it is not installed correctly.'
      )
      alert.show()
    }
  }

  openURLlib.getOmniFocusOpenPref = () => {
    const syncedPrefs = openURLlib.loadSyncedPrefs()
    const pref = syncedPrefs.readString('omniFocusOpen')
    if (pref === null) return 'neither' // pref has not been set, return neither as default
    else if (['window', 'tab', 'neither'].includes(pref)) return pref // pref has been set
    else {
      // pref has somehow been set to something else, return default and set back to neither
      syncedPrefs.write('omniFocusOpen', 'neither')
      return 'neither'
    }
  }

  openURLlib.openURL = url => {
    if (url.toLowerCase().startsWith('omnifocus://')) openURLlib.openOmniFocusURL(url)
    else URL.fromString(url).open()
  }

  openURLlib.openOmniFocusURL = async url => {
    const pref = openURLlib.getOmniFocusOpenPref()
    if (pref === 'window') await document.newWindow()
    else if (pref === 'tab') await document.newTabOnWindow(document.windows[0])
    URL.fromString(url).open()
  }

  return openURLlib
})()
