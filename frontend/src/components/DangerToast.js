import Toast from 'react-bootstrap/Toast';
import React, { useState, useEffect } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import '../styles/Toast.css'
import pg13 from '../pg13.jpg'


function DangerToast() {
    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show)

    return (
        <div >
            <ToastContainer className="p-1" position="top-left">
                <Toast className="d-inline-block m-1" bg={"danger"} show={show} onClose={toggleShow}>
                    <div class="d-flex">
                        <Toast.Body>
                            <img
                                src={pg13}
                                className="rounded me-2"
                                alt="">

                            </img>
                            <strong className="text-white text-align-right">safe mode is OFF</strong>
                        </Toast.Body>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={toggleShow}></button>
                    </div>
                </Toast>
            </ToastContainer>
        </div>
    );

}

export default DangerToast;