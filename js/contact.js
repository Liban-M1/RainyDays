// Contact.html Form Validation 

const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const address = document.querySelector("#address");

const nameError = document.querySelector("#nameError");
const subjectError = document.querySelector("#subjectError");
const emailError = document.querySelector("#emailError");
const addressError = document.querySelector("#addressError");

const sendButton = document.querySelector("button[type='submit']");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // First-Name
    if (firstName.value.trim() === "") {
        nameError.style.display = "block";
    } else {
        nameError.style.display = "none";
    }

    // Subject
    if (subject.value.trim().length < 10) {
        subjectError.style.display = "block";
    } else {
        subjectError.style.display = "none";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "" || !emailRegex.test(email.value.trim())) {
        emailError.style.display = "block"; 
    } else {
        emailError.style.display = "none";
    }

    // Address
    if (address.value.trim().length < 25) {
        addressError.style.display = "block";
    } else {
        addressError.style.display = "none";
    }

    // submit if no errors
    if (nameError.style.display === "none" && subjectError.style.display === "none" && emailError.style.display === "none" && addressError.style.display === "none") {
        alert("Message Successfully Sent!");
        form.reset();
    }
});

form.addEventListener("input", function() {
    sendButton.disabled = !form.checkValidity();
});