$(function(){
  const hpApp = {}

  hpApp.init = () => { 
    $('a').smoothScroll();
    hpApp.events();

    if (localStorage.hpEmail && localStorage.hpKey){
      $('#signedOut').hide();
      $('#signedIn').show();
      $('#user-email').text(localStorage.hpEmail);
      $('#user-key').text(localStorage.hpKey);
    }
  }

  hpApp.baseUrl = `https://deathly-hallows.herokuapp.com/v1`;

  hpApp.events = () => {
    $('#loginForm').on('submit', function(e){
      e.preventDefault();
      const email = $('#signInEmail').val().trim();
      const password = $('#signInPassword').val();

      if (email !== '' && password !== '' ){
        const user = {
          email,
          password
        };
        hpApp.logInUser(user)
          .then((res) => {
            const { user } = res;
            localStorage.setItem('hpEmail', user.email)
            localStorage.setItem('hpKey', user.key);
            $('#user-email').text(localStorage.hpEmail);
            $('#user-key').text(localStorage.hpKey);
            $('#signedOut').hide();
            $('#signedIn').show();
  
          })
          .fail((err) => {
            $('#loginForm').append(`<div class="error"><p>${err.responseJSON.error}</p></div>`)
          });
      }

    });

    $('#signUpForm').on('submit', function(e){
      e.preventDefault();
      const email = $('#createEmail').val().trim();
      const password = $('#createPassword').val();
      const createCompare = $('#createCompare').val();

      if (password !== createCompare){
        $('#signUpForm').append(`<div class="error"><p>Passwords do not match.</p></div>`)
      }

      if (email !== '' && password !== '' && password === createCompare){
        const user = {
          email,
          password
        }
        hpApp.createUser(user)
          .then(res => {
            console.log(res.email)
            const { email, key } = res;
            localStorage.setItem('hpEmail', email)
            localStorage.setItem('hpKey', key);
            $('#user-email').text(localStorage.hpEmail);
            $('#user-key').text(localStorage.hpKey);
            $('#signedOut').hide();
            $('#signedIn').show();
          })
          .fail((err) => {
            $('#signUpForm').append(`<div class="error"><p>${err.responseJSON.error}</p></div>`)
          })
      }
    })

    $('#logout').on('click', function(e){
      e.preventDefault();
      localStorage.removeItem('hpEmail');
      localStorage.removeItem('hpKey');
      $('#signedIn').hide();
      $('#signedOut').show();
    });
  }

  hpApp.logInUser = (user) => {
    return $.ajax({
      url: `${hpApp.baseUrl}/users/login`,
      method: 'POST',
      data: user
    })  
  }

  hpApp.createUser = (newUser) => {
    return $.ajax({
      url: `${hpApp.baseUrl}/users`,
      method: 'POST',
      data: newUser
    })
  }

  hpApp.init();


})

