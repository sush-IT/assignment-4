
const form = document.getElementById("employeeForm");
const formMessage = document.getElementById("formMessage");

const fields = {
    employeeName: document.getElementById("employeeName"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    phone: document.getElementById("phone"),
    department: document.getElementById("department")
};

const errors = {
    employeeName: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    password: document.getElementById("passwordError"),
    phone: document.getElementById("phoneError"),
    department: document.getElementById("departmentError")
};

// Display validation errors
function showError(field, text) {
    errors[field].textContent = text;
    fields[field].classList.toggle("invalid", Boolean(text));
    fields[field].setAttribute("aria-invalid", text ? "true" : "false");
}

// Validate employee name
function validateName() {
    const name = fields.employeeName.value.trim();

    if (name.length < 2) {
        showError("employeeName", "Name must contain at least 2 characters.");
        return false;
    }

    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(name)) {
        showError("employeeName", "Enter a valid name.");
        return false;
    }

    showError("employeeName", "");
    return true;
}

// Validate email
function validateEmail() {
    const email = fields.email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
        showError("email", "Enter a valid email address.");
        return false;
    }

    showError("email", "");
    return true;
}

// Validate password
function validatePassword() {
    const password = fields.password.value;

    if (password.length < 8) {
        showError("password", "Password must contain at least 8 characters.");
        return false;
    }

    if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        showError(
            "password",
            "Include uppercase, lowercase, and a number."
        );
        return false;
    }

    showError("password", "");
    return true;
}

// Validate phone number (Indian 10-digit mobile)
function validatePhone() {
    const phone = fields.phone.value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
        showError(
            "phone",
            "Enter a valid 10-digit mobile number starting with 6-9."
        );
        return false;
    }

    showError("phone", "");
    return true;
}

// Validate department
function validateDepartment() {
    if (!fields.department.value) {
        showError("department", "Please select a department.");
        return false;
    }

    showError("department", "");
    return true;
}

// Connect validation functions to fields
const validators = {
    employeeName: validateName,
    email: validateEmail,
    password: validatePassword,
    phone: validatePhone,
    department: validateDepartment
};

Object.keys(fields).forEach(function (field) {
    fields[field].addEventListener("blur", validators[field]);

    fields[field].addEventListener("input", function () {
        if (errors[field].textContent) {
            validators[field]();
        }
    });

    fields[field].addEventListener("change", function () {
        if (errors[field].textContent) {
            validators[field]();
        }
    });
});

// Submit registration form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = Object.values(validators)
        .map(validate => validate())
        .every(result => result);

    if (!isValid) {
        formMessage.textContent = "Please correct the errors above.";
        formMessage.className = "failure";
        return;
    }

    // Demo: do not include the password in the displayed or logged data.
    const employee = {
        name: fields.employeeName.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        department: fields.department.value
    };

    console.log("Registered employee:", employee);

    formMessage.textContent =
        "Employee registration submitted successfully!";
    formMessage.className = "success";

    form.reset();

    Object.keys(fields).forEach(field => showError(field, ""));
});

// Reset messages when Reset is clicked
form.addEventListener("reset", function () {
    Object.keys(fields).forEach(field => showError(field, ""));
    formMessage.textContent = "";
    formMessage.className = "";
});
