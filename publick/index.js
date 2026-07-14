// var a = localStorage.getItem("userID")
// document.getElementById("k").textContent = a
document.getElementById("sildebaar").style.display = "none"

document.getElementById("claosespan").addEventListener('click', () => {
    document.getElementById("sildebaar").style.width = "0px"
})

var number = "6387215755";

document.getElementById("callBtn").addEventListener("click", function () {
    window.location.href = `tel:${number}`;
});