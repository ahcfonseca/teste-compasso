var login = (function () {
  var init = function init() {
    $("#login-form").on("submit", function (e) {
      e.preventDefault();
      if (validateForm()) {
        handleSuccess();
      } else {
        handleError();
      }
    });

    function validateForm() {
      var nameIsValid = false;
      var passwordIsValid = false;
      var username = $("#username").val();
      var password = $("#password").val();

      if (username != "" && username === "admin") {
        nameIsValid = true;
      } else {
        nameIsValid = false;
      }

      if (password != "" && password === "123") {
        passwordIsValid = true;
      } else {
        passwordIsValid = false;
      }

      if (nameIsValid && passwordIsValid) {
        return true;
      } else {
        return false;
      }
    }

    function handleError() {
      $(".form-feedback").fadeIn();
      $(".field-wrapper").addClass("error");
      $(".form-wrapper").addClass("error");
    }

    function handleSuccess() {
      window.location.href = "home.html";
    }
  };

  return {
    init: init,
  };
})();
