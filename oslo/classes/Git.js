class Git {
    constructor(startYear = "default") {
        this.startYear = startYear;
        this.container = document.querySelector(".contributions");
        this.contributions = null;
        this.monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        this.render();
        let git = this;
        this.dict = {};
        window.addEventListener('scroll', function() {
            let position = git.container.getBoundingClientRect();
            if(git.container.hasAttribute("data-animate")) return;
            // if(position.top >= 0 && position.bottom <= window.innerHeight) {
            if(position.top >= 0 || position.bottom <= window.innerHeight) {
                if(git.contributions != null) {
                    git.container.setAttribute("data-animate", "");
                    git.show();
                }
            }
        });
    }
    render() { 
        let yearsToRender = [];
        if (this.startYear == "default") {
            yearsToRender.push(this.startYear);
        } else {
            let today = new Date();
            for(let i = this.startYear; i <= today.getFullYear(); i++) {
                yearsToRender.push(i);
            }
        }
        let obj = this;
        yearsToRender.forEach(today => {
            if(today != "default")
                today = new Date(today,11,31);
            else
                today = new Date();
            let oneYearAgo = new Date(today.getFullYear()-1, today.getMonth(), today.getDate() + 1);
            let week = null;
            let hasLastWeek = false;
            let yearMainContainer = document.createElement("div");
            yearMainContainer.classList.add("contribution-year");
            obj.container.insertAdjacentElement("beforeend",yearMainContainer);

            let yearHeader = document.createElement("h3");
            yearHeader.textContent = today.getFullYear();
            yearMainContainer.insertAdjacentElement("beforeend",yearHeader);

            let yearContainer = document.createElement("div");
            yearContainer.classList.add("contribution-calendar");
            yearMainContainer.insertAdjacentElement("beforeend",yearContainer);

            let dayLabel = document.createElement("div");
            dayLabel.classList.add("contribution-day-label");
            let weekLabel = document.createElement("div");
            weekLabel.classList.add("contribution-week-label");
            dayLabel.insertAdjacentElement("beforeend",weekLabel);
            ["","M","","W","","F",""].forEach(dayString => {
                let dayDiv = document.createElement("div");
                dayDiv.textContent = dayString;
                dayLabel.insertAdjacentElement("beforeend",dayDiv);
            });
            yearContainer.insertAdjacentElement("beforeend",dayLabel);
            while(true) {
                let dateString = oneYearAgo.getFullYear() + "-" + ((oneYearAgo.getMonth() + 1) < 10 ? "0"+(oneYearAgo.getMonth() + 1) : (oneYearAgo.getMonth() + 1)) + "-" + (oneYearAgo.getDate() < 10 ? "0" + oneYearAgo.getDate() : oneYearAgo.getDate());
                if(oneYearAgo.getDay() == 0 && week != null) {
                    hasLastWeek = false;
                    yearContainer.insertAdjacentElement("beforeend",week);
                }
                if(week == null || oneYearAgo.getDay() == 0) {
                    week = document.createElement("div");
                    week.classList.add("contribution-week");
                    let week_label = document.createElement("div");
                    week_label.classList.add("contribution-week-label");
                    let next7Days = new Date(oneYearAgo.getTime());
                    next7Days.setDate(oneYearAgo.getDate() + (6 - oneYearAgo.getDay()));
                    if((oneYearAgo.getMonth() == next7Days.getMonth() && oneYearAgo.getDate() == 1) || oneYearAgo.getMonth() != next7Days.getMonth()) {
                        week_label.textContent = obj.monthString[next7Days.getMonth()]
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
                week.insertAdjacentElement("beforeend", day);
                if(!(oneYearAgo.getFullYear() != today.getFullYear() ||
                oneYearAgo.getMonth() != today.getMonth() ||
                oneYearAgo.getDate() != today.getDate())) break;
                oneYearAgo.setDate(oneYearAgo.getDate() + 1);
            }
            if(hasLastWeek) {
                yearContainer.insertAdjacentElement("beforeend",week);
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
        this.contributions = await fetch(`${JuvarAbrera.API_ROOT_URL}/git${(this.type != "default") ? "?all" : ""}`).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        });
        this.dict = {}
        for(let i = 0; i < this.contributions.length; i++) {
            this.dict[this.contributions[i].date] = this.contributions[i].total_count;
        }
        let total_count = 0;
        let longestDayStreak = 0;
        let longestDayStreakEndDate = null;
        let currentDayStreak = null;
        if (this.contributions.length == 0) return;
        var date = this.contributions[0].date.split("-");
        let currentDate = new Date(date[0],date[1]-1,date[2]);
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        while(true) {
            let date = currentDate.getFullYear() + "-" + ((currentDate.getMonth() + 1) < 10 ? "0"+(currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)) + "-" + (currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate());
            let dateObj = new Date(date);
            if(this.dict.hasOwnProperty(date)) {
                let count = this.dict[date];
                total_count += count;
                if(count > 0) {
                    if(currentDayStreak == null)
                        currentDayStreak = dateObj
                } else {
                    currentDayStreak = null;
                }
            } else {
                currentDayStreak = null;
            }
            if(currentDayStreak != null) {
                let dayStreak = (dateObj - currentDayStreak) / (60 * 60 * 24 * 1000);
                if(dayStreak > longestDayStreak) {
                    longestDayStreak = dayStreak;
                    longestDayStreakEndDate = dateObj;
                }
            }

            if(!(currentDate.getFullYear() != today.getFullYear() ||
                currentDate.getMonth() != today.getMonth() ||
                currentDate.getDate() != today.getDate())) break;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if(document.getElementById("num_contribution_total") != null)
            document.getElementById("num_contribution_total").setAttribute("data-animate-number-to", total_count);
        if(document.getElementById("num_contribution_days_streak") != null)
            document.getElementById("num_contribution_days_streak").setAttribute("data-animate-number-to", longestDayStreak);
        let longestDayStreakStartDate = new Date(longestDayStreakEndDate.getTime());
        longestDayStreakStartDate.setDate(longestDayStreakStartDate.getDate() - longestDayStreak);
        if(document.getElementById("num_contribution_days_streak_date") != null)
            document.getElementById("num_contribution_days_streak_date").textContent = this.monthString[longestDayStreakStartDate.getMonth()] + " " + longestDayStreakStartDate.getDate() + ", " + longestDayStreakStartDate.getFullYear() + " - " + this.monthString[longestDayStreakEndDate.getMonth()] + " " + longestDayStreakEndDate.getDate() + ", " + longestDayStreakEndDate.getFullYear();
    }
    async show() {
        // let obj = this;
        // let weekElements = this.container.querySelectorAll(".contribution-week");
        // for(let i = 0; i < weekElements.length; i++) {
        //     let weekElement = weekElements[i];
        //     weekElement.querySelectorAll(".contribution-day").forEach(dayElement => {
        //         let date = dayElement.getAttribute("data-date");
        //         let count = obj.dict[date];
        //         dayElement.setAttribute("data-count", count);
        //         let title = date + "\n";
        //         if(count >= 1) {
        //             title += count + " contribution";
        //         } else if(count == 0) {
        //             title += "No contribution";
        //         } 
        //         if(count > 1) {
        //             title += "s";
        //         }
        //         dayElement.setAttribute("title", title);
        //         if(count >= 25) {
        //             dayElement.style.backgroundColor = "rgba(0,92,185,1)";
        //         } else if(count >= 20) {
        //             dayElement.style.backgroundColor = "rgba(0,92,185,0.9)";
        //         } else if(count >= 15) {
        //             dayElement.style.backgroundColor = "rgba(0,92,185,0.8)";
        //         } else if(count >= 10) {
        //             dayElement.style.backgroundColor = "rgba(0,92,185,0.7)";
        //         } else if(count >= 5) {
        //             dayElement.style.backgroundColor = "rgba(0,92,185,0.6)";
        //         } else if(count >= 1) {
        //             dayElement.style.backgroundColor = "rgba(0,92,185,0.5)";
        //         }
        //     });
        //     await obj.timeout();
        // }

        for(let i = 0; i < this.contributions.length; i++) {
            let dayElement = this.container.querySelector(`.contribution-day[data-date='${this.contributions[i].date}']`);
            if(dayElement == null) continue
            let count = this.contributions[i].total_count;
            dayElement.setAttribute("data-count", count);
            let title = this.contributions[i].date + "\n";
            if(count >= 1) {
                title += count + " contribution";
            } else if(count == 0) {
                title += "No contribution";
            } 
            if(count > 1) {
                title += "s";
            }
            dayElement.setAttribute("title", title);
            let dayTooltip = document.createElement("div");
            dayTooltip.classList.add("contribution-day-tooltip");
            dayTooltip.innerHTML = title.replace("\n", "<br>");
            dayElement.insertAdjacentElement("beforeend", dayTooltip);
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
            if(count != 0) await this.timeout();
        }
    }
}