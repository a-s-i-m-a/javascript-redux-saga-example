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
  Input
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  createCard,
  fetchCards,
  deleteCardAction,
  updateCard,
} from "../../store/cards/actions";
import PropTypes from "prop-types";


const initialCardState = {
  name: "",
  startDate: "",
  endDate: "",
  typeId: null,
  statusId: null,
  price: "",
};

const removeBodyCss = () => document.body.classList.add("no_padding");

const CardTypes= props => {
  const [cardTypes,setCardTypes] = useState([
    { id: null, name: "Выберите тип" },
    { id: "09448bc7-68b1-437f-9725-67d71c087ebd", name: "Тренажерка" },
  ]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  useEffect(() => {
    props.fetchCards();
  }, []);

  useEffect(() => {
    setCardTypes(
      props.cards.map(types => {
        return {
          ...types,
          name: types.name
        };
      })
    );
  }, [props.cards]);

  const openCardEditModal = card => {
    setCard({ ...card });
    setIsOpenModalUpdate(true);
  };

  const destroyType = id => {
    props.deleteTypeAction(id);
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
    props.createCard(cardTypes);
    setCardTypes(initialCardState);
  };

  const submitFormUpdate = e => {
    e.preventDefault();
    props.updateCard(cardTypes);
    setCardTypes(initialCardState);
  };
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Типы карт  | Спортивный Комплекс «Innopolis»</title>
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
                      Добавить тип карты
                    </Button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                      <tr>
                        <th className="align-middle">Тип</th>
                        <th className="align-items-end" />
                      </tr>
                      </thead>
                      <tbody>
                      {cardTypes.map((card, key) => (
                        <tr key={"_tr_" + key}>
                          <td>
                            <Link to="#" className="text-body fw-bold">
                              {card.name}
                            </Link>
                          </td>
                          <td>{card.status} </td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <Button
                                onClick={() => openCardEditModal(card)}
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
                                onClick={() => destroyType(cardTypes.id)}
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
          <h5 className="modal-title mt-0">Добавить тип карты</h5>
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
              <Label>Тип</Label>
              <Input
                type="select"
                defaultValue={cardTypes.name}
                onChange={e => setCardTypes({ ...cardTypes, name: e.target.value })}
              >
                {cardTypes.map((type, index) => {
                  return (
                    <option key={`status-${index}`} value={cardTypes.id}>
                      {cardTypes.name}
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
              <Label>Тип</Label>
              <Input
                type="select"
                defaultValue={cardTypes.name}
                onChange={e => setCardTypes({ ...cardTypes, name: e.target.value })}
              >
                {cardTypes.map((type, index) => {
                  return (
                    <option key={`status-${index}`} value={type.id}>
                      {type.name}
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
    fetchCards,
    createCard,
    deleteCardAction,
    updateCard,
  })(CardTypes)
);

CardTypes.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  fetchCards: PropTypes.func,
  createCard: PropTypes.func,
  deleteCardAction: PropTypes.func,
  updateCard: PropTypes.func,
  cards: PropTypes.array,
};