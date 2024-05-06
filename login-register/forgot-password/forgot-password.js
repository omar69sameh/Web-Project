const emailInput = document.querySelector(".emailInput");
const submitButton = document.querySelector(".Register-button");
const errorText = document.getElementById('errorText');

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        errorText.textContent = "Please enter your email.";
        errorText.classList.remove('hidden');
    } else {
        errorText.classList.add('hidden');
        fetch('./forgot-password.php', {
            method: 'POST',
            body: new URLSearchParams({ email: emailValue }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(Response);
            if (result.message === "Email is not valid.") {
                errorText.textContent = "Email is not valid.";
                errorText.classList.remove('hidden');
            } else {
                errorText.classList.add('hidden');
                window.location.href = './reset-password/reset-password.html';
            }
        });
    }
});
