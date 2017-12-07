function DataHandlerStatistics() {

    this.jsonURL = "";
    this.members = [];
    this.chamber = "";
    this.statistics = {
        "Info": {
            "totalMembersDemo": 0,
            "averageVoteDemo": 0,
            "totalMembersRep": 0,
            "averageVoteRep": 0,
            "totalMembersIndie": 0,
            "averageVoteIndie": 0,
            "mostVote": 0,
            "leastVote": 0,
            "mostMiss": 0,
            "leastMiss": 0
        }
    }

    this.init = function() {
        this.chamber = $("body").data("congress");
        this.jsonURL = "/JSON/113-" + this.chamber + "-members.json";
    }

    this.loadJSON = function() {
        var that = this;
        $.getJSON(this.jsonURL, function(data) {
            that.members = data.results[0].members;
            that.StatisticsMulti();
            that.makeTensVotes("votes_with_party_pct", "leastVote", "mostVote");
            that.makeTensVotes("missed_votes_pct", "leastMiss", "mostMiss");
            that.createTableEngaged("mostMiss", $('#tbody1'), "missed_votes", "missed_votes_pct");
            that.createTableEngaged("leastMiss", $('#tbody2'), "missed_votes", "missed_votes_pct");
            that.createTableEngaged("leastVote", $('#tbody3'), "total_votes", "votes_with_party_pct");
            that.createTableEngaged("mostVote", $('#tbody4'), "total_votes", "votes_with_party_pct");


        })
    }

    this.StatisticsMulti = function() {
        var that = this;
        var averageR = [];
        var averageD = [];
        var averageI = [];
        $.each(this.members, function(i, member) {
            if (member.party == "R") {
                that.statistics.Info.totalMembersRep++;
                that.statistics.Info.averageVoteRep += member.votes_with_party_pct;

            } else if (member.party == "D") {
                that.statistics.Info.totalMembersDemo++;
                that.statistics.Info.averageVoteDemo += member.votes_with_party_pct;

            } else if (member.party == "I") {
                that.statistics.Info.totalMembersIndie++;
                that.statistics.Info.averageVoteIndie += member.votes_with_party_pct;

            }
        })

        this.statistics.Info.averageVoteRep = that.statistics.Info.averageVoteRep / this.statistics.Info.totalMembersRep;
        this.statistics.Info.averageVoteDemo = that.statistics.Info.averageVoteDemo / this.statistics.Info.totalMembersDemo;
        this.statistics.Info.averageVoteIndie = that.statistics.Info.averageVoteIndie / this.statistics.Info.totalMembersIndie;
        this.createTableStats();

    }


    this.makeTensVotes = function(key, name1, name2) {

        // sort members array by votes
        this.members.sort(function(a, b) {
            return a[key] - b[key]
        })
        //calculate 10% of members
        tenpercent = Math.round((this.members.length / 100) * 10)

        //Create array with the bottom and top 10% of members
        var percentBottom = this.members.slice(0, tenpercent)
        var percentTop = this.members.slice(-tenpercent)
        this.statistics.Info[name1] = percentBottom;
        this.statistics.Info[name2] = percentTop;
    }

    this.createTableStats = function() {
        $(".TD1").append().text(this.statistics.Info.totalMembersRep);
        $(".TD2").append().text(Math.round(this.statistics.Info.averageVoteRep));
        $(".TD3").append().text(this.statistics.Info.totalMembersDemo);
        $(".TD4").append().text(Math.round(this.statistics.Info.averageVoteDemo));
        $(".TD5").append().text(this.statistics.Info.totalMembersIndie);
        $(".TD6").append().text(Math.round(this.statistics.Info.averageVoteIndie));

    }

    this.createTableEngaged = function(option, table, property1, property2) {
        var that = this;
        var tableRows = [];
        $.each(this.statistics.Info[option], function(i, member) {
                var fullname = member.first_name + " " + checkMidName(member.middle_name) + " " + member.last_name;
                var tr = $("<tr>");
                tr.append($("<td>").text(fullname));
                if (property1 !== "total_votes") {
                    tr.append($("<td>").text(member[property1]));
                    tr.append($("<td>").text(member[property2]));
                } else {
                    tr.append($("<td>").text(Math.round(that.calculateVote(member[property1], member[property2]))));
                    tr.append($("<td>").text(member[property2]));
                }
                    tableRows.push(tr);
                }) 
            table.append(tableRows);
    }

    this.calculateVote = function(total, pct) {
        return (total / 100) * pct;
    }

}


    var statisticsData = new DataHandlerStatistics();

    statisticsData.init();
    statisticsData.loadJSON();
    //Check if midname exists

    function checkMidName(midname) {
        if (midname === null) {
            return "";
        } else {
            return midname;
        }
    }