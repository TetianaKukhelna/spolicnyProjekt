/*Web component*/

const template = document.createElement('template');
template.innerHTML =
    `
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="css/site.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	<nav>
        <ul class="nav justify-content-center">
        <li class="nav-item">
            <a class="nav-link" href="index.html">Domov</a>
        </li>
            <nav class="nav">
                <li class="nav-item" id="topmenu">
                    <a class="nav-link" href="games.html">Hry  ⮟</a>
                    <ul class="submenu">
                        <li><a href="games.html">Hry</a>
                            <ul class="submenu">
                                <li><a href="gameHanna.html">Hanna Hryharouskaya</a></li>
                                <li><a href="ultraland.html">Patrik Kupčulák</a></li>
                                <li><a href="hraTetiana.html">Tetiana Kukhelna</a></li>
                                <li><a href="">Vlad Chernov</a></li>
                            </ul>
                        </li>
                        <li><a href="ine.html">Ine</a>
                        <ul class="submenu">
                            <li><a href="aboutgames.html">O puzzle hrach</a></li>
                            <li><a href="documentation.html">Documentacia k projektu</a></li>
                        </ul>
                        </li>
                   </ul>
                </li>
            </nav>
            <li class="nav-item">
            <a class="nav-link" href="autory.html">Autory</a>
            </li>
        </ul>
    </nav>

`;

class TrojMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        $.ajax({
            type: "GET",
            url: "xml/name_days.xml",
            dataType: "xml",
            success: function (xml) {
                var date = new Date();

                if (document.getElementById("nameday_date_and_name")) {
                    // Code for set name + date for day
                    document.getElementById("nameday_date_and_name").innerHTML = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

                    // Filter day out of the zaznam
                    var myXML = $(xml).find("zaznam").filter(function () {
                        return $(this).find('den').text() == getCorrectDate(1);
                        ;
                    });

                    // Store a string with name info in the display variable
                    var display = myXML.children().map(function () {
                        if (this.tagName == "SK")
                            return $(this).text(); //return this.tagName + '=' + $(this).text();
                    }).get().join(' ');

                    document.getElementById("nameday_date_and_name").innerHTML += " " + display;
                }
            }
        });
    }
}

window.customElements.define('trojMenu', TrojMenu);
