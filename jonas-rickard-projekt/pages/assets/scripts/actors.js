document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 10; i++) {
        fetch("https://randomuser.me/api", {
                method: "GET"
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                let actorContainer = document.getElementById("showActors");
                let actorPreContainer = document.createElement("div")
                let actorName = document.createElement("p");
                let actorPic = document.createElement("img");
                actorPic.src = data.results[0].picture.thumbnail;

                if (i < 4) {
                    actorName.innerHTML = "Lead actor: " + data.results[0].name.first + " " + data.results[0].name.last;
                } else {
                    actorName.innerHTML = "Supporting actor: " + data.results[0].name.first + " " + data.results[0].name.last;
                }
                
                actorPreContainer.appendChild(actorPic);
                actorPreContainer.appendChild(actorName);
                actorContainer.appendChild(actorPreContainer);
            })
    }
});