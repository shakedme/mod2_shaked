var chamber = $('body').data('name');
var urlJSON = '../JSON/113-' + chamber + '-members.json';

var data = $.getJSON(urlJSON, function(data) {
    console.log("success");
    var members = data.results[0].members

    $.each(members, function(i, e) {
        var table = $("<tr>");
        $("<td>").append($('<a>').attr('href', members[i].url).text(members[i].first_name + " " + checkMidName(members[i].middle_name) + " " + members[i].last_name)).appendTo(table);
        $("<td>").text(members[i].state).appendTo(table);
        $("<td>").text(members[i].party).appendTo(table);
        $("<td>").text(members[i].seniority).appendTo(table);
        $("<td>").text(members[i].votes_with_party_pct).appendTo(table);


        $(".poliTable").append(table);
    })

})

//Check if midname exists


function checkMidName(midname) {
    if (midname === null) {
        return "";
    } else {
        return midname;
    }
}


// Filtering table by party via checkbox:

//1. On change of checkbox input, with a IF statement check which
//boxes are checked.

//2. Sort through all <TD> elements.

//3. According to which boxes are checked, compare inner text of <TD> elements to value of checked 
//box.

//4. Hide parent element <TR> of all <TD> elements which contain the same value as the box.



$("input[type='checkbox']").change(function() {
    if ($('input[name="R"]').is(':checked') && $('input[name="D"]').is(':checked') && $('input[name="I"]').is(':checked')) {
        $.each($("td"), function(i, td) {
            $(td).parent("tr").show();
        })
    } else if ($('input[name="R"]').is(':checked') && $('input[name="D"]').is(':checked')) {
        $("td").parent("tr").show();
        $.each($("td"), function(i, td) {
            if ($(td).text().indexOf('I') !== -1) {
                $(td).parent("tr").hide();
            }
        })
    } else if ($('input[name="R"]').is(':checked') && $('input[name="I"]').is(':checked')) {
        $("td").parent("tr").show();
        $.each($("td"), function(i, td) {
            if ($(td).text().indexOf('D') !== -1) {
                $(td).parent("tr").hide();
            }
        })
    } else if ($('input[name="D"]').is(':checked') && $('input[name="I"]').is(':checked')) {
        $("td").parent("tr").show();
        $.each($("td"), function(i, td) {
            if ($(td).text().indexOf('R') !== -1) {
                $(td).parent("tr").hide();
            }
        })
    } else if ($('input[name="I"]').is(':checked')) {
        $("td").parent("tr").show();
        $.each($("td"), function(i, td) {
            if ($(td).text().indexOf('R') !== -1 || $(td).text().indexOf('D') !== -1) {
                $(td).parent("tr").hide();
            }
        })
    } else if ($('input[name="D"]').is(':checked')) {
        $("td").parent("tr").show();
        $.each($("td"), function(i, td) {
            if ($(td).text().indexOf('I') !== -1 || $(td).text().indexOf('R') !== -1) {
                $(td).parent("tr").hide();
            }
        })
    } else if ($('input[name="R"]').is(':checked')) {
        $("td").parent("tr").show();
        $.each($("td"), function(i, td) {
            if ($(td).text().indexOf('I') !== -1 || $(td).text().indexOf('D') !== -1) {
                $(td).parent("tr").hide();
            }
        })
    } else {
        $("td").parent("tr").show();
    }
})


//Get all states for dropdown list

$.getJSON('/JSON/states.json', function(dataStates) {
    $.each(dataStates, function(i, e) {
        var option = $('<option>');
        option.text(dataStates[i].code).appendTo('.filterStates');

    })
  

})


//Filtering by states via select input:

//1. On change of the dropdown lists value, store that value into variable 'state',
//Log variable in console to confirm correct value being stored.

//2. Create IF statement, checking if the stored value is equal to 'All States', 
//if so than simply show all states on table.

//3. If isnt equal, hide all <TR> elements.
// loop through all <TD> elements, and check if their inner TEXT is equal to our variable STATE,
// if so, than show their previously hidden parent element, which is  <TR>.



$("#sel1").change(function() {
    var stateFilter = $(this).val();
    if (stateFilter !== "All States") {
        $("tbody tr").hide();
        $.each($("tbody tr td"), function(i, td) {
            if ($(td).text() == stateFilter) {
                $(td).parent("tr").show();
            }
        })
    } else {
        $("tbody tr").show();
    }


});