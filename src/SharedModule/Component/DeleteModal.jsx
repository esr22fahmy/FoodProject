import React from 'react'
import { Modal, Button } from "react-bootstrap";
import imgNoDataImg from "../../imgs/noData.png";

export default function DeleteModal({RecipeWord, confirmDelete ,showDeleteModal ,setShowDeleteModal ,show}) {
  return (
    <>
     <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=" ">
          {/* Are you sure you want to delete this category? */}
          <div className=" text-center">
            <img src={imgNoDataImg} />

            <h5 className=" mt-3">{`Delete This ${RecipeWord} ?`}</h5>
            <h6>
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      
    </>
  )
}
