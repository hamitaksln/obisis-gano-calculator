lessons = document.querySelectorAll(
    "tr[style='color:Black;background-color:#EEEEEE;border-width:1pt;border-style:Solid;white-space:nowrap;'],tr[style='color:Black;background-color:Gainsboro;border-width:1pt;border-style:Solid;white-space:nowrap;']"
);

success_scores = {
    AA: 4.0,
    BA: 3.5,
    BB: 3.0,
    CB: 2.5,
    CC: 2.0,
    DC: 1.5,
    DD: 1.0,
    FD: 0.5,
    FF: 0,
};

lessons_unique = {};

lessons.forEach((element) => {
    lesson_code = element.querySelector("td:nth-child(1)").innerText;
    lesson_name = element.querySelector("td:nth-child(2)").innerText;
    lesson_credit = element.querySelector("td:nth-child(7)").innerText;
    lesson_success_score = element.querySelector("td:nth-child(8)").innerText;
    lesson_success_multiply = element
        .querySelector("td:nth-child(9)")
        .innerText.trim();
    lesson_weight_avg = element
        .querySelector("td:nth-child(10)")
        .innerText.trim();
    lesson_result = element.querySelector("td:nth-child(11)").innerText;

    if (lesson_success_multiply != "") {
        lessons_unique[lesson_code] = {
            lesson_name: lesson_name,
            lesson_credit: parseInt(lesson_credit),
            lesson_success_score: lesson_success_score,
            lesson_success_multiply: parseFloat(lesson_success_multiply),
            lesson_weight_avg: parseFloat(lesson_weight_avg),
            lesson_result: lesson_result,
        };
    }
});

maximum_weight_avg = 0;
total_weight_avg = 0;

Object.entries(lessons_unique).forEach(([key, value]) => {
    maximum_weight_avg += value["lesson_credit"] * 4;
    total_weight_avg += value["lesson_weight_avg"];
});

gano = (total_weight_avg / maximum_weight_avg) * 4;

document.querySelector("span#ctl02_uscDersDurumTitle_lblTitle").remove();

lesson_status_td = document.querySelector(
    "#CenterPan > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)"
);

lesson_status_btn = document.createElement("a");
lesson_status_btn.innerText = "Ders Durum";
lesson_status_btn.classList.add("btn");
lesson_status_btn.href = "#";

gano_calculator_btn = document.createElement("a");
gano_calculator_btn.innerText = "Gano Hesapla";
gano_calculator_btn.classList.add("btn");
gano_calculator_btn.href = "#";

gano_container_div = document.createElement("div");
gano_container_div.classList.add("gano-container");
gano_container_div.innerHTML = `<div><span>Gano</span>
<span class="gano-count">3.00</span></div>`;
document.querySelector("body").appendChild(gano_container_div);

about_container_div = document.createElement("div");
about_container_div.classList.add("about-container");
about_container_div.innerHTML = `<span>Abdulhamit Akaslan - hamtaksln@gmail.com</span>`;
document.querySelector("body").appendChild(about_container_div);

lesson_status_td.appendChild(lesson_status_btn);
lesson_status_td.appendChild(gano_calculator_btn);

gano_count = document.querySelector("span.gano-count");
gano_count.innerText = `${Number(gano.toFixed(2))}`;

isLessonStatusVisible = false;

lesson_status_table = document.querySelector("table#ctl02_tblDersDurum");

center_pan = document.querySelector("td#CenterPan");

lesson_status_btn.addEventListener("click", function () {
    if (!isLessonStatusVisible) {
        center_pan.appendChild(lesson_status_table);
        gano_div.remove();
        isLessonStatusVisible = true;
    }
});

gano_calculator_btn.addEventListener("click", function () {
    if (isLessonStatusVisible) {
        lesson_status_table.remove();
        center_pan.appendChild(gano_div);
        isLessonStatusVisible = false;
    }
});

lesson_status_table.remove();

gano_div = document.createElement("div");
gano_div.classList.add("gano-calculator-container");
gano_div.innerHTML = `<div class="lesson lesson-info">
<span style="width:5%;"></span>
<span class="lesson-code" style="width:15%;">Ders Kodu</span>
<span class="lesson-name" style="width:45%;">Ders Adı</span>
<span class="lesson-credit" style="width:10%;">Ders Kredisi</span>
<span class="lesson-succes-score" style="width:10%;">Başarı Notu</span>
<span class="lesson-succes-multiply" style="width:10%;">Başarı Katsayısı</span>
<span class="lesson-weight-avg" style="width:5%;">Ağırlıklı Ortalama</span>
</div>`;

center_pan.appendChild(gano_div);

Object.entries(lessons_unique).forEach(([lesson_code, lesson]) => {
    lesson_div = document.createElement("div");
    lesson_div.classList.add("lesson");
    lesson_div.innerHTML = `<input type="checkbox" checked style="width:5%;">
    <span class="lesson-code" style="width:15%;">${lesson_code}</span>
    <span class="lesson-name" style="width:45%;">${lesson["lesson_name"]}</span>
    <span class="lesson-credit" style="width:10%;">${lesson["lesson_credit"]}</span>
    <span class="lesson-succes-score" style="width:0%;">${lesson["lesson_success_score"]}</span>
    <div style="width:10%;">
    <select class="succes-selector">
               <option value = "AA">AA</option>
               <option value = "BA">BA</option>
               <option value = "BB">BB</option>
               <option value = "CB">CB</option>
               <option value = "CC">CC</option>
               <option value = "DC">DC</option>
               <option value = "DD">DD</option>
               <option value = "FD">FD</option>
               <option value = "FF">FF</option>
             </select>
  </div>
    <span class="lesson-succes-multiply" style="width:10%;">${lesson["lesson_success_multiply"]}</span>
    <span class="lesson-weight-avg" style="width:5%;">${lesson["lesson_weight_avg"]}</span>`;

    gano_div.appendChild(lesson_div);
});

lesson_arr = document.querySelectorAll("div.lesson + div.lesson");

total_weight_avg = 0;
maximum_weight_avg = 0;

function calculateGanoFirstTime() {
    total_weight_avg = 0;
    maximum_weight_avg = 0;

    lesson_arr.forEach((lesson_el) => {
        lesson_checkbox = lesson_el.querySelector("input");
        if (lesson_checkbox.checked) {
            lesson_succes_score_letter = lesson_el.querySelector(
                ".lesson-succes-score"
            ).innerText;

            lesson_succes_selector = lesson_el.querySelector(
                "select.succes-selector"
            );
            lesson_succes_selector.value = lesson_succes_score_letter;

            lesson_succes_score = success_scores[lesson_succes_selector.value];

            lesson_credit = parseInt(
                lesson_el.querySelector("span.lesson-credit").innerText
            );
            lesson_weight_avg = lesson_credit * lesson_succes_score;

            lesson_success_multiply_span = lesson_el.querySelector(
                "span.lesson-succes-multiply"
            );
            lesson_success_multiply_span.innerText = lesson_succes_score;

            lesson_lesson_weight_avg_span = lesson_el.querySelector(
                "span.lesson-weight-avg"
            );
            lesson_lesson_weight_avg_span.innerText = lesson_weight_avg;

            total_weight_avg += lesson_weight_avg;
            maximum_weight_avg += lesson_credit * 4;
        }
    });

    gano = (total_weight_avg / maximum_weight_avg) * 4;
    gano_count.innerText = `${gano.toFixed(2)}`;
}

function calculateGanoSelected() {
    total_weight_avg = 0;
    maximum_weight_avg = 0;

    lesson_arr.forEach((lesson_el) => {
        lesson_checkbox = lesson_el.querySelector("input");
        if (lesson_checkbox.checked) {
            lesson_succes_selector = lesson_el.querySelector(
                "select.succes-selector"
            );
            lesson_succes_score_letter = lesson_succes_selector.value
            lesson_succes_score = success_scores[lesson_succes_score_letter];

            lesson_credit = parseInt(
                lesson_el.querySelector("span.lesson-credit").innerText
            );
            lesson_weight_avg = lesson_credit * lesson_succes_score;

            lesson_success_multiply_span = lesson_el.querySelector(
                "span.lesson-succes-multiply"
            );
            lesson_success_multiply_span.innerText = lesson_succes_score;

            lesson_lesson_weight_avg_span = lesson_el.querySelector(
                "span.lesson-weight-avg"
            );
            lesson_lesson_weight_avg_span.innerText = lesson_weight_avg;

            total_weight_avg += lesson_weight_avg;
            maximum_weight_avg += lesson_credit * 4;
        }
    });

    gano = (total_weight_avg / maximum_weight_avg) * 4;
    gano_count.innerText = `${gano.toFixed(2)}`;
}

calculateGanoFirstTime();

lesson_checkboxes = document.querySelectorAll(
    "div.lesson + div.lesson > input"
);

lesson_checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        calculateGanoSelected();
    });
});

lesson_selectors = document.querySelectorAll("select.succes-selector");

lesson_selectors.forEach((selector) => {
    selector.addEventListener("change", (event) => {
        calculateGanoSelected();
        
    });
});
