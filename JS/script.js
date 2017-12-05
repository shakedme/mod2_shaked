
//OOP method

//Creating class DataHandler

function DataHandler() {

    this.jsonURL = "";
    this.rawData = "";
    this.members = [];
    this.chamber = "";

    this.init = function() {
        this.chamber = $("body").data("congress");
        this.jsonURL = "/JSON/113-" + this.chamber + "-members.json";
    }

    this.loadJSON = function() {
        var that = this;
        $.getJSON(this.jsonURL, function(data) {
            that.rawData = data;
            that.members = that.rawData.results[0].members;
            that.buildSelect();
            that.buildTable();
        })
    }

    this.buildSelect = function() {
        $.each(this.members, function(i, member) {
            var option = $('<option>');
            option.text(member.state).appendTo('#sel1');

        })

    }

    this.buildTable = function() {
        var table = $(".poliTable");
        var tableRows = [];

        $.each(this.members, function(i, member) {

            if (tgifFilter[member.party]) {
                if (tgifFilter.stateSelect == member.state || tgifFilter.stateSelect == "") {
                    var tr = $("<tr>");
                    var fullname = member.first_name + " " + checkMidName(member.middle_name) + " " + member.last_name;
                    tr.append($("<td>").html($("<a>").attr("href", member.url).text(fullname)));
                    tr.append($("<td>").text(member.state));
                    tr.append($("<td>").text(member.party));
                    tr.append($("<td>").text(member.seniority));
                    tr.append($("<td>").text(member.votes_with_party_pct));
                    tableRows.push(tr);
                }

            }
        })
        table.append(tableRows);
    }


    //Emptying out table and then refering to buildTable function in order to
    //reconstruct based on the new data supplied by tgifFilter.

    this.updateTable = function() {
        $(".poliTable").html("");
        this.buildTable();

    }

}

//Creating instance of class Datahandler called MainData

var MainData = new DataHandler();

MainData.init();
MainData.loadJSON();

//Creating two EventListeners for the SELECT and CHECKBOX inputs.

$("#sel1").on("change", function() {
    tgifFilter.updateState($(this).val());

})

$("input[type=checkbox]").on("change", function() {
    tgifFilter.updateParty($(this).attr('name'), $(this).prop("checked"))
})


//Creating class for filtering via CHECKBOX and SELECT inputs.


function Filter() {

    this.D = true;
    this.R = true;
    this.I = true;

    this.stateSelect = "";

    this.updateState = function(state) {
        this.stateSelect = state;
        MainData.updateTable();

    }

    this.updateParty = function(party, checked) {
        this[party] = checked;
        MainData.updateTable();

    }

}

//Creating instance of class Filter called tgifFilter

var tgifFilter = new Filter();



//Check if midname exists

function checkMidName(midname) {
    if (midname === null) {
        return "";
    } else {
        return midname;
    }
}


//Switch text in READ MORE button

$("#read_button").click(function() {
    if ($(this).html() == "Read More") {
        $(this).html("Read Less");
    } else {
        $(this).html("Read More");
    }
})