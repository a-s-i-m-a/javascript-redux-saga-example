import React from "react"
import { Redirect } from "react-router-dom"

import Login from "../pages/Authentication/Login"

import Cards from "../pages/card"
import Trainers from "../pages/trainers"
import Clients from "../pages/clients"
import CardStatus from "../pages/card/cardStatus";
import CardTypes from "../pages/card/cardTypes";

const userRoutes = [
  { path: "/cards", component: Cards },
  { path: "/cards/statuses", component: CardStatus },
  { path: "/cards/types", component: CardTypes },
  { path: "/trainers", component: Trainers },
  { path: "/clients", component: Clients },
  { path: "/", exact: true, component: () => <Redirect to="/cards" /> },
]

const authRoutes = [
  { path: "/login", component: Login }
]

export { userRoutes, authRoutes }
