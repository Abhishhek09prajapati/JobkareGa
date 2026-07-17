const sheet = "1R6L4Nk6zaliaBbdfvvJJIEpMIw9XQKoEJhFL8fc1YEM";

const userid = document.getElementById("UserID");
const password = document.getElementById("passworddata");
var loading = document.getElementById("loading")
loading.style.display = "none";

function loginpage() {
    loading.style.display = "flex";
    getData();
    loading.style.display = "none";
}

async function getData() {
    try {

        const response = await fetch(`https://opensheet.elk.sh/${sheet}/singup`);
        const data = await response.json();

        // Empty Check
        if (userid.value.trim() === "" || password.value.trim() === "") {
            alert("Please Enter User ID and Password");
            loading.style.display = "none";
            return;
        }

        // Find User
        const user = data.find(item => item.userId === userid.value.trim());

        if (!user) {
            alert("User ID not found");
            loading.style.display = "none";
            return;
        }

        // Password Check
        if (password.value.trim() === user.password) {
            localStorage.setItem("userID", userid.value)
            // Redirect
            window.location.href = "publick/index.html";
        } else {
            loading.style.display = "none";
            alert("Wrong Password");
        }


    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
}

document.getElementById("admin").addEventListener('click', () => {
    var a = "Mujhe UserID and PassWord Chahiye"
    window.open(`https://wa.me/916387215755?text=${a}`)
})