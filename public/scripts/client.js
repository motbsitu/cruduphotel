$(function(){
    getOwners();
    //getPets();

    $('#owner-form').on('click', '.register', submitOwner);
});

//get owners from database, then ...
function getOwners(){
    $.ajax({
        type: 'GET',
        url: '/owners',
        success: displayAll
        //addOwner
    });
}
//get pets from database
function getPets(){
  $.ajax({
    type: 'GET',
    url: '/pets',
    success: displayAll
  })
}
//adds owner to drop down
// function addOwner(response){
//     console.log(response);
//     var $selection = $('#ownerSelection');
//     $selection.empty();
//     response.forEach(function(owner){
//         var $option = $('<option></option>');
//         $option.append(owner.first_name + ' ' + owner.last_name);
//
//         $selection.append($option);
//     });
// }
//get owners from submission, then add to database
function submitOwner(event){
    event.preventDefault();

    var ownerData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/owners',
        data: ownerData,
        success: getOwners
    });
    $(this).find('input').val('');
}

//get owners from submission, then add to database
function submitPet(event){
    event.preventDefault();

    var petData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/pets',
        data: petData,
        success: getPets
    });
    $(this).find('input').val('');
}

//success with two functionsL
//success : function( data ) {
//      test1(data);
//      test2(data);
//   }

//display all in table
function displayAll(response){
  console.log(response);
  var $list = $('#owner-list');
  $list.empty();
  response.forEach(function(owner, pets){
    var $li = $('<li></li>');
    var $form = $('<form></form>');
    $form.append('<input type="text" name="firstName" value="' + owner.first_name + '"/>');
    $form.append('<input type="text" name="lastName" value="' + owner.last_name + '"/>');
    $form.append('<input type="text" name="petName" value="' + pets.pet_name + '"/>');
    $form.append('<input type="text" name="petBreed" value="' + pets.pet_breed + '"/>');
    $form.append('<input type="text" name="petColor" value="' + pets.pet_color + '"/>');

    //make sure is jQuery element include $
    var $saveButton = $('<button class="save">Save</button>');
    // $saveButton.data('id', pets.id); //stores data on the button
    $form.append($saveButton);

    var $deleteButton = $('<button class="delete">Delete</button>');
    // $deleteButton.data('id', pets.id);
    $form.append($deleteButton);

    var $checkInOut = $('<button class="check"> something</button>');

    $form.append($checkInOut);

    $li.append($form);
    $list.append($li);

  });
}
