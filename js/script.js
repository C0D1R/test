const lang = document.getElementsByName("language");
const sem = document.getElementsByName("semester");
const dept = document.getElementsByName("department");
const courty = document.getElementsByName("course_type");

const btn = document.getElementById("btn");
const list = document.getElementById("list");

var langValue = "";
var semValue = "";
var deptValue = "";
var courtyValue = [];

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

    langValue = getRadioBoxValue(lang);
    semValue = getRadioBoxValue(sem);
    deptValue = getRadioBoxValue(dept);
    courtyValue = getCheckBoxValue(courty);

    function getJson(url) {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.send(null);
        request.onload = function() {
            if(request.status == 200) {
                let json = JSON.parse(request.responseText);
                (function() {
                    let html = "";
                    for(let i = 0, len = json.length; i < len; i++) {
                        html += `
                                <div>
                                    <div style="width: 30%; padding-left: 5%;" class="float datalistli">${json[i].list_name}</div>
                                    <div style="width: 7%;" class="float datalistli">${json[i].list_credit}</div>
                                    <div style="width: 18%;" class="float datalistli textsetmid">${json[i].list_lecturer}</div>
                                    <div style="width: 13%;" class="float datalistli textsetmid">${json[i].list_type}</div>
                                    <div style="width: 17%;" class="float datalistli textsetmid">${json[i].list_field_class}</div>
                                    <div style="width: 10%;" class="float datalistli">${json[i].list_time}</div>
                                    <div style="clear: both;"></div>
                                </div>
                                `;
                    }
                    list.innerHTML += html;
                    sessionStorage.setItem("listHTML", list.innerHTML);
                }());
            }
        }
    }
    addlist_course_th();
    for(let i = 0, len = courtyValue.length; i < len; i++) {
        if(courtyValue[i] != "general_elective_subject") {
            let url = "./data/" + semValue + "-" + deptValue + "_" + courtyValue[i] + ".json";
            getJson(url);
        }
        else {
            general_course_list = judge_academy();
            for(let j = 0, len = general_course_list.length; j < len; j++) {
                let url = "./data/" + semValue + "-" + general_course_list[j] + ".json";
                getJson(url);
            }
        }
    }
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

function judge_academy() {
    switch(deptValue) {
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