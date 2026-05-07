const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }

    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        localStorage.setItem('token', result.data.accessToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert(result.errors?.[0].message || 'Login failed!');
    }
});