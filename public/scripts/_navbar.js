$(() => {

    function validateEmail (email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    $('#logout').click(function(e){
      e.preventDefault()
      $.ajax({
        type: "POST",
        url: "/users/logout",
        success: function (result) {
            location.href="/";
        }
      })
    });

    $('#register-submit').click(function(e){
        e.preventDefault()
        const username = $('#register-username').val();
        const password = $('#password1').val();
        const passwordConfirm = $('#password2').val();
  
        //Checking if the passwords match
        if (!validateEmail(username)) {
            $('.register-alert').append(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Email incorrectly formatted
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `)
            $(".alert").delay(3000).fadeOut("slow");
            return;
        }

        //Checking if the passwords match
        if (password !== passwordConfirm) {
          $('.register-alert').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Your passwords don't match, please try again.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          `)
          $(".alert").delay(3000).fadeOut("slow");
          return;
        }

        //CHecking for min password length
        if (password.length <= 4 ) {
          $('.register-alert').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Your password must have at least 4 characters!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          `)
          $(".alert").delay(3000).fadeOut("slow");
          return;
        }
    
        $.ajax({
          url: '/users/new',
          data: {username: username.toLowerCase(), password: password},
          method: 'POST'
        }).done((data) => {
          window.location.replace(`/`);
        }).catch((err) => {
          $('.register-alert').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Error!</strong> ${err.responseText}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          `)
        });
      });
});
  