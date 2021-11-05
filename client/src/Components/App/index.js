import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import Calendar from '../Calendar';

let month = new Date().getMonth();
let currentMonth = getFullMonth(month);

function getFullMonth(i) {
    let months = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];
    return months[i];
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: getFullMonth(month),
        }
    }
    changeMonth(direction) {
        if (direction===0) {
            month = (month-- <= 0) ? 11 : month--;
        } else {
            month = (month++ >= 11) ? 0 : month++;
        }
        this.setState({currentMonth: getFullMonth(month)});
        
    }
    render() {

        let currentMonth = this.state.currentMonth;

        return(
            <div>
                <div className={classnames(styles.calendarToggler)}>
                    <button className={classnames(styles.prev)} onClick={() => this.changeMonth(0)}></button>
                    <p>{currentMonth}</p>
                    <button className={classnames(styles.next)} onClick={() => this.changeMonth(1)}></button>
                </div>
                {
                    <Calendar />
                }
            </div>
        )
        
    }
}

export default App;