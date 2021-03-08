import React, { useEffect } from "react";
import { Row, Col, Button, Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/MCForm.css';

export default function Step1(props) {

    const [modalShow, setModalShow] = React.useState(false);

    //props.setState('existingSchedule2', false);

    // This will only run ONCE to initialize variable as false in state - 
    // I couldnt get it to set otherwise to state for some reason. Also if gives a warning. 
    
    useEffect(() => {
        //document.title = `You clicked ${count} times`;
        //props.setState('existingSchedule2', false); // don't know what's up with this one it never sets
        props.setState('deleteOldScheduleX', false); // only this one is pushed to state
        console.log("In use effect line 19 of step1: ");
        console.log(props.state);
    }, []);

    
    
    useEffect(() => {
        let medString = props.getState('medId', '') + "string";
        //props.setState('medNameQ', "MEDNAMEQ");
        props.setState('medNameQ', medString);
    }, [props.state.medId]);

    function validate() {
        const currMedId = props.getState('medId');

        ((currMedId !== "") && (currMedId !== undefined)) ?
            (function () {
                // PROBLEM MED NAME NEVER SETS.
                props.setState('medName', 'RetrievedMedName');  // I think we need medID and it's name from DB
                                
                // THIS WILL NEED TO CHECK FOR EXISTING SCHEDULE HERE TO DECIDE IF GOTO STEP 2 or 3
                const exists = true;
                props.setState('existingScheduleX', exists); // Check DB for existing schedule

                //props.setState('deleteOldScheduleX', exists);
                //this.forceUpdate();
                console.log("state step1 line 22:");
                console.dir(props.state);

                if (exists) {
                    props.next(); // Step 2 confirms deleteOldScheduleX
                }
                else props.jump(3); // or just go to step 3
            })()
            :
            setModalShow(true) // Show the error modal becase nothing was chose
    } // end function validate
    
    return (
        <Container className="step-container">
            <Row>
                <Col>
                    <h3>Welcome to your Medicine Chest!</h3>
                    <p>
                        Here's where you can setup a schedule for any medication you take.
                        By answering a few simple questions, HealthOnTime can help you stay on schedule! 
                    </p>
                    <p className="small">
                        Just getting started with HealthOnTime? If so, please visit
                        <a href="/search"> Add Medication </a> and add at least one medication before proceeding. 
                    </p>
                    <p className="small">
                        If you have a friend or loved one who wants to see you reach your health goals and help you
                        you stick to your medication schedule using the HealthOnTime app, please visit
                        <a href="friends"> Accountability Partners </a> to learn more and/or add their details before proceeding.
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Please choose the medication you'd like to setup a schedule for from the dropdown.</h4>
                    <p className="small">If the med you want is not listed, please visit<a href="/search"> Add Medicine </a> 
                         to register the med. Then come back here to setup its shedule.
                    </p>
                    <select value={props.getState('medId', '')} name="medId" onChange={props.handleChange}>   
				        <option value="">--Please choose one--</option>
                        <option value="Tylenol8134">Tylenol</option>
				        <option value="Dimethicone8297">Dimethicone</option>
			        </select>
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

            <Step1ErrorModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
}

function Step1ErrorModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            animation={false}
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