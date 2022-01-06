const btn = document.getElementById("btn");
const list = document.getElementById("list");

function getRadioBoxValue(RadioBoxValue) {
    for(let i = RadioBoxValue.length-1; i >= 0; i--) {
        if(RadioBoxValue[i].checked) {
            return RadioBoxValue[i].value;
        }
    }
}
function getCheckBoxValue(CheckBoxValue) {
    let CheckedValue = [];
    for(let i = CheckBoxValue.length-1, j = 0; i >= 0; i--) {
        if(CheckBoxValue[i].checked) {
            CheckedValue[j++] = CheckBoxValue[i].value;
        }
    }
    return CheckedValue;
}

window.onload = function() {
    if(sessionStorage.getItem("CourseList")) {
        list.innerHTML = sessionStorage.getItem("CourseList")
    };
}

btn.addEventListener("click", function() {
    sessionStorage.clear();
    list.innerHTML = "";

    (function() {
        let html = "", url = [];
        (function() {
            const semester = getRadioBoxValue(document.getElementsByName("semester"));
            const schoolsystem = getRadioBoxValue(document.getElementsByName("schoolsystem"));
            const department =  getRadioBoxValue(document.getElementsByName("department"));
            const coursetype = getCheckBoxValue(document.getElementsByName("course_type"));
            for(let i = coursetype.length-1; i >= 0; i--) {
                if(coursetype[i] != "general_elective") {
                    url.push("./data/" + semester + "_" + schoolsystem + "_" + department + "_" + coursetype[i] + ".json");
                }
                else {
                    const gencourse = getGeneralField(department);
                    for(let j = gencourse.length-1; j >= 0; j--) {
                        url.push("./data/" + semester + "_" + gencourse[j] + ".json")
                    }
                }
                /*
                url.push(coursetype[i] != "general_elective_subject"?
                        "./data/" + semester + "_" + schoolsystem + "_" + department + "_" + coursetype[] + ".json":
                        "./data/" + semester + "_" + getGeneralField(department) + ".json");
                        */
            }
        }());
        (function() {
            for(let i = url.length-1; i >= 0; i--) {
                console.log(url[i]);
                const request = new XMLHttpRequest();
                request.open("GET", url[i]);
                request.send(null);
                request.onload = function() {
                    if(request.status == 200) {
                        const data = JSON.parse(request.responseText);
                        for(let i = data.length-1, temp = null; i >= 0 && (temp = data[i]); i--) {
                            html += `
                                    <div>
                                        <div style="width: 30%; padding-left: 5%;" class="float datalistli">${temp.list_name}</div>
                                        <div style="width: 7%;" class="float datalistli">${temp.list_credit}</div>
                                        <div style="width: 18%;" class="float datalistli textsetmid">${temp.list_lecturer}</div>
                                        <div style="width: 13%;" class="float datalistli textsetmid">${temp.list_type}</div>
                                        <div style="width: 17%;" class="float datalistli textsetmid">${temp.list_field_class}</div>
                                        <div style="width: 10%;" class="float datalistli">${temp.list_time}</div>
                                        <div style="clear: both;"></div>
                                    </div>
                                    `;
                        }
                    }
                }
            }
        }());
        list.innerHTML += html;
        sessionStorage.setItem("CourseList", html);
    }());

});

function addlist_course_th() {
    list.innerHTML += ` <div>
                            <div style="width: 30%; padding-left: 5%;" class="float datalistlith">課程名稱</div>
                            <div style="width: 7%;" class="float datalistlith">學分</div>
                            <div style="width: 18%;" class="float datalistlith">任課教師</div>
                            <div style="width: 13%;" class="float datalistlith">課程類別</div>
                            <div style="width: 17%;" class="float datalistlith">班級／領域</div>
                            <div style="width: 10%;" class="float datalistlith">時間</div>
                            <div style="clear: both;"></div>
                        </div>`;
}

function getGeneralField(department) {
    switch(department) {
        case "ee":
        case "mech":
        case "eecs":
        case "oe":
        case "csie":
        case "chem":
        case "bio":
        case "vc":
        case "ic":
        case "mes":
        case "cpd":
        case "pmi":
            return ["humanities_and_arts", "social_science", "comprehensive_practice"];
        case "imi":
        case "ib":
        case "accinfo":
        case "ba":
        case "fin":
        case "leisure":
        case "mim":
        case "mis":
        case "hm":
        case "english":
        case "japan":
        case "childcare":
        case "ss":
            return ["humanities_and_arts", "natural_science", "comprehensive_practice"];
        default:
            return ["humanities_and_arts", "social_science", "natural_science", "comprehensive_practice"];
    }
}


/*
    (function() {
        $('#list').html("");
        const url = "https://script.google.com/macros/s/AKfycbwe4Jglb_iKglwI1mIrZ7YwPFEFWaBG9Sy8xwicB4z_6YQf2QaSk2-V0VM5iSxR5k5oHg/exec";
        /*
        const lang = document.getElementsByName("language");
        const sem = document.getElementsByName("semester");
        const dept = document.getElementsByName("department");
        const courty = document.getElementsByName("course_type");
        */

        /*
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
    }());*/