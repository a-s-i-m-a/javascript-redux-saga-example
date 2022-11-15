import React,{useState} from "react"
import MetaTags from 'react-meta-tags';
import {
  Col,
  CardBody,
  CardTitle, Button, Card, Modal, Row
} from "reactstrap"
import { Link } from "react-router-dom"
import avatar from "../../assets/images/users/user-1.jpg"
import FormUpload from "./components/FormUpload"
import Trainer from "./components/trainer"



const Trainers = () => {
  const [modal_center, setmodal_center] = useState(false)
  const [modal_edit, setmodal_edit] = useState(false)
  const [name, setName] = useState("Тренер 1")
  const [newAvatar , setAvatar] = useState(avatar)

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }
  function tog_center() {
    setmodal_center(!modal_center)
    removeBodyCss()
  }
  function tog_edit() {
    setmodal_edit(!modal_center)
    removeBodyCss()
  }
  const trainers = [
    {
      "name": name,
      "photo": newAvatar,
      "resourceId": 1,
      "description": "Описание тренера"
    },
    {
      "name": name,
      "photo": newAvatar,
      "resourceId": 2,
      "description": "Описание тренера"
    },
    {
      "name": name,
      "photo": newAvatar,
      "resourceId": 3,
      "description": "Описание тренера"
    }
  ]

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4 mt-4">Тренеры</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
              <tr>
                <th className="align-middle">ID</th>
                <th className="align-middle">Имя</th>
                <th className="align-middle">Описание</th>
                <th className="align-middle">Редактировать</th>
              </tr>
              </thead>
              <tbody>
              {trainers.map((trainer, index) => (
                <tr key={"_tr_" + index}>
                  <td>
                    <Link to="#" className="text-body fw-bold">
                      {" "}
                      {trainer.resourceId}{" "}
                    </Link>{" "}
                  </td>
                  <td>
                    <img src={trainer.photo} alt="" className="avatar-xs rounded-circle img-thumbnail" /><Trainer name={name}/>
                  </td>
                  <td>{trainer.description}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setmodal_edit(true)
                      }}
                      type="button"
                      color="primary"
                      size="sm"
                      className="btn-rounded waves-effect waves-light m-3"
                    ><i className="fas fa-pencil-alt"></i>
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      size="sm"
                      className="btn-rounded waves-effect waves-light"
                    ><i className="fas fa-trash"></i>
                    </Button>
                    <Col sm={6} md={4} xl={3}>
                      <Modal
                        isOpen={modal_edit}
                        toggle={() => {
                          tog_edit()
                        }}
                        centered={true}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title mt-0">Изменить тренера</h5>
                          <button
                            type="button"
                            onClick={() => {
                              setmodal_edit(false)
                            }}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                            <Row>
                              <FormUpload avatar={trainer.photo} newAvatar={setAvatar} />
                            </Row>
                          <Row>
                            <h6>Имя</h6>
                            <input
                              key={trainer.resourceId}
                              onChange={(e)=>console.log(trainer.resourceId, index)}
                              className="form-control"
                              type="text"
                              defaultValue={trainer.name}
                            />
                          </Row>
                          <Row>
                            <h6>Описание</h6>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={trainer.description}
                            />
                          </Row>
                          <div className="top-name center-block text-center mt-2" >
                            <Button
                              onClick={() => {
                                setmodal_edit(false)
                              }}
                              type="button"
                              color="primary"
                              size="lg"
                              className="btn-rounded waves-effect waves-light"
                            >Изменить
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </Col>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

  <Col>
    <div className="top-name center-block text-center" >
      <Button
        onClick={() => {
          tog_center()
        }}
        type="button"
        color="primary"
        size="lg"
        className="btn-rounded waves-effect waves-light"
      >Добавить тренера
      </Button>
    </div>
  </Col>
      <Col sm={6} md={4} xl={3}>
        <Modal
          isOpen={modal_center}
          toggle={() => {
            tog_center()
          }}
          centered={true}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">Добавить тренера</h5>
            <button
              type="button"
              onClick={() => {
                setmodal_center(false)
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
            <FormUpload />
          </Row>
            <Row>
              <h6>Имя</h6>
              <input
                className="form-control"
                type="text"
                defaultValue="Artisanal kale"
              />
            </Row>
            <Row>
              <h6>Описание</h6>
              <input
                className="form-control"
                type="text"
                defaultValue="Artisanal kale"
              />
            </Row>
            <div className="top-name center-block text-center mt-2" >
              <Button
                onClick={() => {
                  setmodal_center(false)
                }}
                type="button"
                color="primary"
                size="lg"
                className="btn-rounded waves-effect waves-light"
              >Добавить
              </Button>
            </div>
          </div>
        </Modal>
      </Col>
    </React.Fragment>
  )
}

export default Trainers