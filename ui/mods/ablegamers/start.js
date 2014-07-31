(function() {
  var paths = require.s.contexts._.config.paths
  paths.ablegamers = 'coui://ui/mods/ablegamers'
})()

require(['ablegamers/menu'], function(menu) {
  //var donations = "http://www.gofundme.com/mvc.php?route=donate/pagingdonationsb&url=planetaryablegamers&idx=0&type=recent"
  var donations = "coui://ui/mods/ablegamers/test.html"

  var menuMap = {}
  menu.forEach(function(item) {
    menuMap[item.code] = item
  })

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
})
