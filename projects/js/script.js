var filterResetRevealed=false;
$(document).ready(start);

var spreadsheetID = "10peBE12ztcAVdTurq8fewJLJMRZVwHgQHMnC6E64qgI";
function start() {
    loadProjects();
    $('#search').change(search);
    $('#search').keypress(search);
    $('#search').keydown(search);
    $('#search').keyup(search);
    $('#reset').click(function (event) {
        $('#search').val("").keypress();
    });
}

function executeQuerySearch() {
    try {
        var searchTerm = getParameterByName('q');
        $('#search').val(searchTerm).keypress();
    } catch (e){
    }
}

function openModal(id) {
    try {
        $(id).modal('open');
    } catch (e) {
        console.log(e);
    }
}

function loadProjects() {
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/1/public/values?alt=json";
    var jqxhr = $.getJSON(url);

    jqxhr.done(function () {
        var entries = jqxhr.responseJSON.feed.entry;
        $(entries).each(function () {
            this['tags'] = (this.gsx$tags.$t).split(',').map(Function.prototype.call, String.prototype.trim);
        });
        var template = Handlebars.templates['project'];
        var html = template(entries);
        $('#projects').html(html);
        $('.modal').modal();
        executeQuerySearch();
        openModal(document.location.hash);
    });
}

function search(event) {
    var regex = new RegExp(event.target.value.toLowerCase());
    var projectHolders = $('.projectHolder');
    var total_count=0;
    var selected_count=0;
    projectHolders.map(function (index, el) {
        if (!regex.test(el.innerText.toLowerCase())){
            $(el).hide();
            if (!filterResetRevealed){
                $('.tap-target').tapTarget('open');
                filterResetRevealed=true;
            }
        } else {
            $(el).show();
            selected_count++;
        }
        total_count++;
    });
    $("#total_count")[0].innerText = total_count;
    $("#filter_count")[0].innerText = selected_count;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}