// var a = localStorage.getItem("userID")
// document.getElementById("k").textContent = a
document.getElementById("sildebaar").style.display = "none"

document.getElementById("claosespan").addEventListener('click', () => {
    document.getElementById("sildebaar").style.width = "0px"
})