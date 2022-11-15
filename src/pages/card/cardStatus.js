import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  Modal,
  Form,
  FormGroup,
  Label,
  Input,

} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCardsStatus
} from "../../store/cards/actions";
import PropTypes from "prop-types";


const initialCardState = {
  name: ""
};

const removeBodyCss = () => document.body.classList.add("no_padding");

const CardStatus= props => {
  const [cardsStatus, setCardsStatus] = useState([]);
  const [cardStatuses] = useState([
    { id: null, name: "Выберите статус" },
    { id: "d9a494a2-74f7-46de-9cd6-b12f02918200", name: "VIP" },
  ]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [status, setStatus] = useState(initialCardState);

  useEffect(() => {
    props.fetchCardsStatus();
  }, []);

  useEffect(() => {
    setCardsStatus(
      props.cards.map(cardStatus=> {
        return {
          ...cardStatus,
          status: status.name,
          statusId: status.id,
        };
      })
    );
  }, [props.cards]);

  const openCardEditModal = status => {
    setStatus({ ...status });
    setIsOpenModalUpdate(true);
  };

  const destroyCardStatus = id => {
    props.deleteCardAction(id);
  };

  const toggleCreateModal = () => {
    setIsOpenModalCreate(!isOpenModalCreate);
    removeBodyCss();
  };

  const toggleUpdateModal = () => {
    setIsOpenModalUpdate(!isOpenModalUpdate);
    removeBodyCss();
  };
  const submitFormCreate = e => {
    e.preventDefault();
    props.createCard(status);
    setStatus(initialCardState);
  };

  const submitFormUpdate = e => {
    e.preventDefault();
    props.updateStatus(status);
    setCard(initialCardState);
  };
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Cтатусы карт  | Спортивный Комплекс «Innopolis»</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="mt-2">
                <CardBody>
                  <div className="mb-4 d-flex justify-content-between">
                    <h4 className="card-title">Карты</h4>
                    <Button
                      type="button"
                      color="primary"
                      className="waves-effect waves-light"
                      onClick={() => setIsOpenModalCreate(true)}
                    >
                      Добавить статус карты
                    </Button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                      <tr>
                        <th className="align-middle">Статус</th>
                        <th className="align-items-end" />
                      </tr>
                      </thead>
                      <tbody>
                      {cardsStatus.map((status, key) => (
                        <tr key={"_tr_" + key}>
                          <td>
                            <Link to="#" className="text-body fw-bold">
                              {status.name}
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <Button
                                onClick={() => openCardEditModal(cardsStatus)}
                                type="button"
                                color="primary"
                                size="sm"
                                className="waves-effect waves-light m-1"
                              >
                                <i className="fas fa-pencil-alt" />
                              </Button>
                              <Button
                                type="button"
                                color="danger"
                                size="sm"
                                className="waves-effect waves-light m-1"
                                onClick={() => destroyCardStatus(cardsStatus.id)}
                              >
                                <i className="fas fa-trash" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        isOpen={isOpenModalCreate}
        toggle={toggleCreateModal}
        centered={true}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">Добавить статус карты</h5>
          <button
            type="button"
            onClick={() => {
              setIsOpenModalCreate(false);
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Form onSubmit={submitFormCreate}>
            <FormGroup className="mt-2">
              <Label>Статус</Label>
              <Input
                type="select"
                defaultValue={cardStatuses.name}
                onChange={e => setCardsStatus({ ...cardsStatus, statusId: e.target.value })}
              >
                {cardStatuses.map((status, index) => {
                  return (
                    <option key={`status-${index}`} value={status.id}>
                      {status.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="d-flex justify-content-end mt-3">
              <Button
                onClick={() => {
                  setIsOpenModalCreate(false);
                }}
                type="button"
                color="danger"
                className="waves-effect waves-light me-2"
              >
                Закрыть
              </Button>
              <Button
                onClick={() => {
                  setIsOpenModalCreate(false);
                }}
                type="submit"
                color="primary"
                className="waves-effect waves-light"
              >
                Сохранить
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenModalUpdate}
        toggle={toggleUpdateModal}
        centered={true}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">Редактировать карту</h5>
          <button
            type="button"
            onClick={() => {
              setIsOpenModalUpdate(false);
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Form onSubmit={submitFormUpdate}>
            <FormGroup className="mt-2">
              <Label>Статус</Label>
              <Input
                type="select"
                defaultValue={cardsStatus.name}
                onChange={e => setCardsStatus({ ...cardsStatus, statusId: e.target.value })}
              >
                {cardStatuses.map((status, index) => {
                  return (
                    <option key={`status-${index}`} value={status.id}>
                      {status.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="d-flex justify-content-end mt-3">
              <Button
                onClick={() => {
                  setIsOpenModalUpdate(false);
                }}
                type="button"
                color="danger"
                className="waves-effect waves-light me-2"
              >
                Закрыть
              </Button>
              <Button
                onClick={() => {
                  setIsOpenModalUpdate(false);
                }}
                type="submit"
                color="primary"
                className="waves-effect waves-light"
              >
                Сохранить
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  const { error, cards } = state.Cards;
  return { error, cards };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchCardsStatus
  })(CardStatus)
);

CardStatus.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  fetchCardsStatus: PropTypes.any
};