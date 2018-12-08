import React, { Component } from 'react';
import { DropdownToggle, Row, Col, Card, CardBody, CardHeader, Label, DropdownItem, DropdownMenu, Button, Table, InputGroup, InputGroupAddon, InputGroupButtonDropdown, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import queryString from 'query-string';
import { isNullOrUndefined } from 'util';
import { AppSwitch } from '@coreui/react'
import { Animated } from "react-animated-css";
import Gstate from "../../containers/GlobalState";
import levelsJson from './levels.json';

class Choose2 extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Datas: {},
      sumPrice: Gstate.price,
      OS: '',
      modal: false,
      animationShow: true,
      animationIn: Gstate.animationIn,
      animationOut: Gstate.animationOut,
      isCheck: true,
      error: undefined,
      levels: [],
      lvl: 1,
      choices: []
    };
    this.toggle = this.toggle.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
  }
  componentWillMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    if(parsed.OS !== undefined) {
      this.setState({OS:parsed.OS,levels: levelsJson},()=>{
        if(this.state.OS==="android"){
          Gstate.price=Gstate.androidPrice;
        }
        else if(this.state.OS==="ios"){
          Gstate.price=Gstate.iosPrice;
        }
        else if(this.state.OS==="ios_android"){
          Gstate.price=Gstate.crossPrice;
        }
      })
    } else {
      this.setState({ modal: true,error:true });
    }
  }

  toggle(os) {
    this.setState({ animationShow: false, modal: !this.state.modal });
    setTimeout(() => {
      this.props.history.push({
        pathname: '/dashboard',
        // search: '?query=abc',
        // state: { selectedOs: OS }
      })
    }, 1000);
  }

  handleChoose(choose) {
    Gstate.percent = parseInt((80 / parseInt(this.state.levels.Data.length - this.state.lvl + 2)) + 20);
    console.log("gprice : ",Gstate.price);
    
    if (choose) {
      this.setState({ animationShow: false, choices: [...this.state.choices, choose.shortName],sumPrice:(this.state.OS === "android") ? (this.state.sumPrice+choose.priceAndroid) : ((this.state.OS === "ios")?(this.state.sumPrice+choose.priceIos):(this.state.sumPrice+choose.priceCross))},()=>{Gstate.price = this.state.sumPrice});
      choose = false;
      setTimeout(() => {
        this.setState({ lvl: parseInt(this.state.lvl + 1), animationShow: true });
      }, 1000);
    }

    if (this.state.lvl <= this.state.levels.Data.length && !choose) {
      let currData = this.state.levels.Data[parseInt(this.state.lvl - 1)];
      return this.renderQuestions(currData);
    }
    else if (this.state.lvl > this.state.levels.Data.length) {
      setTimeout(() => {
        this.props.history.push({
          pathname: '/results',
          // search: '?query=abc',
          state: { choices: this.state.choices,sumPrice:this.state.sumPrice }
        })
      }, 1000);
    }
  }

  renderQuestions(currData) {
    return (
      <div id="questions">
        <h4>{currData.title}</h4><pre>{`\n\n`}</pre>
        <ul id="chUl">
          {currData.questions.map((question, index) => <li key={index} ><span key={index * 451} className="hoverA" onClick={() => this.handleChoose(question)}>{question.text}</span></li>)}
        </ul>
      </div>
    );
  }

  render() {
    if (this.state.error)
      return (
        <Modal style={{ height: '85vh', minWidth: '65vw', direction: 'ltr' }} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader style={{ color: 'white' }} toggle={this.toggle}>! لطفا از ابتدا قدم ها را تکمیل کنید </ModalHeader>
          <ModalBody>
            <small>باید به ترتیب مراحل را طی کنید</small>
          </ModalBody>
          <ModalFooter style={{ display: 'flex', justifyContent: 'space-around' }} >
            <Button color="primary" onClick={() => this.toggle()}> تایید </Button>{'   '}
          </ModalFooter>
        </Modal>
      );
    else
      return (
        <Animated animationIn={this.state.animationIn} animationOut={this.state.animationOut} isVisible={this.state.animationShow}>
          {this.handleChoose()}
        </Animated>
      );
  }
}

export default Choose2;