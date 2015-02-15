var $blocks = $('[data-block]');

$blocks.each(function(i, el) {
  var BlockClass = require($(el).data('block'));
  new BlockClass();
});
