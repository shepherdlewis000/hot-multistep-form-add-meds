import React from "react";
import { Row, Col, Button, Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/MCForm.css';

//import { TimePicker } from "antd";
//import "antd/dist/antd.css";
import TimePick from "./TimePick";

export default function EveryDay(props) {

    const [modalShow, setModalShow] = React.useState(false);
    const theMedName = props.getState('medNameQ');
    
    let dailyTimes = [];

    /*
    function validate(props){
        console.log("validate");
        //React.useEffect(() => props.setState("weeklyTimes", dailyTimes));
        props.setState("weeklyTimes", dailyTimes);

        console.log("state's weeklyTimes: " + props.getState("weeklyTimes"));
    } // end function validate
    */
    function validate() {
        props.jump(12);
    }
    
    // times is an array, but when passed to setState it's concat in FinalStep?
    function submitTimeValues(times) {
        dailyTimes = times;
        console.log("32 Daily times: " + dailyTimes);
        console.log("33: " + props.getState('medId'))
        props.setState("weeklyTimes", dailyTimes);
        console.log("35: " + props.getState("weeklyTimes")); // GOOD csv
    }

    return (
        <Container className="step-container">
            <Row>
                <Col>
                    <h3>Setup an everyday schedule</h3>
                    <p>
                        You have indicated that you want to take {theMedName} at the same times every day of the week. 
                    </p>
                    
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <TimePick submitTimes={submitTimeValues} timeValues={this.state.timeValues} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="backBlockButton" href="./dashboard" variant='danger' block>Go back to dashboard</Button>
                    <Button
                        variant='primary'
                        onClick={validate}
                        block>Proceed
                    </Button>
                </Col>
            </Row>
            <Row>
                weeklyTimes: {props.getState("weeklyTImes", "")}
            </Row>

            <EveryDayErrorModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
}

function EveryDayErrorModal(props) {
    return (
        <Modal
            {...props}
            animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <h4>Ooops!</h4>
                <p>You can't proceed until you've chosen a med to schedule!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
} // end function

/* CHECKBOXES (NOT COVERED ABOVE)
Now props.handleChange function can be passed to onChange event of a checkbox field. props.getState('checkbox_name') can be passed to checked property of the same field. About file inputs, I need to do more research. However, props.setState('key', 'value') method for updating state can be a workaround for now. */

/* THIS MIGHT BE USEFUL FOR STEP TRANSITIONS
http://reactcommunity.org/react-transition-group/transition */