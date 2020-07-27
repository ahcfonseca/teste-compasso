if (!console) console = { log: function () {} };
var debug = true;

/* if (window.location.hostname != "localhost") {
  debug = false;
} */

var cl = function cl(msg) {
  if (debug) {
    console.log(msg);
  }
};

if (!debug) {
  console = { log: function () {} };
}

var app = (function ($) {
  var init = function init($) {
    cl("Application initializing...");
    var errors = 0;

    $(".component").each(function () {
      var componentName = $(this).attr("data-cp-name");
      var check = typeof window[componentName];
      if (check != "undefined" && window[componentName].init) {
        window[componentName].init();
      } else {
        if (typeof componentName != "undefined") {
          cl(
            "+++[ERROR]+++ Unable to load component [" +
              componentName +
              "], function was not found or missing init()."
          );
        } else {
          cl('+++[ERROR]+++ Component missing "data-cp-name" parameter.');
          console.log($(this));
        }
        errors++;
      }
    });

    if (errors > 0) {
      cl(
        "Application was initiaded but " +
          errors +
          " component(s) did not load."
      );
    } else {
      cl("All application components initiated.");
    }
  };

  return {
    init: init,
  };
})();

jQuery(document).ready(function ($) {
  app.init($);
});
