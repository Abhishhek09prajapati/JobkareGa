// 1. Sidebar Control
const sidebar = document.getElementById("sildebaar");
const userid = localStorage.getItem("userID");

sidebar.style.width = "0";

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

// 2. Constants & State Variables
const sheet = "1R6L4Nk6zaliaBbdfvvJJIEpMIw9XQKoEJhFL8fc1YEM";
const sheetTable = ["singup", "wallets", "historyUser"];
let sheetWallet = null;

// 3. Main Data Orchestrator (Ensures sequential execution)
async function loadDashboardData() {
    try {
        // Step A: Load User Profile
        const userRes = await fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[0]}`);
        const userData = await userRes.json();
        const finduser = userData.find(n => n.userId === userid);

        if (!finduser) {
            console.error("User session invalid or user not found.");
            return;
        }

        sheetWallet = finduser.wallet;
        userdatavalue(finduser);

        // Step B: Load Wallet & Points (Only after sheetWallet is set)
        const walletRes = await fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[1]}`);
        const walletData = await walletRes.json();
        
        const point = [];
        for (let i = 0; i < walletData.length; i++) {
            point.push(walletData[i][sheetWallet]);
        }
        pointsystem(point);

        // Step C: Load History (Only after sheetWallet is set)
        loadUserHistory();

    } catch (error) {
        console.error("Dashboard initialization error:", error);
    }
}

// 4. Render Profile Details
function userdatavalue(a) {
    document.getElementById("un").innerHTML = `Name : <strong>${a.name}</strong>`;
    document.getElementById("upost").innerHTML = `Post : <strong>${a.post}</strong>`;
    document.getElementById("useraddress").innerHTML = `Address : <strong>${a.address}</strong>`;
}

// 5. Render Point Metrics
function pointsystem(b) {
    document.getElementById("tw").innerHTML = `<span>Your Wallet</span><span>${b[4] ?? 0}</span>`;
    document.getElementById("tp").innerHTML = `<span>Today Points</span><span>${b[0] ?? 0}</span>`;
    document.getElementById("yp").innerHTML = `<span>Yesterday Points</span><span>${b[1] ?? 0}</span>`;
    document.getElementById("mp").innerHTML = `<span>Monthly Points</span><span>${b[2] ?? 0}</span>`;
    document.getElementById("ap").innerHTML = `<span>Total Points</span><span>${b[3] ?? 0}</span>`;
}

// 6. Fetch & Render History Table
const history1s = document.getElementById("history1Div");

async function loadUserHistory() {
    try {
        const response = await fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[2]}`);
        const data = await response.json();

        let userHistory = [];

        for (let i = 0; i < data.length; i++) {
            let rawData = data[i][sheetWallet];            
            // Check if cell is occupied and not empty
            if (rawData && rawData.trim() !== "") {
                try {
                    let obj = JSON.parse(rawData);
                    userHistory.push(obj);
                } catch (e) {
                    console.error("Invalid JSON format at row " + i, e);
                }
            }
        }

        // Generate rows cleanly in-memory first to boost performance
        const rowsHTML = userHistory.map((u, k) => {
            let date = u.date || "-";
            let summary = u.summary || "-";
            let amount = u.amount !== undefined ? u.amount : "-";
            let total = u.total !== undefined ? u.total : "-";

            return `<tr>
                <td>${k + 1}</td> 
                <td>${date}</td>
                <td>${summary}</td>
                <td>${amount}</td>
                <td>${total}</td>
            </tr>`;
        }).join('');

        history1s.innerHTML = rowsHTML || `<tr><td colspan="5">No history records found.</td></tr>`;

    } catch (err) {
        console.error("Failed to load history:", err);
        history1s.innerHTML = `<tr><td colspan="5">Error loading history records.</td></tr>`;
    }
}

// 7. Uniform Logout Handler
function logout() {
    localStorage.removeItem("userID");
    window.location.href = "../index.html";
}

["logout", "logout1"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", logout);
});

// Run Dashboard Load sequence
loadDashboardData();