document.querySelector("#start").onclick = function() {
    timer();
    let obj = document.querySelector(".object");
    obj.style.display = "block";
};

var cnt = 0;
function timer(){
    cnt++;

    let div = document.querySelector("#mytimer");
    div.innerHTML = "čas " + cnt + " sec";
    console.log(cnt);

    setTimeout("timer()",1000);
}