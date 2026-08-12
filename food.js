<script>
     function showSignup()
     {
      document.getElementById("loginForm")
      .classList.add("hidden");
      document.getElementById("signupForm")
      .classList.remove("hidden");
      }
      function showLogin()
      {
      document.getElementById("signupForm")
      .classList.add("hidden");
      document.getElementById("loginForm")
      .classList.remove("hidden");
      }
      </script>