(function() {
  //var donations = "http://www.gofundme.com/mvc.php?route=donate/pagingdonationsb&url=planetaryablegamers&idx=0&type=recent"
  var donations = "coui://ui/mods/ablegamers/test.html"

  var menu = [
    { donation: 1, code: 'A1', build: [
      [20, "/pa/units/land/bot_bomb/bot_bomb.json"],
    ]},
    { donation: 1, code: 'A2', build: [
      [10, "/pa/units/air/transport/transport.json"],
    ]},
    { donation: 1, code: 'A3', build: [
      [1, "/pa/units/land/vehicle_factory/vehicle_factory.json"],
    ]},
    { donation: 3, code: 'B1', build: [
      [1, "/pa/units/land/artillery_short/artillery_short.json"],
      [1, "/pa/units/land/artillery_short/artillery_short.json"],
    ]},
    { donation: 3, code: 'B2', build: [
      [1, "/pa/units/orbital/ion_defense/ion_defense.json"],
    ]},
    { donation: 3, code: 'B3', build: [
      [1, "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json"],
      [1, "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json"],
    ]},
    { donation: 3, code: 'B4', build: [
      [1, "/pa/units/land/energy_plant_adv/energy_plant_adv.json"],
      [1, "/pa/units/land/energy_plant_adv/energy_plant_adv.json"],
    ]},
    { donation: 3, code: 'B5', build: [
      [1, "/pa/units/land/tank_heavy_armor/tank_heavy_armor.json"],
    ]},
    { donation: 5, code: 'C1', build: [
      [1, "/pa/units/land/artillery_long/artillery_long.json"],
    ]},
    { donation: 5, code: 'C2', build: [
      [1, "/pa/units/land/radar_adv/radar_adv.json"],
      [1, "/pa/units/land/energy_plant_adv/energy_plant_adv.json"],
    ]},
    { donation: 5, code: 'C3', build: [
      [1, "/pa/units/land/teleporter/teleporter.json"],
      [1, "/pa/units/land/teleporter/teleporter.json"],
    ]},
    { donation: 5, code: 'C4', build: [
      [1, "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json"],
    ]},
    { donation: 10, code: 'D1', build: [
      [1, "/pa/units/orbital/orbital_laser/orbital_laser.json"],
    ]},
    { donation: 10, code: 'D2', build: [
      [1, "/pa/units/commanders/quad_osiris/quad_osiris.json"],
    ]},
    { donation: 10, code: 'D3', build: [
      [1, "/pa/units/orbital/delta_v_engine/delta_v_engine.json"],
    ]},
    { donation: 10, code: 'D4', build: [
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
      [1, "/pa/units/land/laser_defense_adv/laser_defense_adv.json"],
    ]},
    { donation: 10, code: 'D5', build: [
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
      [1, "/pa/units/land/air_defense_adv/air_defense_adv.json"],
    ]},
    { donation: 10, code: 'D6', build: [
      [1, "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json"],
      [1, "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json"],
      [1, "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json"],
    ]},
    { donation: 20, code: 'E1', build: [
      [1, "/pa/units/land/nuke_launcher/nuke_launcher.json"],
    ]},
    { donation: 100, code: 'F1', build: [
      [1, "/pa/units/land/avatar_factory/avatar_factory.json"],
    ]},
  ]

  var menuMap = {}
  menu.forEach(function(item) {
    menuMap[item.code] = item
  })

  //load html dynamically
  loadTemplate = function (element, url, model) {
    element.load(url, function () {
      console.log("Loading html " + url, arguments);
      ko.applyBindings(model, element.get(0));
    });
  };

  //var container = $('<div id="insertion_point"></div>')
  //container.appendTo('body')
  //loadTemplate(container, donations, model);

  $.get(donations, function(html, status) {
    if (status == "success") {
      var $doners = $(html).find(".doner")
      console.log([html, $doners])
      $doners.each(function(i, doner) {
        var amount = $(doner).find('.damt').text().match(/\d+(\.\d+)?/)[0]
        var comment = $(doner).find('.dcom').text().trim()
        var codes = comment.match(/[abcdefABCDEF][123456]/g) || []
        codes = codes.map(function(s) {return s.toUpperCase()})
        var orders = codes.map(function(c) {return menuMap[c]})

        console.log(amount, comment, codes, orders)
      })
    }
  })
})()
