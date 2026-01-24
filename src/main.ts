import Controller from "./controller";
import Model from "./model";
import "./style.css";
import View from "./view";

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

controller.init();
