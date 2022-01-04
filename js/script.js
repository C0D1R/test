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
            CheckedValue[j++] = CheckBoxValue[i].value;
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

    (function() {
        $('#list').html("");
        const url = "https://script.google.com/macros/s/AKfycbwmjzlKmwqocg09qhRQ4bN1cpzjIjaW3IpGdx-7XpgA51QDcq-ce3a6Pdm1QU-AcMZedw/exec";
        /*
        const lang = document.getElementsByName("language");
        const sem = document.getElementsByName("semester");
        const dept = document.getElementsByName("department");
        const courty = document.getElementsByName("course_type");
        */
        $.ajax({
            type: 'GET',
            url: url,
            data: {
                language: getRadioBoxValue(document.getElementsByName("language")),
                semester: getRadioBoxValue(document.getElementsByName("semester")),
                department: getRadioBoxValue(document.getElementsByName("department")),
                coursetype: getCheckBoxValue(document.getElementsByName("course_type"))
            },
            success: function(msg) {
                $('#list').html(JSON.parse(msg));
                console.log(JSON.parse(msg));
            }
        });
    }());
});