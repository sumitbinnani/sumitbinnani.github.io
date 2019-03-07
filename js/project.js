function openModal(parentcard) {
    var title = parentcard.find('h5').text();
    var desc = parentcard.find('.card-matter');
    var btns = parentcard.find('.extra-btn');

    $('#projectModal .modal-title').text(title);

    $('#projectModal .modal-body').html(desc.html());
    $('#projectModal .modal-body *').removeAttr('class');

    $('#projectModal .extra-btn').html(btns.html());

    $('#projectModal').modal();
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

function search(event) {
    a = event;
    var regex = new RegExp(event.target.value.toLowerCase());
    var projectHolders = $('.project-col');
    var total_count=0;
    var selected_count=0;
    projectHolders.map(function (index, el) {
        if (!regex.test(el.innerText.toLowerCase())){
            $(el).hide();

        } else {
            $(el).show();
        }
    });
}


$(function () {
    $('.btn-modal').on('click', function (e) {
        var parentcard = $(e.target.closest('.project-card'));
        openModal(parentcard);
    });

    $('#search-bar').each(function() {
        var elem = $(this);

        // Save current value of element
        elem.data('oldVal', elem.val());

        // Look for changes in the value
        elem.bind("propertychange change click keyup keydown keypress input paste", function(event){
            // If value has changed...
            if (elem.data('oldVal') != elem.val()) {
                // Updated stored value
                elem.data('oldVal', elem.val());
                search(event);
            }
        });
    });

    var query = getParameterByName('q');

    if(query){
        $('#search-bar').val(query).keypress();
    }

});

