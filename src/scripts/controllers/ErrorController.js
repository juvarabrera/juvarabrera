App.Controller["ErrorController"] = {
	"construct": function(parameters) {

	}, 
	"index": function(parameters) {
		alert("Error");
	},
	"controller-not-found": function(parameters) {
		$(".template").html("<div style=\"padding: 24px\"><h1>Error</h1> Controller, "+parameters[0]+", not found.<br><br><a href=\"#/"+App.Utility.getControllerCode(parameters[0])+"/"+parameters[1]+"\" class=\"button\">Refresh</a></div>");
	},
	"action-not-found": function(parameters) {
		$(".template").html("<div style=\"padding: 24px\"><h1>Error</h1> Action, "+parameters[1]+", in "+parameters[0]+" not found.<br><br><a href=\"#/"+App.Utility.getControllerCode(parameters[0])+"/"+parameters[1]+"\" class=\"button\">Refresh</a></div>");
	},
	"template-not-found": function(parameters) {
		$(".template").html("<div style=\"padding: 24px\"><h1>Error</h1> Template, "+parameters[0]+", in app/views/ not found.<br><br><a href=\"#/"+App.Utility.getControllerCode(parameters[0])+"/"+parameters[1]+"\" class=\"button\">Refresh</a></div>");
	},
	"page-not-found": function(parameters) {
		$(".template").html("<div style=\"padding: 24px\"><h1>Error</h1> Page, "+parameters[1]+".html, in app/views/"+parameters[0]+"/ not found.<br><br><a href=\"#/"+App.Utility.getControllerCode(parameters[0])+"/"+parameters[1]+"\" class=\"button\">Refresh</a></div>");
	}
}