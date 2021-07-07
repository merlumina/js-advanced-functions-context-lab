/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (employeeArray) {
    return employeeArray.map(createEmployeeRecord);
}

let createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

let createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

let hoursWorkedOnDate = function (soughtDate) {
    let timeIn = this.timeInEvents.find((e) => {return e.date === soughtDate}).hour;
    let timeOut = this.timeOutEvents.find((e) => {return e.date === soughtDate}).hour;
    return (timeOut - timeIn) / 100;
}

let wagesEarnedOnDate = function (soughtDate) {
    return hoursWorkedOnDate.call(this, soughtDate) * this.payPerHour;
}

let calculatePayroll = function (employeeList) {
    let allWages = employeeList.reduce(function(memo, e) { return memo + allWagesFor.call(e) }, 0);
    return allWages;
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(rec => rec.firstName == firstName);
}