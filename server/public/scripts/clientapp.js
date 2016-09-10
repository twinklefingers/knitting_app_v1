$(document).ready(function() {
    console.log('jQuery linked'); // this is really important! :P

    // getData();
    $('#chooseGrid').hide();
    // //button listeners
    $('.click4grid').on('click', toggleOptions);
    // $('#gridCanvas').children().on('click', logPixel);


    // $('#gridCanvas').children().click(function() {
    //     var $id = $(this).attr('id');
    //     console.log($id);

    // });



    // // $('#submitTestData').on("click", postData);
    // $('#dataTable').on("click", ".delete", deleteData);
    // $('#dataTable').on("click", ".update", updateData);
}); // end doc ready

function colorGrid(color) {
    // var color = $('#color').attr('class');

    // check if a color has been selected, if not then black
    // else if color has been selected, use that color
    if (color == 'black') {
        console.log("color black was selected");
        pickedColor = "black";
        console.log("new pickedColor: ", pickedColor);
    } else
    if (color == "red") {
        console.log("color red selected");
        pickedColor = 'red';
        console.log("new pickedColor: ", pickedColor);
    } else if (color == "white") {
        console.log("color white selected");
        pickedColor = "white";
        console.log("new pickedColor: ", pickedColor);
    }
    return pickedColor;
}


function logPixel(pixel) {
    // var id = $(this).attr('id');
    var color = $('.pixel').css('backgroundColor');

    var id = pixel.id;
    // var color = pixel.style.backgroundColor;
    console.log("color: ", color);
    console.log("pixel id: ", id);
    drawColor(color);

    function drawColor(color) {
        console.log("drawColor() ready for action");

        // var white = 'rgb(255, 255, 255)';
        // var red = 'rgb(255, 0, 0)';
        // var black = 'rgb(0, 0, 0)';
        // var pickedcolor = '';
        // var color = $('#color').attr('class');
        console.log("pickedColor in drawColor: ", pickedColor);

        // check if a color has been selected, if not then black
        // else if color has been selected, use that color
        if (pickedColor == color) {
            console.log("the color has already been written");
        } else
        if (color == "red") {
            console.log("color red selected");
        } else if (color == "white") {
            console.log("color white selected");
        }

        // check if they are pressing down on the mouse..
        // ..if true, then color background div w/ unique id

    }

}


// shows or hides form to gather grid info
function toggleOptions() {
    $('#chooseGrid').toggle();
    console.log('toggleOptions() triggered');

}

var gridCanvas = $('#gridCanvas');

// captures user custom grid specifications
function submitGridSpecs() {
    console.log('submitGridSpecs() triggered');
    event.preventDefault();
    // clear inputs

    var Grid = {
        sts: $('#gridStitches').val(),
        rows: $('#gridRows').val(),
        horizontal: $('#horizontalGauge').val(),
        vertical: $('#verticalGauge').val()

        // same as:
        // sts: $('#gridStitches').val(),
        // rows: document.getElementById('gridRows').value,
    };
    console.log("Grid: ", Grid);


    // // jquery method to get value of user inputs 1
    // var sts = $('#gridStitches').val();
    // console.log("sts: ", sts); // worked!
    // var rows = $('#gridRows').val();
    // console.log("rows: ", rows);
    // var horizontal = $('#horizontalGauge').val();
    // console.log("horizontal: ", horizontal);
    // var vertical = $('#verticalGauge').val();
    // console.log("vertical: ", vertical);

    // // jQuery method to get values of user input 2
    // var sts = $('#gridStitches').attr('value');
    // console.log("sts: ", sts); // no worky :( -- index.html input elements have no 'value' attribute...
    // var rows = $('#gridRows').attr('value');
    // var horizontal = $('#horizontalGauge').attr('value');
    // var vertical = $('#verticalGauge').attr('value');

    // // straight js  method to get values of user input
    // var sts = document.getElementById('gridStitches').value;
    // console.log("sts: ", sts); // worked!


    newGrid(Grid); // must be placed after var assignments
}

// uses captured data and appends to DOM
function newGrid(Grid) {
    console.log('newGrid() triggered');
    console.log("newGrid() sts: ", Grid.sts);
    // draw
    for (i = 1; i <= Grid.sts; i++) {
        $('#gridCanvas').append("<div class='pixel' id='pixel" + i + "' onclick='logPixel(this)'>" + i + "</div>");
        console.log('div created');
    }
    //compare div px to container width and see if you can set col x rows that way?
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
