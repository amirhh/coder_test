import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-input-range/lib/css/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import queryString from 'query-string';
import { Animated } from "react-animated-css";
import Gstate from "./../../containers/GlobalState";

class Choose extends Component {
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
  }
  componentWillMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    if(parsed.OS !== undefined) {
      
      this.setState({OS:parsed.OS})
      Gstate.percent = 20;
    } else {
      this.setState({ modal: true,error:true });
    }
  }

  toggle() {
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
    this.setState({ animationShow: false });
    setTimeout(() => {
      if (choose === "expertise") {
        this.props.history.push({
          pathname: '/allInfo',
          search: `?OS=${this.state.OS}&q1=${choose}`,
          state: {
            selectedOs: this.state.OS,
            choose1: choose
          }
        })
      }
      else if (choose === "smart") {
        // this.props.history.push({
        //   pathname: '/choose2',
        //   search: `?OS=${this.state.OS}&q1=${choose}`,
        //   state: {
        //     selectedOs: this.state.OS,
        //     choose1: choose
        //   }
        // })
      }

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
          <ul id="chUl">
            <li><span className="hoverA" onClick={this.handleChoose.bind(this, 'expertise')} >انتخاب با جزییات تخصصی</span></li>
            <li><span className="hoverA" onClick={() => alert("در حال حاضر امکان انتخاب این گزینه وجود ندارد")} >انتخاب هوشمند</span></li>
          </ul>
        </Animated>
      );
  }
}

const Styles = {
  animation_choose: {
    minHeight: '60vh',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  }
}

export default Choose;