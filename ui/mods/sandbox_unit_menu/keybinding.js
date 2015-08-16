action_sets.hacks.paste_queue = function () {
  if (model.pasteShift) model.pasteShift()
}
api.settings.definitions.keyboard.settings.paste_queue = {
  title: 'paste queue',
  type: 'keybind',
  set: 'mods',
  display_group: 'mods',
  display_sub_group: 'sandbox unit menu',
  default: 'alt+v'
}
