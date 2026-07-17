const sh = '1zJ3u4_kSL0gmcT2Dk1AUh6ORDu67QDYvCALh0fiVBEU'

var userdata = document.getElementById("userdata")

fetch(`https://opensheet.elk.sh/${sh}/CustomerData`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("lenuser").innerHTML = `Total Data = ${data.length}`
        data.reverse().forEach(t => {
            var div = document.createElement('div')
            div.className = "userDiv"
            div.innerHTML = `
                    <label for="">${t.name}</label>
                    <label for="">${t.mobile}</label>
                    <label for="">${t.email}</label>
                             `

            userdata.append(div)
        });
    })
    .catch(err => console.error(err));