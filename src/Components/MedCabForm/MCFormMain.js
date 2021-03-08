import React from "react";
//import "./style.css";

/* TUTORIAL available at 
https://dev.to/sametweb/how-to-create-multi-step-forms-in-react-3km4

//NOTE: I had to add "type": "module", to package.json (right after "name" line) 
 GITHUB: https://github.com/sametweb/react-step-builder */
 
import {Steps, Step} from "react-step-builder";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import FinalStep from "./FinalStep";
import '../../Styles/MCForm.css';

export default function MCFormMain() {
  return (
    <div className="mainFormDiv">
      <Steps>
        <Step component={Step1} />
        <Step component={Step2} />
        <Step component={Step3} />
        <Step component={Step4} />
        <Step component={FinalStep} />
      </Steps>
    </div>
  );
}


