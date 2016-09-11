$(document).ready(function() {
    console.log('jQuery linked'); // this is really important! :P

    $('#chooseGrid').hide();

    // //button listeners
    $('.click4grid').on('click', toggleOptions);



    // // $('#submitTestData').on("click", postData);
    // $('#dataTable').on("click", ".delete", deleteData);
    // $('#dataTable').on("click", ".update", updateData);
}); // end doc ready



//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                                  Variables                                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
var pickedColor = "rgb(0, 0, 0)";
var gridCanvas = $('#gridCanvas');




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function which Shows/Hides Grid Form                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function toggleOptions() {
    $('#chooseGrid').toggle();
    console.log('toggleOptions() triggered');

}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                   Function to Capture Custom Grid Specs                          //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function submitGridSpecs() {
    console.log('submitGridSpecs() triggered');
    event.preventDefault();
    // clear inputs

    var Grid = {
        sts: $('#gridStitches').val(),
        rows: $('#gridRows').val(),
        horizontal: $('#horizontalGauge').val(),
        vertical: $('#verticalGauge').val()
    };

    console.log("Grid: ", Grid);

    newGrid(Grid); // must be placed after var assignments
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function to Append Custom Grid to DOM                        //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function newGrid(Grid) {
    console.log('newGrid() triggered');
    console.log("newGrid() sts: ", Grid.sts);
    // draw
    for (i = 1; i <= Grid.sts; i++) {
        $('#gridCanvas').append("<div class='pixel' id='pixel" + i + "' onclick='drawColor(this)'></div>");
        console.log('div created');
    }
    //compare div px to container width and see if you can set col x rows that way?
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Choose Color with which to Draw                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function pickColor(color) {
    // check if a color has been selected, if not then use black
    if (color == "black") {
        console.log("color black was selected");
        pickedColor = "rgb(0, 0, 0)";
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "red") {
        console.log("color red selected");
        pickedColor = 'rgb(255, 0, 0)';
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "white") {
        console.log("color white selected");
        pickedColor = "rgb(255, 255, 255)";
        console.log("new pickedColor: ", pickedColor);

    } else {
        pickedColor = "rgb(0, 0, 0)";
    }
    return pickedColor;
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Color BG Color of Individual Divs                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function drawColor(pixel) {
    console.log("drawColor() ready for action");
    var color = $('.pixel').css('backgroundColor');
    var id = pixel.id;

    console.log("color: ", color);
    console.log("pixel id: ", id);
    console.log("pickedColor in drawColor: ", pickedColor);

    if (pickedColor == "rgb(255, 255, 255)") {
        console.log("drawing in color white");
        $(pixel).css('background-color', 'rgb(255, 255, 255)');
    } else if (pickedColor == "rgb(0, 0, 0)") {
        console.log("drawing in color black");
        $(pixel).css('background-color', 'rgb(0, 0, 0)');

    } else if (pickedColor == "rgb(255, 0, 0)") {
        console.log("drawing in color red");
        // console.log("this: ", this); // no bueno
        $(pixel).css('background-color', 'rgb(255, 0, 0)');
    }


}


//
// $(".pixel").mousedown(function(id) {
//     console.log("mousedown function triggered");
//     //color bg of selected div
//     var $id = $(this).attr('id');
//     console.log(this);
//     var color = $(this).css("background-color");
//     $id.css().background("red");
// });








// // function deleteData() {
//     var testdataID = $(this).attr("id"); //this = #dataTable, .delete
//
//     $.ajax({
//         type: 'DELETE',
//         url: '/testRoute/' + testdataID,
//         success: function() {
//             console.log('DELETED ITEM: ID:', testdataID);
//
//             $('#dataTable').empty();
//             getData();
//         },
//         error: function() {
//             console.log("error in delete");
//         }
//     });
// }
//
// function updateData() {
//     var testdata = {};
//     //goes into data table to grab all data within.
//     var inputs = $(this).parent().children().serializeArray();
//     $.each(inputs, function(i, field) {
//         testdata[field.name] = field.value;
//
//         //CHECK FOR INT IF INPUTING NUM:
//         checkNumInField(field, "item_amount");
//     });
//     console.log("updateData searches through:", testdata);
//
//     //finds updateButton's appened id refrencing rowValue.id
//     var testdataID = $(this).parent().attr('id');
//
//     $.ajax({
//         type: 'PUT',
//         url: '/testRoute/' + testdataID,
//         data: testdata,
//         success: function() {
//             $('#dataTable').empty();
//             getData();
//         },
//         error: function() {
//
//         }
//     });
//
// }
//
// function postData() {
//     event.preventDefault();
//
//     var testdata = {};
//
//     //dataForm is the input fields
//     $.each($('#dataForm').serializeArray(), function(i, field) {
//         testdata[field.name] = field.value;
//         checkNumInField(field, "item_amount");
//     });
//
//     $.ajax({
//         type: 'POST',
//         url: '/testRoute',
//         data: testdata,
//         success: function() {
//             console.log('/POST success function ran');
//             //empty and repopulate #dataTable
//             $('#dataTable').empty();
//             getData();
//
//         },
//         error: function() {
//             console.log('/POST didnt work');
//         }
//
//     });
//
//
// }
//
// function getData() {
//     $.ajax({
//         type: 'GET',
//         url: '/testRoute',
//         success: function(data) {
//             console.log('/GET success function ran');
//             buildTableHeader(['Item ID', 'Item Name', 'Item Amount']);
//
//             data.forEach(function(rowData, i) {
//                 var $el = $('<div id="' + rowData.id + '"></div>');
//
//                 var dataTable = ['id', 'item_name', 'item_amount'];
//                 dataTable.forEach(function(property) {
//
//                     var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');
//                     $input.val(rowData[property]);
//                     $el.append($input);
//
//                 });
//
//                 $el.append('<button id=' + rowData.id + ' class="update">Update</button>');
//                 $el.append('<button id=' + rowData.id + ' class="delete">Delete</button>');
//                 $el.append('<button id=' + rowData.id + ' class="checkInOut">Check In</button>');
//
//                 $('#dataTable').append($el);
//             });
//         },
//
//         error: function(response) {
//             console.log('GET /testRoute fail. No data could be retrieved!');
//         },
//     });
//
// }
//
//
// // Display/Quality of Life
// function checkNumInField(theField, numField) {
//     if (theField.name == numField) {
//         if (theField.value * 0 !== 0) {
//             alert("You must input numbers in 'Amount' field");
//             location.reload();
//         }
//     }
// }
//
// function buildTableHeader(headerList) {
//
//     var $header = $('<div id="dataTableHead"></div>');
//     headerList.forEach(function(property) {
//
//         var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');
//         $input.val(property);
//         $header.append($input);
//         $('#dataTable').append($header);
//     });
// }

// }
