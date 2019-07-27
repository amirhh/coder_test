import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import SingleInfo from './SingleInfo';
import Gstate from "../../containers/GlobalState";
import { ToastContainer } from 'react-toastify';
import 'react-input-range/lib/css/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import queryString from 'query-string';
import pricesJson from './prices.json';
import { Animated } from "react-animated-css";

class AllInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Datas: {},
      sum: 0,
      OS: '',
      modal: false,
      animationShow: true,
      animationIn: Gstate.animationIn,
      animationOut: Gstate.animationOut
    };
    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);
  }
  componentWillMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    // console.log(parsed.OS);
    if (parsed.OS !== undefined) {

      this.setState({ OS: parsed.OS })
      Gstate.percent = 100;
    } else {
      this.setState({ modal: true, error: true });
    }
  }

  componentDidMount = () => {
    this.setState({ Datas: pricesJson })
  }

  componentWillUnmount = () => {
    this.setState({ animationShow: false })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.OS === "android" && prevState.OS !== this.state.OS) {
      // console.log("os changed to android");

      this.setState({ Datas: pricesJson })
    }
    else if (this.state.OS === "ios" && prevState.OS !== this.state.OS) {
      // console.log("os changed to ios");
      this.setState({ Datas: pricesJson })
    }
    else if (this.state.OS === "ios_android" && prevState.OS !== this.state.OS) {
      // console.log("os changed to ios_android");
      this.setState({ Datas: pricesJson })
    }
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

  handler(param) {
    this.setState({ sum: parseInt(this.state.sum) + parseInt(param) }, () => {
      if (this.state.OS === "android") {
        Gstate.price = this.state.sum + Gstate.androidPrice;
      }
      else if (this.state.OS === "ios") {
        Gstate.price = this.state.sum + Gstate.iosPrice;
      }
      else if (this.state.OS === "ios_android") {
        Gstate.price = this.state.sum + Gstate.crossPrice;
      }
    });
  }

  handleClickBack() {
    this.setState({ animationShow: false });
    setTimeout(() => {
      this.props.history.push({
        pathname: '/choose',
        search: `?OS=${this.state.OS}`,
        state: {
          selectedOs: this.state.OS
        }
      })
    }, 1000);
  }

  render() {
    if (!this.state.Datas.prices) {
      return (
        <span>
          <Modal style={{ height: '85vh', minWidth: '65vw', direction: 'ltr' }} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}> </ModalHeader>
            <ModalBody>
              <h3 style={{ textAlign: 'center' }} >تعرفه های چه سیستم عاملی را لازم دارید ؟</h3><br />
              <figure style={{ display: 'flex', justifyContent: 'space-around', height: 300 }}>
                <img alt="platform" src={require('./../../assets/img/ios.png')} onClick={() => this.toggle("ios")} className="img_os_selection" style={{ cursor: 'pointer', height: '100%' }} />
                <img alt="platform" src={require('./../../assets/img/android.png')} onClick={() => this.toggle("android")} className="img_os_selection" style={{ cursor: 'pointer', height: '100%' }} />
              </figure>
            </ModalBody>
            <ModalFooter style={{ display: 'flex', justifyContent: 'space-around' }} >
              <Button color="primary" onClick={() => this.toggle("ios")}> IOS </Button>{'   '}
              <Button color="primary" onClick={() => this.toggle("android")}> android </Button>
            </ModalFooter>
          </Modal>
          {/* <div className="wrap" style={{ display: this.state.loadingDisplay, marginBottom: 35 }} >
              <svg version="1.1" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="100" />
              </svg>
            </div>
            <style dangerouslySetInnerHTML={{ __html: "\n              svg {\n                width: 60px;position:relative !important;top:50px;right:10px;\n            height:auto;\n            position: absolute;\n            animation: turn-circle 5s linear infinite;\n            fill: transparent;\n            stroke-width: 50;\n            stroke-dasharray: 31.5;\n          }\nsvg:nth-of-type(1){\n                position: static;\n            margin:-15% 0 0 -5%;\n            stroke: #00aadd;\n          }\nsvg:nth-of-type(2) {\n                stroke: #00ab02;\n            top:0;\n            right:-5%;\n            animation-duration:4s;\n          }\nsvg:nth-of-type(3) {\n                stroke: #0053FF;\n            top:20%; left:15%;\n            animation-duration:3s;\n          }\n@keyframes turn-circle {\n                to { -weblit-transform: rotate3d(0,0,1,360deg);\n                         transform: rotate3d(0,0,1,360deg);}\n          }\n            " }} /> */}
        </span>

      );
    }
    else {
      const platformPrice = (this.state.OS === "ios") ? Gstate.iosPrice : (this.state.OS === "android" ? Gstate.androidPrice : Gstate.crossPrice)
      return (
        <Animated animationIn={this.state.animationIn} animationOut={this.state.animationOut} isVisible={this.state.animationShow}>
          <br />
          <span id="back" onClick={this.handleClickBack.bind(this)} > <i className="fa fa-arrow-left" aria-hidden="true"></i></span>
          <div className="animated fadeIn">
            <Card data-dark="true" data-bg={Gstate.darkBg_default} >
              <CardHeader id="headingOne" style={{ display: 'flex', justifyContent: 'space-between' }} >
                <h5 className="m-0 p-0">هزینه ساخت اپلیکیشن موبایل {this.state.OS} </h5>
                <strong> مجموع : {(this.state.sum + platformPrice).toLocaleString()}</strong>
              </CardHeader>
              <CardBody>
                <Table data-bg={Gstate.darkBg_table} data-dark="true" hover style={{ textAlign: 'center' }}>
                  <thead>
                    <tr data-dark="true" data-bg={Gstate.darkBg_th} >
                      <th>ویژگی</th>
                      <th>زمان</th>
                      <th className="text-center">هزینه</th>
                      <th>انتخاب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Datas.prices.map((data, index) => <SingleInfo key={index} Data={data} action={this.handler} operatingSystem={this.state.OS} />)}

                  </tbody>
                </Table>
                <span style={{ float: 'left', padding: 10, backgroundColor: 'darkseagreen', borderRadius: 6 }} > مجموع : {(this.state.sum + platformPrice).toLocaleString()}</span>
              </CardBody>
            </Card>
            <ToastContainer />

            {/* {this.renderPagination()} */}
          </div >
        </Animated>
      );
    }
  }
}

const mapStateToProps = state => ({
  // todos: getVisibleTodos(state.todos, state.visibilityFilter)
  prices: state.price
})


export default connect(mapStateToProps)(AllInfo);