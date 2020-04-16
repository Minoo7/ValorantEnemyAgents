var SubmitBox = $("#SubmitBox");
var caption = $("#caption h1");
var map = "";

$("#map-selector input").click(function (event) {
    var selector = $(this).parent().parent().parent();
    var agents_selector = $("#agents-selector");

    if (document.getElementById('Haven').checked) {
        map = "Haven"
    }
    if (document.getElementById('Bind').checked) {
        map = "Bind"
    }
    if (document.getElementById('Split').checked) {
        map = "Split"
    }

    $(selector).remove();
    $(agents_selector).css("display", "flex");
    $(SubmitBox).show();

    $(caption).css("font-size", "144px");
    $(caption).css("margin", "6px");
    $(caption).html("Enemy Team Agents");
});

var Agents = [];

var amountOfChecked = 0;

var site = "";

$(document).ready(function () {
    $('#agents-selector input').on('change', function (evt) {
        if (amountOfChecked == 5) {
            if (this.checked == false) {
                amountOfChecked--;
                $(SubmitBox).css("cursor", "not-allowed");
                $(this).parent().css("border", "unset");
                $(SubmitBox).css("background-color", "var(--v-lock_in-unselected-background)");
                $(SubmitBox).children().css("color", "var(--v-lock_in-unselected-text)");
                return true;
            }
            if (this.checked == true) {
                this.checked = false;
                return true;
            }
        }
        if (amountOfChecked < 5) {
            $(SubmitBox).css("cursor", "not-allowed");
            if (this.checked == 1) {
                amountOfChecked++;
                $(this).parent().css("border", "0.5px solid #FFFFFF");
            } else {
                amountOfChecked--;
                this.checked = false;
                $(this).parent().css("border", "unset");
                $(SubmitBox).css("background-color", "var(--v-lock_in-unselected-background)");
                $(SubmitBox).children().css("color", "var(--v-lock_in-unselected-text)");
            }
        } else if (this.checked == false) {
            amountOfChecked--;
            this.checked = false;
            $(this).parent().css("border", "unset");
            $(SubmitBox).css("background-color", "var(--v-lock_in-unselected-background)");
            $(SubmitBox).children().css("color", "var(--v-lock_in-unselected-text)");
        }
        if (amountOfChecked == 5) {
            $(SubmitBox).css("background-color", "var(--v-lock_in-selected-background)");
            $(SubmitBox).children().css("color", "var(--v-lock_in-selected-text)");
            $(SubmitBox).css("cursor", "pointer");
            return true;
        }
    });
});

function LockIn() {
    if (amountOfChecked == 5) {
        $('input').each(function (i, obj) {
            if (this.checked == true) {
                Agents.push($(this).attr("id"));
            }
        });

        $(caption).html("Enemy Squad:");

        $("#agents-selector").remove(); // kanske hide istället
        $("#SubmitBox").remove();

        ShowAgents();
    } else {
        alert("Pick 5 Agents");
    }
}

function ShowAgents() {
    jQuery.each(Agents, function (index, item) {
        $("#ChosenAgents").append($('<div class="item"></div>'))
        $("#ChosenAgents .item").eq(index).append($('<img src="assets/images/agents/' + this + '.png">'));
        $("#ChosenAgents .item").eq(index).append($('<div class="site-container"></div>'));
        $("#ChosenAgents .item").eq(index).find(".site-container").append($('<div class="chosenSite-container"></div>'));
        $("#ChosenAgents .item").eq(index).find(".chosenSite-container").append($('<span class="chosenSite">d</span>'));
        if (map == "Haven") {
            $("#ChosenAgents .item").eq(index).find(".site-container").append($('<span class="A">A</span>'));
            $("#ChosenAgents .item").eq(index).find(".site-container").append($('<span class="B">B</span>'));
            $("#ChosenAgents .item").eq(index).find(".site-container").append($('<span class="C">C</span>'));
        } else {
            $("#ChosenAgents .item").eq(index).find(".site-container").append($('<span class="A">A</span>'));
            $("#ChosenAgents .item").eq(index).find(".site-container").append($('<span class="B">B</span>'));
        }
    });
    $("#ChosenAgents .item span").click(function (event) {
        if ($(this).attr("class") == "chosenSite") {
            site = $(this);
            switch (site.html()) {
                case "A":
                    $(this).parent().parent().find($(".A")).show();
                    site.css("font-size", "0px");
                    break;

                case "B":
                    $(this).parent().parent().find($(".B")).show();
                    site.css("font-size", "0px");
                break;

                case "C":
                    $(this).parent().parent().find($(".C")).show();
                    site.css("font-size", "0px");
                break;
            }
        } else {
            site = $(this).parent().children().eq(0).children().eq(0);

            if ($(this).html() == "A") {
                if (site.html() == "B") {
                    $(this).parent().find($(".B")).show();
                }
                if (site.html() == "C") {
                    $(this).parent().find($(".C")).show();
                }
                site.html("A")
            }
            if ($(this).html() == "B") {
                if (site.html() == "A") {
                    $(this).parent().find($(".A")).show();
                }
                if (site.html() == "C") {
                    $(this).parent().find($(".C")).show();
                }
                site.html("B")
            }
            if ($(this).html() == "C") {
                if (site.html() == "A") {
                    $(this).parent().find($(".A")).show();
                }
                if (site.html() == "B") {
                    $(this).parent().find($(".B")).show();
                }
                site.html("C")
            }
            $(this).hide();
            site.css("font-size", "72px");
            site.css("padding", "10px 40px 0 40px");
        }
    });
}