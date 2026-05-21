const loginForm = document.getElementById('login-form');
// Login form submission handler
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showToast('Please enter both email and password.', 'error');
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

    if (response.ok) {
        localStorage.setItem('token', result.data.accessToken);
        localStorage.setItem('user', JSON.stringify(result.data));

        showToast('Login successful!', 'success', 'Continue Shopping', 'index.html');
        
    } else {
        showToast(result.errors?.[0].message || 'Login failed!', 'error');
    }
});

const storedUser = localStorage.getItem('user');
let user = null;
if (storedUser && storedUser !== 'undefined') {
    user = JSON.parse(storedUser);
}

const loginSection = document.getElementById('login-section');

// If user is logged in, show welcome message and logout button
if (user && loginSection) {

    loginSection.innerHTML = `
        <h2>Welcome, ${user.name}!</h2>
        <button id="logout-button" class="CTA">Logout</button>
    `;

    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cartItems');

        window.location.reload();
    });
}
