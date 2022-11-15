//retrive the data from json file
const jSNpath = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=road-ahead-current-road-closures&q=&format=json";
//setup function to access json
function loadJSON(path, success, error) {
    let rawDataFile = new XMLHttpRequest();
    rawDataFile.open('GET', path, true);
    rawDataFile.onreadystatechange = function () {
        if (rawDataFile.readyState === 4) {
            if (rawDataFile.status === 200) {
                success(JSON.parse(rawDataFile.responseText));
            }
            else {
                error(rawDataFile.status);
            }
        }
    };
    rawDataFile.send();
}

function read_display_Subscribe() {
    var userID;
    //get user ID
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userID = user.uid;
            //for debug
            console.log(userID); 
        } else {
            window.alert("Cannot get user ID");
            console.log("disconnect with user ID");
        }
    });
    var strUID = String(userID);
    //================================================================
    // prebuilt.js:184 Uncaught FirebaseError: Function Query.where() called with invalid data. Unsupported field value: undefined
    // at new Br (prebuilt.js:184:9)
    // at Ty (prebuilt.js:16140:16)
    // at zp.Lc (prebuilt.js:15743:16)
    // at prebuilt.js:16057:17
    // at yy (prebuilt.js:16015:12)
    // at py (prebuilt.js:15942:12)
    // at prebuilt.js:16559:17
    // at rg._apply (prebuilt.js:16544:40)
    // at jy (prebuilt.js:16535:30)
    // at sm.where (prebuilt.js:17814:43)
    //================================================================
    let testUID = "lAkydfvxLrMyV2aJG1fJYHNOdlv2";
    //================================================================

    //get into the right collection
    var collectionSubscribe = db.collection("Subscribe");
    var cardStr = "";
    var query = collectionSubscribe.where("userID", "==", strUID)
    query.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().sub);
                var queryData = doc.data().sub;
                cardStr += queryData + "<br>";

                //access data from json file:
                loadJSON(jSNpath, getData, 'jsonStatus');

                //use <String>.includes() to evaluate if the rearch key was found
                function getData(cases) {
                    let roadSatus = false;
                    const maxlenth = cases.records.length;
                    var status = "";

                    // document.getElementById("roadSta").src = "./images/good_to_go.jpg";

                    for (let i = 0; i < maxlenth; i++) {
                        let projectLocation = cases.records[i].fields.location;
                        //incase for empty reading
                        if (!projectLocation) {
                            projectLocation = "Cannot match";
                        }

                        if (projectLocation.toString().includes(queryData)) {

                            //get case info
                            let projectName = cases.records[i].fields.project;
                            let projectDate = cases.records[i].fields.comp_date;
                            roadSatus = true;
                            status += "<h3>Road is/will be closed.</h3><h5>Project Name:</h5>"
                                + projectName + "<h5>Project Date:</h5>" + projectDate;
                        }
                        //setup for empty search matches
                        if (!roadSatus) {
                            status = "<h2>Have a good trip, the road is okay.</h2>"
                            // document.getElementById("point").style.display = "none";
                        } else {
                            // document.getElementById("point").style.display = "inline";
                        }
                        //refresh the page, if refresh in the loop, only the final one will show on.
                        document.getElementById("statment").innerHTML += status;
                        // return ( x + "," + y);
                    };
                }


            });
            document.getElementById("subscribe-go-here").innerHTML = cardStr;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}
read_display_Subscribe();



//Format example format #1  (arrow notation)
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
