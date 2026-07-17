// 1. Instant Auto-Redirect Check (Runs immediately)
if (localStorage.getItem("userID")) {
    window.location.href = "publick/index.html";
}

// 2. Constants & DOM Elements
const sheet = "1R6L4Nk6zaliaBbdfvvJJIEpMIw9XQKoEJhFL8fc1YEM";
const userid = document.getElementById("UserID");
const password = document.getElementById("passworddata");
const loading = document.getElementById("loading");

// Hide loading initially
loading.style.display = "none";

// 3. Login Flow Trigger
async function loginpage() {
    const enteredUser = userid.value.trim();
    const enteredPass = password.value.trim();

    // Empty Check FIRST (Saves API bandwidth and stops loading spinner early)
    if (enteredUser === "" || enteredPass === "") {
        alert("Please Enter User ID and Password");
        return;
    }

    try {
        loading.style.display = "flex";
        // We MUST 'await' the fetch logic so the spinner stays visible until finished
        await getData(enteredUser, enteredPass); 
    } catch (error) {
        console.error("Login process error:", error);
    } finally {
        loading.style.display = "none";
    }
}

// 4. API & Authentication Logic
async function getData(enteredUser, enteredPass) {
    try {
        const response = await fetch(`https://opensheet.elk.sh/${sheet}/singup`);
        
        if (!response.ok) {
            throw new Error("Failed to connect to sheet database");
        }

        const data = await response.json();

        // Find User
        const user = data.find(item => item.userId === enteredUser);

        if (!user) {
            alert("User ID not found");
            return;
        }

        // Password Check
        if (enteredPass === user.password) {
            localStorage.setItem("userID", enteredUser);
            // Redirect
            window.location.href = "publick/index.html";
        } else {
            alert("Wrong Password");
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong with the connection!");
    }
}

// 5. WhatsApp Admin Contact Link
document.getElementById("admin").addEventListener('click', () => {
    const message = "Mujhe UserID and PassWord Chahiye";
    window.open(`https://wa.me/916387215755?text=${encodeURIComponent(message)}`);
});