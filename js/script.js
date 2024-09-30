'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);



//Login

// const form = document.getElementById('form');
// const username = document.getElementById('username');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const cpassword = document.getElementById('cpassword');
// const checkbox = document.getElementById('agree');

// form.addEventListener('submit', e => {
//     e.preventDefault(); // Prevent the default behaviour of event
//     checkInputs();
// });

// function checkInputs() {
//     const usernameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const passwordValue = password.value.trim();
//     const cpasswordValue = cpassword.value.trim();

//     validateUsername(usernameValue);
//     validateEmail(emailValue);
//     validatePassword(passwordValue);
//     validateConfirmPassword(cpasswordValue);
//     validateCheckbox();
// }

// function validateUsername(username) {
//     if (username === '') {
//         setErrorFor(username, 'Username cannot be blank');
//     } else if (username.length < 6) {
//         setErrorFor(username, 'Username is too short');
//     } else if (!isUsername(username)) {
//         setErrorFor(username, 'Username is not valid');
//     } else {
//         setSuccessFor(username);
//     }
// }

// function validateEmail(email) {
//     if (email === '') {
//         setErrorFor(email, 'Email cannot be blank');
//     } else if (!isEmail(email)) {
//         setErrorFor(email, 'Not a valid email');
//     } else {
//         setSuccessFor(email);
//     }
// }

// function validatePassword(password) {
//     if (password === '') {
//         setErrorFor(password, 'Password cannot be blank');
//     } else if (password.length < 8) {
//         setErrorFor(password, 'Password is too short');
//     } else {
//         setSuccessFor(password);
//     }
// }

// function validateConfirmPassword(cpassword) {
//     const passwordValue = password.value.trim();
//     if (cpassword === '') {
//         setErrorFor(cpassword, 'Confirm password cannot be blank');
//     } else if (passwordValue !== cpassword) {
//         setErrorFor(cpassword, 'Passwords do not match');
//     } else {
//         setSuccessFor(cpassword);
//     }
// }

// function validateCheckbox() {
//     if (checkbox.checked) {
//         setSuccessFor(checkbox);
//     } else {
//         setErrorFor(checkbox, 'Please agree to the terms and conditions.');
//     }
// }

// function setErrorFor(input, message) {
//     const formControl = input.parentElement;
//     const small = formControl.querySelector('small');
//     formControl.className = 'form-control error';
//     small.innerText = message;
// }

// function setSuccessFor(input) {
//     const formControl = input.parentElement;
//     formControl.className = 'form-control success';
// }

// // Regular expressions for email and username validation
// function isEmail(email) {
//     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
// }

// function isUsername(username) {
//     return /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username);
// }

function checkInputs(event) {
  event.preventDefault();
  
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const cpassword = document.getElementById('cpassword');
  const agree = document.getElementById('agree');

  // Check username
  if (username.value.trim() === '') {
      setError(username, 'Username cannot be blank');
  } else {
      setSuccess(username);
  }

  // Check email
  if (email.value.trim() === '') {
      setError(email, 'Email cannot be blank');
  } else if (!isValidEmail(email.value.trim())) {
      setError(email, 'Email is not valid');
  } else {
      setSuccess(email);
  }

  // Check password
  if (password.value.trim() === '') {
      setError(password, 'Password cannot be blank');
  } else {
      setSuccess(password);
  }

  // Check confirm password
  if (cpassword.value.trim() === '') {
      setError(cpassword, 'Confirm Password cannot be blank');
  } else if (password.value.trim() !== cpassword.value.trim()) {
      setError(cpassword, 'Passwords do not match');
  } else {
      setSuccess(cpassword);
  }

  // Check terms and conditions
  if (!agree.checked) {
      setError(agree, 'You must agree to the terms and conditions');
  } else {
      setSuccess(agree);
  }

  // Prevent form submission if there are errors
  const formControls = document.querySelectorAll('.form-control');
  for (let i = 0; i < formControls.length; i++) {
      if (formControls[i].classList.contains('error')) {
          return false;
      }
  }

  return true;
}

function setError(element, message) {
  const formControl = element.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccess(element) {
  const formControl = element.parentElement;
  formControl.className = 'form-control success';
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email);
}
