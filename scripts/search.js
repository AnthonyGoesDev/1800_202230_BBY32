"use strick"

//unpack the search key
const urlParamas = new URLSearchParams(window.location.search);
const searchValue = urlParamas.get("key");

//display the key on screen for testing
document.getElementById("statment").innerHTML = searchValue;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//retrive the data from json file
const LocalJson = "./Data/road-ahead-current-road-closures.json";
//setup function to access json
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
} //end the function
//initial road status
let roadSatus = "";
//access data from json file:
readTextFile(LocalJson, function(text){
    const cases = JSON.parse(text);

    const maxlenth = cases.length;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//use <String>.includes() to evaluate if the rearch key was found
    let status = "";
    document.getElementById("roadSta").src = "./images/good_to_go.jpg";   

    for(let i=0; i<maxlenth; i++){
        let projectLocation = cases[i].fields.location;
        //incase for empty reading
        if (!projectLocation){
            projectLocation = "Cannot match";
        }

        //console.log(projectLocation); //for test usage

        if(projectLocation.toString().includes(searchValue)){
            //get case info
            let projectName = cases[i].fields.project;
            let projectDate = cases[i].fields.comp_date;            
            document.getElementById("roadSta").src = "./images/road_close.jpg";
            //create multi records for multi matches
            status += "<h2>Road is//will be closed.</h2><h3>Project Name:</h3>" 
                + projectName + "<h3>Project Date:</h3>" + projectDate;    
        }
    }//end for loop
    //setup for empty search matches
    if (!status){ 
        status = "<h2>Have a good trip, the road is okay.</h2>"
    }
    //refresh the page, if refresh in the loop, only the final one will show on.
    document.getElementById("statment").innerHTML = status;

});


//display the result