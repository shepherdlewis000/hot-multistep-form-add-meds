import React from "react";

import "antd/dist/antd.css";
//import "./index.css";
import { TimePicker } from "antd";
import moment from "moment";

class TimePick extends React.Component {
/*  
constructor(props) {
    super(props);
  } */

  state = {
    timeValue: "", // the current value of timepicker
    timeValues: [], // the stored times
    
  };

  onTimeChange = time => {
    if(time !== null){
      this.setState({
        timeValue: time
      });
    }
  };

  startOver = () => {
    this.setState({
      timeValues: {},
      timeValue: ""
    });
  }

  retrieveHr = aTime => {
    return new Date(aTime).getHours();
  };

  saveTime = () => {
    if (this.state.timeValue === "") {
      return;
    }
    this.setState({
      timeValues: [...this.state.timeValues, this.retrieveHr(this.state.timeValue)],
      timeValue: ""
    });
  };

  toTwelveHr = hour => {
    if (hour === 0) return "12 AM";
    if (hour <= 11) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    if (hour <= 23) return `${hour - 12} PM`;
    return null;
  };

  render() {
      //let myVal = this.state.timeValue.toString(); 
    //let myVals = [...this.state.values];
      //{ let myVals = this.state.timeValues.map(el => el.toString() + " "); } // was working
      //let myVals = this.state.timeValues.map((el, index) => { return { key: index, str: el.toString() + " " } })
      
    return (
      <>
        <div>
                {/* <p>Current value: {myVal}</p> */}
          <p>Your schedule will be: </p>
            {this.state.timeValues.map((timeVal, index) => (
                <>  
                    <span key={{ timeVal } + index}>{this.toTwelveHr(timeVal) + " "}</span>
                </>
          ))}
        </div>
        
        <br />
        <hr />
        <p>Choose a time and click "OK". Then click "Add time" to add it to the list. When you are done, click "Finish adding times". Finally click "Proceed"</p>
        <TimePicker
          timeValue={this.state.timeValue}
          onChange={this.onTimeChange}
          format={"h a"}
          showNow={false}
          use12Hours
          defaultValue={moment("00:00", "HH:mm")}        
        />
            <button onClick={this.saveTime}>Add time</button>
            <hr />
            <button onClick={this.startOver}>Clear times</button>
            
            <button onClick={() => {
                console.log("Done");
                console.log("timeValues at TimePick 86: " + this.state.timeValues);
                this.props.submitTimes(this.state.timeValues);
            }
            }>Finish adding times</button>

        
      </>
    );
  }
}

export default TimePick;