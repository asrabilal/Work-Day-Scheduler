
//global variable to store events
let eventz=[];
//showing current date on top
$("#currentDay").html(moment().format('dddd, MMMM Do'))
//getting current hour using moment.js
let currentHour =moment().hour();
//getting all the chasses
let allBoxes =document.querySelectorAll('.grd-cal');
allBoxes.forEach(function (val, key) {
    //changing colour red for current hour
    let attr = $(val).attr('data-hour')
    if (currentHour == attr) {
        $(val).children(':nth-child(2)').css('background', 'red')
    }
    //changing colour green for upcoming hours
    if (attr>currentHour){
        $(val).children(':nth-child(2)').css('background', 'green')
    }
})

function editEvent(hour){
    let attr = $(".mainBox").find(`[data-hour='${hour}']`);
    //checking if any of the edit box is active
    let checkBox = $(".mainBox").find(`input`);
    if (checkBox.length >0){
        //if there is another input active so remove it i.e one box edit at a time
        let lastClickHour =$(checkBox).parent().parent().attr('data-hour');
        $(checkBox).parent().html(checkBox[0].value).attr('onclick','editEvent('+lastClickHour+')')
        $('input').remove()
    }
    //getting the text of the already entered event
    let alreadyEvent = $(attr).children(':nth-child(2)').html();
    //disabling the onclick event when clicking on the box
    $(attr).children(':nth-child(2)').attr('onclick','')
    //getting the background color of the box so i can change the input colour accordingly
    let backGroundColorOfInput =$(attr).children(':nth-child(2)').css('background-color');
    $(attr).children(':nth-child(2)').html('').html('<input type="text" style="height: 60px;padding: 10px;width:100%;background-color: '+backGroundColorOfInput+';border: 1px solid black" value="'+alreadyEvent+'" class="form-control my_input_'+hour+'">')
}
// function to save the events to local storage
function saveEvent(hour){
    let inputBox = $(".my_input_"+hour).val()
    eventz.push({title:inputBox,hour:hour});
    localStorage.setItem("event", JSON.stringify(eventz));
    //showing the notification i.e appointment added to localstorage
    $("#showNotificationHere").html('<p style="">Appointment Added to <span style="color: red">localstorage <i class="las la-check"></i></span></p>')
    getEvents()
}
//getting the events from localStorage and showing it to the boxes
function getEvents(){
    let localEvents = localStorage.getItem("event");
    if (localEvents !== null) {
        let parsed = JSON.parse(localEvents);
        for (let i = 0; i < parsed.length; i++) {
            eventz.push( {title: parsed[i].title , hour: parsed[i].hour})
            let attr = $(".mainBox").find(`[data-hour='${parsed[i].hour}']`)
            $(attr).children(':nth-child(2)').html('').html(parsed[i].title)
        }
    }
}
// show all events when page loads
getEvents()
