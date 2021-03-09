// FinalStep.js
import React from "react";

function FinalStep(props) {
  return (
    <div>
      <h4>FinalStep.js</h4>
      
      <p>medId: {props.getState('medId')}</p>
      <p>medNameQ: {props.getState('medNameQ')}</p>
      <p>existingScheduleX: {String(props.getState('existingScheduleX'))}</p>
      <p>deleteOldScheduleZ: {String(props.getState('deleteOldScheduleZ'))}</p>
      <p>weeklyTimes: {props.getState('weeklyTimes')}</p>
      <p>MondayTimes: {props.getState('MondayTimes')}</p>
      <p>TuesayTimes: {props.getState('TuesdayTimes')}</p>
      <p>WednesdayTimes: {props.getState('WednesdayTimes')}</p>
      <p>ThursdayTimes: {props.getState('ThursdayTimes')}</p>
      <p>FridayTimes: {props.getState('FridayTimes')}</p>
      <p>SaturdayTimes: {props.getState('SaturdayTimes')}</p>
      <p>SundayTimes: {props.getState('SundayTimes')}</p>
    </div>
  );
}
export default FinalStep;
