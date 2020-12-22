$(document).ready(function(){
	var date = new Date();
	
	// Code for set name + date for day
	document.getElementById("nameday_date_and_name").innerHTML = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
	
	$.ajax({
		type:"GET",
     	url: "xml/name_days.xml",
     	dataType: "xml",
     	success: function(xml){
            // Filter day out of the zaznam
            var myXML = $(xml).find("zaznam").filter(function() {
                return $(this).find('den').text() == getCorrectDate(1);;
            });

            // Store a string with name info in the display variable
            var display = myXML.children().map(function() {
            	if(this.tagName == "SK")
                	return $(this).text(); //return this.tagName + '=' + $(this).text();
            }).get().join(' ');

            document.getElementById("nameday_date_and_name").innerHTML += " " + display;
        }
  	});
});

/*After input month, it change '.style.dispaly' to "none"/"block" for each div(need for max days).*/
function val_month(val){
	var date = new Date();
	switch(parseInt(val.value)){
		case 2:
			if(date.getFullYear() % 4 == 0){
				document.getElementById("div_28").style.display = "none";
				document.getElementById("div_29").style.display = "block";
				document.getElementById("div_30").style.display = "none";
				document.getElementById("div_31").style.display = "none";
				return 29;
			}
			else{
				document.getElementById("div_28").style.display = "block";
				document.getElementById("div_29").style.display = "none";
				document.getElementById("div_30").style.display = "none";
				document.getElementById("div_31").style.display = "none";
				return 28;
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			document.getElementById("div_28").style.display = "none";
			document.getElementById("div_29").style.display = "none";
			document.getElementById("div_30").style.display = "block";
			document.getElementById("div_31").style.display = "none";
			return 30;
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
			return 31;
			break;
	}
}

/*Find name by date*/
function find_by_date(){
	
	var option = val_month(document.getElementById("input_month"));
	var month_days; // Days in month

	if(option == 28){
		month_days = document.getElementById("input_day28").value;
	}
	else if(option == 29){
		month_days = document.getElementById("input_day29").value;
	}
	else if(option == 30){
		month_days = document.getElementById("input_day30").value;
	}
	else if(option == 31){
		month_days = document.getElementById("input_day31").value;
	}

	var month = document.getElementById("input_month").value;
	var tmp = ""; // Create string for next step - searching in xml
	if(month < 10){
		if(month_days < 10){
			tmp = "0" + month + "0" + month_days;
		}else{
			tmp = "0" + month + month_days;
		}
	}else{
		if(month_days < 10){
			tmp = month + "0" + month_days;
		}else{
			tmp = month + month_days;
		}
	}
	
	// Set div to name for finded name
	searchXMLname(tmp.toString());
}

/*Function for create date with correct format (ex. 0102, 0120, 1025)*/
function getCorrectDate(choice){
	var date;
	var month;
	var month_days;
	if(choice == 1){ // Set date by current day
		date = new Date();
		month = date.getMonth()+1;
		month_days = date.getDate();
	}
	else if(choice == 2){ // Set date by input
		var month = document.getElementById("input_month").value;
		var month_days = val_month(month);
	}
	var tmp = ""; // Create string for next step - searching in xml
	if(month < 10){
		if(month_days < 10){
			tmp = "0" + month + "0" + month_days;
		}else{
			tmp = "0" + month + ""+ month_days;
		}
	}else{
		if(month_days < 10){
			tmp = month + "0" + month_days;
		}else{
			tmp = month + "" + month_days;
		}
	}
	return tmp.toString();
}

/*Function for searching SK name by date*/
function searchXMLname(tmp){
	$.ajax({
		type:"GET",
     	url: "xml/name_days.xml",
     	dataType: "xml",
     	success: function(xml){
            // Filter day out of the zaznam
            var myXML = $(xml).find("zaznam").filter(function() {
                return $(this).find('den').text() == tmp;
            });

            // Store a string with name info in the display variable
            var display = myXML.children().map(function() {
            	if(this.tagName == "SK")
                	return $(this).text(); //return this.tagName + '=' + $(this).text();
            }).get().join(' ');

            if(display == "")
            	display = "-";
            document.getElementById("nameday_find").innerHTML = "Meno podľa dátumu:<br>" + display;
        }
  	});
}

function getCorrectDateFormatPrint(val, val2){
	if(val == ""){
		return ("-");
	}
	else{
		var storage = "";
		var tmp = val.split(" ");
		var tmp2 = val2.split("%");
		for(var i = 0; i < tmp.length; i++){
			storage += parseInt(tmp[i].toString().slice(0, 2)) + ".";
			storage += parseInt(tmp[i].toString().slice(2, 4)) + ".";
			storage += " " + tmp2[i] + "<br>";
		}
		return (storage);
	}
	
}

/*Find date by name*/
function find_by_name(){
	$.ajax({
		type:"GET",
     	url: "xml/name_days.xml",
     	dataType: "xml",
     	success: function(xml){
            // Filter day out of the zaznam
            var myXML = $(xml).find("zaznam").filter(function() {
                return $(this).find('SK').text().toString().toLowerCase().indexOf(document.getElementById("name_input").value.toLowerCase()) >= 0;
            });

            // Store a string with date and name info in the display variable
            var display = myXML.children().map(function() {
            	if(this.tagName == "den")
                	return $(this).text();
            }).get().join(' ');

            var display2 = myXML.children().map(function() {
            	if(this.tagName == "SK")
                	return $(this).text();
            }).get().join('%');

            document.getElementById("nameday_find").innerHTML = "Dátum podľa mena:<br>" + getCorrectDateFormatPrint(display, display2);
        }
  	});
}

/*Validation for input month*/
function validate_input_month(val){
	if(val.value < 1 || 12 < val.value){
		val.value = 1;
	}
}

/*Validation for each input day*/
function validate_input_day(val, max_day){
	if(val.value < 1 || max_day < val.value){
		val.value = 1;
	}
}


/*===Web component template===*/
/*
const template = document.createElement('template');
template.innerHTML = 
`

`;

class Nameday extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback(){
		this.shadowRoot.querySelector('#textinp').addEventListener('change', () => {
            
        });
	}
}

window.customElements.define('nameday', Nameday);
*/


/*
	===TODO===
	- Ak užívateľ zadá číslo s predponou 0 napr.
		05 03 etc... tak nevyhľadá nič
	- Vložiť do web-komponentov
*/