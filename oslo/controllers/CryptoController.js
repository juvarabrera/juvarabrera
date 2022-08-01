Oslo.Controller["CryptoController"] = {
	"construct": function(parameters) {
		
	},
	"index": function(parameters) {
		mixpanel.track("Crypto");
		return Oslo.View.render();
	},
	"futures": function(parameters) {
		mixpanel.track("Crypto Futures");
		return Oslo.View.render();
	}
}