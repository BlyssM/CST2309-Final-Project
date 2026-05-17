"use strict"
/* Calendar functionality for Aurora Yoga Gym 
    Created by: Blyss Marte
    Date: May 17, 2026*/

/* File name: calendar.js

   Description: This JavaScript file contains functions to generate a calendar for the current month, 
                highlighting the current date. The calendar is displayed on the Events page to help
                members keep track of upcoming events and workshops.
    Function List:  
    createCalendar(calDate)
        Generates the calendar table for the month specified in the calDate parameter. The current date is highlighted in the table.    
    calCaption(calDate)
        Writes the caption of the calendar table, which includes the month and year.
    calWeekdayRow()
        Writes the weekday title rows in the calendar table.
    daysInMonth(calDate)
        Returns the number of days in the month from calDate.
    calDays(calDate)
        Writes the daily rows in the calendar table, highlighting calDate.
*/

var thisDay = new Date("August 15, 2026"); // Set the date displayed in the calendar to the current month

// Write the calendar to the element with the id "calendar" if it exists
var calendarContainer = document.getElementById("calendar");
if (calendarContainer) {
    calendarContainer.innerHTML = createCalendar(thisDay);
}

/* Function to generate the calendar table */
function createCalendar(calDate) {
    var calendarHTML = "<table id ='calendar_table'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calWeekdayRow();
    calendarHTML += calDays(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

/* Function to write the calendar caption */
function calCaption(calDate) {
    // monthName array contains the list of month namespaces 
    var monthName = ["January", "February","March","April","May","June","July","August",
                    "September","October","November","December"];

    // Determine the current month
    var thisMonth = calDate.getMonth();
    
    // Determine the current year
    var thisYear = calDate.getFullYear();

    // Write the caption
    return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}

function calWeekdayRow() {
    // Array of weekday names
    var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var rowHTML = "<tr>";

    // Loop through the dayName array to create the weekday title row
    for (var i = 0; i < dayName.length; i++) {
        rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
    }
    rowHTML += "</tr>";
    return rowHTML;
}

/* Function to calculate the number of days in the month from calDate */
function daysInMonth(calDate) {
    //Array of the number of days in each month
    var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var thisYear = calDate.getFullYear();
    var thisMonth = calDate.getMonth();

    //extract the four digit year and the month number from calDate
    var thisYear = calDate.getFullYear();
    var thisMonth = calDate.getMonth();


    //Check for leap year and adjust the number of days in February
    if (thisMonth === 1) {
        if ((thisYear % 100 !== 0) || (thisYear % 400 === 0)) {
            dayCount[1] = 29;
        }
    }
    //Return the number of days in the month
    return dayCount[thisMonth];

}

/* Function to write table rows for each day of the month */
function calDays(calDate) {
    // determine the starting day of the month
    var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    var weekDay = day.getDay();

    // write blank cells for days before the first day of the month
    var dayHTML = "<tr>";
    for (var i = 0; i < weekDay; i++) {
        dayHTML += "<td></td>";
    }

    // write cells for each day of the month
    var totalDays = daysInMonth(calDate);
    var highlightDay = calDate.getDate();

    for (var i = 1; i <= totalDays; i++) {
        day.setDate(i);
        weekDay = day.getDay();

        if (weekDay === 0 && i > 1) {
            dayHTML += "</tr><tr>";
        }

        var eventText = typeof dayEvent !== 'undefined' && dayEvent[i] ? dayEvent[i] : "";
        var hasEvent = eventText !== "";
        var classes = 'calendar_dates' + (hasEvent ? ' has-event' : '');
        var idAttr = (i === highlightDay) ? " id='calendar_today'" : "";
        var eventHtml = hasEvent ? "<div class='event-info'>" + eventText + "</div>" : "";
        dayHTML += "<td class='" + classes + "'" + idAttr + ">" + i + eventHtml + "</td>";
    }

    if (weekDay !== 6) {
        for (var j = weekDay + 1; j <= 6; j++) {
            dayHTML += "<td></td>";
        }
    }
    dayHTML += "</tr>";
    return dayHTML;
}