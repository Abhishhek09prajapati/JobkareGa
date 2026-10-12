var serachdata = document.getElementById("serachdata")

var sh = "16Z4hqbx03qxABQIn8JtwvwjSlTrYxTzfcjjR7eULESU"
let userData = null

document.getElementsByClassName("close-btn")[0].addEventListener("click", () => {
    document.getElementById("addentery").style.display = "none"
})

var customerList = document.getElementById("customerList")

const searchInput = document.getElementById("serachdata");

searchInput.addEventListener("input", (e) => {



    fetch(`https://opensheet.elk.sh/${sh}/shop`)
        .then(res => res.json())
        .then(data => {

            const filterUserName = data.filter(item => {
                var username2 = item.name.toLowerCase();
                var usernumber2 = item.number
                return username2.includes(e.target.value) || usernumber2.includes(e.target.value)
            });


            if (filterUserName.length === 0) {
                customerList.innerHTML = "this cutomer is not here"
                return
            }

            if(!e.target.value){
                customerList.innerHTML = ""
                return
            }


            customerList.innerHTML = ''
            filterUserName.forEach(k => {
                var div = document.createElement('div')
                div.className = "customerstylediv"
                div.innerHTML = `${k.name.toUpperCase()} -  ${k.number}`
                customerList.append(div);



                div.addEventListener('click', () => {
                    viewLeadger(`${k.leadger}`)
                })


            });


        })
        .catch(error => console.log(error));

});





function viewLeadger(a) {

    fetch(`https://opensheet.elk.sh/${sh}/leadger`)
        .then(res => res.json())
        .then(data => {

            ledagrValue.innerHTML = "";

            data.forEach((row, index) => {

                if (!row[a]) return;

                const arr = JSON.parse(row[a]);

                ledagrValue.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${arr[1]}</td>
                        <td>${arr[0]}</td>                        
                        <td>${arr[2]}</td>
                        <td>${arr[3]}</td>
                        <td>${arr[4]}</td>
                    </tr>
                `;
            });

        })
        .catch(err => console.log(err));

}