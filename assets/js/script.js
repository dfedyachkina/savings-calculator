// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", function(event) {
        event.preventDefault();
        checkData();
    });
});

const resultText = document.getElementById("result");


/**
 * Calculate all entered data
 * Display the result to the user
 */ 

function letsCalculate(desiredSavings, salary, rentMortgage, bills, food, otherExpenses) {
    let typeOfSalary = findCheckedRadioButton();
    if (typeOfSalary === "hourly") {
        resultText.innerText = `Your hourly salary ${salary} euro has been converted to yearly salary.`
        salary = hourlySalary(salary);
    } else if (typeOfSalary === "monthly") {
        salary = monthlySalary(salary);
    } else if (typeOfSalary === null) {
        alert(`You haven't clicked on the radio button! Please choose your type of salary`);
        throw `Radio button hasn't been clicked`;
    }
    document.getElementById("yearly-salary").innerText = `Your yearly salary: ${salary}`;

}


