<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
</head>
<body>
    <div>
        <h2>Happening now</h2>
        <h3>Join today.</h3>
        <button id="googleSignIn">Sign up with Google</button>
        <p>or</p>
        <form id="emailSignIn">
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Create account</button>
        </form>
        <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
        <p>Already have an account? <a href="#">Sign in</a></p>
    </div>

    <!-- JavaScript Libraries -->
    <script src="https://apis.google.com/js/platform.js" async defer></script>
</body>
</html>



<script>
document.getElementById("googleSignIn").addEventListener("click", function() {
    // Use Google's OAuth2.0 authentication here.
});

document.getElementById("appleSignIn").addEventListener("click", function() {
    // Implement Apple's sign in method here.
});

document.getElementById("emailSignIn").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;
    // Use these details to authenticate with your backend server.
});
</script>