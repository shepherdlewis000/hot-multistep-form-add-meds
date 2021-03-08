import React from "react";
import { Row, Col, Button, Container, Modal, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/MCForm.css';

export default function Step3(props) {

    const [modalShow, setModalShow] = React.useState(false);
    const theMedName = props.getState('medNameQ');
    console.log("entering step 3")
    console.log(props.state);
    //console.log(props.state.deleteOldSchedule);
    console.log(theMedName);

    // function validate
    // check whether user selected yes or no for everyDay schedule
    // check that everyDay state variable is either "false" or "true"
    function validate() {
        console.log("Entered valide Step3 line 19")
        //const currMedId = props.getState('medId');

        const currEveryDay = props.getState('everyDay');
        if (currEveryDay === 'true') {
            console.log("currEveryDay is true")
        }
        else if (currEveryDay === 'false') {
            console.log("currEveryDay is false")
        }
        else {
            setModalShow(true);
        }


        ((currEveryDay !== "") && (currEveryDay !== undefined)) ?
            (function () {
                                
                // THIS WILL NEED TO CHECK FOR EXISTING SCHEDULE HERE TO DECIDE IF GOTO STEP 2 or 3
                const exists = true;
                props.setState('existingScheduleX', exists); // Check DB for existing schedule

                //props.setState('deleteOldScheduleX', exists);
                //this.forceUpdate();
                console.log("state step1 line 22:");
                console.dir(props.state);

                /*
                if (exists) {
                    props.next(); // Step 2 confirms deleteOldScheduleX
                }
                else props.jump(3); // or just go to step 3
                */
                if (props.getState('everyDay') === 'false') {
                    console.log("everyDay is false");
                    props.jump(5);
                }
                else {
                    console.log("everyDay is true");
                    props.next();
                }
            })()
            :
            setModalShow(true) // Show the error modal becase nothing was chose
    } // end function validate
    
    return (
        <Container className="step-container">
            <Row>
                <Col>
                    <h3>Step 3</h3>
                    <p>
                        Great. Let's set up the time schedule for {theMedName}. Do you want to take {theMedName} at the same times of day, every day?
                    </p>
                    <p>Here's some examples...</p>
                    
                    <ListGroup variant="flush">
                        <ListGroup.Item variant="secondary" className="text-left">"I take {theMedName} every day at 8AM and 6PM" (Then answer "Yes")</ListGroup.Item>
                        <ListGroup.Item variant="secondary" className="text-left">"I take {theMedName} at different times on different days." Or "I take {theMedName} only on specific days."
                        (Then answer "No")</ListGroup.Item>
                    </ListGroup>
                  
                    <Row className="mt-4">
                        <Col>
                            <p>Do you take {theMedName} at the same time(s) every day?</p>
                            <div>
                                <input type="radio" id="everyDayTrue"
                                    name="everyDay" value={props.getState('everyDay', "true")}
                                    onChange={props.handleChange} />
                                <label htmlFor="everyDayTrue">Yes</label>

                                    <input type="radio" id="everyDayFalse"
                                        name="everyDay" value={props.getState('everyDay', 'false')}
                                        onChange={props.handleChange} />
                                <label htmlFor="everyDayFalse">No</label>
                            </div>
                            <div>
                                <hr />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                
            </Row>
            <Row>
                <Col>
                    <Button
                        className="backBlockButton"
                        href="./dashboard"
                        variant='danger'
                        block>Go back to dashboard
                    </Button>
                    <Button
                        variant='primary'
                        onClick={validate}
                        block>Proceed
                    </Button>
                </Col>
            </Row>    

            <Step3ErrorModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
}

function Step3ErrorModal(props) {
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
                <p>You can't proceed until you've answered "Yes" or "No".</p>
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