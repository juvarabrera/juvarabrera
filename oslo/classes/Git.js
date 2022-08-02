class Git {
    constructor() {
        this.container = document.querySelector(".contribution-calendar");
        var today = new Date();
        var oneYearAgo = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
        let week = null;
        this.contributions = null;
        let hasLastWeek = false;
        let monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
        while(oneYearAgo.getFullYear() != today.getFullYear() ||
            oneYearAgo.getMonth() != today.getMonth() ||
            oneYearAgo.getDate() != today.getDate() + 1) {
            let dateString = oneYearAgo.getFullYear() + "-" + ((oneYearAgo.getMonth() + 1) < 10 ? "0"+(oneYearAgo.getMonth() + 1) : (oneYearAgo.getMonth() + 1)) + "-" + (oneYearAgo.getDate() < 10 ? "0" + oneYearAgo.getDate() : oneYearAgo.getDate());
            if(oneYearAgo.getDay() == 0 && week != null) {
                hasLastWeek = false;
                this.container.insertAdjacentElement("beforeend",week);
            }
            if(week == null || oneYearAgo.getDay() == 0) {
                week = document.createElement("div");
                week.classList.add("contribution-week");
                let week_label = document.createElement("div");
                week_label.classList.add("contribution-week-label");
                let next7Days = new Date(oneYearAgo.getTime());
                next7Days.setDate(oneYearAgo.getDate() + 7);
                if(oneYearAgo.getMonth() != next7Days.getMonth()) {
                    week_label.textContent = monthString[next7Days.getMonth()]
                }
                week.insertAdjacentElement("beforeend", week_label);
                for(let i = 0; i < oneYearAgo.getDay(); i++) {
                    let day = document.createElement("div");
                    day.classList.add("contribution-day")
                    day.classList.add("transparent")
                    week.insertAdjacentElement("beforeend", day);
                }
                hasLastWeek = true;
            }
            let day = document.createElement("div");
            day.classList.add("contribution-day");
            day.setAttribute("data-date", dateString);
            // day.textContent = oneYearAgo.getDay();
            week.insertAdjacentElement("beforeend", day);
            oneYearAgo.setDate(oneYearAgo.getDate() + 1);
        }
        if(hasLastWeek) {
            this.container.insertAdjacentElement("beforeend",week);
        }
        let git = this;
        window.addEventListener('scroll', function() {
            let position = git.container.getBoundingClientRect();
            if(git.container.hasAttribute("data-animate")) return;
            if(position.top >= 0 && position.bottom <= window.innerHeight) {
                if(git.contributions != null) {
                    git.container.setAttribute("data-animate", "");
                    git.show();
                }
            }
        });
    }
    timeout() {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, 1);
        });
    }
    async loadData() {
        if(this.projects != null) return
        this.contributions = await fetch(`${JuvarAbrera.API_ROOT_URL}/git`).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        });
    }
    async show() {
        for(let i = 0; i < this.contributions.length; i++) {
            let dayElement = this.container.querySelector(`.contribution-day[data-date='${this.contributions[i].date}']`);
            if(dayElement == null) continue
            let count = this.contributions[i].total_count;
            dayElement.setAttribute("data-count", count);
            var title = this.contributions[i].date + "\n";
            if(count >= 1) {
                title += count + " contribution";
            } else if(count == 0) {
                title += "No contribution";
            } 
            if(count > 1) {
                title += "s";
            }
            dayElement.setAttribute("title", title);
            if(count >= 25) {
                dayElement.style.backgroundColor = "rgba(0,92,185,1)";
            } else if(count >= 20) {
                dayElement.style.backgroundColor = "rgba(0,92,185,0.9)";
            } else if(count >= 15) {
                dayElement.style.backgroundColor = "rgba(0,92,185,0.8)";
            } else if(count >= 10) {
                dayElement.style.backgroundColor = "rgba(0,92,185,0.7)";
            } else if(count >= 5) {
                dayElement.style.backgroundColor = "rgba(0,92,185,0.6)";
            } else if(count >= 1) {
                dayElement.style.backgroundColor = "rgba(0,92,185,0.5)";
            }
            await this.timeout();
        }
    }
}