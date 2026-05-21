function showToast(
    message,
    type = 'success',
    buttonText = "",
    buttonLink = ""
) {
    const toastContainer = document.getElementById('toast-container');

    const toast = document.createElement('div');

    toast.classList.add('toast', type);

    toast.innerHTML = `
        <div class="toast-content">
            <p>${message}</p>
            ${buttonText ? `<a href="${buttonLink}" class="toast-button">${buttonText}</a>` : ''}
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

