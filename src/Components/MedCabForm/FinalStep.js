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

  function printArr(arr) {
    if (arr && arr.length > 0) return arr.toString();
    else return null;
  }

  console.log('hey');
  return (
    <div>
      <h4>FinalStep.js</h4>
      
      <p>1 medId: {props.getState('medId')}</p>
      <p>2 medNameQ: {props.getState('medNameQ')}</p>
      <p>3 existingScheduleX: {String(props.getState('existingScheduleX'))}</p>
      <p>4 deleteOldScheduleZ: {String(props.getState('deleteOldScheduleZ'))}</p>
      
      <p>5 weeklyTimes: {printArr(props.getState('weeklyTimes'))}</p>
      

      <p>7 MondayTimes: {printArr(props.getState('mondayTimes'))}</p>
      <p>8 TuesayTimes: {printArr(props.getState('tuesdayTimes'))}</p>
      <p>9 WednesdayTimes: {printArr(props.getState('wednesdayTimes'))}</p>
      <p>10 ThursdayTimes: {printArr(props.getState('thursdayTimes'))}</p>
      <p>11 FridayTimes: {printArr(props.getState('fridayTimes'))}</p>
      <p>12 SaturdayTimes: {printArr(props.getState('saturdayTimes'))}</p>
      <p>13 SundayTimes: {printArr(props.getState('sundayTimes'))}</p>
    </div>
  );
}
export default FinalStep;
