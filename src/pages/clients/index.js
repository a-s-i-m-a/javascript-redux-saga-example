import React,{useState} from "react"
import MetaTags from 'react-meta-tags';
import {
  Col,
  Container,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  CardTitle, Button, Card, Modal
} from "reactstrap"
import { Link } from "react-router-dom"

const Clients = () => {
  const [modal_center, setmodal_center] = useState(false)
  const [modal_edit, setmodal_edit] = useState(false)
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
  const clients = [
    {
      "name": "Тренер 1",
      "age": 18,
      "gender": "male",
      "cardId": 1,
      "codeRefIdCard": "12321",
      "codeCard": "1241241",
      "inClub": false,
      "isActive": false
    },{
      "name": "Тренер 1",
      "age": 18,
      "gender": "male",
      "cardId": 1,
      "codeRefIdCard": "12321",
      "codeCard": "1241241",
      "inClub": false,
      "isActive": true
    },
    {
      "name": "Тренер 1",
      "age": 18,
      "gender": "male",
      "cardId": 1,
      "codeRefIdCard": "12321",
      "codeCard": "1241241",
      "inClub": true,
      "isActive": false
    }
  ]
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4 mt-4">Клиенты</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
              <tr>
                <th className="align-middle">ID</th>
                <th className="align-middle">Имя</th>
                <th className="align-middle">Возраст</th>
                <th className="align-middle">Пол</th>
                <th className="align-middle">Код</th>
                <th className="align-middle">Код карты</th>
                <th className="align-middle">IN CLUB</th>
                <th className="align-middle">IS ACTIVE</th>
                <th className="align-middle">Редактировать</th>
              </tr>
              </thead>
              <tbody>
              {clients.map((client, key) => (
                <tr key={"_tr_" + key}>
                  <td>
                    <Link to="#" className="text-body fw-bold">
                      {" "}
                      {client.cardId}{" "}
                    </Link>{" "}
                  </td>
                  <td>{client.name}</td>
                  <td>{client.age}</td>
                  <td>{client.gender}</td>
                  <td>{client.codeRefIdCard}</td>
                  <td>{client.codeCard}</td>
                  <td>{client.inClub?(<span className="text-primary">true</span>):<span className="text-danger">false</span>}</td>
                  <td>{client.isActive?<span className="text-primary">Active</span>:<span className="text-danger">true</span>}</td>
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
                          <h5 className="modal-title mt-0">Редактировать данные клиента</h5>
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

                            <h6>Имя</h6>
                            <input
                              className="form-file"
                              type="text"
                              defaultValue={client.name}
                            />
                          </Row>
                          <Row>
                            <h6>Возраст</h6>
                            <input
                              onChange={(e)=>setName(e.target.value)}
                              className="form-control"
                              type="text"
                              defaultValue={client.age}
                            />
                          </Row>
                          <Row>
                            <h6>Пол</h6>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={client.gender}
                            />
                          </Row>
                          <Row>
                            <h6>Код</h6>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={client.codeCard}
                            />
                          </Row>
                          <Row>
                            <h6>Код карты</h6>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={client.codeRefIdCard}
                            />
                          </Row>
                          <Row>
                            <h6>IN CLUB</h6>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={client.inClub}
                            />
                          </Row>
                          <Row>
                            <h6>IS ACTIVE</h6>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={client.isActive}
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
      <Col >
     <div className="top-name center-block text-center">
       <Button
         onClick={()=>setmodal_center(true)}
         type="button"
         color="primary"
         size="lg"
         className="btn-rounded waves-effect waves-light"
       >Добавить клиента
       </Button>
     </div>
        <Col sm={6} md={4} xl={3}>
          <Modal
            isOpen={modal_center}
            toggle={() => {
              tog_center()
            }}
            centered={true}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">Редактировать данные клиента</h5>
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

                <h6>Имя</h6>
                <input
                  className="form-file"
                  type="text"

                />
              </Row>
              <Row>
                <h6>Возраст</h6>
                <input
                  className="form-control"
                  type="text"

                />
              </Row>
              <Row>
                <h6>Пол</h6>
                <input
                  className="form-control"
                  type="text"

                />
              </Row>
              <Row>
                <h6>Код</h6>
                <input
                  className="form-control"
                  type="text"

                />
              </Row>
              <Row>
                <h6>Код карты</h6>
                <input
                  className="form-control"
                  type="text"

                />
              </Row>
              <Row>
                <h6>IN CLUB</h6>
                <input
                  className="form-control"
                  type="text"

                />
              </Row>
              <Row>
                <h6>IS ACTIVE</h6>
                <input
                  className="form-control"
                  type="text"
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
      </Col>
    </React.Fragment>
  )
}

export default Clients