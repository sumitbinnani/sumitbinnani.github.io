function updateCopyButton(){
    $('a.share').tooltip();
    $('a.share').off('click');
    $('a.share').click(function(event) {
        event.preventDefault();
        var oldText = $(this).attr('data-original-title');
        $(this).attr({'data-original-title': 'Copied to Clipboard!'})
            .tooltip('show');
        $(this).on('shown.bs.tooltip', function (){
            var elem = this;
            var clipboard = $('.clipboard');
            clipboard.val(elem.href);
            clipboard.map(function () {
                $(this).select();
                document.execCommand('copy');
            });
            setTimeout(function() {
                $(elem).tooltip('hide');
                $(elem).off('shown.bs.tooltip');
            }, 1500);
        });
        $(this).attr({'data-original-title': oldText});
    });
}

function openModal(parentcard) {
    a = parentcard;
    var title = parentcard.find('h5').text();
    var desc = parentcard.find('.card-matter');
    var btns = parentcard.find('.extra-btn');

    $('#projectModal .modal-title').text(title);

    $('#projectModal .modal-body').html(desc.html());
    $('#projectModal .modal-body *').removeAttr('class');

    $('#projectModal .extra-btn').html(btns.html());
    $('#projectModal .extra-btn').find('.float-right').removeClass('float-right');

    $('#projectModal').modal();
    updateCopyButton();
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
    var regex = new RegExp(event.target.value.toLowerCase());
    var projectHolders = $('.project-col');

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

    updateCopyButton();

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

    $('#projectModal').on('hide.bs.modal', updateCopyButton);
});

