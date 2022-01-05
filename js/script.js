const btn = document.getElementById("btn");
const list = document.getElementById("list");

function getRadioBoxValue(RadioBoxValue) {
    for(let i = 0, len = RadioBoxValue.length; i < len; i++) {
        return RadioBoxValue[i].checked && RadioBoxValue[i].value;
        /*
        if(RadioBoxValue[i].checked) {
            return RadioBoxValue[i].value;
        }
        */
    }
}
function getCheckBoxValue(CheckBoxValue) {
    let CheckedValue = [];
    for(let i = 0, j = 0, len = CheckBoxValue.length; i < len; i++) {
        CheckBoxValue[i].checked && (CheckedValue[j++] = CheckBoxValue[i].value);
        /*
        if(CheckBoxValue[i].checked) {
            CheckedValue[j++] = CheckBoxValue[i].value;
        }*/
    }
    console.log(CheckedValue);
    return CheckedValue;
}

window.onload = function() {
    if(sessionStorage.getItem("CourseList")) {
        list.innerHTML = sessionStorage.getItem("CourseList");
    }
}

btn.addEventListener("click", function() {
    sessionStorage.clear();
    list.innerHTML = "";

    (function() {
        $('#list').html("");
        const url = "https://script.google.com/macros/s/AKfycbwe4Jglb_iKglwI1mIrZ7YwPFEFWaBG9Sy8xwicB4z_6YQf2QaSk2-V0VM5iSxR5k5oHg/exec";
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
            datatype: 'json',
            success: function(response) {
                response = JSON.parse(response);
                console.log(response);
                let html = "";
                for(let i = 0, len = response.length; i < len; i++) {
                    html += `
                            <div>
                                <div style="width: 30%; padding-left: 5%;" class="float datalistli">${response[i].name}</div>
                                <div style="width: 7%;" class="float datalistli">${response[i].credit}</div>
                                <div style="width: 18%;" class="float datalistli textsetmid">${response[i].lecturer}</div>
                                <div style="width: 13%;" class="float datalistli textsetmid">${response[i].type}</div>
                                <div style="width: 17%;" class="float datalistli textsetmid">${response[i].fieldclass}</div>
                                <div style="width: 10%;" class="float datalistli">${response[i].time}</div>
                                <div style="clear: both;"></div>
                            </div>
                            `;
                }
                $('#list').html(html);
                sessionStorage.setItem("CourseList", html);
            }
        });
    }());
});