let color = "#00246B";
let circleData = [];

function isIntersecting(div1, div2){

    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    // Calculate the radius of the circles, considering the border (3px on both sides)
    const radius1 = (rect1.width) / 2; // Total width including the border
    const radius2 = (rect2.width) / 2;

    // Calculate the centers of the circles (account for position of the circle within the div)
    const centerX1 = rect1.left + radius1;
    const centerY1 = rect1.top + radius1;
    const centerX2 = rect2.left + radius2;
    const centerY2 = rect2.top + radius2;

    // Calculate the distance between the centers of the two circles
    const distance = Math.sqrt(Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2));

    // Check if the distance between the circles' centers is less than the sum of their radii (including the border)
    return distance < (radius1 + radius2); // Checks if the circles' edges are overlapping

}

function checkOverflow(circle){

    const parent = document.querySelector(".big-box").getBoundingClientRect();
    const child = circle.getBoundingClientRect();

    const isOverflowing = (
      child.left < parent.left || 
      child.right > parent.right || 
      child.top < parent.top || 
      child.bottom > parent.bottom
    );


    if (isOverflowing) {
        $('#myModal3').modal({
            backdrop: 'static', // Prevent dismissal by clicking outside
            // keyboard: false // Prevent dismissal by pressing the Esc key
        }).modal('show'); // Show the modal when the page loads
    }

}

function createCircle(evt,minSize,maxSize){

    let test = true;

    const randomNumber = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

    let x = evt.clientX-10;
    let y = evt.clientY-10;

    let div = document.createElement("div");
    div.style.width = randomNumber + "px";
    div.style.height = randomNumber + "px";
    div.style.borderColor = color;
    div.style.marginLeft = x - Math.floor(randomNumber/2) + "px";
    div.style.marginTop = y - Math.floor(randomNumber/2) + "px";
    div.classList.add("circle");
    document.querySelector(".big-box").appendChild(div);

    for(let i=0; i<circleData.length; i++){
        if(isIntersecting(div,circleData[i])){
            $('#myModal3').modal({
                backdrop: 'static', // Prevent dismissal by clicking outside
                keyboard: false // Prevent dismissal by pressing the Esc key
            }).modal('show'); // Show the modal when the page loads
            test = false;
            break;
        }
    }
    
    

    if(test){
        checkOverflow(div);
        circleData.push(div);
    }
    

    if(color == "#00246B"){
        color = "#990011";
    }else{
        color = "#00246B";
    }

}

$(document).ready(function(){

    $('#myModal').modal({
        backdrop: 'static', // Prevent dismissal by clicking outside
        keyboard: false // Prevent dismissal by pressing the Esc key
    }).modal('show'); // Show the modal when the page loads

});

function Validation(ele,size){

    if(!/^(2[0-9]|[3-9][0-9]|1[0-9]{2}|200)$/.test(size)){
        ele.style.display = "block";
        return false;
    }else{
        ele.style.display = "none";
        return true;
    }
    
}

function gameRules(minSize,maxSize){

    let li = document.createElement("li");
    li.innerText = `Your circle size must be between ${minSize} to ${maxSize}.`;
    document.querySelector("ul").appendChild(li);

    $('#myModal2').modal({
        backdrop: 'static', // Prevent dismissal by clicking outside
        keyboard: false // Prevent dismissal by pressing the Esc key
    }).modal('show'); // Show the modal when the page loads

}


document.getElementById("myForm2").addEventListener("submit",(event) => {
    event.preventDefault(); // Prevent form from submitting normally
    $('#myModal2').modal('hide'); // Hide the modal
})


document.getElementById("myForm").addEventListener("submit", (event) => {

    event.preventDefault(); // Prevent form from submitting normally

    // Create FormData object from the form
    var formData = new FormData(event.target);
    // console.log([...formData.entries()]); // Logs all form data as key-value pairs
    
    // Access the form data
    let minSize = parseInt(formData.get("min"));
    let maxSize = parseInt(formData.get("max"));

    let minErr = document.getElementById("minErr");
    let maxErr = document.getElementById("maxErr");

    let minCheck = Validation(minErr,minSize);
    let maxCheck = Validation(maxErr,maxSize);

    if(maxSize < minSize){
        [minSize,maxSize] = [maxSize,minSize];
    }

    if(minCheck && maxCheck){
        
        document.querySelector(".big-box").addEventListener("click",(evt) => {
            createCircle(evt,minSize,maxSize);
        })

        $('#myModal').modal('hide'); // Hide the modal
        gameRules(minSize,maxSize);
    }
    
})
