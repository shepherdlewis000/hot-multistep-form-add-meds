import React from "react";
import { Row, Col, Button, Container, Modal, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/MCForm.css';

export default function Step3(props) {

    const [modalShow, setModalShow] = React.useState(false);
    const theMedName = props.getState('medNameQ');

    // function validate
    // check whether user selected yes or no on this step for everyDay schedule
    // check that everyDay state variable is either "false" or "true"
    function validate() {
        
        const currEveryDay = props.getState('everyDay');
        if (currEveryDay === 'true')
            console.log("currEveryDay is true")
        else if (currEveryDay === 'false')
            console.log("currEveryDay is false")
        else
            setModalShow(true); // User didn't answer so error modal

        ((currEveryDay !== "") && (currEveryDay !== undefined)) ?
            (function () {
                                
                // THIS WILL NEED TO CHECK FOR EXISTING SCHEDULE HERE TO DECIDE IF GOTO STEP 2 or 3
                ////////////////////////////// IMPORTANT /////////////// NEEDS WORK /////////////////
                /////////////////////////////////////////////////////////////
                const exists = true; // If there is a schedule already
                props.setState('existingScheduleX', exists); // Check DB for existing schedule

                //props.setState('deleteOldScheduleX', exists);
                console.log("state step1 line 22:");
                console.dir(props.state);

                if (props.getState('everyDay') === 'false') {
                    console.log("everyDay is false");
                    props.jump(5);
                }
                else {
                    console.log("everyDay is true");
                    //props.jump(4);
                    props.next(); // goto step 4
                }
            })()
            :
            setModalShow(true) // Show the error modal becase nothing was chose
    } // end function validate
    
    return (

            
        <Container className="step-container">
            {console.log('55: everyDay in state: ' + props.getState('everyDay'))}
            <Row className="mb-2">
                <Col>
                    <h3>Step 3</h3>
                    <p className="text-center">
                        Ok, we'll set up the time schedule for {theMedName}!<br /> 
                        First let's determine what sort of schedule we're dealing with...
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup variant="flush">
                        <span className="text-center">Option One</span>
                        <ListGroup.Item variant="secondary" className="text-left">
                            <p>Same time(s) every day</p>
                            Examples: "I will take {theMedName} every day at 8AM and 6PM"<br />
                            Or "I will take {theMedName} every day by 9PM."
                        </ListGroup.Item>
                        <span className="text-center mt-3">Option Two</span>
                        <ListGroup.Item variant="secondary" className="text-left">
                            <p>Different times and/or different days</p>
                            <p>Examples: "I take {theMedName} every other day."</p>
                            <p>Or "I take {theMedName} at different times on the weekend than I do during the week."</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

            </Row>
            <Row className="mt-4">
                <Col>
                    <p className="mb-3 text-center" >Choose one & then click the "Proceed" button</p>
                    <div>
                        <span className="mr-5">
                            <input type="radio" id="everyDayTrue"
                                name="everyDay" value={props.getState('everyDay', "true")}
                                onChange={props.handleChange} />
                            <label className="ml-2" htmlFor="everyDayTrue">Option one</label>
                        </span>
                        <span className="ml-5">
                            <input type="radio" id="everyDayFalse"
                                name="everyDay" value={props.getState('everyDay', 'false')}
                                onChange={props.handleChange} />
                            <label className="ml-2" htmlFor="everyDayFalse">Option two</label>
                        </span>
                    </div>
                    <div>
                        <hr />
                    </div>
                </Col>
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
                        variant='success'
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