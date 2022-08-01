class MiniProject {
    constructor() {
        this.projects = null;
        this.max_portfolio_show_per_load = 5;
        this.container = document.querySelector(".mini-project-container");
        this.template = this.container.querySelector("[data-template]");
    }
    async loadData() {
        if(this.projects != null) return
        this.projects = await fetch(`${JuvarAbrera.API_ROOT_URL}/project/mini`).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        });
        this.container.querySelectorAll(".loading").forEach(loading => {
            loading.remove();
        })
        this.projects.data = this.projects.data.reverse();
        for(let i in this.projects.data) {
            let project = this.projects.data[i];
            var clone = this.template.cloneNode(true);
            clone.querySelector("h3").innerText = project.name;
            clone.querySelector("p").innerText = project.description;
            clone.href = project.url;
            if(i >= this.max_portfolio_show_per_load) {
                clone.classList.add("d-none");
            }
            clone.removeAttribute("data-template");
            this.container.insertAdjacentElement("beforeend", clone);
        }
    }
}