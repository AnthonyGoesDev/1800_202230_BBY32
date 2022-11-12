const cardStr = "";
document.getElementById("subscribe-go-here").innerHTML = cardStr;

const userID = "mPCvpx1UM0MLDb0Txk0fdy9zsrG3";

// function readSubscribe() {
//     db.collection("subscribe").doc("testUser")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
//         .onSnapshot(testUserdoc => {                                                               //arrow notation
//             console.log("current document data: " + testUserdoc.data());                          //.data() returns data object
//             document.getElementById("subscribe").innerHTML = testUserdoc.data().test;      //using javascript to display the data on the right place

//             //Here are other ways to access key:value data fields
//             //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
//             //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
//         })
// }
// readSubscribe();        //calling the function

// //Format example format #1  (arrow notation)
// db.collection("subscribe").doc("testUser")
//   .get()
//   .then(
//    snap => {                       //input arg "snap" is snapshot return from get()
//      console.log(snap.data());     //print key value pairs
//    });

//    function writeSubscribe() {
//     //define a variable for the collection you want to create in Firestore to populate data
//     var subscribeRef = db.collection("subscribe");

//     subscribeRef.add({
//                       code:"road_close",
//         name: "900 Gilford st, Vancouver",    //replace with your own city?
//         city: "Vancouver",
//         province: "BC",
//         details: "Date: 2022-11-11",
//         last_updated: firebase.firestore.FieldValue.serverTimestamp()  
//     });
//     subscribeRef.add({
//                       code:"road_close",
//         name: "E 1st Ave from Main St to Lorne St, Vancouver",    //replace with your own city?
//         city: "Vancouver",
//         province: "BC",
//         details: "Date: 2022-12-11",
//         last_updated: firebase.firestore.FieldValue.serverTimestamp()
//    });
//    subscribeRef.add({
//                       code:"road_close",
//         name: "400 block of Carrall st, Vancouver",    //replace with your own city?
//         city: "Vancouver",
//         province: "BC",
//         details: "Date: 2022-11-22",
//         last_updated: firebase.firestore.Timestamp.fromDate(new Date("November 10, 2022"))
//    });
// }

// function displayCards(collection) {
//     let cardTemplate = document.getElementById("subscribeTemplate");

//     db.collection(collection).get()
//         .then(snap => {
//             //var i = 1;  //if you want to use commented out section
//             snap.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().name;        // get value of the "name" key
//                 var details = doc.data().details;   // get value of the "details" key
// 								var subscribeID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
//                 let newcard = cardTemplate.content.cloneNode(true);

//                 //update title and text and image
//                 newcard.querySelector('.card-title').innerHTML = title;
//                 newcard.querySelector('.card-text').innerHTML = details;
//                 newcard.querySelector('.card-image').src = `./images/${subscribeID}.jpg`; //Example: NV01.jpg

//                 //give unique ids to all elements for future use
//                 // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                 // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                 // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//                 //attach to gallery
//                 document.getElementById(collection + "-go-here").appendChild(newcard);
//                 //i++;   //if you want to use commented out section
//             })
//         })
// }

// displayCards("subscribe");

function read_display_Quote(){
    //get into the right collection
    var db.collection("Subscribe").doc("tuesday")
    .onSnapshot(function(tuesdayDoc) {
        //console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
    })
}
read_display_Quote();
readSubscribe();        //calling the function

//Format example format #1  (arrow notation)
db.collection("subscribe").doc("testUser")
  .get()
  .then(
   snap => {                       //input arg "snap" is snapshot return from get()
     console.log(snap.data());     //print key value pairs
   });

   function writeSubscribe() {
    //define a variable for the collection you want to create in Firestore to populate data
    var subscribeRef = db.collection("subscribe");

    subscribeRef.add({
                      code:"road_close",
        name: "900 Gilford st, Vancouver",    //replace with your own city?
        city: "Vancouver",
        province: "BC",
        details: "Date: 2022-11-11",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    subscribeRef.add({
                      code:"road_close",
        name: "E 1st Ave from Main St to Lorne St, Vancouver",    //replace with your own city?
        city: "Vancouver",
        province: "BC",
        details: "Date: 2022-12-11",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
   });
   subscribeRef.add({
                      code:"road_close",
        name: "400 block of Carrall st, Vancouver",    //replace with your own city?
        city: "Vancouver",
        province: "BC",
        details: "Date: 2022-11-22",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("November 10, 2022"))
   });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("subscribeTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
								var subscribeID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${subscribeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("subscribe");
