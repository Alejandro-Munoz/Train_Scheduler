$(document).ready(function(){
	var config = {
		apiKey: "AIzaSyC3TN5-qKFaRIAZSdDh7_j6QY6PjuXKZso",
		authDomain: "demo1-c065e.firebaseapp.com",
		databaseURL: "https://demo1-c065e.firebaseio.com",
		projectId: "demo1-c065e",
		storageBucket: "demo1-c065e.appspot.com",
		messagingSenderId: "612915972947"
	};
		  
	firebase.initializeApp(config);

	var database = firebase.database();

	$(document).on("click","#submit",function(e){
		// console.log("entra");
		e.preventDefault();
		
		//get values from fields
		var trainName = $("#name").val();
		var trainDestination = $("#destination").val();
		var trainTime = $("#time").val().trim();
		var trainFrecuency = $("#frecuency").val();


		console.log(trainName);
		console.log(trainDestination);
		console.log(trainTime);
		console.log(trainFrecuency);

		// Create local object for hold data
		var newTrain = {
			name:trainName,
			destination:trainDestination,
			time:trainTime,
			frecuency:trainFrecuency			
		}


		database.ref().push(newTrain);

			  // Alert
		alert("Train successfully added");

		// Clears all of the text-boxes
		$("#name").val("");
		$("#destination").val("");
		$("#time").val("");
		$("#frecuency").val("");
	});

	database.ref().on("child_added",function(childSnapshot){
		  	
		var namechild = childSnapshot.val();

		var trainName = childSnapshot.val().name;
	  var trainDestination = childSnapshot.val().destination;
		var trainTime = childSnapshot.val().time;
		var trainFrecuency = childSnapshot.val().frecuency;

	  // Employee Info
	  console.log(trainName);
	  console.log(trainDestination);
	  console.log(trainTime);
	  console.log(trainFrecuency);

	   // Assumptions
    var tFrequency = trainFrecuency;

    // Time is 3:30 AM
    var firstTime = trainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextArrivalTime = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextArrivalTime);

	  
		//update UI
		var row = $("<tr />");
		var nameCol = $("<td />").text(trainName);
		var destinationCol = $("<td />").text(trainDestination);
		var frecuencyCol = $("<td />").text(trainFrecuency);
		var nextArrivalCol = $("<td>").text(nextArrivalTime);
		var minsAwayCol = $("<td>").text(tMinutesTillTrain);
		//append cols to row
		row.append(nameCol,destinationCol,frecuencyCol,nextArrivalCol,minsAwayCol);
		//append row to table
		$("#table").append(row);
	});

});



