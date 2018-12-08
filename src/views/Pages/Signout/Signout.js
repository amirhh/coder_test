import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import Gstate from './../../../containers/GlobalState';
import axios from 'axios';

class Signout extends Component {
  constructor(props) {
    super(props);
    this.state={
      loadingDisplay: 'flex'
    }
  }
  
  componentWillMount(){
    
  }
  logout(){
    var that = this;
    let apiToken = localStorage.getItem('api_token');
    axios({
      method: 'post',
      url: `${Gstate.Domain}api/auth/logout`,
      timeout: Gstate.CTimeOut,
      data: {
        token: apiToken
      }
    })
      .then(function (response) {
        if (response.data.status === "okay") {
          alert("با موفقیت خارج شدید");
          localStorage.removeItem('api_token');
          setTimeout(() => {
           window.location.reload();
          }, 500);
        }
        else if (response.data.status === "invalid_argument_exception") {
          alert("ورود منقضی شد");
          localStorage.removeItem('api_token');
          setTimeout(() => {
           window.location.reload();
          }, 500);
        }
        else {
          alert("خطا در دریافت اطلاعات از سرور");
          that.setState({
            loadingDisplay: 'none'
          })
        }
      })
      .catch(function (error) {
        alert("خطا در اتصال به سرور");
        that.setState({
          loadingDisplay: 'none'
        })
        console.log(error);
        localStorage.removeItem('api_token');
      });
    
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>خروج</h1>
                  <p className="text-muted">خارج شدن از حساب کاربری</p>
                  <h4>آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟</h4>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button onClick={this.logout.bind(this)} color="success" style={{direction:'ltr',display:'inline-flex',alignItems:'center'}} > <i class="cui-circle-check icons font-2xl"></i> <span style={{fontSize:'large'}} > بله </span></Button>

                    </Col>
                    <Col xs="12" sm="6">
                      <Button onClick={()=>this.props.history.push("/")} color="danger" style={{ direction: 'ltr', display: 'inline-flex', alignItems: 'center' }} > <i class="cui-circle-x icons font-2xl"></i> <span style={{ fontSize: 'large' }} > خیر </span></Button>

                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signout;
