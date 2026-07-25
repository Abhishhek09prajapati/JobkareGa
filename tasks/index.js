const sheet = "1R6L4Nk6zaliaBbdfvvJJIEpMIw9XQKoEJhFL8fc1YEM";
var userReward = document.getElementById("userReward")
fetch(`https://opensheet.elk.sh/${sheet}/servics`)
    .then(res => res.json())
    .then(data => {
        data.forEach((k,i) => {
            var tr = document.createElement('tr')
            tr.innerHTML = `<td>${i+1}</td>
                    <td>${k.servicsName.toUpperCase()}</td>
                    <td>${k.servicsPrices}</td>
                    <td>${k.servicsFees}</td>
                    <td>${k.servicsCommission}</td>
                    `




            userReward.append(tr)
        });
    })