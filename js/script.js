function DropdownClick(val) {
    var y = document.getElementsByClassName('btn dropdown-toggle');
    var aNode = y[0].innerHTML = val + ' <span class="caret"></span>'; // Append 
}

function AddElementToDropdown(el, region) {
    var parentEl = document.getElementById(el);

    var li = document.createElement('li');
    li.onclick = function () {
        DropdownClick(this.innerHTML)
    };

    var a = document.createElement('a');
    a.innerHTML = region;
    a.href = "#";
    parentEl.appendChild(li);
    li.appendChild(a);
}

document.getElementById('btnAddRow').onclick = function () {
    // add new row to table
    var rowsCounter = document.getElementById("tableMembers").rows.length;

    var index = 0;

    var parent = document.getElementById('tableBody');
    var tr = document.createElement('tr');
    parent.appendChild(tr);

    function AddElToTd(el) {
        index++;
        var td = document.createElement('td');

        if (index % 4==0) {
            td.appendChild(document.createTextNode('Сукупний дохід: '));

        }

        td.appendChild(el);

        if (index % 4==0) {
            td.appendChild(document.createTextNode(' грн.'));
        }

        tr.appendChild(td);
    }

    var num = document.createElement('p');
    num.innerHTML = rowsCounter;
    AddElToTd(num);

    var inputName = document.createElement('input');
    inputName.type = 'text';
    AddElToTd(inputName);

    var chbIsWork = document.createElement('input');
    chbIsWork.type = 'checkbox';
    chbIsWork.setAttribute('id', 'chbMemIsWork' + rowsCounter);
    AddElToTd(chbIsWork);

    var inputSalary = document.createElement('input');
    inputSalary.type = 'text';
    inputSalary.setAttribute('id', 'inpMemSalary' + rowsCounter);
    AddElToTd(inputSalary);
};

window.onload = function () {
    // add regions to dropdown menu
    var arr = ["Івано-Франківська", "АР Крим", "Вінницька", "Волинська", "Дніпропетровська", "Донецька", "Житомирська",
        "Закарпатська", "Запорізька", "Кіровоградська", "Київська", "Курорт Буковель", "Луганська", "Львівська",
        "Миколаївська", "Одеська", "Полтавська", "Рівненська", "Сумська", "Тернопільська", "Харківська", "Херсонська",
        "Хмельницька", "Черкаська", "Чернівецька", "Чернігівська"];

    arr.forEach(function (item) {
        AddElementToDropdown('DropDownRegion', item);
    });

    // add type of settlement to dropdown menu
    var settlement = ["Село", "Селище", "Селище міського типу", "Місто"];

    settlement.forEach(function (item) {
        AddElementToDropdown('DropDownTypeSettlement', item);
    });
};
