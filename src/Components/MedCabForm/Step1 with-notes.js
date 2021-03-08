import React from "react";

function Step1(props) {
  return (
    <div>
    /* Value for an element with name="foo" will save in global state under "foo" key - use unique names for each form element */
    /* "That's what" (name?) will be what is provided to value propery in our input elements  */
      <p> /* Access global state and update input elements */
        {/* Name: <input name="name" /> */}
        Name: <input name="name" value={props.getState('name', '')} onChange={props.handleChange} />
      </p>
      <p>
      /* getState 2 params a)name of input element b)default Value
      here we use empty string so React don't warn about uncontrolled component.
      We use props.getState('name', '') but in FinalStep we use props.state.name 
      because this.props.name is undefined unitl user begins typing in input field. using getState we can provide default value of empty string and React don't complain about controlled/uncontrolled component */
        Last name: <input name="surname" value={props.getState('surname', '')} onChange={props.handleChange} />
      </p> {/* We do onChange={props.handleChange to all our inputs - it makes sure form values are saved with the correct key to our global state property. See NOTE 1 below for alternative */}

      /* Every step has a props.prev() and props.next() method for step navigation.
      You don't have to use them I guess. Here we assign these methods to the onClick event. You can add these to each step component individually or create a Navigation component SEE LATER NOTE 2 below
      <button onClick={props.prev}>Previous</button>
      <button onClick={props.next}>Next</button>

      /* What about when we don't want to show previous button (like on first step)? Or didn't want to show the Next button in the last step component? We're given helper methods - props.step.isFirst(), props.step.isLast(), props.step.hasNext(), props.step.hasPrev() - return true or false
      ONE APPROACH: */
      {/* 
      <button disabled={props.step.isFirst()} onClick={props.prev}>Previous</button>
      <button disabled={props.step.isLast()} onClick={props.next}>Next</button> */}
      /* CONDITIONAL RENDERING APPROACH: */
      {/* {props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
          {props.step.hasNext() && <button onClick={props.next}>Next</button>} */}

    </div>
  );
}
export default Step1;

/* NOTE1: You may also manipulate global state with props.setState(key, value) - useful in cases where synthetic React events (eg. onCHange) are unavailable - like clicking on an image and updating state with the onClick method. */ 

/* ADDING A NAVIGATION COMPONENT using the config object
SEE CODESANDOX LINK BELOW FOR NAVIGATION EXAMPLE
const Navigation = (props) => { // create Navigation component
  return (
    <div>
    <button onClick={props.prev}>Previous</button>
    <button onClick={props.next}>Next</button>
    </div>
  );
};

// Create config object
const config ={
  navigation: {
    component: Navigation,
    location: "before", // physical location - "before" or "after"
  }
};
*/
/* Pass config object to our Steps component...
<Steps config={config}>
  // Your step components
</Steps>
*/

/* NOTE THREE: PASSING YOUR OWN PROPS TO STEP OOMPONENTS...
Simply pass props to Step components directly. Your step component will 
recieve those props automatically. 
*/

/* EXAMPLE ON CODESANDBOX: https://codesandbox.io/s/react-step-builder-demo-j55cn?from-embed
*/

/* IN YOUR STEPS YOU CAN USE addonBefore as a prop for inputs? Is this a react-step-builder thing or...?
<Input
          addonBefore="First Name"
          name="name"
          value={props.getState("name", "")}
          onChange={props.handleChange}
/> // SEE CODESANDBOX LINK ABOVE
*/

/* CHECKBOXES (NOT COVERED ABOVE)
Now props.handleChange function can be passed to onChange event of a checkbox field. props.getState('checkbox_name') can be passed to checked property of the same field. About file inputs, I need to do more research. However, props.setState('key', 'value') method for updating state can be a workaround for now. */

/* THIS MIGHT BE USEFUL FOR STEP TRANSITIONS
http://reactcommunity.org/react-transition-group/transition */