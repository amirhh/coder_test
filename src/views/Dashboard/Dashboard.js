import React, { Component } from 'react';
import { DropdownToggle, Row, Col, Card, CardBody, CardHeader, Label, DropdownItem, DropdownMenu, Button, Table, InputGroup, InputGroupAddon, InputGroupButtonDropdown, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './SingleUser';
import axios from 'axios';
import SingleUser from './SingleUser';
import { ToastContainer, toast } from 'react-toastify';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import queryString from 'query-string';
import { isNullOrUndefined } from 'util';
import './config.css'
import pricesJson from './prices.json';
import { AppSwitch } from '@coreui/react'
import { Animated } from "react-animated-css";
import Gstate from "./../../containers/GlobalState";

class Charts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Datas: {},
      sum: 0,
      OS: '',
      modal: true,
      animationShow: true,
      animationIn: Gstate.animationIn,
      animationOut: Gstate.animationOut,
      isCheck: true,
      images: ["ios", "android", "ios_android"]
    };
    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);
  }
  componentDidMount = () => {
    require("./canvasOs");
    Gstate.percent = 0;
    Gstate.isShowProgress = true;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.OS === "android" && prevState.OS !== this.state.OS) {
      console.log("os changed to android");

      this.setState({ Datas: pricesJson })
    }
    else if (this.state.OS === "ios" && prevState.OS !== this.state.OS) {
      console.log("os changed to ios");
      this.setState({ Datas: pricesJson })
    }
  }

  componentWillUnmount = () => {
    this.setState({ animationShow: false })
  }


  handleChange(event) {
    let fields = this.state.fields;
    let target = event.target;
    fields[target.name] = target.value;
    this.setState({ fields });
  }

  toggle(os) {
    this.setState({
      OS: os,
      modal: !this.state.modal
    });
  }
  handleOSClick(OS) {
    // console.log("OS : ", OS);
    this.setState({ animationShow: false });
    switch (OS) {
      case "ios":
        Gstate.price = Gstate.iosPrice;
        break;
      case "android":
        Gstate.price = Gstate.androidPrice;
        break;
      case "ios_android":
        Gstate.price = Gstate.crossPrice;
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.props.history.push({
        pathname: '/choose',
        search: `?OS=${OS}`,
        state: { selectedOs: OS }
      })
    }, 1000);

  }

  handleChangeSwitch() {
    this.setState(prevState => ({ isCheck: !prevState.isCheck }));
  }

  handler(param) {
    this.setState(prevState => ({ sum: parseInt(prevState.sum) + parseInt(param) }))
  }

  render() {
    return (
      <Animated animationIn={this.state.animationIn} animationOut={this.state.animationOut} isVisible={this.state.animationShow}>
        <style dangerouslySetInnerHTML={{__html: "\nmain.main{\n  align-content: unset;\n  justify-content: unset;\n  align-items: unset;\n  justify-items: unset;\n  display: block;\n}\n" }} />
        <div style={{ display: 'flex', justifyContent: 'base-line' }} > انیمیشن : <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} label dataOn={'\u2713'} dataOff={'\u2715'} checked={this.state.isCheck} onChange={this.handleChangeSwitch.bind(this)} /></div>
        <div id="three" className="carousel">
          <figure style={{ animation: (this.state.isCheck) ? 'rotation 33s infinite linear' : 'none' }} >
            {this.state.images.map((value, index) => <img src={require(`./../../assets/img/${value}.png`)} alt="" key={index + 100} onClick={this.handleOSClick.bind(this, value)} />)}
          </figure>
          <nav id="backNextBtn" style={{ display: (this.state.isCheck) ? 'none' : 'flex', color: 'white' }} >
            <button className="nav prev"><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            <button className="nav next"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
          </nav>
        </div>

      </Animated>
    );
  }
}


export default Charts;