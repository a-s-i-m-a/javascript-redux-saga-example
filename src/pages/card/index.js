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
  InputGroup,
  InputGroupText,
  InputGroupAddon,
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

const formatter = new Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const initialCardState = {
  name: "",
  startDate: "",
  endDate: "",
  typeId: null,
  statusId: null,
  price: "",
};

const removeBodyCss = () => document.body.classList.add("no_padding");

const Cards = props => {
  const [cards, setCards] = useState([]);
  const [cardStatuses] = useState([
    { id: null, name: "Выберите статус" },
    { id: "d9a494a2-74f7-46de-9cd6-b12f02918200", name: "VIP" },
  ]);
  const [cardTypes] = useState([
    { id: null, name: "Выберите тип" },
    { id: "09448bc7-68b1-437f-9725-67d71c087ebd", name: "Тренажерка" },
  ]);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [card, setCard] = useState(initialCardState);

  useEffect(() => {
    props.fetchCards();
  }, []);

  useEffect(() => {
    setCards(
      props.cards.map(card => {
        const startDate = new Date(card.startDate);
        const endDate = new Date(card.endDate);
        return {
          ...card,
          startDate: `${startDate.getFullYear()}-${
            startDate.getMonth() < 10
              ? "0" + startDate.getMonth()
              : startDate.getMonth()
          }-${
            startDate.getDate() < 10
              ? "0" + startDate.getDate()
              : startDate.getDate()
          }`,
          endDate: `${endDate.getFullYear()}-${
            endDate.getMonth() < 10
              ? "0" + endDate.getMonth()
              : endDate.getMonth()
          }-${
            endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate()
          }`,
          startDateFormated: formatter.format(startDate),
          endDateFormated: formatter.format(endDate),
          type: card.type.name,
          status: card.status.name,
          typeId: card.type.id,
          statusId: card.status.id,
        };
      })
    );
  }, [props.cards]);

  const openCardEditModal = card => {
    setCard({ ...card });
    setIsOpenModalUpdate(true);
  };

  const destroyCard = id => {
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
    props.createCard(card);
    setCard(initialCardState);
  };

  const submitFormUpdate = e => {
    e.preventDefault();
    props.updateCard(card);
    setCard(initialCardState);
  };
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Карты | Спортивный Комплекс «Innopolis»</title>
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
                      Добавить карту
                    </Button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th className="align-middle">Назавние</th>
                          <th className="align-middle">Дата начала</th>
                          <th className="align-middle">Дата окончания</th>
                          <th className="align-middle">Тип</th>
                          <th className="align-middle">Статус</th>
                          <th className="align-middle">Цена</th>
                          <th className="align-items-end" />
                        </tr>
                      </thead>
                      <tbody>
                        {cards.map((card, key) => (
                          <tr key={"_tr_" + key}>
                            <td>
                              <Link to="#" className="text-body fw-bold">
                                {card.name}
                              </Link>
                            </td>
                            <td>{card.startDateFormated}</td>
                            <td>{card.endDateFormated}</td>
                            <td>{card.type}</td>
                            <td>{card.status}</td>
                            <td>{card.price}</td>
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
                                  onClick={() => destroyCard(card.id)}
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
          <h5 className="modal-title mt-0">Добавить карту</h5>
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
            <FormGroup>
              <Label>Название</Label>
              <Input
                value={card.name}
                onChange={e => setCard({ ...card, name: e.target.value })}
                placeholder="Карта №1"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Дата начала действия</Label>
              <Input
                type="date"
                value={card.startDate}
                onChange={e => setCard({ ...card, startDate: e.target.value })}
                placeholder="2020-01-02"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Дата окончания действия</Label>
              <Input
                type="date"
                placeholder="2020-01-02"
                value={card.endDate}
                onChange={e => setCard({ ...card, endDate: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Тип</Label>
              <Input
                type="select"
                defaultValue={card.typeId}
                onChange={e => setCard({ ...card, typeId: e.target.value })}
              >
                {cardTypes.map((type, index) => {
                  return (
                    <option key={`type-${index}`} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Статус</Label>
              <Input
                type="select"
                defaultValue={card.statusId}
                onChange={e => setCard({ ...card, statusId: e.target.value })}
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
            <FormGroup className="mt-2">
              <Label>Цена</Label>
              <InputGroup>
                <Input
                  value={card.price}
                  onChange={e => setCard({ ...card, price: +e.target.value })}
                  type="number"
                  placeholder="300"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>₽</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
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
            <FormGroup>
              <Label>Название</Label>
              <Input
                value={card.name}
                onChange={e => setCard({ ...card, name: e.target.value })}
                placeholder="Карта №1"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Дата начала действия</Label>
              <Input
                type="date"
                value={card.startDate}
                onChange={e => setCard({ ...card, startDate: e.target.value })}
                placeholder="2020-01-02"
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Дата окончания действия</Label>
              <Input
                type="date"
                placeholder="2020-01-02"
                value={card.endDate}
                onChange={e => setCard({ ...card, endDate: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Тип</Label>
              <Input
                type="select"
                defaultValue={card.typeId}
                onChange={e => setCard({ ...card, typeId: e.target.value })}
              >
                {cardTypes.map((type, index) => {
                  return (
                    <option key={`type-${index}`} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup className="mt-2">
              <Label>Статус</Label>
              <Input
                type="select"
                defaultValue={card.statusId}
                onChange={e => setCard({ ...card, statusId: e.target.value })}
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
            <FormGroup className="mt-2">
              <Label>Цена</Label>
              <InputGroup>
                <Input
                  value={card.price}
                  onChange={e => setCard({ ...card, price: +e.target.value })}
                  type="number"
                  placeholder="300"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>₽</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
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
  })(Cards)
);

Cards.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  fetchCards: PropTypes.func,
  createCard: PropTypes.func,
  deleteCardAction: PropTypes.func,
  updateCard: PropTypes.func,
  cards: PropTypes.array,
};
