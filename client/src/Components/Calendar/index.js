import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import Day from '../Day';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
let year = new Date().getFullYear();
let month = new Date().getMonth();
let daysInMonth = new Date(year, month+1, 0).getDate();
let firstDay = new Date(year, month, 1).getDay();
let currentDay = new Date().getDate() + firstDay-1;
let dayValue = 1;
let daysToPrint = (firstDay+daysInMonth>35) ? 42 : 35;

function getFullMonth(i) {
    let months = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];
    return months[i];
}
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: this.setCalendar(),
            currentMonth: getFullMonth(month),
            currentYear: new Date().getFullYear(),
        }
    }
    renderDay(day) {
        return <Day
                    key={day.key}
                    day={day.day}
                    currentDay={day.currentDay}
                    onClick={ () => this.handleClick(day)}
                />;
    }
    handleClick(day) {
        if (day.day != null) { // only fire if day has date
            console.log(this, day);
        }
    }
    setCalendar() {
        let daysArray = [];
        dayValue = 1;
        for(let i=0; i<daysToPrint; i++) {
            if(i>=firstDay && dayValue<=daysInMonth) {
                if(currentDay===i && (currentMonth === month && currentYear === year)) {
                    daysArray.push({
                        key: i,
                        day: dayValue,
                        currentDay: true,
                    });
                } else {
                    daysArray.push({
                        key: i,
                        day: dayValue,
                        currentDay: false,
                    });
                }
                dayValue++;
            } else {
                daysArray.push({
                    key: i,
                    day: null,
                    currentDay: false,
                });                
            }
        }
        return daysArray;
    }
    changeMonth(direction) {
        if (direction===0) {
            if (month-- <= 0) {
                year--
                month = 11;
            } else {
                month = month--;
            }
        } else {
            if (month++ >= 11) {
                year++;
                month = 0;
            } else {
                month = month++;
            }            
        }
        daysInMonth = new Date(year, month+1, 0).getDate();
        firstDay = new Date(year, month, 1).getDay();
        dayValue = 1;
        daysToPrint = (firstDay+daysInMonth>35) ? 42 : 35;
        this.setState({currentMonth: getFullMonth(month)});
        this.setState({currentYear: year});
        this.setState({days: this.setCalendar()});
    }
    componentDidMount() {
        document.onkeydown = (e) => {
            if (e.key==="ArrowLeft") this.changeMonth(0);
            if (e.key==="ArrowRight") this.changeMonth(1);
        }
    }
    render() {
        let monthToDisplay = this.state.currentMonth;
        let daysArray = this.state.days;
        let yearToDisplay = this.state.currentYear;
        // console.log(this.setCalendar());

        return(
            <div>
                <div className={classnames(styles.calendarToggler)}>
                    <button className={classnames(styles.prev)} onClick={() => this.changeMonth(0)}></button>
                    <p>{monthToDisplay}, {yearToDisplay}</p>
                    <button className={classnames(styles.next)} onClick={() => this.changeMonth(1)}></button>
                </div>
                <div className={styles.calendarContainer}>
                    <div className={styles.dayIndicator}>
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div id="calendar" className={classnames(styles.calendar, (daysToPrint===42) ? styles.extraRow : "")}>
                        {
                            daysArray.map((day) =>  this.renderDay(day) )
                        }
                    </div>

                </div>
            </div>
        )
        
    }
}

export default Calendar;