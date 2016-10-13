$(function(){
    getOwners();

    $('#owner-form').on('click', '.register', submitOwner);
});

function getOwners(){
    $.ajax({
        type: 'GET',
        url: '/owners',
        success: addOwner
    });
}

function addOwner(response){
    console.log(response);
    var $selection = $('#ownerSelection');
    $selection.empty();
    response.forEach(function(owner){
        var $option = $('<option></option>');
        $option.append(owner.first_name + ' ' + owner.last_name);

        $selection.append($option);
    });
}

function submitOwner(event){
    event.preventDefault();

    var ownerData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/owners',
        data: ownerData,
        success: addOwner
    });
    $(this).find('input').val('');
}
