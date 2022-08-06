Oslo.Controller["WorkController"] = {
	"construct": function(parameters) {

	},
	"index": function(parameters) {
		mixpanel.track("Work");
		return Oslo.View.render();
	},
	"git-art-planner": function(parameters) {
		mixpanel.track("Git Art Planner");
		return Oslo.View.render();
	}
}