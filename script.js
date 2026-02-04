const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    clearErrors();

    const name = nameInput();
    const email = emailInput();
    const password = passwordInput();
    const confirmPassword = confirmPasswordInput();
    const phone = phoneInput();
    const gender = document.querySelector('input[name="gender"]:checked');
    const terms = document.getElementById("terms");

    if (!name) valid = false;
    if (!email) valid = false;
    if (!password) valid = false;
    if (!confirmPassword) valid = false;
    if (!phone) valid = false;

    if (!gender) {
        showError("Gender is required", document.querySelectorAll(".error")[5]);
        valid = false;
    }

    if (!terms.checked) {
        showError("Accept terms & conditions", document.querySelectorAll(".error")[6]);
        valid = false;
    }

    if (valid) {
        alert("🎉 Registration Successful!");
        form.reset();
        document.getElementById("strengthBar").style.width = "0%";
    }
});


document.getElementById("password").addEventListener("input", function () {
    const bar = document.getElementById("strengthBar");
    const val = this.value;

    if (val.length < 6) {
        bar.style.width = "25%";
        bar.className = "progress-bar bg-danger";
    } else if (val.match(/[0-9]/) && val.match(/[!@#$%^&*]/)) {
        bar.style.width = "100%";
        bar.className = "progress-bar bg-success";
    } else {
        bar.style.width = "60%";
        bar.className = "progress-bar bg-warning";
    }
});


function showError(message, element) {
    element.innerText = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
    document.querySelectorAll("input").forEach(i => i.classList.remove("is-invalid"));
}


function nameInput() {
    const el = document.getElementById("name");
    if (el.value.trim() === "") {
        el.classList.add("is-invalid");
        showError("Name required", el.nextElementSibling);
        return false;
    }
    return true;
}

function emailInput() {
    const el = document.getElementById("email");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(el.value)) {
        el.classList.add("is-invalid");
        showError("Invalid email", el.nextElementSibling);
        return false;
    }
    return true;
}

function passwordInput() {
    const el = document.getElementById("password");
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!regex.test(el.value)) {
        el.classList.add("is-invalid");
        showError("8 chars, number & special char", el.parentElement.querySelector(".error"));
        return false;
    }
    return true;
}

function confirmPasswordInput() {
    const el = document.getElementById("confirmPassword");
    if (el.value !== document.getElementById("password").value) {
        el.classList.add("is-invalid");
        showError("Passwords not matching", el.nextElementSibling);
        return false;
    }
    return true;
}

function phoneInput() {
    const el = document.getElementById("phone");
    if (!/^\d{10}$/.test(el.value)) {
        el.classList.add("is-invalid");
        showError("10 digit phone number", el.nextElementSibling);
        return false;
    }
    return true;
}

