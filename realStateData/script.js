var leads = document.getElementById("leads")
var whatsapp = document.getElementById("whatsapp")
var contact = document.getElementById("contact")
let dataView = document.getElementsByClassName("dataView")[0]

leads.style.display = "block"
whatsapp.style.display = "none"
contact.style.display = "none"


var leadbtn = document.getElementById("leadbtn")
var whatsappbtn = document.getElementById("whatsappbtn")
var contactbtn = document.getElementById("contactbtn")


contactbtn.addEventListener("click", () => {
    window.open("https://wa.me/917607658761")
})
leadbtn.addEventListener("click", () => {
    leads.style.display = "block"
    whatsapp.style.display = "none"
    contact.style.display = "none"
})
whatsappbtn.addEventListener("click", () => {
    noy()
    leads.style.display = "none"
    whatsapp.style.display = "block"
    contact.style.display = "none"
})


var name1 = document.getElementById("name")
var mobile = document.getElementById("mobile")

var sh = "https://script.google.com/macros/s/AKfycbwVzNhqilYMi1rRAUG0Z6JG6OEyPXIYP220N5_4puIAOf8vs0t2b_7WDs4LbqiN8bb0FA/exec"
var btnlead = document.getElementsByClassName("btnlead")[0]

btnlead.addEventListener("click", () => {
    btnlead.disabled = true;
    var n = name1.value.trim();
    var m = mobile.value.trim()
    dataView.textContent = "Data Send Ho Raha hai"

    if (n && m && m.length === 10) {
        const datavalue = { n, m }
        fetch(sh, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datavalue)
        })
            .then(res => res.text())
            .then(data => {
                name1.value = "";
                mobile.value = "";
                dataView.textContent = "Data Send Ho Chuka Hai , Thanks For Leads"

                setTimeout(() => {
                    dataView.style.display = "none";
                    btnlead.disabled = false;
                }, 3000);
            }).catch(er => {
                console.log(er)
            })
    } else {
        alert("Please Enter Valid Number")
    }
})

function noy() {
    whatsapp.innerHTML = ""
    var shq = "13TdMAat7ZtnqFwG1M2nklNCMcYvJXzfuUsEuGRroCII"
    fetch(`https://opensheet.elk.sh/${shq}/abhishek`)
        .then(res => res.json())
        .then(data => {
            data.forEach(t => {
                var div = document.createElement('div')
                div.innerHTML = `<label for="">${t.name}</label> <label class="status" ></label>`
                div.className = "whastapplabel";
                var statusx = div.querySelector(".status");
                if (t.status === "green") {
                    statusx.style.backgroundColor = "green"
                } else {
                    statusx.style.backgroundColor = "red"
                }
                whatsapp.append(div)
                div.addEventListener("click", () => {
                    const message = "Hello, Good Morning Dear";
                    const f = {
                        number: String(t.mobile),
                        status: "red"
                    };
                    // WhatsApp immediately open
                    const whatsappUrl =
                        `https://wa.me/91${t.mobile}?text=${encodeURIComponent(message)}`;

                    window.open(whatsappUrl, "_blank");
                    var statusdata = "https://script.google.com/macros/s/AKfycbwAGAhigqtYghtMhzCp6m9LnE7HZvV9d0SGnMM_OkvSNl-bEEl3IE5u3KVqQpXf-xcL5Q/exec"
                    // Google Sheet update
                    fetch(statusdata, {
                        method: "POST",
                        mode: "no-cors",

                        headers: {
                            "Content-Type": "text/plain;charset=utf-8"
                        },
                        body: JSON.stringify(f)
                    })
                        .then(() => {
                            console.log("Status update request sent");
                        })
                        .catch(err => {
                            console.log("Error:", err);
                        });
                });

            })
        }).catch(err => {
            console.log(err)
        })
}