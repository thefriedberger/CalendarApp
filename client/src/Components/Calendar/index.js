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

 
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            days: this.setCalendar(),
            daysInMonth: new Date(this.state.year, this.state.month+1, 0).getDate(),
            firstDay: new Date(this.state.year, this.state.month, 1).getDay(),
            dayValue: 1,
            daysToPrint: (this.state.firstDay+this.state.daysInMonth>35) ? 42 : 35,
            originalMonth: this.getFullMonth(this.state.month),
            currentMonth: this.getFullMonth(this.state.month),
            originalYear: new Date().getFullYear(),
            currentYear: new Date().getFullYear(),
        }
    }
    getFullMonth(i) {
        let months = [
            "January","February","March","April",
            "May","June","July","August",
            "September","October","November","December"
        ];
        return months[i];
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
        const { dayValue, daysInMonth, currentDay, currentYear, year,  month } = this.state;
        let daysArray = [];
        this.setState({dayValue: 1});
        for(let i=0; i<this.state.daysToPrint; i++) {
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
        this.setMonth();
    }

    setMonth = (year: Number, month: Number) => {
        daysInMonth = new Date(year, month+1, 0).getDate();
        firstDay = new Date(year, month, 1).getDay();
        dayValue = 1;
        daysToPrint = (firstDay+daysInMonth>35) ? 42 : 35;
        this.setState({currentMonth: this.getFullMonth(month)});
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
        const { changeMonth, renderDay, goToCurrentMonth, setMonth } = this;
        const { currentMonth, days, currentYear, originalYear, originalMonth } = this.state;

        return(
            <div>
                <div className={classnames(styles.calendarToggler)}>
                    <button className={classnames(styles.prev)} onClick={() => changeMonth(0)}></button>
                    <p>{currentMonth}, {currentYear}</p>
                    <button className={classnames(styles.next)} onClick={() => changeMonth(1)}></button>
                    <button className={classnames(currentMonth)} onClick={() => setMonth(originalYear, originalMonth)}></button>
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
                            days.map((day) =>  renderDay(day) )
                        }
                    </div>

                </div>
            </div>
        )
        
    }
}

export default Calendar;