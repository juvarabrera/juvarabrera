Oslo["View"] = {
	"construct": function(parameters) {
		this.setTemplate(Oslo.Constant.DEFAULT_TEMPLATE);
	},
	"setTemplate": function(template) {
		this["TEMPLATE"] = template;
		return this;
	},
	"data": {},
	"set": function(name, val) {
		this.data[name] = val;
	},
	"setJson": function(json) {
		for(var i in json)
			this.data[i] = json[i];
	},
	"render": function() {
		if(document.querySelector("#view") != null) {
			this.loadPage(false);
		} else {
			let template = this.TEMPLATE;
			fetch(`views/${template}.html`).then(response => {
				return response.text()
			}).then(html => {
				$(".app").html(html);
				Oslo.View.loadPage();
			}).catch(error => {
				console.log(error);
				Oslo.location("error", "template-not-found", [template, Oslo.Utility.getControllerCode(Oslo.CONTROLLER), Oslo.ACTION])
			});
		}
		return true;
	},
	"loadPage": function() {
		fetch(`views/${Oslo.Utility.getControllerCode(Oslo.CONTROLLER)}/${Oslo.ACTION}.html`).then(response => {
			return response.text()
		}).then(content => {
			for(var i in Oslo.View.data) {
				content = content.replace(new RegExp("{{"+i+"}}", "g"), Oslo.View.data[i]);
			}
			$("<div></div>").html(content).children().each(function() {
				$(".app").find("#"+$(this).attr("id")).html($(this).html());
			});
			$(document).scrollTop(0)
			$(".app").attr("oslo-controller", Oslo.Utility.getControllerCode(Oslo.CONTROLLER))
						.attr("oslo-action", Oslo.ACTION);
			Oslo.View.destruct();
		}).catch(error => {
			console.log(error);
			
		});
	},
	"destruct": function() {
		console.log()
		document.querySelector(".logo-container .bg").classList.add("show");
		$(`nav a`).removeClass("active");
		$(`nav a[href="#/${Oslo.Utility.getControllerCode(Oslo.CONTROLLER)}"]`).addClass("active");
		// $(document).find("[data-bulaga]").each(function() {
		// 	var val = $(this).attr("data-bulaga").split(" ");
		// 	var options = {};
		// 	var map = {
		// 		"slide-up": ["animation", "SLIDE_UP"],
		// 		"slide-left": ["animation", "SLIDE_LEFT"],
		// 		"slide-right": ["animation", "SLIDE_RIGHT"],
		// 		"slide-down": ["animation", "SLIDE_DOWN"],
		// 		"bounce": ["bounce", true],
		// 		"repeat": ["repeat", true]
		// 	}
		// 	for(var x in val) {
		// 		if(map.hasOwnProperty(val[x]))
		// 			options[map[val[x]][0]] = map[val[x]][1];
		// 	}
		// 	$(this).bulaga(options);
		// });
	}
}