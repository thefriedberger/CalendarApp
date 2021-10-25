import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
function setCal() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day;
    let date;
    let daysInMonth = new Date(year, month, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    let calendar = document.getElementById("calendar");
    let days = [];
    let currentDay = new Date().getDate() + firstDay-1;
    let dayValue = 1;
    let daysToPrint = (firstDay>4) ? 42 : 35;
    if(daysToPrint==42)
    calendar.style.gridTemplateRows = "150px 150px 150px 150px 150px 150px";

    for(let i=0; i<daysToPrint; i++) {
        let newDay = document.createElement("div");
        newDay.classList.add("day");
        days.push(newDay);
        calendar.append(days[i]);  
    }
    console.log(daysInMonth)
    for(let i=0; i<days.length; i++) {
        if(i>=firstDay) {
            day = new Date(year, month, i+1).getDate();
            days[i].innerText = dayValue; 
            dayValue++;
        }
        if(dayValue>=daysInMonth) {
            return;
        }
        if(currentDay==i) {
            days[i].classList.add("currentDay");
        }
    }
    days.forEach((day) => {
        day.addEventListener("click", function(e) {
            for(let i=0; i<days.length;i++) {
                if(days[i].classList.contains("active")){
                    days[i].classList.remove("active");
                }
            }
            if(e.target.classList.contains("active")) {
                e.target.classList.remove('active');
            } else {
                e.target.classList.add("active");
            }
        })
    })
}

class Calendar extends React.Component {
    componentDidMount(){
        setCal()
    }
    render() {
        return(
            <div id="calendar" className={classnames(styles.calendarContainer)}>
            </div>
        )
    }
}

export default Calendar;