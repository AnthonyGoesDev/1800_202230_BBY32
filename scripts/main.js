"use strick";

//set up the map
var map = L.map('map').setView([49.26145007393785, -123.07753628444047], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.bcit.ca"><img src="/images/bcit_logo.jpg"></a>'
}).addTo(map);

const jSNpath = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=road-ahead-current-road-closures&q=&format=json";

// loadJSON method to open the JSON file.
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
//get json data from jSNpath
loadJSON(jSNpath, getData, 'jsonStatus');

function getData(cases) {
    
    const maxlenth = cases.records.length;
    //define new icon on map
    var blockIcon = L.icon({
        iconUrl: '/images/block.png',
        iconSize: [32, 45],
        popupAnchor: [-3, -36],
    });

    //displayLog.innerHTML = " ";
    for (let i = 0; i < maxlenth; i++) {
        let projectName = cases.records[i].fields.project;
        let projectDate = cases.records[i].fields.comp_date;
        //get coordinates
        let coordinates = cases.records[i].fields.geom.coordinates;

        let colength = coordinates.length;

        for (let j = 0; j < colength; j++) {
            let x = coordinates[j][1];
            let y = coordinates[j][0];

            let temp = y[0];
            if (!(temp == null)) {
                x = coordinates[j][0][1];
                y = coordinates[j][0][0];
            }
            // console.log(x);            
            //point markers on map
            var marker = L.marker([x, y], { icon: blockIcon }).addTo(map);

            //add notes on marks
            if (!projectName) {
                projectName = "Not get information."
            }
            marker.bindPopup("<b>Project Name:</b></br>" + projectName + "</br><b>Date: </b>" + projectDate);
        }//end inner for loop    
    }//end outter for loop 
}

//under working the pin on map
const urlParamas = new URLSearchParams(window.location.search);
const strSearchKey = urlParamas.get("coodinator");
var myIcon = L.icon({
    iconUrl: '/images/the_cone.png',
    iconAnchor: [5, 5],
    iconSize: [38, 45],
    popupAnchor: [-3, -76],
});

if (strSearchKey) {
    console.log(strSearchKey);
    let X = localStorage.getItem("X");
    let Y = localStorage.getItem("Y");
    if (X) {
        var point = L.marker([parseFloat(X), parseFloat(Y)], { icon: myIcon }).addTo(map);
        localStorage.clear();
        // L.setView([parseFloat(X),parseFloat(Y)], 17);
        // console.log("already point out");
    }
}
// document.getElementById("btnSubmit").addEventListener("click", searchFunction());
//       function searchFunction() {
//         let strSearchKey = document.getElementById("inputStr").value;

//         window.location.href="./searchResult.html";

//         document.getElementById("statement").innerHTML(strSearchKey);

//     }

//pakage the search key; async is important 
async function search() {
    let inputBox = document.getElementById("inputStr");
    let strSearchKey = inputBox.value;
    //validation input
    let str = strSearchKey.trim();
    let str2 = str.replace(/[^a-zA-Z0-9 ]/g, '')

    if (str == "") {
        console.log("get empty input");
    } else {
        window.open("/html/searchResult.html?key=" + str2);  //open a new page content the search result
        window.close(); //close the current page
    }
}

// async function searchFunction() {}

//
