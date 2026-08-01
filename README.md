# About

This is an OmniFocus plug-in that opens the URL(s) contained in the note of a task.

_Please note that all scripts on my GitHub account (or shared elsewhere) are works in progress. If you encounter any issues or have any suggestions please let me know--and do please make sure you backup your database before running scripts from the internet!)_

## Known issues 

Refer to ['issues'](https://github.com/ksalzke/open-url-from-note-omnifocus-plugin/issues) for known issues and planned changes/enhancements.

# Installation & Set-Up

## Prerequisites 

This plug-in requires [Synced Preferences for OmniFocus](https://github.com/ksalzke/synced-preferences-for-omnifocus). Install it separately before using this plug-in.

## Installation

[![Install in OmniFocus](https://img.shields.io/badge/OmniFocus-Install-5E5CE6?style=flat-square)](https://ksalzke.github.io/omnifocus-plugin-installer/?repo=open-url-from-note-omnifocus-plugin)

Select **Install** above, then follow the prompts.

## Setup

If desired, configure your preferences using the `Preferences` action.

# Actions

This plug-in contains the following actions:

## Open URL(s)

This action can be run when a single task is selected.

It looks for URLs in the note of the selected task.

If there are none found, an alert is shown. If one URL is found, it is opened. If more than one URL is found, a multi-select form is shown that allows the user to open one or more of the identified links.

Depending on the option chosen in preferences, OmniFocus links may be opened in (a) a new window (b) a new tab in the current window, or (c) the current tab in the current window.

## Preferences

This action allows the user to set the preferences for the plug-in. These sync between devices using the Synced Preferences plug-in linked above.

The following preference is available:

* **Open OmniFocus links in...'**. This preference specifies whether OmniFocus links should be opened in (a) a new window (b) a new tab in the current window, or (c) the current tab in the current window.

# Functions

This plug-in contains a number of functions within the `openURLlib` library.

## `loadSyncedPrefs () : SyncedPref`

Returns the [SyncedPref](https://github.com/ksalzke/synced-preferences-for-omnifocus) object for this plug-in.

If the user does not have the plug-in installed correctly, they are alerted.

## `getOmniFocusOpenPref () : string`

Returns the user's current preference for OmniFocus links - one of 'window', 'tab', or 'neither'.

If no preference has been set (or has been set to something other than one of these options), this defaults to 'neither'.

## `openURL (url: string)`

Opens the specified URL. If the URL starts with 'omnifocus://' then the `openOmniFocusURL` function is used.

## `openOmniFocusURL (url: string)`

Opens the specified OmniFocus URL, following the set preference for OmniFocus URLs (see above).

This function is asynchronous.
