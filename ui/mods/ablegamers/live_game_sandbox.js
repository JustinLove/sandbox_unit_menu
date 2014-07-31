(function() {
  var paths = require.s.contexts._.config.paths
  paths.ablegamers = 'coui://ui/mods/ablegamers'
  paths.text = paths.text || 'coui://ui/mods/ablegamers/text'

  model.menu_items = ko.observable([])
  model.sandbox_copy_menu = function(item) {
    console.log(item)
  }
})()

require(['ablegamers/menu', 'text!ablegamers/sandbox_menu.html'], function(menu, html) {
  console.log(menu, html)

  model.menu_items(menu)

  var $html = $(html)

  ko.applyBindings(model, $html[0])

  $('.div_sandbox_dock:first').append($html)
})
