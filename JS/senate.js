var data = $.getJSON('../JSON/113-senate-members.json', function(data) {
    console.log("success");
    var members = data.results[0].members



    for (var i = 0; i < members.length; i++) {
        var table = "<tr>";
        table += "<td>" + '<a href="' + members[i].url + '">' + members[i].first_name + " " + checkMidName(members[i].middle_name) + " " + members[i].last_name + "</a>" + "</td>";
        table += "<td>" + members[i].state + "</td>";
        table += "<td>" + members[i].party + "</td>";
        table += "<td>" + members[i].seniority + "</td>";
        table += "<td>" + members[i].votes_with_party_pct + "%</td>";
        table += "</tr>";

        $("#member-senate").append(table);

    }

})

function checkMidName(midname) {
	if(midname === null) {
		return "";
	}else {
		return midname;
	}
}