App["KeyboardListener"] = {
	"keys": {},
	"ready": function() {
		function key(code) {
			if(App.KeyboardListener.keys.hasOwnProperty(code))
				return true;
			return false;
		}
		$(document).keydown(function(e) {
			App.KeyboardListener.keys[e.which] = true;

			var shift = key(16),
				ctrl = key(17),
				alt = key(18);

			// if(shift && key(40)) {

			// }
		})
	}
}