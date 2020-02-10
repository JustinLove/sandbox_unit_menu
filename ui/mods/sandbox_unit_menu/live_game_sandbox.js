(function() {
  var paths = require.s.contexts._.config.paths
  paths.sandbox_unit_menu = 'coui://ui/mods/sandbox_unit_menu'
  paths.text = paths.text || 'coui://ui/mods/sandbox_unit_menu/text'

  if (!model.sandboxWidth) {
    model.sandboxWidth = ko.observable(373)
  }

  model.menu_items = ko.observable([])
  model.sandbox_unit_queue = ko.observable([])
  model.sandbox_unit_queue.subscribe(function(queue) {
    if (queue[0] && model.bulkPasteCount) {
      model.bulkPasteCount(queue[0][0])
    }
  })
  model.sandbox_copy_menu = function(item) {
    engine.call('unit.debug.setSpecId', item.build[0][1])
    model.sandbox_unit_queue(item.build)
    api.Panel.message(api.Panel.parentId, 'sandbox_menu_item', item)
  }
  model.discount_level = ko.observable(0)
  model.discount_level.subscribe(function(level) {
    api.Panel.message('', 'sandbox_unit_menu.discount_level', level)
  })
  model.change_discount_level = function(delta) {
    model.discount_level(Math.max(0, model.discount_level() + delta))
  }

  model.sandbox_menu_hover = function(item) {
    model.sandbox_unit_hover('$ ' + item.donation + ' - ' + item.build[0].join('x '))
  }

  model.sandbox_unit_queue_item = function(item) {
    return item.join('x ')
  }

  handlers.sandbox_unit_queue = model.sandbox_unit_queue

  api.Panel.message('', 'inputmap.reload');
})()

require([
  'sandbox_unit_menu/menu',
  'sandbox_unit_menu/discounts',
  'text!sandbox_unit_menu/sandbox_menu.html',
  'text!sandbox_unit_menu/sandbox_queue.html'
], function(menu, discounts, menuHtml, queueHtml) {
  model.menu_items(menu)

  model.discount_level.subscribe(function(level) {
    model.menu_items(discounts.discounts(model.menu_items(), model.discount_level()))
  })

  var $queue = $(queueHtml)
  ko.applyBindings(model, $queue[0])
  $('.div_sandbox_dock:first').after($queue)

  var $menu = $(menuHtml)
  ko.applyBindings(model, $menu[0])
  $('.div_sandbox_dock:first').append($menu)
})
