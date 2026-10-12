var listData = document.getElementById("listData")
const sh = "1G5kY3GGIv-wyA8qq-Um_SazeQgzUzyVMCfRtXXAzrVA";

fetch(`https://opensheet.elk.sh/${sh}/socialmedia`)
    .then(res => res.json())
    .then(data => {
        data.forEach(k => {
            var div = document.createElement("div")

            div.innerHTML = `${k.catagories} - ( ${k.name} )`

            listData.append(div)



            div.addEventListener("click", () => {
                window.open(`${k.links}`, "_blank")
            })
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });