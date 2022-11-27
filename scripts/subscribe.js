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
    //get user ID
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const userID = user.uid;
        } else {
            window.alert("Cannot get user ID");
            console.log("disconnect with user ID");
        }
        //get into the right collection
        var cardStr = "";
        db.collection("Subscribe")
            .where("userID", "==", user.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data().sub);
                    var queryData = doc.data().sub;
                    cardStr += queryData + "<br>";

                    //access data from json file:
                    loadJSON(jSNpath, getData, 'jsonStatus');
                    var status;
                    //use <String>.includes() to evaluate if the rearch key was found
                    function getData(cases) {
                        let roadSatus = false;
                        const maxlenth = cases.records.length;
                        let roadTemplete = document.getElementById("CardTemplate");
                        let roadCardGroup =document.getElementById("CardGroup");
                        let projectName;
                        let projectDate;
                        

                        for (let i = 0; i < maxlenth; i++) {
                            let projectLocation = cases.records[i].fields.location;
                            //incase for empty reading
                            if (!projectLocation) {
                                projectLocation = "Cannot match";
                            }

                            if (projectLocation.toString().includes(queryData)) {

                                //get case info
                                projectName = cases.records[i].fields.project;
                                projectDate = cases.records[i].fields.comp_date;
                                roadSatus = true;
                                status = "Road is/will be closed";
                            }
                        }// end inner for loop
                        //setup for empty search matches
                        if (!roadSatus) {
                            status = "Have a good trip, the road is okay."
                            projectName = queryData;
                            let today = new Date().toLocaleDateString();
                            projectDate = today;
                        }
                        
                        //display a result
                        let resultCard = roadTemplete.content.cloneNode(true);
                        resultCard.querySelector('.title').innerHTML = status;
                        resultCard.querySelector('.name').innerHTML = "Project Name: " + projectName;
                        resultCard.querySelector('.Date').innerHTML = "Project Date: " + projectDate;
                        roadCardGroup.appendChild(resultCard);
                        
                    }//end function


                 } //end the outter for loop
                );

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    });
}
read_display_Subscribe();

function Delete() {
    //get user ID
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const userID = user.uid;
        } else {
            window.alert("Cannot get user ID");
            console.log("disconnect with user ID");
        }
    //     //get into the right collection
    //     var cardStr = "";
        db.collection("Subscribe")
            .where("userID", "==", user.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(() => {
                        console.log("Document successfully deleted!");
                        window.alert("Deleted successful!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
         });
     }
    // Delete();
    
    //  window.alert("Notification has been send!");
