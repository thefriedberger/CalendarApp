import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: {
                day: null,
                isActive: false,
                currentDay: false,
            },
            onClick: '',
        };
    }
    render() {
        return(
            <div 
                className={classnames(styles.day, (this.props.currentDay) ? styles.currentDay : "")}
                onClick={() => this.props.onClick()}
            >
                {this.props.day}
            </div>
        )
    }
}

export default Day;