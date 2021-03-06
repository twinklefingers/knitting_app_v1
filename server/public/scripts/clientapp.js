$(document).ready(function() {
    console.log('jQuery linked'); // this is really important! :P

    // //button listeners
    $('.click4grid').on('click', toggleOptions);
    // $('#submitGrid').on('click', toggleOptions);



    // // $('#submitTestData').on("click", postData);
    // $('#dataTable').on("click", ".delete", deleteData);
    // $('#dataTable').on("click", ".update", updateData);
}); // end doc ready

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                              Global Variables                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
var pickedColor = "rgb(0, 0, 0)";



//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function which Shows/Hides Grid Form                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function toggleOptions() {
    console.log('toggleOptions() triggered');
    $('.hideFormOnStart').removeClass('hideFormOnStart').addClass('chooseGrid');
    $('.chooseGrid').hide();
    $('.chooseGrid').slideToggle();
}

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                           Function to Reset Page                                 //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function refreshPage() {
    window.location.reload();
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                       Function to Capture Custom Grid Specs                      //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function submitGridSpecs() {
    console.log('submitGridSpecs() triggered');
    event.preventDefault();

    // bundle user inputs into a Grid object
    var Grid = {
        sts: $('#gridStitches').val(),
        rows: $('#gridRows').val(),
        horizontal: $('#horizontalGauge').val(),
        vertical: $('#verticalGauge').val()
    };

    // ToggleClass to make Create Grid say Reset
    $('.hideResetOnStart').removeClass('hideResetOnStart').addClass('resetButton');

    $('input').val(''); // clear inputs
    $('.chooseGrid').hide(); // hide form
    $('.click4grid').hide(); // hide the Create Grid Button
    $('.resetButton').show(); // show Reset Button

    // append user-defined sts & rows to DOM
    var stats = document.getElementById('yourGrid');
    stats.innerHTML = stats.innerHTML + ' Stitches: ' + Grid.sts + ' ' + 'Rows: ' + Grid.rows;

    newGrid(Grid); // must be placed after var assignments
    console.log("Grid: ", Grid);
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function to Append Custom Grid to DOM                        //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function newGrid(Grid) {
    console.log('newGrid() triggered');
    console.log("newGrid() Grid: ", Grid);
    // draw
    var i = 1;
    var j = 1;

    // logic to establish # of columns containing 1 div each
    for (j; j <= Grid.sts; j++) {
        $('#gridCanvas').append("<div class='pixelCol' id='pixelCol" + j + "'><div class='pixel' id='pixel" + j + "'onclick='drawColor()'></div></div>");
    }

    // this adds divs to each column per the # of inputted rows
    //each column
    for (c = 1; c <= Grid.sts; c++) {
        //each inputted row
        for (i; i <= Grid.rows - 1; i++) {
            $('.pixelCol').append("<div class='pixel' id='pixel" + i + "'onclick='drawColor()'></div>");
            console.log('row st created');
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Choose Color with which to Draw                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function pickColor(color) {
    // check if a color has been selected, if not then use black
    if (color == "black") {
        pickedColor = "rgb(0, 0, 0)";
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "red") {
        pickedColor = 'rgb(255, 0, 0)';
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "yellow") {
        pickedColor = 'rgb(255, 255, 0)';
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "orange") {
        pickedColor = 'rgb(255, 175, 0)';
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "green") {
        pickedColor = "rgb(0, 255, 0)";
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "blue") {
        pickedColor = 'rgb(0, 0, 255)';
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "purple") {
        pickedColor = "rgb(138, 43, 226)";
        console.log("new pickedColor: ", pickedColor);

    } else if (color == "white") {
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
function drawColor() {
    var mousingDown = false;

    window.addEventListener('mousedown', switchMouseState);
    window.addEventListener('mouseup', switchMouseState);

    // $('pixel').mousedown(function() {
    //     switchMouseState(event);
    // });
    // $('pixel').mouseup(function() {
    //     switchMouseState(event);
    // });

    $('#gridCanvas').mouseover(function() {
        setPixelColor(event);
    });
    $('#gridCanvas').click(function() {
        setPixelColor(event);
    });

    function switchMouseState(event) {
        mousingDown = event.type === 'mousedown';
        console.log("swicthMouseState() activated");
    }

    function setPixelColor(event) {
        console.log("setPixelColor() activated");
        if (event.type === 'click') {
            event.target.style.backgroundColor = pickedColor;
        } else if (mousingDown) {
            event.target.style.backgroundColor = pickedColor;
        }
    }
}








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
