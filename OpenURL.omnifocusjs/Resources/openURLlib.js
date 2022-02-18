/* global PlugIn Version */
(() => {
  const openURLlib = new PlugIn.Library(new Version('1.0'))

  openURLlib.openURL = url => {
    if (url.toLowerCase().startsWith('omnifocus://')) openURLlib.openOmniFocusURL(url)
    else URL.fromString(url).open()
  }

  openURLlib.openOmniFocusURL = async url => {
    await document.newWindow()
    URL.fromString(url).open()
  }

  return openURLlib
})()
