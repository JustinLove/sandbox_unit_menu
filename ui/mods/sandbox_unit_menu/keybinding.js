action_sets.hacks['paste queue'] = function () {
  console.log(model)
  if (model.pasteShift) model.pasteShift()
}
default_keybinds.hacks['paste queue'] = 'alt+v'
