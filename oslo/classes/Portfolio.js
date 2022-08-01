class Portfolio {
    constructor() {
        this.projects = null;
        this.max_portfolio_show_per_load = 5;
        this.container = document.querySelector(".portfolio-container");
        this.template = this.container.querySelector("[data-template]");

        this.modal = document.getElementById("portfolio-modal");
        this.progressBar = this.modal.querySelector(".progress");
        this.wrapper = this.modal.querySelector(".wrapper");
        this.nextButton = this.modal.querySelector(".next");
        this.prevButton = this.modal.querySelector(".prev");
        this.closeButton = this.modal.querySelector(".close");
        
        this.data_portfolio_attr = "data-portfolio";
        this.action = {
            "NEXT": "next",
            "PREV": "prev"
        }
        let portfolio = this;
        document.addEventListener("keyup", (e) => {
            if(this.isModalOpen()) {
                if (e.key === "Escape") {
                    portfolio.closeProject();
                } else if(e.keyCode == 37) {
                    portfolio.prevProject();
                } else if(e.keyCode == 39) {
                    portfolio.nextProject();
                }
            }
        });
        this.nextButton.addEventListener("click", function() {
            portfolio.nextProject();
        })
        this.prevButton.addEventListener("click", function() {
            portfolio.prevProject();
        })
        this.closeButton.addEventListener("click", function() {
            portfolio.closeProject();
        })
    }
    isModalOpen() {
        return this.modal.classList.contains("active");
    }
    updateProgressBar(projectIndex) {
        this.progressBar.style.width = ((projectIndex + 1) / (this.projects.data.length)) * 100 + "%"
    }
    nextProject() {
        let project = parseInt(this.modal.getAttribute(this.data_portfolio_attr));
        if(project + 1 == this.projects.data.length) return;
        this.loadProject(project + 1, this.action.NEXT);
    }
    prevProject() {
        let project = parseInt(this.modal.getAttribute(this.data_portfolio_attr));
        if(project - 1 < 0) return;
        this.loadProject(project - 1, this.action.PREV);
    }
    closeProject() {
        this.modal.classList.remove("active");
        document.querySelector("body").classList.remove("has-modal");
    }
    loadProject(projectIndex, action = null) {
        let portfolio = this;
        this.modal.scrollTop = 0;
        this.updateProgressBar(projectIndex);
        this.modal.setAttribute(this.data_portfolio_attr, projectIndex);
        this.modal.classList.add("active");
        document.querySelector("body").classList.add("has-modal");
        let project = this.projects.data[projectIndex];
        mixpanel.track("Open Project", {
            "name": project.name
        });
        let timeout = 0;
        if(action != null) {
            timeout = 1000;
            this.wrapper.classList.add(action + "Animate1");
            setTimeout(function() {
                portfolio.wrapper.classList.remove(action + "Animate1");
                portfolio.wrapper.classList.add(action + "Animate2");
            }, 500);
        }
        setTimeout(function() {
            if(action != null) {    
                portfolio.wrapper.classList.remove(action + "Animate2");
            }
            portfolio.modal.querySelector("h1").innerText = project.name;
            portfolio.modal.querySelector("h2").innerText = project.position.name;
            portfolio.modal.querySelector("h3").innerText = project.date;
            portfolio.modal.querySelector(".info").innerHTML = project.description;
            portfolio.modal.querySelector(".tags").innerHTML = "";
            for(let j in project.tags) {
                let tag = project.tags[j];
                portfolio.modal.querySelector(".tags").insertAdjacentHTML("beforeend", '<span class="tag">'+tag.name+'</span>');
            }
            if(project.is_ongoing) {
                portfolio.modal.querySelector(".tags").insertAdjacentHTML("beforeend", '<span class="tag green">Ongoing</span>')
            }
            if(project.url != null) {
                portfolio.modal.querySelector(".website").style.display = "block";
                portfolio.modal.querySelector(".btn").href = project.url;
            } else {
                portfolio.modal.querySelector(".website").style.display = "none";
                portfolio.modal.querySelector(".btn").href = "";
            }
            portfolio.modal.querySelector(".photos").innerHTML = "";
            for(let j in project.screenshots) {
                let screenshot = project.screenshots[j];
                portfolio.modal.querySelector(".photos").insertAdjacentHTML("beforeend", `<img src="${JuvarAbrera.API_ROOT_URL}${screenshot.image}" width="100%"/>`)
            }
            if(project.client != null) {
                portfolio.modal.querySelector("img.company").src = JuvarAbrera.API_ROOT_URL + (project.client.logo_white == null ? project.client.logo : project.client.logo_white);
                portfolio.modal.querySelector("img.company").alt = project.client.name;
                portfolio.modal.querySelector("img.company").title = project.client.name;
            } else {
                portfolio.modal.querySelector("img.company").src = "";
                portfolio.modal.querySelector("img.company").alt = "";
                portfolio.modal.querySelector("img.company").title = "";
            }
        }, timeout);
        


        if(projectIndex + 1 == this.projects.data.length) {
            this.nextButton.classList.add("inactive")   
        } else {
            this.nextButton.classList.remove("inactive")
        }
        if(projectIndex - 1 == -1) {
            this.prevButton.classList.add("inactive")   
        } else {
            this.prevButton.classList.remove("inactive")
        }
    }
    async loadData() {
        if(this.projects != null) return
        this.projects = await fetch(`${JuvarAbrera.API_ROOT_URL}/project`).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        });
        this.container.querySelectorAll(".loading").forEach(loading => {
            loading.remove();
        })
        this.projects.data = this.projects.data.reverse();
        let ongoing_projects = 0;
        for(let i in this.projects.data) {
            let project = this.projects.data[i];
            var clone = this.template.cloneNode(true);
            if(project.is_featured) {
                clone.classList.add("featured");
            }
            clone.querySelector("h3").innerText = project.name;
            clone.querySelector("h5").innerText = project.position.name;
            clone.querySelector("p").innerText = project.description;
            if(project.client != null) {
                if(project.is_featured) {
                    clone.querySelector("img").src = JuvarAbrera.API_ROOT_URL + project.client.logo_white;
                } else {
                    clone.querySelector("img").src = JuvarAbrera.API_ROOT_URL + project.client.logo;
                }
                clone.querySelector("img").alt = project.client.name;
                clone.querySelector("img").title = project.client.name;
            }
            clone.querySelector("a").setAttribute(this.data_portfolio_attr, i);
            clone.querySelector("span").innerText = project.date;
            clone.querySelector(".portfolio-ss").style.backgroundImage = `url(${JuvarAbrera.API_ROOT_URL}${project.thumbnail})`;
            clone.removeAttribute("data-template");
            if(project.is_featured) {
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag">Featured</span>`)
            }
            for(let j in project.tags) {
                let tag = project.tags[j];
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", `<span class="tag">${tag.name}</span>`)
            }
            if(project.end_date == null && !project.is_featured) {
                ongoing_projects++;
                clone.querySelector(".tags").insertAdjacentHTML("beforeend", '<span class="tag green">Ongoing</span>')
            }
            if(i >= this.max_portfolio_show_per_load) {
                clone.classList.add("d-none");
            }
            this.container.insertAdjacentElement("beforeend", clone);
            let portfolio = this;
            clone.querySelector("a").addEventListener("click", function(el) {
                let project = this.getAttribute(portfolio.data_portfolio_attr)
                portfolio.loadProject(parseInt(project));
            });
        }
        if(document.getElementById("num_projects") != null)
            document.getElementById("num_projects").setAttribute("data-animate-number-to", this.projects.data.length);
        if(document.getElementById("num_projects_ongoing") != null)
            document.getElementById("num_projects_ongoing").setAttribute("data-animate-number-to", ongoing_projects);
    }
}