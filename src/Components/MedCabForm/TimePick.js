import React from 'react';
import "antd/dist/antd.css";
//import "./index.css";
import { TimePicker } from "antd";
import moment from "moment";

/* props: 
submitTimes(times) - stores times array to parent component
timeValues - parents array of time values
*/

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
    

  //this.props.submitTimes(this.state.timeValues); 
    /*
    useEffect( () => {
        // Check if truthy first
        if (this.state.timeValues) {
            console.log('running props.submitTimes in useEffect line 33');
            this.props.submitTimes(this.state.timeValues);
        }
    }, [this.state.timeValues])
*/
    /*
    useEffect(() => {
        console.log('hello');
}, []);
*/

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
      
      // yeah this will be one value behind because not current until re-render
      console.log("this.state.timeValues at 51: " + this.state.timeValues);
      // If we place below here, then it's always one time value behind
      // because this.state.timeValues isn't "current" until the next render?
      //this.props.submitTimes(this.state.timeValues); 
  };


  toTwelveHr = hour => {
    if (hour === 0) return "12 AM";
    if (hour <= 11) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    if (hour <= 23) return `${hour - 12} PM`;
    return null;
  };
    
    componentWillUnmount() {
        this.props.submitTimes(this.state.timeValues);
    }

  render(){
      
    return (
        <>
            {console.log("re-render? local state timeValues is: " + this.state.timeValues)}
            {console.log("re-render? this.props.timeValues: " + this.props.timeValues)}

            <div>
                <p>props.timeValues: {this.props.timeValues}</p> 
                <p>this.state.timeValues (what's in Step) on render line 86: {this.state.timeValues} - NOTE: Might be a step behind?</p>
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
          //onSelect={this.onTimeChange} // Might be useful instead of clicking OK
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