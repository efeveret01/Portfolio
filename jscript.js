//DATA
// Main model data
var xmlDoc = 0;
var xhttp = new XMLHttpRequest();
var modal = document.getElementById("myModal");
var email_btn = document.getElementById("email-link"); 
var span
let modelsContents

// Add on-click action to the relevant elements to make email-model appear
email_btn.onclick = function() {
    modal.style.display = "block";
    selectModel(0)
};

// Add all on-click actions to relevant elements to close the model
function setClosingActions() {
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";}
    }
}


// Fundtion to fill out the mode that has been clicked
function pullModel(the_id) {
    var x = new Number(the_id.slice(5,))
    document.getElementById("modelTitle").innerHTML = xmlDoc.getElementsByTagName("title")[x].childNodes[0].nodeValue;
    document.getElementById("codesAndTech").innerHTML = xmlDoc.getElementsByTagName("techniques")[x].childNodes[0].nodeValue;
    document.getElementById("modelMainContent").innerHTML = xmlDoc.getElementsByTagName("about")[x].childNodes[0].nodeValue;
    document.getElementById("ModalImmgfromat").src= xmlDoc.getElementsByTagName("pro_images")[x].childNodes[0].nodeValue;
    document.getElementById("buttonresume_vid_or_demo").href= xmlDoc.getElementsByTagName("link_one")[x].childNodes[0].nodeValue;
}

//Destory innerHTML of a model
function destoyInnerHTML() {
    document.getElementById('myModal').innerHTML = null;
}

//Call the models from the html file
function fetchModelTemplate() {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "backendXML/modelTemplates.html");
        xhttp.responseType = "document";
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.response);
            } else if (this.readyState == 4) {
                reject("it has failed");
            }
        };
        xhttp.send();
    });
}

// Extract the promise variable and store it in the  modelsContents variable
async function fetchData() {
    await fetchModelTemplate().then(value => {
            modelsContents = value
        }).catch(error => {
            console.log(error);
        });
}

function selectModel(selected_option) {
    if (selected_option == 1) {
        var modelNode1 = modelsContents.getElementById('pjtModel');
        var clonedNode1 = modelNode1.cloneNode(true);
        destoyInnerHTML()
        document.getElementById('myModal').appendChild(clonedNode1);
        setClosingActions()

    } else {
        var modelNode2 = modelsContents.getElementById('emailModel');
        var clonedNode2 = modelNode2.cloneNode(true);
        destoyInnerHTML()
        document.getElementById('myModal').appendChild(clonedNode2);
        setClosingActions()
    }
}

// Auto activated fundtion to get the project data from the xml and thne create and populate in elements
function createProjectGalaryAndModel() {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Pull data from the Bankend xml file
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(this.responseText,"text/xml");
            var titlesList = xmlDoc.getElementsByTagName("title");
            
            //Place data into appropriate div that are created
            for (i = 0; i< titlesList.length; i++) {
                
                //Div and elements ids and classes
                var nameing = "myBtn";
                var cnameing = "img";
                var xnaming = "pClass_";
                var named = nameing + String(i);
                var cnamed = cnameing + String(i);
                var xnamed = xnaming + String(i);
    
                //Create elements and add the relavant data from the xml fie
                var newDiv = document.createElement("div");
                newDiv.id = named; 
                newDiv.onclick = async function () {
                    modal.style.display = "block";
                    await selectModel(1)
                    pullModel(this.id)
                };
                document.getElementById("projectholder").appendChild(newDiv); 
    
                //Create elements with id and class
                var newDiv = document.createElement("div");
                newDiv.id = xnamed;
                newDiv.className = "projetsCell";
                document.getElementById(named).appendChild(newDiv);
    
                //Create elements with id and class
                var newDiv = document.createElement("p");
                newDiv.id = "titlecenter";
                //Append the data into the element
                newDiv.innerHTML = xmlDoc.getElementsByTagName("mini_title")[i].childNodes[0].nodeValue;
                document.getElementById(xnamed).appendChild(newDiv);
    
                //Create elements with id and class
                var newDiv = document.createElement("img");
                newDiv.id = "Immgfromat" ;
                newDiv.className = cnamed;
                //Append the data into the element
                newDiv.src =  xmlDoc.getElementsByTagName("pro_images")[i].childNodes[0].nodeValue;
                document.getElementById(xnamed).appendChild(newDiv);
                
            }
        }
        
    };
    xhttp.open("GET", "backendXML/project_content.txt", true);
    xhttp.send();
}


// Run start-up functions
async function runFunctions() {
    try {
        await fetchData();
        await selectModel(1);
        await createProjectGalaryAndModel();
    } catch(error) {
        console.error(error);
    }
}
runFunctions();










