const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }

    if (!email.endsWith('@stud.noroff.no')) {
        alert('Email must be a valid @stud.noroff.no address!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        alert('Registration complete!');
        window.location.href = 'login.html';
    } else {
        console.log(result.errors?.[0].message);
        alert(result.errors?.[0].message || 'Registration failed!');
    }
});
