import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";


function ErrorModal(props){
    const navigate = useNavigate();
    return(
        <Modal
        show = {true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.msg}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button id="redirect" onClick={()=>{
            navigate("/");}
          }>Search</Button>
        </Modal.Footer>
      </Modal>
  
      )
}

export default ErrorModal;
