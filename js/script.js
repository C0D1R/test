const btn = document.getElementById("btn");
const list = document.getElementById("list");

function getRadioBoxValue(RadioBoxValue) {
    for(let i = 0, len = RadioBoxValue.length; i < len; i++) {
        if(RadioBoxValue[i].checked) {
            return RadioBoxValue[i].value;
        }
    }
}
function getCheckBoxValue(CheckBoxValue) {
    let CheckedValue = [];
    for(let i = 0, j = 0, len = CheckBoxValue.length; i < len; i++) {
        if(CheckBoxValue[i].checked) {
            CheckedValue[j] = CheckBoxValue[i].value;
            j++;
        }
    }
    return CheckedValue;
}

window.onload = function() {
    if(sessionStorage.getItem("listHTML")) {
        list.innerHTML = sessionStorage.getItem("listHTML");
    }
}

btn.addEventListener("click", function() {
    sessionStorage.clear();
    list.innerHTML = "";
/*
    var langValue = getRadioBoxValue(lang);
    var semValue = getRadioBoxValue(sem);
    var deptValue = getRadioBoxValue(dept);
    var courtyValue = getCheckBoxValue(courty);
*/
    const url = "https://script.google.com/macros/s/AKfycbxlIfOf6bRKlkDQmhmPY2l8rCl0UNOCdQb2jhjbnJ8Dh1jqCnxVzlepIMrwsxU8_efK3g/exec";
    (function() {
        const lang = document.getElementsByName("language");
        const sem = document.getElementsByName("semester");
        const dept = document.getElementsByName("department");
        const courty = document.getElementsByName("course_type");
        $('#list').html("");
        $.ajax({
            type: 'GET',
            url: url,
            data: {
                language: getRadioBoxValue(lang),
                semester: getRadioBoxValue(sem),
                department: getRadioBoxValue(dept),
                coursetype: getCheckBoxValue(courty)
            },
            success: function(msg) {
                $('#list').html(msg);
                console.log(msg);
            }
        });
    }());
});