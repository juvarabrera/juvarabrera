const CHARACTERS = {
    "separator": [
        [0,0,0,0,0,0,0]
    ],
    " ": [
        [0,0,0,0,0,0,0]
    ],
    "-": [
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0]
    ],
    "_": [
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,0,1]
    ],
    "a": [
        [0,0,0,1,1,0,0],
        [0,0,1,0,0,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,1,0]
    ],
    "b": [
        [1,1,1,1,1,1,0],
        [0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0],
        [0,0,0,1,1,0,0]
    ],
    "c": [
        [0,0,0,1,1,0,0],
        [0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0],
        [0,0,0,0,1,0,0]
    ],
    "d": [
        [0,0,0,1,1,0,0],
        [0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0],
        [1,1,1,1,1,1,0]
    ],
    "e": [
        [0,0,1,1,1,0,0],
        [0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0],
        [0,0,1,1,0,0,0]
    ],
    "f": [
        [0,0,0,1,0,0,0],
        [0,1,1,1,1,1,0],
        [1,0,0,1,0,0,0],
        [0,1,0,0,0,0,0]
    ],
    "g": [
        [0,0,0,1,0,0,0],
        [0,0,1,0,1,0,1],
        [0,0,1,0,1,0,1],
        [0,0,0,1,1,1,0]
    ],
    "h": [
        [0,1,1,1,1,1,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,1,1,0]
    ],
    "i": [
        [0,1,0,1,1,1,0]
    ],
    "j": [
        [0,0,0,0,0,1,0],
        [0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0]
    ],
    "k": [
        [0,1,1,1,1,1,0],
        [0,0,0,1,0,0,0],
        [0,0,1,0,1,1,0]
    ],
    "l": [
        [1,1,1,1,1,0,0],
        [0,0,0,0,0,1,0]
    ],
    "m": [
        [0,0,1,1,1,1,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,1,1,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,1,1,0]
    ],
    "n": [
        [0,0,1,1,1,1,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,1,1,0]
    ],
    "o": [
        [0,0,0,1,1,1,0],
        [0,0,0,1,0,1,0],
        [0,0,0,1,1,1,0]
    ],
    "p": [
        [0,0,1,1,1,1,1],
        [0,0,1,0,1,0,0],
        [0,0,0,1,1,0,0]
    ],
    "q": [
        [0,0,0,1,1,0,0],
        [0,0,1,0,1,0,0],
        [0,0,1,1,1,1,1],
        [0,0,0,0,0,0,1]
    ],
    "r": [
        [0,0,1,1,1,1,0],
        [0,0,0,1,0,0,0],
        [0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0]
    ],
    "s": [
        [0,0,1,1,0,1,0],
        [0,1,0,1,0,1,0],
        [0,1,0,0,1,0,0]
    ],
    "t": [
        [0,0,1,0,0,0,0],
        [1,1,1,1,1,1,0],
        [0,0,1,0,0,1,0]
    ],
    "u": [
        [0,0,1,1,1,1,0],
        [0,0,0,0,0,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,1,0]
    ],
    "v": [
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,1,0],
        [0,0,1,1,1,0,0]
    ],
    "w": [
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,0,1,0],
        [0,0,1,1,1,0,0]
    ],
    "x": [
        [0,0,1,0,0,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,0,0,1,0]
    ],
    "y": [
        [0,0,1,1,1,0,1],
        [0,0,0,0,1,0,1],
        [0,0,1,1,1,1,1]
    ],
    "z": [
        [0,1,0,0,1,1,0],
        [0,1,0,1,0,1,0],
        [0,1,1,0,0,1,0]
    ],
    "A": [
    ],
    "B": [
    ],
    "C": [
    ],
    "D": [
    ],
    "E": [
    ],
    "F": [
    ],
    "G": [
    ],
    "H": [
    ],
    "I": [
    ],
    "J": [
    ],
    "K": [
    ],
    "L": [
    ],
    "M": [
    ],
    "N": [
    ],
    "O": [
    ],
    "P": [
    ],
    "Q": [
    ],
    "R": [
    ],
    "S": [
    ],
    "T": [
    ],
    "U": [
    ],
    "V": [
    ],
    "W": [
    ],
    "X": [
    ],
    "Y": [
    ],
    "Z": [
    ]
}
class GitArtPlanner {
    constructor(container) {
        this.monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        this.container = container;
        this.renderBlank();
        this.characters = CHARACTERS;
        this.separatorBetweenLetters = CHARACTERS["separator"];
    }
    renderText(text = "") {
        let obj = this;
        let highlights = [];
        let errorLetters = [];
        // if (text == "") return;
        let letters = text.split("");
        let dates = [];
        
        letters.forEach((letter, letterIndex) => {
            if (!obj.characters.hasOwnProperty(letter) && errorLetters.indexOf(letter) == -1) {
                errorLetters.push(letter);
                return;
            }
            if (obj.characters[letter].length == 0 && errorLetters.indexOf(letter) == -1) {
                errorLetters.push(letter);
                return;
            }
            highlights.push(...obj.characters[letter]);
            if (letterIndex != letters.length)
                highlights.push(...obj.separatorBetweenLetters);
        });
        this.container.querySelectorAll("[data-date]").forEach(day => {
            day.classList.remove("highlight");
        })
        document.querySelectorAll(".contribution-week").forEach(week => {
            if(week.querySelector(".transparent") != null) return;
            if(highlights.length == 0) return; 

            let highlight = highlights[0];
            week.querySelectorAll("[data-date]").forEach((day, dayIndex) => {
                if (highlight[dayIndex] == 1) {
                    day.classList.add("highlight");
                    dates.push(day.getAttribute("data-date"));
                }
            });
            highlights.shift();
        });

        return {
            "errorLetters": errorLetters,
            "dates": dates
        }
    }
    renderBlank(today = new Date()) {
        this.container.innerHTML = "";
        let inOneYear = new Date(today.getFullYear()+1, today.getMonth(), today.getDate() - 1);
        let week = null;
        let hasLastWeek = false;
        let yearMainContainer = document.createElement("div");
        yearMainContainer.classList.add("contribution-year");
        this.container.insertAdjacentElement("beforeend",yearMainContainer);

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
        while (true) {
            let dateString = today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? "0"+(today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
            if (today.getDay() == 0 && week != null) {
                hasLastWeek = false;
                yearContainer.insertAdjacentElement("beforeend",week);
            }
            if (week == null || today.getDay() == 0) {
                week = document.createElement("div");
                week.classList.add("contribution-week");
                let week_label = document.createElement("div");
                week_label.classList.add("contribution-week-label");
                let next7Days = new Date(today.getTime());
                next7Days.setDate(today.getDate() + (6 - today.getDay()));
                if ((today.getMonth() == next7Days.getMonth() && today.getDate() <= 7 && next7Days.getDate() <= 7) || 
                    today.getMonth() != next7Days.getMonth()) {
                    week_label.textContent = this.monthString[next7Days.getMonth()]
                }
                week.insertAdjacentElement("beforeend", week_label);
                for (let i = 0; i < today.getDay(); i++) {
                    let day = document.createElement("div");
                    day.classList.add("contribution-day");
                    day.classList.add("transparent");
                    let dateString2 = today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? "0"+(today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
                    week.insertAdjacentElement("beforeend", day);
                }
                hasLastWeek = true;
            }
            let day = document.createElement("div");
            day.classList.add("contribution-day");
            day.setAttribute("data-date", dateString);
            // day.textContent = oneYearAgo.getDay();
            week.insertAdjacentElement("beforeend", day);
            if (!(inOneYear.getFullYear() != today.getFullYear() ||
            inOneYear.getMonth() != today.getMonth() ||
            inOneYear.getDate() != today.getDate())) break;
            today.setDate(today.getDate() + 1);
        }
        if (hasLastWeek) {
            yearContainer.insertAdjacentElement("beforeend",week);
        }
    }
}