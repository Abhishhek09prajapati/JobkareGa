const sidebar = document.getElementById("sildebaar");
const userid = localStorage.getItem("userID")

sidebar.style.width = "0";

// sidebar.style.display = "none"

document.getElementById("menubtn").addEventListener("click", () => {
    sidebar.style.width = "250px";
});

document.getElementById("claosespan").addEventListener("click", () => {
    sidebar.style.width = "0";
});
const menuLinks = document.querySelectorAll(".sidebar-content a");

menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        menuLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

const sheet = "1R6L4Nk6zaliaBbdfvvJJIEpMIw9XQKoEJhFL8fc1YEM"
const sheetTable = ["singup", "wallets", "historyUser"]
let sheetWallet = null;

fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[0]}`)
    .then(response => response.json())
    .then(data => {
        var finduser = data.find(n => n.userId === userid);
        sheetWallet = finduser.wallet
        userdatavalue(finduser)
    })
    .catch(error => {
        console.error("Error:", error);
    });


fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[1]}`)
    .then(response => response.json())
    .then(data => {
        var point = []
        for (let i = 0; i < data.length; i++) {
            point.push(data[i][sheetWallet])
        }
        pointsystem(point)

    })
    .catch(error => {
        console.error("Error:", error);
    });


function userdatavalue(a) {
    document.getElementById("un").innerHTML = `Name : <strong>${a.name}</strong>`
    document.getElementById("upost").innerHTML = `Post : <strong>${a.post}</strong>`
    document.getElementById("useraddress").innerHTML = `Address : <strong>${a.address}</strong>`
}
function pointsystem(b) {
    document.getElementById("tw").innerHTML = `<span>Your Wallet</span><span>${b[4]}</span>`
    document.getElementById("tp").innerHTML = `<span>Today Points</span><span>${b[0]}</span>`
    document.getElementById("yp").innerHTML = `<span>Yesterday Points</span><span>${b[1]}</span>`
    document.getElementById("mp").innerHTML = `<span>Monthly Points</span><span>${b[2]}</span>`
    document.getElementById("ap").innerHTML = `<span>Total Points</span><span>${b[3]}</span>`
}


var history1s = document.getElementById("history1Div");

fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[2]}`)
    .then(response => response.json())
    .then(data => {

        let userHistory = [];

        for (let i = 0; i < data.length; i++) {
            let rawData = data[i][sheetWallet];            
            // 1. Check karo ki cell empty ya undefined toh nahi hai
            if (rawData && rawData.trim() !== "") {
                try {
                    // String ko Object me convert karo
                    let obj = JSON.parse(rawData);
                    userHistory.push(obj);
                } catch (e) {
                    console.error("Invalid JSON format at row " + i, e);
                }
            }
        }

        // Table ko khali karo taaki purana data clean ho jaye
        history1s.innerHTML = "";

        userHistory.forEach((u, k) => {
            // 2. Agar koi property empty/missing hai toh "-" dikhao (Nullish Coalescing)
            let date = u.date || "-";
            let summary = u.summary || "-";
            let amount = u.amount !== undefined ? u.amount : "-";
            let total = u.total !== undefined ? u.total : "-";

            // Row append karo
            history1s.innerHTML += `<tr>
                        <td>${k + 1}</td> 
                        <td>${date}</td>
                        <td>${summary}</td>
                        <td>${amount}</td>
                        <td>${total}</td>
                    </tr>`;
        });

    })
    .catch(err => console.log(err));

document.getElementById("logout").addEventListener("click", () => {
    // Best practice: Delete the key completely instead of setting it to ""
    localStorage.removeItem("userID");
    // Fix: Use '=' to redirect instead of '( ... )'
    window.location.href = "../index.html";
});
document.getElementById("logout1").addEventListener("click", () => {
    // Best practice: Delete the key completely instead of setting it to ""
    localStorage.removeItem("userID");
    // Fix: Use '=' to redirect instead of '( ... )'
    window.location.href = "../index.html";
});