define(["dojo/_base/declare"], function(declare) {
	return declare(null, {
		capitaliseFirstLetter: function(inp) {
			var enteredStringArray = inp.split(" ");
			for(var i = 0, l = enteredStringArray.length; i < l; i++) {
				var firstLetter = enteredStringArray[i].charAt(0).toUpperCase();
				enteredStringArray[i] = firstLetter + enteredStringArray[i].substr(1);
			}
			return enteredStringArray.join(" ");
		}
	});
});