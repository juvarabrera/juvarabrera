Oslo.Controller["SpeakingController"] = {
	"construct": function(parameters) {
		
	},
	"index": function(parameters) {
		mixpanel.track("Speaking");
		return Oslo.View.render();
	}
}