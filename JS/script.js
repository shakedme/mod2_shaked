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

function checkMidName(midname) {
    if (midname === null) {
        return "";
    } else {
        return midname;
    }
}




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

// var checked = [];
// $('input[type="checkbox"]').change(function() {
//     checked.push($(this).attr('name'));
//     $.uniqueSort(checked);
// })

// $.each(checked, function(i, e) {
//     if (checked[i] !== $("td").text())  {

//     }
// })


$('#sel1').click(function() {
            var state =  $(this).val();
            console.log(state);
            $.each($("td"), function(i, td) {
                if ($(td).text().indexOf(state) !== -1) {
                    $(td).parent("tr").hide();
                }
                })
            })











