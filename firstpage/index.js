const mobileNumber = "6387215755";
const sheetId = "1yqyPnBtwf6gUhOT3wFDk-FaQzSo6LfsnnDNm5WFZUE8";

const servicesDiv = document.getElementById("servicsdiv");
const contactBtn = document.getElementById("contactus");
const shareBtn = document.getElementById("sharenowbtn");

// Contact Button
contactBtn.addEventListener("click", () => {

    const message = `Hello,
Mujhe Recharge wali ID chahiye.
Main aapki website se aaya hoon.
Please reply. Thank You.`;

    window.open(
        `https://wa.me/91${mobileNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

});

// Share Button
shareBtn.addEventListener("click", () => {

    const message = `Online Services Portal

${window.location.href}`;

    window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
    );

});

// Load Services
async function loadServices() {

    try {

        const response = await fetch(
            `https://opensheet.elk.sh/${sheetId}/Servics`
        );

        const data = await response.json();

        servicesDiv.innerHTML = "";

        data.forEach(service => {

            const card = document.createElement("div");
            card.className = "divOfServics";

            card.innerHTML = `
                <img src="./images/${service.images}.jpeg"
                     alt="${service.name}"
                     loading="lazy">

                <label>${service.name}</label>
            `;

            card.onclick = () => {
                const url = service.images === "bike" ? service.redirectWebsite : service.website;

                if (url) {
                    window.open(url, "_blank");
                }

            };

            card.ondblclick = () => {

                if (service.redirectWebsite) {
                    window.open(service.redirectWebsite, "_blank");
                }

            };

            servicesDiv.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        servicesDiv.innerHTML = `
            <h3 style="text-align:center;color:red;">
                Unable to Load Services
            </h3>
        `;

    }

}

loadServices();