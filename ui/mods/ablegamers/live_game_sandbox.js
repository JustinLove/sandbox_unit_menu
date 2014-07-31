(function() {
  var paths = require.s.contexts._.config.paths
  paths.ablegamers = 'coui://ui/mods/ablegamers'
  paths.text = paths.text || 'coui://ui/mods/ablegamers/text'

  model.menu_items = ko.observable([])
  model.sandbox_copy_menu = function(item) {
    engine.call('unit.debug.setSpecId', item.build[0][1])
    api.Panel.message(api.Panel.parentId, 'sandboxMenuItem', item)
  }
})()

require(['ablegamers/menu', 'text!ablegamers/sandbox_menu.html'], function(menu, html) {
  model.menu_items(menu)

  var $html = $(html)

  ko.applyBindings(model, $html[0])

  $('.div_sandbox_dock:first').append($html)
})
