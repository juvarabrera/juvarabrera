class Clockify {
    constructor() {
        this.workspace = null;
        this.user = null;
        this.time_entries = null;
        this.is_timer_started = false;
        this.duration = 0;
        this.currentTimeEntry = null;
        this.lastEntryId = null;
    }
    getDuration(total_seconds) {
        var h = 0,
            m = 0,
            s = 0;
        h = Math.floor(total_seconds / 60 / 60);
        total_seconds -= h * 60 * 60;
        m = Math.floor(total_seconds / 60);
        total_seconds -= m * 60;
        s = total_seconds;
        return {
            "h": h,
            "m": m,
            "s": s,
        }
    }
    getDurationString(total_seconds) {
        total_seconds = Math.floor(total_seconds);
        var duration = this.getDuration(total_seconds);
        return `${duration.h}h ${duration.m < 10 ? "0" + duration.m : duration.m}m ${duration.s < 10 ? "0" + duration.s : duration.s}s`
        // return duration.h.toLocaleString();
    }
    async getWorkSpace() {
        return await fetch(`${JuvarAbrera.API_ROOT_URL}/clockify/workspaces`).then(function(response) {
            return response.json();
        })
    }
    async getUser() {
        return await fetch(`${JuvarAbrera.API_ROOT_URL}/clockify/user`).then(function(response) {
            return response.json();
        })
    }
    async getTimeEntries() {
        let clockify = this;
        return await fetch(`${JuvarAbrera.API_ROOT_URL}/clockify/workspaces/${this.workspace.id}/user/${this.user.id}/time-entries`).then(function(response) {
            return response.json();
        })
    }
    async getReport(timeframe) {
        return await fetch(`${JuvarAbrera.API_ROOT_URL}/clockify/workspaces/${this.workspace.id}/reports/summary/${timeframe}`, {
            "method": "POST"
        }).then(function(response) {
            return response.json();
        });
    }
    async start() {
        let clockify = this;
        this.workspace = await this.getWorkSpace();
        this.user = await this.getUser();
    }
    async loadReport() {
        let clockify = this;
        let monthlyReport = await clockify.getReport("monthly");
        if(document.getElementById("num_worked_month") != null) 
            document.getElementById("num_worked_month").setAttribute("data-animate-number-to", clockify.getDuration(monthlyReport.duration).h);
        let yearlyReport = await clockify.getReport("yearly");
        if(document.getElementById("num_worked_year") != null)
            document.getElementById("num_worked_year").setAttribute("data-animate-number-to", clockify.getDuration(yearlyReport.duration).h);
    }
    async start_timer() {
        if(this.is_timer_started)
        return;
        this.is_timer_started = true;
        let clockify = this;
        setInterval(function() {
            if(clockify.currentTimeEntry != null) {
                clockify.duration += 1;
            }
            if(clockify.duration == 0) {
                document.getElementById("is_working").classList.remove(["yes","break"]);
            } else if(clockify.duration > 0) {
                if(clockify.currentTimeEntry != null) {
                    document.getElementById("is_working").classList.add("yes")
                    document.getElementById("is_working").classList.remove("break");
                } else {
                    document.getElementById("is_working").classList.add("break")
                    document.getElementById("is_working").classList.remove("yes");
                }
            }
            let x = clockify.getDurationString(clockify.duration);
            if(document.getElementById("num_worked_today") != null) {
                document.getElementById("num_worked_today").innerHTML = x;
            }
            document.getElementById("num_worked_today2").innerHTML = x;
        }, 1000);
    }
    async checkForTimeEntries() {
        let clockify = this;
        this.time_entries = await this.getTimeEntries();
        if(this.time_entries.currentTimeEntry != null) {
            if(this.lastEntryId == null) {
                this.lastEntryId = this.time_entries.currentTimeEntry.id;
                this.currentTimeEntry = this.time_entries.currentTimeEntry;
            }
        }
        this.duration = this.time_entries.duration;

        this.start_timer(false)
        setTimeout(function() {
            clockify.checkForTimeEntries()
        }, 5000)
    }
}