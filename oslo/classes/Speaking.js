class Speaking {
    constructor() {
        this.speaking = null;
        this.max_portfolio_show_per_load = 5;
        this.container = document.querySelector(".speaking-container");
        this.template = this.container.querySelector("[data-template]");
    }
    async loadData() {
        if(this.speaking != null) return
        this.speaking = await fetch(`${JuvarAbrera.API_ROOT_URL}/speaking`).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        });
        this.speaking.data = this.speaking.data.reverse();
        this.container.querySelectorAll(".loading").forEach(loading => {
            loading.remove();
        })
        let participants_count = 0;
        for(let i in this.speaking.data) {
            let speakingItem = this.speaking.data[i];
            var clone = this.template.cloneNode(true);
            clone.querySelector("h3").innerText = speakingItem.name;
            clone.querySelector("h5").innerText = speakingItem.venue;
            let date = new Date(speakingItem.date)
            clone.querySelector("span").innerText = date.toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric' 
            });
            clone.querySelector("p").innerText = speakingItem.participants + " participants";
            participants_count += speakingItem.participants;
            clone.querySelector(".portfolio-ss").style.backgroundImage = `url(${JuvarAbrera.API_ROOT_URL}${speakingItem.thumbnail})`;
            for(let j in speakingItem.topics) {
                let topic = speakingItem.topics[j];
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag">${topic.name}</span>`)
            }
            clone.removeAttribute("data-template");
            if(i >= this.max_portfolio_show_per_load) {
                clone.classList.add("d-none");
            }
            this.container.insertAdjacentElement("beforeend", clone);
        }
        document.getElementById("num_events").setAttribute("data-animate-number-to", this.speaking.data.length);
        document.getElementById("num_participants").setAttribute("data-animate-number-to", participants_count);
    }
}