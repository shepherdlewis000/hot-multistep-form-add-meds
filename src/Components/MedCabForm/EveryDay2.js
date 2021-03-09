import React, { useState } from 'react';
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import moment from 'moment';
import { Row, Col, Button, Container, Modal } from 'react-bootstrap';

// props
// weeklyTimes -> array of times
// setWeeklyTimes(array)

export default function EveryDay2(props){

    console.log('ENTERED EVERYDAY2')
    const [modalShow, setModalShow] = React.useState(false);
    const theMedName = props.getState('medNameQ');

    const [timeValue, setTimeValue] = useState("");
    
    // Pass this as TimePicker's onChange
    const onTimeChange = time => {
        if (time !== null) {
            setTimeValue(time);
        }
    };

    // Clear global state for weekTimes
    /*
    const startOver = () => {
        this.props.setWeekTImes([]);
    }*/

    // helper: get the hour portion of a time 
    const retrieveHr = aTime => {
        return new Date(aTime).getHours();
    }

    // Use this as the event listener for the "Add this time" button
    const addTime = () => {
        console.log("this.state.timeValue 34: " + timeValue);
        if (timeValue === "") {
            return; 
        }

        console.log("props.weeklyTimes: " + props.getState('weeklyTimes'));

        // Get the hour and append to parent's weekTimes array
        let hrToAdd = retrieveHr(timeValue);

        // Only add it once
        if (!props.weeklyTimes.includes(hrToAdd)) {
            //([[...props.weeklyTimes], hrToAdd]);
            const times = props.getState('weeklyTimes');
            //props.setState('weeklyTimes', [...times, hrToAdd])
            // WHAT THE HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
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
        if (!props.getState('weeklyTimes'))
            return null;
        return (
            <>
                <p>props.getState('weeklyTimes'): {props.getState('weeklyTimes')}
                </p>
                <p>Your schedule will be:
                        
                    {props.getState('weeklyTimes').map((time, index) => 
                        <>
                            <span key={{ time } + '.' + index}>{toTwelveHr(time) + " "}</span>
                        </>
                    )}
                </p>
            </>
        )
    }// end function timesList

    return (
        <Container className="step-container">
            <Row>
                <Col>
                    <h3>Setup an everyday schedule</h3>
                    <p>
                        You have indicated that you want to take {theMedName} at the same times every day of the week.
                    </p>
                    {/* {timesList()} */}
                </Col>
            </Row>
            <Row className="mt-3">
                <p>Choose a time and click "OK". Then click "Add this time" to add it to the list. When you are done, click "Finish adding times". Finally click "Proceed"</p>
                <TimePicker
                    timeValue={timeValue}
                    onChange={onTimeChange}
                    //onSelect={this.onTimeChange} // Might be useful instead of clicking OK
                    format={"h a"}
                    showNow={false}
                    use12Hours
                    defaultValue={moment("00:00", "HH:mm")}        
                />
            </Row>
            <Row>
                <Col>
                    <Button onClick={addTime}>Add this time</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="backBlockButton"
                        onClick={props.jump(3)}
                        variant='danger'
                        block>Go back to dashboard</Button>
                    <Button
                        variant='primary'
                        onClick={props.jump(12)}//////////////////?FIXXXXXX
                        block>Proceed
                    </Button>

                </Col>
            </Row>

            <EveryDay2ErrorModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
}

function EveryDay2ErrorModal(props) {
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
                <p>You can't proceed!!!!!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

