var MINIMUM_BILL = 1544;


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
    a.href = '#';
    parentEl.appendChild(li);
    li.appendChild(a);
}


function ShowOrHideElementById(el) {
    if (document.getElementById(el).style.display == 'none')
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}

function Calculate3Tab() {
    ViewSpecifications();
    if (document.getElementById('t1-inpMemSalary0').value) {

        CalculateMinimumBill();
    }
    function CalculateMinimumBill() {
        document.getElementById('t3-calcMin').innerHTML = MINIMUM_BILL + ' грн.';
        var peopleCount = document.getElementById('t1-tableMembers').rows.length - 1;
        console.log(peopleCount);

        var salarySum = 0;

        for (var i = 0; i < peopleCount; i++) {
            var salaryEl = document.getElementById('t1-inpMemSalary' + i);
            // console.log(salaryEl.value);
            salarySum += parseFloat(salaryEl.value);
        }

        function RoundTo2Numbers(num) {
            return Math.round(num * 100)/100;
        }
        var averageSalary = RoundTo2Numbers(salarySum / 12);
        var averageSalaryForOne = RoundTo2Numbers(averageSalary / peopleCount);
        var percent = RoundTo2Numbers(averageSalaryForOne / MINIMUM_BILL / 2 * 15);
        var bill = RoundTo2Numbers(averageSalaryForOne / 100 * percent);

        document.getElementById('t3-sumSalary').innerHTML = salarySum + ' грн. (сумарний дохід за попередній рік)';
        document.getElementById('t3-averageSalary').innerHTML = averageSalary + ' грн. (= ' + salarySum + ' грн. / 12 місяців)';
        document.getElementById('t3-averageSalaryForOne').innerHTML = averageSalaryForOne + ' грн. (= ' + averageSalary + 'грн. / ' + peopleCount + ' особу(и))';
        document.getElementById('t3-percentOfBill').innerHTML = percent + ' % (= ' + averageSalaryForOne + ' грн. / ' + MINIMUM_BILL + ' грн. / 2* 15%)';
        document.getElementById('t3-valueOfBill').innerHTML = bill + ' грн. (= ' + averageSalaryForOne + ' грн. / 100 * ' + percent + ' %)';
    }

    function ViewSpecifications() {
        var rowsCounter = document.getElementById('t1-tableMembers').rows.length;

        var peopleCount = rowsCounter - 1;
        var homeArea = document.getElementById('inpTotalArea').innerHTML;
        var homeHeatingArea = document.getElementById('inpHeatArea').innerHTML;
        var region = document.getElementById('t1-dropRegion').innerHTML;
        var typeOfSettlement = document.getElementById('dropSettlement').innerHTML;

        document.getElementById('countOfMembers').innerHTML = peopleCount;
        document.getElementById('areaOfHome').innerHTML = homeArea;
        document.getElementById('areaOfHeating').innerHTML = homeHeatingArea;
        document.getElementById('nameOfRegion').innerHTML = region;
        document.getElementById('typeOfSettlement').innerHTML = typeOfSettlement;
    }
}

// add new row to table
document.getElementById('btnAddRow').onclick = function () {
    var rowsCounter = document.getElementById('t1-tableMembers').rows.length - 1;

    var index = 0;

    var parent = document.getElementById('t1-tableBody');
    var tr = document.createElement('tr');
    tr.setAttribute('id', 't1-row' + rowsCounter);
    parent.appendChild(tr);

    function AddElToTd(el) {
        index++;
        var td = document.createElement('td');

        if (index % 4 == 0) {
            td.appendChild(document.createTextNode('Сукупний дохід: '));

        }

        td.appendChild(el);

        if (index % 4 == 0) {
            td.appendChild(document.createTextNode(' грн.'));
        }

        tr.appendChild(td);
    }

    var num = document.createElement('p');
    num.innerHTML = rowsCounter + 1;
    AddElToTd(num);

    var inputName = document.createElement('input');
    inputName.type = 'text';
    AddElToTd(inputName);

    var chbIsWork = document.createElement('input');
    chbIsWork.type = 'checkbox';
    chbIsWork.setAttribute('id', 't1-chbMemIsWork' + rowsCounter);
    AddElToTd(chbIsWork);

    var inputSalary = document.createElement('input');
    inputSalary.type = 'text';
    inputSalary.setAttribute('id', 't1-inpMemSalary' + rowsCounter);
    AddElToTd(inputSalary);
};

// del last row in table
document.getElementById('btnDelRow').onclick = function () {
    var rowsCounter = document.getElementById('t1-tableMembers').rows.length;
    if (rowsCounter > 2) {
        var el = document.getElementById('t1-row' + (rowsCounter - 2));
        el.parentNode.removeChild(el);
    }
};

window.onload = function () {
    // add regions to dropdown menu
    var arr = ['Івано-Франківська', 'АР Крим', 'Вінницька', 'Волинська', 'Дніпропетровська', 'Донецька', 'Житомирська',
        'Закарпатська', 'Запорізька', 'Кіровоградська', 'Київська', 'Курорт Буковель', 'Луганська', 'Львівська',
        'Миколаївська', 'Одеська', 'Полтавська', 'Рівненська', 'Сумська', 'Тернопільська', 'Харківська', 'Херсонська',
        'Хмельницька', 'Черкаська', 'Чернівецька', 'Чернігівська'];

    arr.forEach(function (item) {
        AddElementToDropdown('t1-DropDownRegionUl', item);
    });

    // add type of settlement to dropdown menu
    var settlement = ['Село', 'Селище', 'Селище міського типу', 'Місто'];

    settlement.forEach(function (item) {
        AddElementToDropdown('DropDownTypeSettlement', item);
    });

    (function () {
        // set date to header
        var date = new Date();
        var str =
            (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' +
            (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '.' +
            date.getFullYear();

        document.getElementById('h3SubsidiesProtocol').innerHTML += str;
    })();
};

// buttons for navigation Next
$('#btnNext').click(function () {
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
    Calculate3Tab();
});
// buttons for navigation Previous
$('#btnPrev').click(function () {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    Calculate3Tab();
});

document.getElementById('t1').onclick = function () {
    Calculate3Tab();
};
document.getElementById('t2').onclick = function () {
    Calculate3Tab();
};
document.getElementById('t3').onclick = function () {
    Calculate3Tab();
};
document.getElementById('chbHotWater').onclick = function () {
    ShowOrHideElementById('HotWaterGroup');
};

document.getElementById('chbHotWater').onclick = function () {
    ShowOrHideElementById('HotWaterGroup');
};
document.getElementById('chbColdWater').onclick = function () {
    ShowOrHideElementById('ColdWaterGroup');
};
document.getElementById('chbPowerSupply').onclick = function () {
    ShowOrHideElementById('PowerSupplyGroup');
};
document.getElementById('chbGasSupply').onclick = function () {
    ShowOrHideElementById('GasSupplyGroup');
};