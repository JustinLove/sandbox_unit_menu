(function() {
  var paths = require.s.contexts._.config.paths
  paths.ablegamers = 'coui://ui/mods/ablegamers'
  paths.text = paths.text || 'coui://ui/mods/ablegamers/text'

  model.menu_items = ko.observable([])
  model.sandbox_unit_queue = ko.observable([])
  model.sandbox_copy_menu = function(item) {
    engine.call('unit.debug.setSpecId', item.build[0][1])
    model.sandbox_unit_queue(item.build)
    api.Panel.message(api.Panel.parentId, 'sandboxMenuItem', item)
  }

  model.sandbox_unit_queue_item = function(item) {
    return item.join(' : ')
  }
})()

require([
  'ablegamers/menu',
  'text!ablegamers/sandbox_menu.html',
  'text!ablegamers/sandbox_queue.html'
], function(menu, menuHtml, queueHtml) {
  model.menu_items(menu)

  var $menu = $(menuHtml)
  ko.applyBindings(model, $menu[0])
  $('.div_sandbox_dock:first').append($menu)

  var $queue = $(queueHtml)
  ko.applyBindings(model, $queue[0])
  $('.div_sandbox_bottom_spacer').append($queue)
})
