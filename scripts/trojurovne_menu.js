/*Web component*/

const templateMenu = document.createElement('template');
template.innerHTML =
    `
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="css/site.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	<nav id="menu">
        <ul class="nav justify-content-center">
        <li class="nav-item">
            <a id="dom" class="nav-link" href="index.html"></a>
        </li>
            <nav class="nav">
                <li class="nav-item" id="topmenu">
                    <a id="hryPrve" class="nav-link" href="games.html"></a>
                    <ul class="submenu">
                        <li>
                            <a id="hryPodPrve" href="games.html"></a>
                            <ul class="submenu">
                                <li id="hraHanna"><a href="gameHanna.html"></a></li>
                                <li id="hraPatrik"><a href="ultraland.html"></a></li>
                                <li id="hraTeti"><a href="hraTetiana.html"></a></li>
                                <li id="hraVlad"><a href=""></a></li>
                            </ul>
                        </li>
                        <li><a id="ineInfo" href="ine.html"></a>
                        <ul class="submenu">
                            <li id="about"><a href="aboutgames.html"></a></li>
                            <li id="document"><a href="documentation.html"></a></li>
                        </ul>
                        </li>
                   </ul>
                </li>
            </nav>
            <li class="nav-item">
                <a id="autor" class="nav-link" href="autory.html"></a>
            </li>
        </ul>
    </nav>

`;

let dom = document.querySelector("#dom");
let hryMenu = document.querySelector("#hryPrve");
let hryPodMenu = document.querySelector("#hryPodPrve");
let gameH = document.querySelector("#hraHanna");
let gameT = document.querySelector("#hraTeti");
let gameP = document.querySelector("#hraPatrik");
let gameV = document.querySelector("#hraVlad");
let Ine = document.querySelector("#ineInfo");
let podIne = document.querySelector("#about");
let Document = document.querySelector("#document");
let autory = document.querySelector("#autor");
let poleNazov = ["Domov", "Hry  ⮟", "Hry", "Hanna Hryharouskaya", "Patrik Kupčulák", "Tetiana Kukhelna", "Vlad Chernov", "Ine", "O puzzle hrach", "Documentacia k projektu", "Autory"];


class TrojMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateMenu.content.cloneNode(true));
    }

    connectedCallback() {

        let thisOne = this;
        thisOne.shadowRoot.getElementById('dom').innertext = poleNazov[0];
        thisOne.shadowRoot.getElementById('hryPrve').innertext = poleNazov[1];
        thisOne.shadowRoot.getElementById('hryPodPrve').innertext = poleNazov[2];
        thisOne.shadowRoot.getElementById('hraHanna').innertext = poleNazov[3];
        thisOne.shadowRoot.getElementById('hraTeti').innertext = poleNazov[4];
        thisOne.shadowRoot.getElementById('hraPatrik').innertext = poleNazov[5];
        thisOne.shadowRoot.getElementById('hraVlad').innertext = poleNazov[6];
        thisOne.shadowRoot.getElementById('ineInfo').innertext = poleNazov[7];
        thisOne.shadowRoot.getElementById('about').innertext = poleNazov[8];
        thisOne.shadowRoot.getElementById('document').innertext = poleNazov[9];
        thisOne.shadowRoot.getElementById('autor').innertext = poleNazov[10];

        thisOne.shadowRoot.getElementById('dom').style.display = "block";
        thisOne.shadowRoot.getElementById('hryPrve').style.display = "block";
        thisOne.shadowRoot.getElementById('autor').style.display = "block";

        thisOne.shadowRoot.getElementById('dom').addEventListener('click', () => {
            thisOne.shadowRoot.setAttribute(href, "index.html");
        })

        thisOne.shadowRoot.getElementById('hryPrve').addEventListener('click', () => {
            thisOne.shadowRoot.setAttribute(href, "games.html");
        })

        thisOne.shadowRoot.getElementById('autor').addEventListener('click', () => {
            thisOne.shadowRoot.setAttribute(href, "autory.html");
        })

        thisOne.shadowRoot.getElementById('hryPodPrve').style.display = "none";
        thisOne.shadowRoot.getElementById('ineInfo').style.display = "none";
        thisOne.shadowRoot.getElementById('hryPrve').addEventListener('onmouseout', () => {
            thisOne.shadowRoot.getElementById('hryPodPrve').style.display = "block";
            thisOne.shadowRoot.getElementById('ineInfo').style.display = "block";
        })

        thisOne.shadowRoot.getElementById('hraHanna').style.display = "none";
        thisOne.shadowRoot.getElementById('hraTeti').style.display = "none";
        thisOne.shadowRoot.getElementById('hraPatrik').style.display = "none";
        thisOne.shadowRoot.getElementById('hraVlad').style.display = "none";
        thisOne.shadowRoot.getElementById('hryPodPrve').addEventListener('onmouseout', () => {
            thisOne.shadowRoot.getElementById('hraHanna').style.display = "block";
            thisOne.shadowRoot.getElementById('hraTeti').style.display = "block";
            thisOne.shadowRoot.getElementById('hraPatrik').style.display = "block";
            thisOne.shadowRoot.getElementById('hraVlad').style.display = "block";
        })

        thisOne.shadowRoot.getElementById('about').style.display = "none";
        thisOne.shadowRoot.getElementById('document').style.display = "none";
        thisOne.shadowRoot.getElementById('ineInfo').addEventListener('onmouseout', () => {
            thisOne.shadowRoot.getElementById('about').style.display = "block";
            thisOne.shadowRoot.getElementById('document').style.display = "block";
        })


        this.addEventListener('onmouseout', () => {
            this.setAttribute('style', 'background: #b463d4;\n' +
                'border-color: #b463d4 !important;');
            if (this == 'dom') {
                $('a[id="dom"]').click(function () {
                    thisOne.shadowRoot.setAttribute(href, "index.html")
                    //location.href = "index.html";
                });
                // dom.onmouseover = function () {
                //     dom.removeAttribute('style', 'background: #b463d4;\n' +
                //         'border-color: #b463d4 !important;');
                // }
            } else if (this == hryMenu) {
                $('a[id="hryPrve"]').click(function () {
                    location.href = "games.html";
                });
                if (this == hryPodMenu) {
                    $('a[id="hryPodPrve"]').click(function () {
                        location.href = "games.html";
                    });
                    if (this == gameH) {
                        $('li[id="hraHanna"]').click(function () {
                            location.href = "gameHanna.html";
                        });
                    } else if (this == gameP) {
                        $('li[id="hraPatrik"]').click(function () {
                            location.href = "ultraland.html";
                        });
                    } else if (this == gameT) {
                        $('li[id="hraTeti"]').click(function () {
                            location.href = "hraTetiana.html";
                        });
                    } else if (this == gameV) {
                        $('li[id="hraVlad"]').click(function () {
                            location.href = "";
                        });
                    }

                } else if (this == Ine) {
                    $('a[id="ineInfo"]').click(function () {
                        location.href = "ine.html";
                    });
                    if (this == podIne) {
                        $('li[id="about"]').click(function () {
                            location.href = "aboutgames.html";
                        });
                    } else if (this == Document) {
                        $('li[id="document"]').click(function () {
                            location.href = "documentation.html";
                        });
                    }
                }

            } else if (this == autory) {
                $('a[id="autor"]').click(function () {
                    location.href = "autory.html";
                });
            }

            this.onmouseover = function () {
                this.removeAttribute('style', 'background: #b463d4;\n' +
                    'border-color: #b463d4 !important;');
            }

        });


        // this.addEventListener('click', (event) => {
        //     this.onmouseout = function () {
        //         if(this == dom)
        //             dom.setAttribute('style', 'background: #b463d4;\n' +
        //                 'border-color: #b463d4 !important;');
        //             $('a[id="dom"]').click(function () {
        //                 location.href = "index.html";
        //             });
        //         else if(this == hryMenu){
        //             hryMenu.setAttribute('style', 'background: #b463d4;\n' +
        //                 'border-color: #b463d4 !important;');
        //             $('a[id="hryPrve"]').click(function () {
        //                 location.href = "index.html";
        //             });
        //         }
        //     }
        //     dom.onmouseover = function () {
        //         dom.removeAttribute('style', 'background: #b463d4;\n' +
        //             'border-color: #b463d4 !important;');
        //     }
        //
        // });


        // this.shadowRoot.querySelector('#textinp').addEventListener('change', () => {
        //     var txtinput = this.shadowRoot.querySelector('#textinp');
        //
        //     if (txtinput.checked) {
        //         this.shadowRoot.querySelector('#textamplitude').style.display = "block";
        //         this.shadowRoot.querySelector('#slider-input').checked = false;
        //         this.shadowRoot.querySelector('#slideramplitude').style.display = "none";
        //
        //         this.shadowRoot.querySelector('#textamplitude').addEventListener('change', () => {
        //             this.shadowRoot.querySelector('#slideramplitude').value = this.shadowRoot.querySelector('#textamplitude').value;
        //             textamplitude = this.shadowRoot.querySelector('#textamplitude').value;
        //
        //         });
        //     } else {
        //         this.shadowRoot.querySelector('#textamplitude').style.display = "none";
        //     }
        // });
    }
}

window.customElements.define('troj-menu', TrojMenu);
