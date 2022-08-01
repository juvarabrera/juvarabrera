class TradingView {
    constructor() {
        this.ideas = null;
        this.max_portfolio_show_per_load = 5;
        this.container = document.querySelector(".crypto-container");
        this.template = this.container.querySelector("[data-template]");
        this.data_attr = "data-chart"
        
        this.modal = document.getElementById("crypto-modal");
        this.wrapper = this.modal.querySelector(".wrapper");
        this.closeButton = this.modal.querySelector(".close");

        let tradingview = this;
        document.addEventListener("keyup", (e) => {
            if(this.isModalOpen()) {
                if (e.key === "Escape") {
                    tradingview.closeIdea();
                }
            }
        });
        this.closeButton.addEventListener("click", function() {
            tradingview.closeIdea();
        })
    }
    async loadData() {
        if(this.ideas != null) return
        this.ideas = await fetch(`${JuvarAbrera.API_ROOT_URL}/tradingview/ideas`).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        });
        this.container.querySelectorAll(".loading").forEach(loading => {
            loading.remove();
        })
        for(let i in this.ideas.data) {
            let idea = this.ideas.data[i];
            var clone = this.template.cloneNode(true);
            clone.querySelector("span.h3").innerText = idea.name;
            clone.querySelector("h5").innerText = idea.short_name;
            let date = new Date(parseInt(idea.timestamp) * 1000)
            clone.querySelector("span.date").innerText = date.toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            clone.querySelector("p").innerText = idea.description.replace(/\n/g, " ");
            clone.querySelector(".portfolio-ss").style.backgroundImage = `url(${idea.image_url2})`;
            if(idea.label == "Long") {
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag long"><i class="mdi mdi-trending-up"></i>Long</span>`);
            } else if(idea.label == "Short") {
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag short"><i class="mdi mdi-trending-down"></i>Short</span>`);
            } else {
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag neutral"><i class="mdi mdi-trending-neutral"></i>Neutral</span>`);
            }
            clone.querySelector("a").setAttribute(this.data_attr, i);
            let tradingview = this;
            clone.querySelector("a").addEventListener("click", function(el) {
                let idea = this.getAttribute(tradingview.data_attr)
                tradingview.loadIdea(parseInt(idea));
            });
            clone.removeAttribute("data-template");
            if(i >= this.max_portfolio_show_per_load) {
                break;
            }
            this.container.insertAdjacentElement("beforeend", clone);
        }
    }
    isModalOpen() {
        return this.modal.classList.contains("active");
    }
    closeIdea() {
        this.modal.classList.remove("active");
        document.querySelector("body").classList.remove("has-modal");
    }

    loadIdea(ideaIndex) {
        let tradingview = this;
        this.modal.scrollTop = 0;
        this.modal.classList.add("active");
        document.querySelector("body").classList.add("has-modal");
        let idea = this.ideas.data[ideaIndex];
        mixpanel.track("Open Crypto Technical Analysis", {
            "name": idea.name,
            "url": idea.published_url
        });
        this.modal.querySelector("h1").innerText = idea.name;
        this.modal.querySelector(".tags").innerHTML = "";
        if(idea.label == "Long") {
            this.modal.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag long"><i class="mdi mdi-trending-up"></i>Long</span>`);
        } else if(idea.label == "Short") {
            this.modal.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag short"><i class="mdi mdi-trending-down"></i>Short</span>`);
        } else {
            this.modal.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag neutral"><i class="mdi mdi-trending-neutral"></i>Neutral</span>`);
        }
        this.modal.querySelector(".photos img").src = ``;
        this.modal.querySelector(".photos img").src = `https://www.tradingview.com/i/${idea.image_url}/`;
        this.modal.querySelector("a.btn").href = `${idea.published_url}`;
        this.modal.querySelector("div.info").innerText = idea.description;
        this.modal.querySelector("h2").innerText = idea.short_name;
        let date = new Date(parseInt(idea.timestamp) * 1000);
        this.modal.querySelector("h3").innerText = date.toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        // this.modal.querySelector("h3").innerText = idea.date;
        
    }
}