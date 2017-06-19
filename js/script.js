var MINIMUM_BILL = 1544;
var SOCIAL_HEATING = 48.87;
var SOCIAL_HOT_WATER = 1.6;
var SOCIAL_COLD_WATER = 4;
var SOCIAL_GAS = 4.4;
var SOCIAL_POWER = 90;
var SOCIAL_POWER_OVER = 168;

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
        document.getElementById(el).style.display = 'table-row';
    else
        document.getElementById(el).style.display = 'none';
}

function RoundTo2Numbers(num) {
    return Math.round(num * 100) / 100;
}

function Calculate3Tab() {
    ViewSpecifications();
    CalculateSubsidies();

    if (document.getElementById('t1-inpMemSalary0').value) {
        CalculateMinimumBill();
    }

    // view first table at third tab
    function ViewSpecifications() {
        var rowsCounter = document.getElementById('t1-tableMembers').rows.length;

        var peopleCount = rowsCounter - 1;
        var homeArea = document.getElementById('inpTotalArea').value;
        var homeHeatingArea = document.getElementById('inpHeatArea').value;
        var region = document.getElementById('t1-dropRegion').innerHTML;
        var typeOfSettlement = document.getElementById('dropSettlement').innerHTML;

        document.getElementById('countOfMembers').innerHTML = peopleCount;
        document.getElementById('t3-areaOfHome').innerHTML = homeArea;
        document.getElementById('t3-areaOfHeating').innerHTML = homeHeatingArea;
        document.getElementById('nameOfRegion').innerHTML = region;
        document.getElementById('typeOfSettlement').innerHTML = typeOfSettlement;
    }

    // calculate and view second table at third tab
    function CalculateMinimumBill() {
        document.getElementById('t3-calcMin').innerHTML = MINIMUM_BILL + ' грн.';
        var peopleCount = document.getElementById('t1-tableMembers').rows.length - 1;

        var salarySum = 0;

        for (var i = 0; i < peopleCount; i++) {
            var salaryEl = document.getElementById('t1-inpMemSalary' + i);
            salarySum += parseFloat(salaryEl.value);
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

    // calculate and view third and fourth tables third tab
    function CalculateSubsidies() {

        FillSocialRules();

        if (document.getElementById('t2-inpHeatPeriod').value) {

            CreateTariff('t2-inpHeatPeriod', 0, SOCIAL_HEATING);
        }

        if (document.getElementById('t2-chbHotWater').checked == true) {

            CreateTariff('t2-inpHotWater', 1, SOCIAL_HOT_WATER);
        }

        if (document.getElementById('t2-chbColdWater').checked == true) {

            CreateTariff('t2-inpColdWater', 2, SOCIAL_COLD_WATER);
        }

        if (document.getElementById('t2-chbGasSupply').checked == true) {

            CreateTariff('t2-inpGasSupply', 3, SOCIAL_GAS);
        }

        function CreateTariff(input, number, constant) {
            var heatValue = document.getElementById(input + 'H').value;
            document.getElementById('t3-tariffH' + number).innerHTML = heatValue;
            document.getElementById('t3-costH' + number).innerHTML = RoundTo2Numbers(heatValue * constant);

            var value = document.getElementById(input).value;
            document.getElementById('t3-tariff' + number).innerHTML = value;
            document.getElementById('t3-cost' + number).innerHTML = RoundTo2Numbers(value * constant);
        }

        if (document.getElementById('t2-chbPowerSupply').checked == true) {

            var heatValue = document.getElementById('t2-inpPowerSupplyH').value;
            document.getElementById('t3-tariffH4').innerHTML = heatValue;
            if (heatValue > 100) {
                document.getElementById('t3-costH4').innerHTML = RoundTo2Numbers(heatValue * SOCIAL_POWER_OVER);
            } else {
                document.getElementById('t3-costH4').innerHTML = RoundTo2Numbers(heatValue * SOCIAL_POWER);
            }

            var value = document.getElementById('t2-inpPowerSupply').value;
            document.getElementById('t3-tariff4').innerHTML = value;
            if (value > 100) {
                document.getElementById('t3-cost4').innerHTML = RoundTo2Numbers(value * SOCIAL_POWER_OVER);
            } else {
                document.getElementById('t3-cost4').innerHTML = RoundTo2Numbers(value * SOCIAL_POWER);
            }
        }

        var subsidiesSum = 0, subsidiesSumH = 0;

        // console.log('рядків: ' + document.getElementById('t3-bodySubsidies').rows.length-2);

        for (var i = 0; i < document.getElementById('t3-bodySubsidies').rows.length - 2; i++) {
            var val = document.getElementById('t3-cost' + i).innerHTML;
            if (val != "") {
                subsidiesSum += parseFloat(document.getElementById('t3-cost' + i).innerHTML);
            }
            var valH = document.getElementById('t3-costH' + i).innerHTML;
            if (valH != "") {
                subsidiesSumH += parseFloat(document.getElementById('t3-costH' + i).innerHTML);
            }
        }

        subsidiesSum = RoundTo2Numbers(subsidiesSum);
        subsidiesSumH = RoundTo2Numbers(subsidiesSumH);

        var str = document.getElementById('t3-valueOfBill').innerHTML;
        var num = str.slice(0, str.indexOf(' '));
        var monthBill = parseFloat(num);

        var billSum = subsidiesSum - monthBill;
        var billSumH = subsidiesSumH - monthBill;

        billSum = RoundTo2Numbers(billSum);
        billSumH = RoundTo2Numbers(billSumH);

        document.getElementById('t3-servicesSum').innerHTML = subsidiesSum + ' грн.';
        document.getElementById('t3-subsidies').innerHTML = 'Субсидія в неопалювальний період: ' + billSum + ' грн. (' + subsidiesSum + ' грн. - ' + monthBill + ' грн.)';
        document.getElementById('t3-headerTableSubsidies').innerHTML = billSum + ' грн.';

        document.getElementById('t3-servicesSumH').innerHTML = subsidiesSumH + ' грн.';
        document.getElementById('t3-subsidiesH').innerHTML = 'Субсидія в опалювальний період: ' + billSumH + ' грн. (' + subsidiesSumH + ' грн. - ' + monthBill + ' грн.)';
        document.getElementById('t3-headerTableSubsidiesH').innerHTML = billSumH + ' грн.';

        // fill and view social rules for services at third tab
        function FillSocialRules() {
            document.getElementById('t3-socialRule0').innerHTML = SOCIAL_HEATING + ' кв. м.';
            document.getElementById('t3-socialRuleH0').innerHTML = SOCIAL_HEATING + ' кв. м.';

            document.getElementById('t3-socialRule1').innerHTML = SOCIAL_HOT_WATER + ' куб. м.';
            document.getElementById('t3-socialRuleH1').innerHTML = SOCIAL_HOT_WATER + ' куб. м.';

            document.getElementById('t3-socialRule2').innerHTML = SOCIAL_COLD_WATER + ' куб. м.';
            document.getElementById('t3-socialRuleH2').innerHTML = SOCIAL_COLD_WATER + ' куб. м.';

            document.getElementById('t3-socialRule3').innerHTML = SOCIAL_GAS + ' куб. м.';
            document.getElementById('t3-socialRuleH3').innerHTML = SOCIAL_GAS + ' куб. м.';

            document.getElementById('t3-socialRule4').innerHTML = SOCIAL_POWER + ' коп. до 100 кВт, \n' + SOCIAL_POWER_OVER + ' коп. від 100 кВт';
            document.getElementById('t3-socialRuleH4').innerHTML = SOCIAL_POWER + ' коп. до 100 кВт, \n' + SOCIAL_POWER_OVER + ' коп. від 100 кВт';

        }
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
    if (document.getElementById('t1-inpMemSalary0').value) {
        $('.nav-tabs > .active').next('li').find('a').trigger('click');
        Calculate3Tab();
    } else {
        alert('Порожнє поле!');
    }
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
document.getElementById('t2-chbHotWater').onclick = function () {
    ShowOrHideElementById('t2-HotWaterGroup');
    ShowOrHideElementById('t3-row1');
    ShowOrHideElementById('t3-rowH1');
    document.getElementById('t2-inpHotWater').value = "";
    document.getElementById('t2-inpHotWaterH').value = "";
};
document.getElementById('t2-chbColdWater').onclick = function () {
    ShowOrHideElementById('t2-ColdWaterGroup');
    ShowOrHideElementById('t3-row2');
    ShowOrHideElementById('t3-rowH2');
    document.getElementById('t2-inpColdWater').value = "";
    document.getElementById('t2-inpColdWaterH').value = "";
};
document.getElementById('t2-chbPowerSupply').onclick = function () {
    ShowOrHideElementById('t2-PowerSupplyGroup');
    ShowOrHideElementById('t3-row3');
    ShowOrHideElementById('t3-rowH3');
    document.getElementById('t2-inpPowerSupply').value = "";
    document.getElementById('t2-inpPowerSupplyH').value = "";
};
document.getElementById('t2-chbGasSupply').onclick = function () {
    ShowOrHideElementById('t2-GasSupplyGroup');
    ShowOrHideElementById('t3-row4');
    ShowOrHideElementById('t3-rowH4');
    document.getElementById('t2-inpGasSupply').value = "";
    document.getElementById('t2-inpGasSupplyH').value = "";
};
init();
function init() {
    // hide all groups
    document.getElementById('t2-chbHotWater').click();
    document.getElementById('t2-chbColdWater').click();
    document.getElementById('t2-chbPowerSupply').click();
    document.getElementById('t2-chbGasSupply').click();
}