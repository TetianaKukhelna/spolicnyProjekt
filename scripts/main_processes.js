$(document).ready(function(){
	var date = new Date();
	var dayOfYear = daysInYear(date);

	var xhttp  = new XMLHttpRequest();
	xhttp.open('GET', 'xml/name_days.xml');
	xhttp.onreadystatechange = function() {
	   	var response = xhttp.responseText,
	       	parser = new DOMParser(),
	       	xmlDoc = parser.parseFromString(response,"text/xml");

	       	//here is my code
	       	document.getElementById("nameday_date").innerHTML = date.getDate() + ". " + (date.getMonth()+1) + ". " + date.getFullYear();
	       	document.getElementById("nameday_name").innerHTML = xmlDoc.getElementsByTagName("SK")[parseInt(dayOfYear)].childNodes[0].nodeValue;
	}
	xhttp.send();
});

/*Count days in year*/
function daysInYear(date) {
	var days = 0;
	var ary_months = [
        31, //jan
        28, //feb(non leap)
        31, //march
        30, //april
        31, //may
        30, //june
        31, //july
        31, //aug
        30, //sep
        31, //oct
        30, //nov   
        31  //dec   
    ];

    if(date.getMonth()+1 > 1 && date.getFullYear() % 4 == 0) 
		days += 1;

	for(var i = 0; i < date.getMonth(); i++){
		days += ary_months[i];
	}

	days += date.getDate();

	return days;
};

/*After input month, it change '.style.dispaly' to "none"/"block" for each div(need for max days).*/
function val_month(val){
	var date = new Date();
	switch(parseInt(val.value)){
		case 2:
			if(date.getFullYear() % 4 == 0){
				document.getElementById("div_28").style.display = "none";
				document.getElementById("div_29").style.display = "block";
			}
			else{
				document.getElementById("div_28").style.display = "block";
				document.getElementById("div_29").style.display = "none";
			}
			document.getElementById("div_30").style.display = "none";
			document.getElementById("div_31").style.display = "none";
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			document.getElementById("div_28").style.display = "none";
			document.getElementById("div_29").style.display = "none";
			document.getElementById("div_30").style.display = "block";
			document.getElementById("div_31").style.display = "none";
			break;
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			document.getElementById("div_28").style.display = "none";
			document.getElementById("div_29").style.display = "none";
			document.getElementById("div_30").style.display = "none";
			document.getElementById("div_31").style.display = "block";
			break;
	}
}

/*Find name by date*/
function find_by_date(){
	var a = document.getElementById("input_month");
	var b = document.getElementById("div_29");
	var c = document.getElementById("div_30");
	var d = document.getElementById("div_31");
	var xhttp  = new XMLHttpRequest();
	xhttp.open('GET', 'xml/name_days.xml');
	xhttp.onreadystatechange = function() {
	   var response = xhttp.responseText,
	       parser = new DOMParser(),
	       xmlDoc = parser.parseFromString(response,"text/xml");

	       //here is my code
	       
	}
	xhttp.send();
}

/*
	===TODO===
	- Skúsiť zvoliť inú metodiku hľadania menín, tým pádom
		upraviť funkciu "find_by_date()" a miesta, kde sa
		využívala funkcia pre XMLHttpRequest().
	- Validovať vstupy pre mesiace a dni, aby užívateľ
		neprekročil cez limit 1 - 12 a 1 - 28/29/30/31
*/