"use strick"

//unpack the search key
const urlParamas = new URLSearchParams(window.location.search);
var searchValue = urlParamas.get("key");

var pointCoX;
var pointCoY;

//display the key on screen for testing
// document.getElementById("statment").innerHTML = searchValue;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//access data from json file:
loadJSON(jSNpath, getData, 'jsonStatus');

//use <String>.includes() to evaluate if the rearch key was found
function getData(cases) {
    //for debug
    // console.log(cases.records);
    //initial road status
    let roadSatus = false;
    const maxlenth = cases.records.length;
    var status = "";

    document.getElementById("roadSta").src = "/images/good_to_go.jpg";

    for (let i = 0; i < maxlenth; i++) {
        let projectLocation = cases.records[i].fields.location;
        //incase for empty reading
        if (!projectLocation) {
            projectLocation = "Cannot match";
        }

        if (projectLocation.toString().includes(searchValue)) {

            //get case info
            let projectName = cases.records[i].fields.project;
            let projectDate = cases.records[i].fields.comp_date;

            //store the coodinate in local storage
            let coordinates = cases.records[i].fields.geom.coordinates;

            let colength = coordinates.length;
            roadSatus = true;
            for (let j = 0; j < colength; j++) {
                let x = coordinates[j][1];
                let y = coordinates[j][0];

                let temp = y[0];
                if (!(temp == null)) {
                    x = coordinates[j][0][1];
                    y = coordinates[j][0][0];
                }

                pointCoX = x;
                pointCoY = y;

                document.getElementById("roadSta").src = "/images/road_close.jpg";
                //create multi records for multi matches
                status = "<h3>Road is/will be closed.</h3><h5>Project Name:</h5>"
                    + projectName + "<h5>Project Date:</h5>" + projectDate;
                searchValue = projectLocation;
            }//end for loop
        }
        //setup for empty search matches
        if (!roadSatus) {
            status = "<h2>Have a good trip, the road is okay.</h2>"
            document.getElementById("point").style.display = "none";
        } else {
            document.getElementById("point").style.display = "inline";
        }
        //refresh the page, if refresh in the loop, only the final one will show on.
        document.getElementById("statment").innerHTML = status;
        // return ( x + "," + y);
    };
}
//loadback to index with pin (working on)
async function pointMap() {
    localStorage.setItem("X", pointCoX);
    localStorage.setItem("Y", pointCoY);
    window.open("/html/map.html?coodinator=" + "LS");
    window.close();
}

//SUBSCRIBE FEATURES FROM HERE
function subscribe() {
    let inputData = searchValue;
    console.log(inputData);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            // console.log(userID);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    let ifExist = false;
                    //check if the subscribe exist
                    db.collection("Subscribe")
                        .where("userID", "==", userID)
                        .get()
                        .then((querySnapshot) => {
                            // console.log(querySnapshot);
                            querySnapshot.forEach((doc) => {
                                // console.log(doc.data().sub);
                                if (doc.data().sub.valueOf() == inputData.valueOf()) {
                                    ifExist = true;
                                }
                            })
                            // console.log(ifExist);
                            //write info into the firestore DB
                            if (!ifExist) {
                                db.collection("Subscribe").add({
                                    userID: userID,
                                    sub: inputData,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                }).then(() => {
                                    window.alert("Subscribe successful!"); //new line added
                                })
                            }//end if
                            else {
                                window.alert("Subscribe already exist!");
                            }
                        });
                });
        } else {
            window.alert("Cannot find user!");
            console.log("lost connection with user data");
        }

    });
}