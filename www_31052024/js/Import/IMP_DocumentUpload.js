
var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var flightSeqNo;
var UAWBRowId;
var UShipRowId;



$(function () {
    document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);

    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "German":
            setGerman();
            break;
        case "Russian":
            setRussian();
            break;
        case "Turkish":
            setTurkish();
            break;
    }

});

function setEnglish() {
    //$('#lblUnitization').text("Unitization");

}

function setGerman() {
    $('#lblAWBNo').text("AWB Nr.");
    $('#btnGetDetail').val("Suchen");
    $('#lblHAWB').text("HAWB Nr.");
    $('#lblFlightNo').text("Flug Details");
    $('#lblDescription').text("Warenbeschreibung");
    $('#cameraTakePicture').val("Hochladen");

}

function setRussian() {
    $('#lblAWBNo').text("номер авианакладной");
    $('#btnGetDetail').val("поиск");
    $('#lblHAWB').text("номер HAWB");
    $('#lblFlightNo').text("детали рейса");
    $('#lblDescription').text("описание товарa");
    $('#cameraTakePicture').val("загрузить");
    $('#btnClear').val("очистить");
    $('#btnUpload').val("выход");
}

function setTurkish() {
    //$('#lblAWBNo').text("");
    $('#btnGetDetail').val("aramak");
    //$('#lblHAWB').text("");
    $('#lblFlightNo').text("uçuş detayları");
    $('#lblDescription').text("açıklama");
    $('#cameraTakePicture').val("yükleme");
    $('#btnClear').val("temiz");
    $('#btnUpload').val("çikiş");
}


// function cameraTakePicture() {
//     navigator.camera.getPicture(onSuccess, onFail, {
//         //quality: 100,
//         //encodingType: 0,
//         //targetWidth: 500,
//         //targetHeight: 500,
//         //destinationType: Camera.DestinationType.DATA_URL
//         quality: 100,
//         encodingType: Camera.EncodingType.JPEG,
//         //allowEdit: true,
//         //correctOrientation: true,
//         targetWidth: 250,
//         targetHeight: 250,
//         destinationType: Camera.DestinationType.DATA_URL
//     });

//     function onSuccess(imageData) {
//         //var image = document.getElementById('myImage');
//         //var data = "data:image/jpeg;base64," + imageData;
//         SaveUploadFile(imageData);
//     }

//     function onFail(message) {
//         alert('Failed because: ' + message);
//     }
// }

var imageDataForArray = new Array();
function cameraTakePicture() {

    // if (imageDataForArray.length == 3) {
    //     errmsg = "Only 10 Images can be uploaded";
    //     $.alert(errmsg);
    //     return;
    // }

    navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL, //DATA_URL , FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true,
        correctOrientation: true,


    });
}

function onSuccess(imageData) {
    var data = "data:image/jpeg;base64," + imageData;
    imgDataForSave = imageData;
    imageDataForArray.push(imgDataForSave);
    htmlImages = '';
    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
    htmlImages += '</div>';

    $('#divImages').append(htmlImages);
    if (imageDataForArray.length == 10) {
        $("#cameraTakePicture").attr('disabled', 'disabled');
    }
    console.log(imageDataForArray);

}

function onFail(message) {
    alert('Failed because: ' + message);
}

function AllImages(imageDataForArray) {
    ImagesXmlGen = '<FileData>';
    for (var n = 0; n < imageDataForArray.length; n++) {
        var j = n + 1;
        ImagesXmlGen += "<Img FileName=" + "TLogo1" + j.toString() + " FileExtension= " + "jpg" + " Image=" + imageDataForArray[n] + " > </Img>";
    }
    ImagesXmlGen += "</FileData>";

    return ImagesXmlGen;

}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    //  $.alert("Scanned code is " + ScanCode);

    //txtAWBNoscanned
    if (ScanCode.length >= 11) {
        //alert("Scanned code is " + ScanCode);
        GetHAWBDetailsNew();
    }
}

function GetHAWBDetailsNew() {

    console.log("GetHAWBDetailsNew called here");

    //   $.alert("GetHAWBDetailsNew callled here");


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    $('#txtAWBNoscanned').val(MAWBNo);
    //  alert("getting details of " + MAWBNo);
    //$('#txtAWBNoscanned').val(ScanCode);
    // if (MAWBNo.length != '11') {
    //     errmsg = "Please enter valid AWB No.";
    //     $('#txtAWBNo').val('');
    //     $.alert(errmsg);
    //     return;
    // }
    // 
    //'<Root><AWBNo>09812090909</AWBNo><HouseNo></HouseNo><AirportCity>TOS</AirportCity></Root>'
    inputxml = '<Root><AWBNo>' + MAWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><Type>I</Type></Root>';

    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function (index) {

                    console.log($(this).find('Status').text());
                    console.log($(this).find('StrMessage').text());

                    var vrStatus = $(this).find('Status').text();

                    if (vrStatus == "E") {
                        $('#txtAWBNo').val('');
                        var r = $(this).find('StrMessage').text();
                        r = r.replace("Error:", "");
                        $.alert(r);
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlHAWB');
                    }

                    else {
                        var newOption = $('<option></option>');
                        newOption.val(0).text($(this).find('HouseNo').text());
                        newOption.appendTo('#ddlHAWB');
                    }
                });

                $(xmlDoc).find('Table2').each(function (index) {

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');

                        flightSeqNo = $(this).find('FlightSeqNo').text();
                        UAWBRowId = $(this).find('UAWBRowId').text();
                        UShipRowId = $(this).find('UShipRowId').text();
                    }

                    var newOption = $('<option></option>');
                    newOption.val(0).text($(this).find('Flight').text());
                    newOption.appendTo('#ddlFlightNo');
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function GetHAWBDetailsForMAWB() {

    //   $.alert("getting details");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var MAWBNo = $('#txtAWBNo').val();
    //  $.alert("getting details of GetHAWBDetailsForMAWB " + MAWBNo);

    if (MAWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $('#txtAWBNo').val('');
        $.alert(errmsg);
        return;
    }
    // 
    //'<Root><AWBNo>09812090909</AWBNo><HouseNo></HouseNo><AirportCity>TOS</AirportCity></Root>'
    inputxml = '<Root><AWBNo>' + MAWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><Type>I</Type></Root>';

    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function (index) {

                    console.log($(this).find('Status').text());
                    console.log($(this).find('StrMessage').text());

                    var vrStatus = $(this).find('Status').text();

                    if (vrStatus == "E") {
                        var r = $(this).find('StrMessage').text();
                        r = r.replace("Error:", "");
                        $.alert(r);
                        return;
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlHAWB');
                    }

                    else {
                        var newOption = $('<option></option>');
                        newOption.val(0).text($(this).find('HouseNo').text());
                        newOption.appendTo('#ddlHAWB');
                    }
                });

                $(xmlDoc).find('Table2').each(function (index) {

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');

                        flightSeqNo = $(this).find('FlightSeqNo').text();
                        UAWBRowId = $(this).find('UAWBRowId').text();
                        UShipRowId = $(this).find('UShipRowId').text();
                    }

                    var newOption = $('<option></option>');
                    newOption.val(0).text($(this).find('Flight').text());
                    newOption.appendTo('#ddlFlightNo');
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function SaveUploadFileOLD(imageData) {

    var MAWBNo = $('#txtAWBNo').val();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";




    if (imageData == "") {

        errmsg = "Some error occurred.</br>Please try again.";
        $.alert(errmsg);
        return;

    }


    inputxml = '<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>' + $('#txtDescription').val() + '</Description><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><AWBPrefix>' + MAWBNo.substr(0, 3) + '</AWBPrefix><Type>I</Type><AWBNo>' + MAWBNo.substr(3, 8) + '</AWBNo><ULDId>0</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';


    //inputxml = '<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>' + $('#txtDescription').val() + '</Description><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UShipRowId>' + UShipRowId + '</UShipRowId><Type>I</Type><UAWBRowId>' + UAWBRowId + '</UAWBRowId><ULDId>-1</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "SaveFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml, 'InputImage': imageData,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                var parser, xmlDoc;
                $("body").mLoading('hide');
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(response.d, "text/xml");
                var msg = xmlDoc.getElementsByTagName("StrMessage")[0].childNodes[0].nodeValue;
                $.alert(msg);
                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}


function SaveUploadFile() {


    console.log("SaveUploadFile started here ")
    var MAWBNo = $('#txtAWBNo').val().toString().trim();
    console.log("SaveUploadFile started here  MAWBNo =" + MAWBNo);
    if (MAWBNo == "") {

        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    if (MAWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (imageDataForArray.length == 0) {
        errmsg = "Enter atleast one image";
        $.alert(errmsg);
        return;
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var awbExist = true;

    inputxml = '<Root><AWBNo>' + MAWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><Type>I</Type></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                console.log("SaveUploadFile MAWBNosuccess gere");

                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                console.log(xmlDoc);

                $(xmlDoc).find('Table').each(function (index) {

                    console.log($(this).find('Status').text());
                    console.log($(this).find('StrMessage').text());

                    var vrStatus = $(this).find('Status').text();

                    if (vrStatus == "E") {
                        awbExist = false;
                        var r = $(this).find('StrMessage').text();
                        r = r.replace("Error:", "");
                        $.alert(r);
                        return;
                    }
                });
            },
            error: function (msg) {
                // //debugger;
                // $("body").mLoading('hide');
                // var r = jQuery.parseJSON(msg.responseText);
                // $.alert(r.Message);
            }
        });


        if (awbExist == false)
            return;
    }

    console.log("SaveUploadFile  image data save");

    ImagesXmlGen = '<FileData>';
    var ImagesXmlGen1 = '<FileData>';

    for (var n = 0; n < imageDataForArray.length; n++) {
        var j = n + 1;
        var fileNAme = "TLogo" + j.toString();
        ImagesXmlGen += "<Img FileName=" + '"' + fileNAme + '"'
            + " FileExtention= " + '"jpg"'
            + " Image= " + '"' + imageDataForArray[n] + '" ></Img>';
    }

    for (var n = 0; n < imageDataForArray.length; n++) {
        var j = n + 1;
        var fileNAme = "TLogo" + j.toString();
        ImagesXmlGen1 += "<Img FileName=" + '"' + fileNAme + '"'
            + " FileExtention= " + '"jpg"'
            + " Image= " + '"' + n.toString() + '" ></Img>';
    }

    ImagesXmlGen += "</FileData>";
    ImagesXmlGen1 += "</FileData>";

    console.log(ImagesXmlGen);
    console.log(ImagesXmlGen1);
    // alert(ImagesXmlGen);

    // return ImagesXmlGen;

    inputxml = '<ROOT><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><FlightSeqNo>0</FlightSeqNo><AWBPrefix>'
        + MAWBNo.substring(0, 3) + '</AWBPrefix><Type>E</Type><AWBNo>' + MAWBNo.substring(3, MAWBNo.length)
        + '</AWBNo><ULDId>-1</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></ROOT>';

    // alert(inputxml);
    // console.log(inputxml);

    console.log(JSON.stringify({
        'InputXML': inputxml, 'InputImage': ImagesXmlGen1,
    }));

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "SaveFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml, 'InputImage': ImagesXmlGen,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {

                console.log("SaveUploadFile  image data save done here");
                var parser, xmlDoc;
                $("body").mLoading('hide');
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(response.d, "text/xml");
                var msg = xmlDoc.getElementsByTagName("StrMessage")[0].childNodes[0].nodeValue;
                $.alert(msg);

                imageDataForArray = [];
                ImagesXmlGen = '';
                inputxml = '';
                $('#divImages').empty();

                clearALL();

                // $.alert('File Saved Successfully');


                // var parser, xmlDoc;
                // $("body").mLoading('hide');
                // parser = new DOMParser();
                // xmlDoc = parser.parseFromString(response.d, "text/xml");
                // var msg = xmlDoc.getElementsByTagName("StrMessage")[0].childNodes[0].nodeValue;
                // $.alert(msg);

                // imageDataForArray = [];
                // ImagesXmlGen = '';
                // inputxml ='';
                // $('#divImages').empty();
                // var parser, xmlDoc;
                // $("body").mLoading('hide');
                // parser = new DOMParser();
                // xmlDoc = parser.parseFromString(response.d, "text/xml");
                // var msg = xmlDoc.getElementsByTagName("StrMessage")[0].childNodes[0].nodeValue;
                // $.alert(msg);
                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                console.log(msg);
                // $.alert('Some error occurred while saving data');
                // imageDataForArray = [];
                // ImagesXmlGen = '';
                // inputxml ='';
                // $('#divImages').empty();

            }
        });
        //return false;
    }

}

// function ChkAndValidatesssss() {

//     var ScanCode = $('#txtAWBNo').val();
//     ScanCode = ScanCode.replace(/\s+/g, '');
//     ScanCode = ScanCode.replace("-", "").replace("–", "");

//     if (ScanCode.length >= 11) {

//         // $('#txtAWBPrefix').val(ScanCode.substr(0, 3));
//         // $('#txtAWBNo').val(ScanCode.substr(3, 8));
//         // $('#txtAWBNo').val('');
//         GetHAWBDetailsForMAWB();
//     }
// }






function clearALL() {
    console.log("Clear all called here");
    $('#txtAWBNo').val('');
    $('#txtAWBNoscanned').val('');

    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();
    $('#txtDescription').val('');
    imageDataForArray = [];
    ImagesXmlGen = '';
    inputxml = '';
    $('#divImages').empty();

    $("#cameraTakePicture").removeAttr('disabled');
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}


