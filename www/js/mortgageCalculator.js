/**
 * Created by simba on 26/08/15.
 */

//document.getElementsByClassName('resultPane').style.display = "none";
/*
Validate form fields function
 */

function validateForm(result, input1, input2, input3, input4 ){
    if(input1 > 0 || input2 > 0 ||input3 > 0 || input4 > 0 ){

        console.log(input1);
        console.log(input2);

        //document.getElementById('resultPane').style.display = "block";
        result.style.display = "block";
        document.getElementById("field-error").style.display = "none";

    }else{
        console.log(input1);
        console.log(input2);
        //console.log("Please fill in the blank spaces");
        document.getElementById("field-error").style.display = "block";
    }
}

//Stamp Duty Calculator -Start
function ShowResultStampDuty()
{

    var	house_price	= document.getElementById("valTextInput").value;
    house_price	=	parseFloat(house_price.replace(/[^0-9.]/g, ''));
    house_price			=	parseFloat(house_price);
    var	stampDuty		=	new Number(0);
    var stampDutyS     =  new Number(0);

    var PropLocation = document.getElementById("proplocation").value;



    /*EWNI calculation */


    if (house_price < 125000.01) {
        stampDuty = 0;
    }
    else if (house_price >= 125000.01 && house_price <= 250000.00) {
        stampDuty = (house_price - 125000) * 0.02;
    }
    else if (house_price >= 250000.01 && house_price <= 925000.00) {
        stampDuty = ((house_price - 250000) * 0.05) + 2500;
    }
    else if (house_price >= 925000.01 && house_price <= 1500000.00) {
        stampDuty = ((house_price - 925000) * 0.1) + 36250;
    }
    else if (house_price >= 1500000.01) {
        stampDuty = ((house_price - 1500000) * 0.12) + 93750;
    }


    stampDuty = addCommas(stampDuty);



    /*S calculation */


    if (house_price < 145000.01) {
        stampDutyS = 0;
    }
    else if (house_price >= 145000.01 && house_price <= 250000.00) {
        stampDutyS = (house_price - 145000) * 0.02;
    }
    else if (house_price >= 250000.01 && house_price <= 325000.00) {
        stampDutyS = ((house_price - 250000) * 0.05) + 2100;
    }
    else if (house_price >= 325000.01 && house_price <= 750000.00) {
        stampDutyS = ((house_price - 325000) * 0.1) + 5850;
    }
    else if (house_price >= 750000.01) {
        stampDutyS = ((house_price - 750000) * 0.12) + 48350;
    }

    stampDutyS = addCommas(stampDutyS);

    /*   alert(PropLocation)
     alert(stampDuty)
     alert(stampDutyS)
     */

    house_price2 = addCommas(house_price);


    document.getElementById('value').innerHTML = house_price2;
    document.getElementById('stampduty').innerHTML = stampDuty;
    if (PropLocation == 'S') {document.getElementById('stampduty').innerHTML = stampDutyS;}

    //document.getElementById('resultPane').style.display = "block";

    var resultPane = document.getElementById('resultPane')

    validateForm(resultPane,house_price,0,0,0)

}

//Stamp Duty Calculator -End

//How much can I borrow on a buy to let mortgage - Start

function ShowResultbuytolet()
{

    ///declare variables
    var	PropertyValue	=	 document.getElementById("valTextInput").value;
    PropertyValue = parseFloat(PropertyValue.replace(/[^0-9.]/g, ''));
    var	MonthlyRent		=	 document.getElementById("rentTextInput").value;
    MonthlyRent	=	parseFloat(MonthlyRent.replace(/[^0-9.]/g, ''));
    var MaxLoanLtv = 0
    var MaxLoantoRent  = 0
    var MaxLoan = 0
    if (MonthlyRent > 0) {
        MaxLoantoRent = (MonthlyRent * 12)/ 0.06875;
        MaxLoantoRent = parseFloat(MaxLoantoRent);
        MaxLoan = MaxLoantoRent;
    }
    if (PropertyValue > 0) {
        MaxLoanLtv = PropertyValue * 0.75;
        MaxLoan = MaxLoanLtv;
    }
    if (MonthlyRent > 0 && PropertyValue > 0){
        if (MaxLoanLtv > MaxLoantoRent) { MaxLoan = MaxLoantoRent }
        else {MaxLoan = MaxLoanLtv}
    }
    MaxLoan = Math.round(MaxLoan * 100)
    MaxLoan = MaxLoan / 100

    MaxLoan = addCommas(MaxLoan);

    document.getElementById("maxborrow").innerHTML = MaxLoan
    //document.getElementById('resultPane').style.display = "block";

    var resultPane = document.getElementById('resultPane')

    //validateForm(PropertyValue, MonthlyRent, resultPane)
    validateForm(resultPane,PropertyValue,MonthlyRent,0,0)

}

//How much can I borrow on a buy to let mortgage - End

/*
Mortgage Affordability calculator
 */

// Start

function ShowResultaffordability() {

    // don't keep doing it, honestly, everything will go crazy.

    var App1Income = document.getElementById("app1incomeTextInput").value;
    App1Income = parseFloat(App1Income.replace(/[^0-9.]/g, ''));
    App1Income = +App1Income || 0
    var App2Income = document.getElementById("app2incomeTextInput").value;
    App2Income = parseFloat(App2Income.replace(/[^0-9.]/g, ''));


    App2Income = +App2Income || 0
    var income = App1Income + App2Income;
    var loweramount = income * 3;
    var higheramount = income * 4.25;
    loweramount = addCommas(loweramount);
    higheramount = addCommas(higheramount);
    document.getElementById('loweramount').innerHTML = loweramount;
    document.getElementById('higheramount').innerHTML = higheramount;
    var resultPane = document.getElementById('resultPane')
    //console.log(App2Income)

    validateForm(resultPane,App1Income,App2Income,0,0)

    //if(App1Income !== 0 || App2Income !==0){
    //    console.log("it is empty");
    //    document.getElementById('resultPane').style.display = "block";
    //
    //}else{
    //    console.log("Please fill in the blank spaces");
    //    document.getElementById("field-error").style.display = "block";
    //}

}


//Mortgage Affordability calculator End


//Effects of making overpayments  - Start

function ShowResultoverpayments()
{

// don't keep doing it, honestly, everything will go crazy.


    var present_value = new Number(document.getElementById("loanTextInput").value);
    var interest_rate = new Number(document.getElementById("rateTextInput").value);
    var loan_term = new Number(document.getElementById("termTextInput").value);
    var monthly_payment = new Number(calculaterepaymentpayment(present_value, interest_rate, loan_term));
    var overpayment = new Number(document.getElementById("overpayTextInput").value);

    var monthlyoverpayment = overpayment + monthly_payment;
    monthlyoverpayment = Math.round(100*monthlyoverpayment)/100;
    var curcost = Math.round(100*(monthly_payment * loan_term * 12))/100;

    pp = new Number(document.getElementById("loanTextInput").value);
    rr = new Number(document.getElementById("rateTextInput").value);
    var ii = rr/1200;
    xx = monthlyoverpayment;
    var nn = Math.log(xx/(xx-pp*ii))/Math.log(1+ii);
    nn1 = nn/12;
    nn = Math.floor(nn1);
    nn_months = (nn - nn1) * -12;
    nn_months = Math.round(nn_months);


    var newcost = Math.round(100*(monthlyoverpayment * 12 * nn1))/100;
    var mp1 = Math.round(100*monthly_payment)/100;
    var mp2 = Math.round(100*monthlyoverpayment)/100;
    var tc1 = Math.round(100*(monthly_payment * loan_term * 12))/100;
    var tc2 = Math.round(100*(curcost - newcost))/100;
    var y1 = Math.round(100*(loan_term - nn))/100;
    var y2 = "error"
    y1 = y1 - 1
    var m2 = 12 - nn_months
    if (y1==1){	y2 = y1 + " year";}
    else {y2 = y1 + " years"	}
    var result =
        "<strong> Effect on Monthly Payments: </strong><br><br>  By overpaying by \u00A3"
        + overpayment +
        " per month your monthly payments will increase from \u00A3"
        + mp1 +
        " to \u00A3"
        + mp2 +
        "<br><br> <strong> Total cost over lifetime of mortgage:  </strong><br><br> By overpaying by \u00A3"
        + overpayment +
        " per month the total cost of your mortgage will decrease from \u00A3"
        + tc1 +
        " to \u00A3"
        + newcost +
        " saving \u00A3"
        + tc2 +
        " <br><br><strong> Term of mortgage: </strong><br><br> By overpaying by \u00A3"
        + overpayment +
        " per month the term of your mortgage will decrease from "
        + loan_term +
        " years to "
        + nn +
        " years and "
        + nn_months +
        " months. A saving of "
        + y2 +
        " and "
        + m2 +
        " months."

    overpayment = addCommas(overpayment);
    mp2 = addCommas(mp2);
    tc1 = addCommas(tc1);
    newcost = addCommas(newcost);
    tc2 = addCommas(tc2);

    document.getElementById("overpayment").innerHTML = overpayment


    document.getElementById("totalcostsaving").innerHTML = tc2


    document.getElementById("termsaving").innerHTML = y2 + " and " + m2 + " months"

    //document.getElementById('resultPane').style.display = "block";

    var resultPane = document.getElementById('resultPane')
    //console.log(App2Income)

    validateForm(resultPane,present_value,interest_rate,loan_term,overpayment)


}
//Effects of making overpayments  -End

//How much can I borrow Calculator

function ShowResult()
{

    var	Loan		=	document.getElementById("loanTextInput").value;
    Loan			=	parseFloat(Loan.replace(/[^0-9.]/g, ''));
    var	Rate		=	document.getElementById("rateTextInput").value;
    Rate			=	parseFloat(Rate.replace(/[^0-9.]/g, ''));
    var	Term		=	new Number(document.getElementById("termTextInput").value);
    Term			=	parseFloat(Term);

    var RepaymentAmount = calculaterepaymentpayment(Loan, Rate, Term);
    var InterestOnly = (Loan * (Rate/100))/12
    InterestOnly = Math.round(InterestOnly);

    RepaymentAmount = addCommas(RepaymentAmount);
    InterestOnly = addCommas(InterestOnly);

    document.getElementById('RepaymentAmount').innerHTML = RepaymentAmount;
    document.getElementById('InterestOnly').innerHTML = InterestOnly;

    //document.getElementById('resultPane').style.display = "block";

    var resultPane = document.getElementById('resultPane');

    validateForm(resultPane,Loan,Rate,Term,0)

}

// CalculatorsCommon.js

function CreateSliderValues(arr, min, max, increment)
{
    for (var i = min; i <= max; i = i + increment)
    {
        arr[arr.length] = i;
    }
    return arr;
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function CreateRSliderValues(arr, min, max)

{
    for (var i = 5; i <= 1000; i = i + 5)
    {
        arr[arr.length] = i/100;
    }
    return arr;

}

function CreateR2SliderValues(arr, min, max)

{
    for (var i = -500; i <= 500; i = i + 25)
    {
        arr[arr.length] = i/100;
    }
    return arr;

}



function FindValueIndex(arrayValues, rawVal)
{
    var currentIdx = 0;
    var val = parseFloat(rawVal);

    if (isNaN(val) || val < arrayValues[0] || val > arrayValues[arrayValues.length - 1])
    {
        return NaN;
    }
    else
    {
        for (idx = 0; idx < arrayValues.length; idx++)
        {
            if (val >= arrayValues[idx])
            {
                currentIdx = idx;
            }
        }

        var differenceLess = Math.abs(val - arrayValues[currentIdx]);
        var moreVal = (currentIdx == (arrayValues.length - 1)) ? arrayValues[currentIdx] : arrayValues[currentIdx + 1];
        var differenceMore = Math.abs(val - moreVal);

        if (differenceLess < differenceMore)
        {
            return currentIdx;
        }
        else
        {
            return currentIdx + 1;
        }
    }

    return NaN;
}


function calculaterepaymentpayment(Loan, Rate, Term){
    var MonthlyRate = Rate/1200 ;
    var TermMonths = Term * -12;
    var Multiplier = 1 + MonthlyRate;
    Multiplier = Math.pow(Multiplier, TermMonths);
    Multiplier = 1 - Multiplier;
    Multiplier = MonthlyRate / Multiplier;
    var RepaymentAmount = Loan * Multiplier;
    RepaymentAmount = Math.round(RepaymentAmount);
    return RepaymentAmount;
}


function submitenter(myfield, e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13) {
        ShowResult();
        return false;
    }
    else
        return true;
}


// CalculatorsCommon.js

function CreateSliderValues(arr, min, max, increment)
{
    for (var i = min; i <= max; i = i + increment)
    {
        arr[arr.length] = i;
    }
    return arr;
}


function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function CreateRSliderValues(arr, min, max)

{
    for (var i = 5; i <= 1000; i = i + 5)
    {
        arr[arr.length] = i/100;
    }
    return arr;

}

function CreateR2SliderValues(arr, min, max)

{
    for (var i = -500; i <= 500; i = i + 25)
    {
        arr[arr.length] = i/100;
    }
    return arr;

}



function FindValueIndex(arrayValues, rawVal)
{
    var currentIdx = 0;
    var val = parseFloat(rawVal);

    if (isNaN(val) || val < arrayValues[0] || val > arrayValues[arrayValues.length - 1])
    {
        return NaN;
    }
    else
    {
        for (idx = 0; idx < arrayValues.length; idx++)
        {
            if (val >= arrayValues[idx])
            {
                currentIdx = idx;
            }
        }

        var differenceLess = Math.abs(val - arrayValues[currentIdx]);
        var moreVal = (currentIdx == (arrayValues.length - 1)) ? arrayValues[currentIdx] : arrayValues[currentIdx + 1];
        var differenceMore = Math.abs(val - moreVal);

        if (differenceLess < differenceMore)
        {
            return currentIdx;
        }
        else
        {
            return currentIdx + 1;
        }
    }

    return NaN;
}


function calculaterepaymentpayment(Loan, Rate, Term){
    var MonthlyRate = Rate/1200 ;
    var TermMonths = Term * -12;
    var Multiplier = 1 + MonthlyRate;
    Multiplier = Math.pow(Multiplier, TermMonths);
    Multiplier = 1 - Multiplier;
    Multiplier = MonthlyRate / Multiplier;
    var RepaymentAmount = Loan * Multiplier;
    RepaymentAmount = Math.round(RepaymentAmount);
    return RepaymentAmount;
}


function submitenter(myfield, e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13) {
        ShowResult();
        return false;
    }
    else
        return true;
}