var home = (function () {
  var init = function init() {
    var delta = 500;
    animateItems();

    function animateItems() {
      $(".text-container > p").each(function (index) {
        setTimeout(function () {
          $(".text-container > p").eq(index).addClass("visible");
        }, delta);
        delta += 60;
      });
    }
  };

  return {
    init: init,
  };
})();
