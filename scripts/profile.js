var currentUser          //global variable points to who is logged in

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userCountry = userDoc.data().country;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo() {

console.log("Inside save user info");
userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
userEmail = document.getElementById('emailInput').value;     //get the value of the field with id="emailInput"
userCountry = document.getElementById('countryInput').value;       //get the value of the field with id="countryInput"

currentUser.update({
    name: userName,
    email: userEmail,
    country: userCountry
})
.then(() => {
    console.log("Document successfully updated!");
})
document.getElementById('personalInfoFields').disabled = true;
}