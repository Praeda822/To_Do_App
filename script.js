"use strict";

//Create 3 const variables to store the selectors for the eleemnts I want to play with
const taskInput = document.getElementById("input-text");
const taskBtn = document.getElementById("task-submit");
const taskList = document.getElementById("task-list");

//Load tasks from localstorage or from the localstorage array (populated with the tasks provided it exists)
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Render tasks from my localstorage
tasks.forEach(function (taskText) {
	const taskItem = document.createElement("li");
	//It was rendering empty boxes on reload because I didn't add the textContent, that is equal to the taskText, to my taskItem
	taskItem.textContent = taskText;
	taskList.prepend(taskItem);
	taskItem.addEventListener("click", function () {
		taskItem.style.backgroundColor = "#29bf12";
	});
});

taskBtn.addEventListener("click", function () {
	//Variable to hold the value of the text inside the input field
	//.trim method to ensure trailing whitespace doesn't get included in the submission
	const taskText = taskInput.value.trim();

	//Logic to check if an existing task is present and alert the user to enter a unique one instead
	if (tasks.includes(taskText)) {
		alert("This task already exists, please enter a unique task!");
	}
	//So only execute the below logic if the condition is met
	//That condition being whether taskText, or text inside the input field, is present
	else if (taskText) {
		//Create my new li task element
		const taskItem = document.createElement("li");

		//Test to see if I can declare the text content of the newly created taskItem to be equal to the taskText, which is the variable holding the value of the text present within the input field
		taskItem.textContent = taskText;

		//Add it to the DOM
		taskList.prepend(taskItem);

		//Empty the input field
		taskInput.value = "";

		//Logic to change the background color to green (complete) when a taskitem is clicked
		taskItem.addEventListener("click", function () {
			taskItem.style.backgroundColor = "#29bf12";
		});
		tasks.push(taskText);
		localStorage.setItem("tasks", JSON.stringify(tasks));
		//IT FUCKING WORKS!!!!!!!!!!!
	} else if (taskInput.value.length == 0) {
		alert(
			"Please fill out the input field before trying to submit a new item!"
		);
	}
});

//LOGIC FOR THE CLEAR TASKS BUTTON
const clearBtn = document.getElementById("task-clear");
//Added an event listener for the Clear Tasks button
//localstorage.removeItem method and pass "tasks" as an argument to it so it knows what to remove when the button is clicked
//confirmed  data being stored in localstorage, but then I use location.reload to reload the page with an empty localstorage
clearBtn.addEventListener("click", function () {
	localStorage.removeItem("tasks");
	location.reload();
});

//Logic for the submit button to listen for the enter key when pressed (down)

taskInput.addEventListener("keydown", function (e) {
	if (e.key == "Enter") {
		taskBtn.click();
	}
	console.log(e);
});

//https://blog.logrocket.com/localstorage-javascript-complete-guide/
//FRIDAY
//FIGURE OUT HOW TO SAVE TO LOCALSTORAGE
//READ THIS SHIT

//REFACTOR YOUR CLICK FUNCTIONS SO THEY CAN GO ON YOUR HTML
