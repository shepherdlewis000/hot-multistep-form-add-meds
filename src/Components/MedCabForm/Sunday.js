import React, { useState } from 'react';
import "antd/dist/antd.css";
import { TimePicker } from "antd";
//import moment from 'moment';
import { Row, Col, Button, Container, Modal, ListGroup, Card, ButtonGroup } from 'react-bootstrap';

export default function Sunday(props){

    const [modalShow, setModalShow] = React.useState(false);
    const theMedName = props.getState('medNameQ');
    const theDay = "Sunday";

    // timeValue: a 13 digit timestamp obtained from TimePicker
    const [timeValue, setTimeValue] = useState("");

    // Passed as TimePicker's component's onChange
    const onTimeChange = time => {
        if (time !== null) 
            setTimeValue(time);
    };

    // helper: extract hour portion of 13 digit timestamp produced from Timepicker
    const retrieveHour = aTime => ( new Date(aTime).getHours() );

    /************************************************************************
     * Function: addTime()
     * Event listener for the timepicker
     *///////////////////////////////////////////////////////////////////////
    const addTime = () => {
        if (timeValue === "") 
            return; // if user clicked "Add time" before choosing a time, just ignore

        const hrToAdd = retrieveHour(timeValue); // extract the hour

        let currentSundayTimes = props.getState('sundayTimes');

        if (!currentSundayTimes) { // If SundayTimes not yet initialized, just add hrToAdd
            props.setState('sundayTimes', [hrToAdd]);
        }
       
        /* If sundayTimes already exists and it doesn't already have that time, then add */
        if ((currentSundayTimes) && (!currentSundayTimes.includes(hrToAdd))) {
            let newSundayTimes = [...currentSundayTimes, hrToAdd].sort((a, b) => a - b);
            props.setState('sundayTimes', newSundayTimes);
        }
    } // end function addTime

    // helper function
    const toTwelveHr = hour => {
        if (hour === 0) return "12 AM";
        if (hour <= 11) return `${hour} AM`;
        if (hour === 12) return "12 PM";
        if (hour <= 23) return `${hour - 12} PM`;
        return null;
    };

    function timesList() {
        if (!props.getState('sundayTimes'))
            return null;
        /*
        return (
            <>
                <p>Your schedule will be:
                    <ListGroup horizontal={sm} className="my-2">
                    {props.getState('sundayTimes').map((time, index) => 
                        <li key={{ time } + '.' + index}>{toTwelveHr(time) + " "}</li>
                    )}
                    </ListGroup>
                </p>
            </>
        ) */
        return (
            <Container>
                <Row>
                    <Col>
                        <div className={"pt-1"} style={{ backgroundColor: "#39C0ED" }}>
                            <span>Your {theDay} doses will be taken at: </span>
                            <br />
                            <ListGroup horizontal={"sm"} className="my-2 justify-content-center">
                                {props.getState('sundayTimes').map((time, index) => 
                                    <ListGroup.Item className={"ml-2 mr-2 mb-3"} variant={'secondary'} key={{ time } + '.' + index}>
                                        {toTwelveHr(time)}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        ) 

    }// end function timesList

    return (
        <Container className="step-container">
            <Row>
                <Col>
                    <h3>{theDay} schedule setup</h3>
                    <p>
                        You may set up medication times for {theDay} on this page. Otherwise use the weekday links (FIX INSTRUCTIONS).
                    </p>
                    <Row>
                        <Col>
                            <ButtonGroup className="mb-2">
                                <Button onClick={() => props.jump(5)}>Mon</Button>
                                <Button onClick={() => props.jump(6)}>Tues</Button>
                                <Button onClick={() => props.jump(7)}>Wed</Button>
                                <Button onClick={() => props.jump(8)}>Thur</Button>
                                <Button onClick={() => props.jump(9)}>Fri</Button>
                                <Button onClick={() => props.jump(10)}>Sat</Button>
                                <Button onClick={() => props.jump(11)}>Sun</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                     {timesList()} 
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={4}>
                    <Card border={"info rounded"} bg={"light"}>
                        <Card.Body>
                            <TimePicker
                                timeValue={timeValue}
                                size={'large'}
                                onChange={onTimeChange}
                                //onSelect={this.onTimeChange} // Might be useful instead of clicking OK
                                format={"h a"}
                                showNow={false}
                                use12Hours
                                //defaultValue={moment("00:00", "HH:mm")}       
                            />
                            <Card.Text className={"small mt-5 pb-0 pt-1 text-center text-danger"}>Make sure to click "ok" when using the time picker.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            
                            <Row>
                                <Col>
                                    <Button className={"mb-2"} onClick={addTime} block>Add to schedule</Button>
                                    <Button variant={"danger"} block onClick={() => props.setState('sundayTimes', [])}>Clear stored values</Button>
                                </Col>
                            </Row>

                        </Card.Footer>
                    </Card>

                        
                        
               
                </Col>
                <Col md={8}>
                    <ListGroup className={"text-left"}>
                        <ListGroup.Item>
                            Choose the times you want to take {theMedName} using the time picker to the right.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Click "Add to schedule" to save the time to your list.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            If you need to clear the stored times and start over, click "Clear stored values".
                        </ListGroup.Item>
                        <ListGroup.Item>
                            When you are finished entering all your times, click "Proceed" at the bottom to proceed to Sunday. Or you may use the weekday buttons to jump directly to specific days.
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col>  
                    <Button
                        className="backBlockButton"
                        onClick={() => props.prev()}
                        
                        variant='danger'
                        block>Go back to Saturday
                    </Button> 
                    
                    <Button
                        variant='success'
                        onClick={validate}//////////////////?FIXXXXXX
                        block>Proceed
                    </Button>

                </Col>
            </Row>

            <SundayErrorModal
                myjump={() => props.jump(12)}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );

    // Check that user actually set some times to state
    function validate() {
        const currSundayTimes = props.getState('sundayTimes');
        /*if (!currSundayTimes || currSundayTimes.length === 0) {
        }*/
        (currSundayTimes && currSundayTimes.length > 0) ?
            (function () {
                props.jump(12);
            })()
            :
            setModalShow(true)
    } // end function validate

    function SundayErrorModal(props) {
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
                    <h4>Warning! It doesn't look like you saved any times at all.</h4>
                    <p>Are you sure you don't want to enter any times to schedule?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.onHide()}>Return to Add times</Button>
                    {/*<Button onClick={props.myJump(12)}>Continue Anyway</Button>*/}
                    <Button onClick={() => props.myjump(12)}>Continue Anyway</Button>

                </Modal.Footer>
            </Modal>
        );
    } // end Sunday2ErrorModal

} // end function Sunday
