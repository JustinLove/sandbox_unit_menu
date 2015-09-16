(function() {
  model.pasteUnits = model.pasteUnits || function(n) {
    if (!model.cheatAllowCreateUnit()) return
    if (n < 1) return

    for (var i = 0;i < n;i++) {
      engine.call("unit.debug.paste")
    }
  }

  var pasteQueue = []
  var pasteBurst = 0

  var loadAction = function() {
    var item = pasteQueue[0]
    if (item) {
      engine.call('unit.debug.setSpecId', item[1])
      pasteBurst = item[0]
    } else {
      pasteBurst = 0
    }
  }

  var shiftQueue = function() {
    loadAction()
    pasteQueue.shift()
    api.panels.sandbox && api.panels.sandbox.message('sandbox_unit_queue', pasteQueue)
  }

  model.pasteShift = function() {
    if (model.playerControlFlags().indexOf(true) == -1) return

    shiftQueue()
    model.pasteUnits(pasteBurst)
    loadAction()
  }

  handlers.sandbox_menu_item = function(item) {
    if (item) {
      pasteQueue = item.build.concat()
      loadAction()
      api.panels.sandbox && api.panels.sandbox.message('sandbox_unit_queue', pasteQueue)
    }
  }
})()
