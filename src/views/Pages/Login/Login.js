import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Fade} from 'reactstrap';
import axios from 'axios';
import Gstate from './../../../containers/GlobalState';
import packageJson from './../../../../package.json';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        phone_num: '',
        smscode: ''
      },
      fadeIn: false
    }
    this.toggle = this.toggle.bind(this);
  }

  handleChange(event) {
    let fields = this.state.fields;
    let target = event.target;
    fields[target.name] = target.value;
    this.setState({ fields });
  }
  toggle() {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }
  handleClickPhone(event) {
    var that = this;
    axios({
      method: 'post',
      url: `${Gstate.Domain}api/auth/mobile`,
      timeout:Gstate.CTimeOut, // Let's say you want to wait at least 4 mins 60 * 4 * 1000,
      data: {
        mobile: this.state.fields.phone_num
      }
    })
      .then(function (response) {
        if (response.data.status === "okay") {
          console.log(response.data.status);
          that.setState({ fadeIn : true });
          document.getElementsByName("smscode")[0].focus();
        }
        else if (response.data.status === "more_than_four"){
          console.log("تلاش شما بیشتر از حد مجاز بود لطفا 12 ساعت دیگر تلاش کنید");
        }
        else if (response.data.status[0] === "validation_error"){
          console.log("شماره موبایل را درست وارد کنید");
        }
        else {
          console.log("خطا در اتصال به سرور");
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log("خطا در اتصال به سرور");
        console.log(error);
        
      });
  }

  handleClickSms(event) {
    axios({
      method: 'post',
      url: `${Gstate.Domain}api/auth/login`,
      timeout:Gstate.CTimeOut, // Let's say you want to wait at least 4 mins 60 * 4 * 1000,
      data: {
        mobile: this.state.fields.phone_num,
        code: this.state.fields.smscode
      }
    })
      .then(async function (response) {
        console.log("smsokayRes",response);
        if(response.data.status === "okay"){
          localStorage.setItem('api_token', response.data.access_token);
          window.location.reload();
      }
      else{
          console.log("کد اشتباه است !");
      }
      })
      .catch(function (error) {
        console.log("خطا در اتصال به سرور");
        console.log(error);
      });
  }

  render() {
    const { phone_num, smscode } = this.state.fields;
    return (
      <div className="app flex-row align-items-center">
        <Container dir="ltr">
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="phone_num" type="number" step="1" placeholder="phone number" onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                    <Row dir="rtl">
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleClickPhone.bind(this)}>send me</Button>
                      </Col>
                    </Row><br />
                    <Fade in={this.state.fadeIn}>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="smscode" type="password" placeholder="smscode" onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                    <Row dir="rtl">
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleClickSms.bind(this)}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        {/* <Button color="link" className="px-0">Forgot password?</Button> */}
                      </Col>
                    </Row>
                    </Fade>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        <span style={{ position: 'absolute', left: 10,bottom:10, direction: 'ltr', color: 'rgb(0,0,0,0.4)' }} >version : {packageJson.version} </span>
      </div>
    );
  }
}

export default Login;
