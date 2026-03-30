//Recipe popup modal section

//sets up the button to open recipe modal
var btns = document.querySelectorAll("input.modal-button");

//defines all modals for each recipe
var modals = document.querySelectorAll(".recipe-modal");

//get the span element that closes the modal

var closeBtn = document.getElementsByClassName("close-btn");

//when the user clicks the button, open the modal
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function (event) {
        modal = document.querySelector(event.target.getAttribute("href"));
        modal.style.display = "block";
    }
}

//When the user clicks on <span> (x), close the modal
for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function () {
        for (var index in modals) {
            if (modals[index].style) {
                modals[index].style.display = "none";
            }
        }
    }
}

//Email form validation section

document.getElementById('contactForm').addEventListener('submit', function (event) {

    //Overrides default browser refresh when submit button is pressed.
    event.preventDefault();

    //variables to validate that each field is filled out
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    //Email pattern checks for all symbols that would be needed
    //for an email address such as the @ and . and the text that
    //would be needed before and after those symbols
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //Use this variable to display messages if fields are filled out or thank you message
    const valMsg = document.getElementById('validateMsg');

    if (!firstName || !lastName || !email || !phone || !message) {
        //Checks if fields have been filled out
        valMsg.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
    } else if (!emailPattern.test(email)) {
        //Checks if email is in correct format
        valMsg.innerHTML = '<p style="color: red;">Please enter a valid email address.</p>';
    }
    else {
        //If all fields are filled out and email is valid, display thank you message
        valMsg.innerHTML = '<p style="color: green;">Thank you for submitting, ' + firstName + '!</p>';
    }

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        subscription: document.getElementById('subscription').checked
    };

    //Displays what the user wrote in the console
    console.log(JSON.stringify(formData));
})


//This function auto-closes every recipe modal 10 seconds after it is opened.
function enableModalAutoClose() {
    var modalTimers = new Map();
    var modalButtons = document.querySelectorAll("input.modal-button");

    for (var i = 0; i < modalButtons.length; i++) {
        modalButtons[i].addEventListener("click", function (event) {
            var selectedModal = document.querySelector(event.target.getAttribute("href"));

            if (!selectedModal) {
                return;
            }

            if (modalTimers.has(selectedModal)) {
                clearTimeout(modalTimers.get(selectedModal));
            }

            var timerId = setTimeout(function () {
                selectedModal.style.display = "none";
                modalTimers.delete(selectedModal);
            }, 10000);

            modalTimers.set(selectedModal, timerId);
        });
    }

    var closeButtons = document.getElementsByClassName("close-btn");
    for (var j = 0; j < closeButtons.length; j++) {
        closeButtons[j].addEventListener("click", function () {
            for (var index in modals) {
                if (modals[index] && modals[index].style && modalTimers.has(modals[index])) {
                    clearTimeout(modalTimers.get(modals[index]));
                    modalTimers.delete(modals[index]);
                }
            }
        });
    }
}

enableModalAutoClose();

