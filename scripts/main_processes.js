/*Web component*/

const template = document.createElement('template');
template.innerHTML = 
`
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="css/site.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	<style>
	@media print
		{
			
			.input-num-nameday, .input-txt-nameday{
				border: 1px solid black;
			}

			#font-style{
				text-decoration: underline;
			}
		    .test{
				width: fit-content;
				paddinng-left: 20mm;
				display: inline-grid;
			}
	}

	</style>
	<div class="test">
		<div class="row" id="row">
			<div class="cen-div">
				<label id="font-style">Deň</label><br>
				<input type="number" id="input_day" class="input-num-nameday" placeholder="1" min="1" max="31" value="1" required>
			</div>
			<div class="cen-div">
				<label id="font-style">Mesiac</label><br>
				<input type="number" id="input_month" class="input-num-nameday" placeholder="1" min="1" max="12" value="1" required>
			</div>
		</div>

		<button id="find_by_date">Hľadať</button>
		<br>
		<br>
		<strong>alebo</strong>
		<div class="row">
			<div class="cen-div">
				<label id="font-style">Meno</label><br>
				<input type="text" id="name_input" class="input-txt-nameday" placeholder="Max 15 písmen" minlength="1" maxlength="15">
			</div>
		</div>
	<button id="find_by_name">Hľadať</button>
	</div>
	<br>

		
`;

class Namesday extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback(){
		$.ajax({
			type:"GET",
	     	url: "xml/name_days.xml",
	     	dataType: "xml",
	     	success: function(xml){
	     		var date = new Date();

	     		if(document.getElementById("nameday_date_and_name")){
	     			// Code for set name + date for day
					document.getElementById("nameday_date_and_name").innerHTML = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
	     		
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
	        }
	  	});

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
				var month = this.shadowRoot.querySelector("#input_month").value;
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

		this.shadowRoot.querySelector('#input_month').addEventListener('change', () => {
			var days = this.shadowRoot.querySelector("#input_day");
			var month = this.shadowRoot.querySelector("#input_month");
			validate_input_month();
			function validate_input_month(){
				if(month.value < 1 || 12 < month.value){
					month.value = 1;
				}
				
				if(days.value > val_month(month)){
					days.value = val_month(month);
				}
			}
			/*TODO: Overit pocet dni v mesiaci*/
			function val_month(val){
				switch(parseInt(val.value)){
					case 2:
						return 29;
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						return 30;
						break;
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						return 31;
						break;
					default:
						return 1;
						break;
				}
			}
		});
		this.shadowRoot.querySelector('#input_day').addEventListener('change', () => {
			var month = this.shadowRoot.querySelector("#input_month");
			var day = this.shadowRoot.querySelector("#input_day");
			validate_input_day(day, val_month(month));
			/*Input day*/
			function val_month(val){
				switch(parseInt(val.value)){
					case 2:
						return 29;
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						return 30;
						break;
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						return 31;
						break;
					default:
						return 1;
						break;
				}
			}
			/*Validation for each input day*/
			function validate_input_day(val, max_day){
				if(val.value < 1){
					val.value = 1;
				}
				else if(max_day < val.value){
					val.value = max_day;
				}
			}
		});
		this.shadowRoot.querySelector('#find_by_name').addEventListener('click', () => {
			var name = this.shadowRoot.querySelector("#name_input").value.toLowerCase();
			if(/^[a-zľščťžýáíéä]+$/i.test(name)){
				find_by_name();
			}else{
				document.getElementById("nameday_find").innerHTML = "Dátum podľa mena:<br>" + "-";
			}
			
            /*-------------------------------------------------------------------------------*/
			function getCorrectDateFormatPrint(val, val2){
				if(val.value == ""){
					return ("-");
				}
				else{
					var storage = "";
					var tmp = val.split(" ");
					var tmp2 = val2.split("%");

					if(tmp[0] == ""){
						return ("-")
					}

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
			                return $(this).find('SK').text().toString().toLowerCase().indexOf(name) >= 0;
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
			
            /*-------------------------------------------------------------------------------*/
        });
		this.shadowRoot.querySelector('#find_by_date').addEventListener('click', () => {
			var month = this.shadowRoot.querySelector("#input_month").value;
			var month_days = this.shadowRoot.querySelector("#input_day").value;
			find_by_date();
			/*After input month, it change '.style.dispaly' to "none"/"block" for each div(need for max days).*/
			function val_month(val){
				var date = new Date();
				switch(parseInt(val.value)){
					case 2:
						if(date.getFullYear() % 4 == 0){
							return 29;
						}
						else{
							return 28;
						}
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						return 30;
						break;
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						return 31;
						break;
					default:
						return 1;
						break;
				}
			}

			/*Find name by date*/
			function find_by_date(){
				var tmp = ""; // Create string for next step - searching in xml
				month = parseInt(month);
				month_days = parseInt(month_days);

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
		});
	}
}

window.customElements.define('names-day', Namesday);


$(function($){
	$(".action-print").click(function(){
		window.print();
		return false;
	});
});