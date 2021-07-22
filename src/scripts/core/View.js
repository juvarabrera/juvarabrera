App["View"] = {
	"construct": function(parameters) {
		this.setTemplate(App.Constant.DEFAULT_TEMPLATE);
		$(".template").html("");
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
		var template = this.TEMPLATE;
		if(template == false) {
			this.loadPage(false);
		} else {
			$.ajax({
				"url": "views/"+template+".html",
				"cache": true,
				"success": function(html) {
					App.View.loadPage(html);
				},
				"error": function(e) {
					App.location("error", "template-not-found", [template, App.Utility.getControllerCode(App.CONTROLLER), App.ACTION])
				}
			});
		}
		return true;
	},
	loadPage: function(html) {
		$.ajax({
			"cache": true,
			"url": "views/"+App.Utility.getControllerCode(App.CONTROLLER)+"/"+App.ACTION+".html",
			"success": function(html2) {
				for(var i in App.View.data) {
					html2 = html2.replace(new RegExp("{{"+i+"}}", "g"), App.View.data[i]);
				}
				if(html == false) {
					$(".template").html(html2);
				} else {
					$(".template").html(html);
					$("<div></div>").html(html2).children().each(function() {
						$(".template").html($(".template").html().replace(new RegExp("{{"+$(this).attr("id")+"}}", "g"), $(this).html()));
					});
				}
				$(".template").attr("moon-controller", App.Utility.getControllerCode(App.CONTROLLER))
							  .attr("moon-action", App.ACTION);
				App.View.destruct();
			},
			"error": function(e) {
				App.location("error", "page-not-found", [App.Utility.getControllerCode(App.CONTROLLER), App.ACTION])
			}
		});
	},
	"destruct": function() {
		$(document).find("[data-bulaga]").each(function() {
			var val = $(this).attr("data-bulaga").split(" ");
			var options = {};
			var map = {
				"slide-up": ["animation", "SLIDE_UP"],
				"slide-left": ["animation", "SLIDE_LEFT"],
				"slide-right": ["animation", "SLIDE_RIGHT"],
				"slide-down": ["animation", "SLIDE_DOWN"],
				"bounce": ["bounce", true],
				"repeat": ["repeat", true]
			}
			for(var x in val) {
				if(map.hasOwnProperty(val[x]))
					options[map[val[x]][0]] = map[val[x]][1];
			}
			$(this).bulaga(options);
		});
	}
}