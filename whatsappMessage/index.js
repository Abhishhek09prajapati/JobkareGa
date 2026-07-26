const sheet = "1zJ3u4_kSL0gmcT2Dk1AUh6ORDu67QDYvCALh0fiVBEU";

var nub1 = localStorage.getItem("userID")



document.getElementById("leadgeediv").style.display = "none"
fetch(`https://opensheet.elk.sh/${sheet}/CustomerData`)
    .then(res => res.json())
    .then(data => {


        var userdata = data.filter(o => o.mobile === nub1)

        userdata.forEach(u => {

            const div = document.createElement("div");
            div.className = "contactdiv";

            div.innerHTML = `
            <div>
                <label>${u.mobile}</label>
                <label> - ${u.name}</label>
            </div>

            <div class="callBtn">
                <button class="whatsappBtn">Whatsapp</button>
                <button class="callBtn1">Call</button>
                <button class="ledgerBtn">Ledger</button>
            </div>
        `;

            let open = false;

            div.addEventListener("click", () => {

                const btns = div.querySelector(".callBtn");

                if (!open) {
                    div.style.height = "100px";
                    btns.style.opacity = "1";
                    div.classList.toggle("active");
                    open = true;
                } else {
                    div.style.height = "50px";
                    btns.style.opacity = "0";
                    open = false;
                }

            });

            div.querySelector(".whatsappBtn").addEventListener("click", (e) => {
                e.stopPropagation();
                window.open(`https://wa.me/91${u.number}`)
            });

            div.querySelector(".callBtn1").addEventListener("click", (e) => {
                e.stopPropagation();
                // alert(`${u.number}`)
                window.location.href = `tel:${u.number}`;
            });

            div.querySelector(".ledgerBtn").addEventListener("click", (e) => {
                document.getElementById("leadgeediv").style.display = ""
               
            });

            document.getElementById("mobilediv").appendChild(div);

        });

    });

document.getElementById("closeBtn").addEventListener("click", (e) => {
    document.getElementById("leadgeediv").style.display = "none"
})


