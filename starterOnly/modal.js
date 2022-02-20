function editNav() {
  const x = document.getElementById("myTopnav");
  const hamburgerMenu = document.querySelector('.icon')

  if (x.className === "topnav") {
    x.className += " responsive";
    //Switch the hamburger menu to (X)
    hamburgerMenu.innerHTML = "<span class='close'></span>"
  } else {
    //Switch the (X) to hamburger menu
    hamburgerMenu.innerHTML = "<i class='fa fa-bars'></i>"
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector('.form-modal-close')
const form = document.getElementById('form')
const inputs = document.querySelectorAll('input:not([type="submit"], [id="checkbox2"])')
const locationErrMessage = document.getElementById('location-error-message')
const radioCheckboxes = document.querySelectorAll('.checkbox-label .checkbox-icon')
const allErrorMessage = Array.from(document.querySelectorAll('.error-message'))
const confirmationModal = document.querySelector('.submit-confirmation-container')
const closeConfirmationModal = document.querySelector('.submit-confirmation__btn')
const closeBtnPostSubmit = document.querySelector('.submit-confirmation-close')
const locationArr = []


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// Close modal

const closeModal = event => {
  //Close the form
  modalbg.style.display = "none"
  //Reset the form
  confirmationModal.style.display = "none"
  for (let data of formData) {
    data.classList.remove('success')
  }
  form.reset()
}

closeBtn.addEventListener('click', closeModal)
closeBtnPostSubmit.addEventListener('click', closeModal)
closeConfirmationModal.addEventListener('click', closeModal)



// Check inputs validity

//Display the error message + Red border on non valid inputs
const setErrorStyle = input => {
  input.closest('.formData').classList.remove('success')
  input.closest('.formData').classList.add('error')
}

//Remove the error message + Add green border on valid inputs
const setSuccessStyle = input => {
  input.closest('.formData').classList.remove('error')
  input.closest('.formData').classList.add('success')
}


const checkInputs = () => {
  
  for(let input of inputs){
  
    // Check the validity of location input (part 1)
    if(input.type === 'radio'){
      locationArr.push(input.checked)
    }

    //Check the validity of all the other inputs
    if(!input.checkValidity()){
      setErrorStyle(input)
    } else {
      setSuccessStyle(input)
    }
  }

  // Check the validity of location input (part 2)
  if(!locationArr.some(item => item === true)){
    locationErrMessage.style.display = 'block'
    for(let radioCheckbox of radioCheckboxes){
      radioCheckbox.style.border = "2px solid red"
    }
  } else {
    locationErrMessage.style.display = 'none'
    for(let radioCheckbox of radioCheckboxes){
      radioCheckbox.style.border = "2px solid #279e7a"
    }
  }
}



// Manage form submission

const formSubmit = e => {
  //Prevent the page to reload
  e.preventDefault()
  
  //Check the validity of all the inputs
  checkInputs()

  // Confirmation modal display
  if (form.checkValidity()) {
    confirmationModal.style.display = "block"
  }
}

form.addEventListener('submit', formSubmit)
