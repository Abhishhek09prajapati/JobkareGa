const sheet = "1R6L4Nk6zaliaBbdfvvJJIEpMIw9XQKoEJhFL8fc1YEM";
const sheetTable = ["singup", "wallets", "historyUser"];


var userNumber = document.getElementById("numberList")

// API Fetch Function with clean error handling
async function fetchSheetData() {
    try {
        // Correct base URL use karein: https://opensheet.elk.sh/...
        const response = await fetch(`https://opensheet.elk.sh/${sheet}/${sheetTable[0]}`);
        
        // Check 1: Agar server response (404, 500, etc.) galat ho
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        data.forEach(el => {

            var div = document.createElement('div')
            div.className = "divnumber"
            div.innerHTML = `${el.userId}`



            userNumber.append(div)

            
        });




        
        

    } catch (error) {
        // Check 2: Network failure ya invalid URL errors ko catch karein
        console.error("Fetch request fail ho gaya:", error.message);
    }
}

// Function call
fetchSheetData();