const registerForm = document.getElementById('register-form');

// Register form submission handler
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields!', 'error');
        return;
    }

    if (password.length < 8) {
        showToast('Password must be at least 8 characters long!', 'error');
        return;
    }

    if (!email.endsWith('@stud.noroff.no')) {
        showToast('Email must be a valid @stud.noroff.no address!', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
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

    if (response.ok) {
        showToast('Registration complete!', 'success', 'Go to Login', 'login.html');
    } else {
        showToast(result.errors?.[0].message || 'Registration failed!', 'error');
    }
});
