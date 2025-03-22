let diff = document.getElementById("diff");
let diffVal = diff.value;
diffSelect.addEventListener("change", function() {
    // Get the selected difficulty value
    diffVal = diff.value;
    console.log("changed diff");
});

function getDiff() {
    return diffVal;
}
console.log(getDiff());
