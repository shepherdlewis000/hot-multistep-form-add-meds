// FinalStep.js
import React from "react";

function arrayOutput(arr) {
  arr.map((el, index) => {
    let akey = `${el}.index`;
    return <li key={akey}>{el}</li>
  });

}
/*
function arrayOut2(arr) {
  return (<div>
    {arr.map((el, index) => (
        <p key={el + "." + index}>{el}, </p>
    ))}
    </div>);
} */

function FinalStep(props) {
  if (props.getState('weeklyTimes')) {
    arrayOutput(props.getState('weeklyTimes'));
  }

  console.log('hey');
  return (
    <div>
      <h4>FinalStep.js</h4>
      
      <p>1 medId: {props.getState('medId')}</p>
      <p>2 medNameQ: {props.getState('medNameQ')}</p>
      <p>3 existingScheduleX: {String(props.getState('existingScheduleX'))}</p>
      <p>4 deleteOldScheduleZ: {String(props.getState('deleteOldScheduleZ'))}</p>
      
      <p>5 weeklyTimes: {props.getState('weeklyTimes')}</p>
      <p>5b weeklyTImes: </p>
      
      { (props.getState('weeklyTimes') ? 
        <p>6 weeklyTimes.length: {props.getState('weeklyTimes').length}</p>
        :
        null
       )}
      

      <p>7 MondayTimes: {props.getState('MondayTimes')}</p>
      <p>8 TuesayTimes: {props.getState('TuesdayTimes')}</p>
      <p>WednesdayTimes: {props.getState('WednesdayTimes')}</p>
      <p>ThursdayTimes: {props.getState('ThursdayTimes')}</p>
      <p>FridayTimes: {props.getState('FridayTimes')}</p>
      <p>SaturdayTimes: {props.getState('SaturdayTimes')}</p>
      <p>SundayTimes: {props.getState('SundayTimes')}</p>
    </div>
  );
}
export default FinalStep;
