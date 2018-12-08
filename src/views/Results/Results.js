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

class Choose3 extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Datas: {},
      sum: 0,
      OS: '',
      modal: false,
      animationShow: true,
      animationIn: Gstate.animationIn,
      animationOut: Gstate.animationOut,
      isCheck: true,
      error: undefined
    };
    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);
  }
  componentWillMount = () => {
    try {
      console.log(this.props.location.state.choices);
      Gstate.percent = 100;
    } catch (error) {
      this.setState({ modal: true, error: true });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.OS === "android" && prevState.OS !== this.state.OS) {
      console.log("os changed to android");
      // this.setState({ Datas: pricesJson })
    }
    else if (this.state.OS === "ios" && prevState.OS !== this.state.OS) {
      console.log("os changed to ios");
      // this.setState({ Datas: pricesJson })
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
    this.setState({ animationShow: false, modal: !this.state.modal });
    setTimeout(() => {
      this.props.history.push({
        pathname: '/dashboard',
        // search: '?query=abc',
        // state: { selectedOs: OS }
      })
    }, 1000);
  }
  handleOSClick(OS) {
    console.log("OS : ", OS);

  }

  handleChangeSwitch() {
    this.setState(prevState => ({ isCheck: !prevState.isCheck }));
  }

  handler(param) {
    this.setState(prevState => ({ sum: parseInt(prevState.sum) + parseInt(param) }))
  }

  handleChoose(choose) {
    this.setState({ animationShow: false });
    setTimeout(() => {
      this.props.history.push({
        pathname: '/choose4',
        search: `?OS=${this.props.location.state.selectedOs}&q1=${this.props.location.state.choose1}&q2=${this.props.location.state.choose1}&q3=${choose}`,
        state: {
          selectedOs: this.props.location.state.selectedOs,
          choose1: this.props.location.state.choose1,
          choose2: this.props.location.state.choose2,
          choose3: choose
        }
      })
    }, 1000);
  }

  render() {
    if (this.state.error)
      return (
        <Modal style={{ height: '85vh', minWidth: '65vw', direction: 'ltr' }} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader style={{ color: 'white' }} toggle={this.toggle}>! لطفا ابتدا قدم قبلی را تکمیل کنید </ModalHeader>
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
        <Animated style={Styles.animation_choose} animationIn={this.state.animationIn} animationOut={this.state.animationOut} isVisible={this.state.animationShow}>
          <div dir="ltr" >result : </div>
          <div > تومان {this.props.location.state.sumPrice} </div><br/>
          {this.props.location.state.choices.map((value,index) => <div key={index}>{value}</div>)}
        </Animated>
      );
  }
}

const Styles = {
  animation_choose: {
    minHeight: '60vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'center',
    placeItems: 'center'
  }
}

export default Choose3;