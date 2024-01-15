const firebaseConfig = {
    apiKey: "AIzaSyDKxht0ArhG3Rb-kpY4zifnH_nKux1-4QU",
    authDomain: "slmta-application-8920c.firebaseapp.com",
    databaseURL: "https://slmta-application-8920c-default-rtdb.firebaseio.com",
    projectId: "slmta-application-8920c",
    storageBucket: "slmta-application-8920c.appspot.com",
    messagingSenderId: "583899301788",
    appId: "1:583899301788:web:fe65c132cb16b6e365aa59"
};

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
var applicantsDB = firebaseApp.database().ref("Applicants");

// Reference your database
var applicantsDB = firebase.database().ref("Applicants");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var firstName = getElementVal("firstname");
    var lastName = getElementVal("lastname");
    var email = getElementVal("email");
    var phone = getElementVal("phone");
    var whatsapp = getElementVal("whatsapp");
    var schoolOrCampus = getElementVal("schoolORcampus");
    var district = getElementVal("district");
    var division = getElementVal("division");
    var specials = getElementVal("specials");

    var key = firstName + lastName; // Creating a key using firstName and lastName

    saveMessages(key, firstName, lastName, email, phone, whatsapp, schoolOrCampus, district, division, specials);

    // Enable and show alert
    var alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';

    // Reset the form
    document.getElementById("contactForm").reset();
}

const saveMessages = (key, firstName, lastName, email, phone, whatsapp, schoolOrCampus, district, division, specials) => {
    var newApplicant = applicantsDB.child(key);

    newApplicant.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        whatsapp: whatsapp,
        schoolOrCampus: schoolOrCampus,
        district: district,
        division: division,
        specials: specials,
        // Add more fields as needed
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

function joinWhatsAppGroup() {
    // Update this link with your actual WhatsApp group invite link
    var whatsappGroupLink = "https://chat.whatsapp.com/GwEQz13nn4V0GBVpssTStA";

    // Open the WhatsApp group invite link in a new tab
    window.open(whatsappGroupLink, '_blank');

    // Enable and show alert
    var alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';

    // Reset the form (optional)
    document.getElementById("contactForm").reset();

    // Prevent the form from submitting (optional)
    return false;
}

function closeAlert() {
    var alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'none';
}

// JavaScript to handle modal display
document.addEventListener('DOMContentLoaded', function () {
    // Get the modal
    var modal = document.getElementById('privacy-policy-modal');

    // Get the link that opens the modal
    var privacyPolicyLink = document.getElementById('privacy-policy-link');

    // Get the <span> element that closes the modal
    var closeBtn = document.getElementsByClassName('close')[0];

    // When the user clicks on the link, open the modal
    privacyPolicyLink.onclick = function () {
        modal.style.display = 'block';
    }

    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
