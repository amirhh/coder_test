import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppSwitch } from '@coreui/react'
import { isNullOrUndefined } from 'util';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      isDark: false,
      data_darks: [],
      url:''
    };
    this.toggle = this.toggle.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  componentWillMount() {
    // localStorage.setItem('api_token', response.data.access_token);
    let darkTheme = localStorage.getItem('api_token');
    if (darkTheme !== isNullOrUndefined && typeof (darkTheme) === "boolean" && darkTheme !== this.state.isDark) {
      this.setState({
        isDark: darkTheme
      });
    }
  }
  componentDidMount() {
    setTimeout(() => {
      let x = document.querySelectorAll('[data-dark="true"],ol.breadcrumb,.card,.card-body,.card-header,th');
      this.setState({
        data_darks: x,
        url:window.location.href
      });
      // console.log("x : ", this.state.data_darks);
    }, 3000);
  }
  componentDidUpdate(){
    // console.log("aside updated");
    
    if(this.state.url !== window.location.href){
      setTimeout(() => {
        let x = document.querySelectorAll('[data-dark="true"],ol.breadcrumb,.card,.card-body,.card-header,th');
        this.setState({
          data_darks: x,
          url:window.location.href
        });
      // console.log("x2 : ", this.state.data_darks);
      this.changeTheme(this.state.isDark)
      }, 2000);
    }
  }
  mergeNodeLists(a, b) {
    var slice = Array.prototype.slice;
    return slice.call(a).concat(slice.call(b));
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleChangeTheme() {
    this.setState({ isDark: !this.state.isDark }, () => {
      console.log("changed to ", this.state.isDark);
      this.changeTheme(this.state.isDark);
    });
  }

  changeTheme(isDarkTheme) {
    if (isDarkTheme) {
      for (let i = 0; i < this.state.data_darks.length; i++) {
          this.state.data_darks[i].classList.add("mystyle");
      }
    }
    else {
      for (let i = 0; i < this.state.data_darks.length; i++) {
          this.state.data_darks[i].classList.remove("mystyle");
      }
    }
  }

  render() {
    if (this.state.data_darks.length < 1) {
      return <div></div>
    }
    else {
      return (
        <React.Fragment>
          <Nav tabs className={(this.state.isDark)?'mystyle':''}>
            {/* <NavItem>
              <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                       onClick={() => {
                         this.toggle('1');
                       }}>
                <i className="icon-list"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                       onClick={() => {
                         this.toggle('2');
                       }}>
                <i className="icon-speech"></i>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink className={(this.state.isDark)?'active mystyle':'active'}
              // className={classNames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggle('1'); 
                }}>
                <i className="icon-settings"></i>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}  className={(this.state.isDark)?'mystyle':''} >
            {/* <TabPane tabId="1">
              <ListGroup className="list-group-accent">
                <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-warning list-group-item-divider">
                  <div className="avatar float-right">
                    <img className="img-avatar" src="assets/img/avatars/7.jpg" alt="admin@bootstrapmaster.com"></img>
                  </div>
                  <div>Meeting with <strong>Lucas</strong> </div>
                  <small className="text-muted mr-3">
                    <i className="icon-calendar"></i>&nbsp; 1 - 3pm
                  </small>
                  <small className="text-muted">
                    <i className="icon-location-pin"></i> Palo Alto, CA
                  </small>
                </ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-info list-group-item-divider">
                  <div className="avatar float-right">
                    <img className="img-avatar" src="assets/img/avatars/4.jpg" alt="admin@bootstrapmaster.com"></img>
                  </div>
                  <div>Skype with <strong>Megan</strong></div>
                  <small className="text-muted mr-3">
                    <i className="icon-calendar"></i>&nbsp; 4 - 5pm
                  </small>
                  <small className="text-muted">
                    <i className="icon-social-skype"></i> On-line
                  </small>
                </ListGroupItem>
                <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Tomorrow</ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                  <div>New UI Project - <strong>deadline</strong></div>
                  <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
                  <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                  <div className="avatars-stack mt-2">
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                  </div>
                </ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-success list-group-item-divider">
                  <div><strong>#10 Startups.Garden</strong> Meetup</div>
                  <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
                  <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
                </ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-primary list-group-item-divider">
                  <div><strong>Team meeting</strong></div>
                  <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
                  <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                  <div className="avatars-stack mt-2">
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                    <div className="avatar avatar-xs">
                      <img src={'assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </TabPane>
            <TabPane tabId="2" className="p-3">
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
            </TabPane> */}
            <TabPane tabId="1" className="p-3">
              <h6>Settings</h6>
              <div className="aside-options">
                <div className="clearfix mt-4">
                  <small><b>dark theme</b></small>
                  <AppSwitch className={'float-right'} variant={'pill'} onClick={this.handleChangeTheme.bind(this)} label color={'success'} size={'sm'} />
                </div>
                <div>
                  <small className="text-muted">با فشردن این دکمه رنگ پوسته به حالت تیره تغییر می کند
                  </small>
                </div>
              </div>

              {/* <div className="aside-options">
                <div className="clearfix mt-3">
                  <small><b>Option 2</b></small>
                  <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} size={'sm'}/>
                </div>
                <div>
                  <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </small>
                </div>
              </div>
  
              <div className="aside-options">
                <div className="clearfix mt-3">
                  <small><b>Option 3</b></small>
                  <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} defaultChecked size={'sm'} disabled/>
                  <div>
                    <small className="text-muted">Option disabled.</small>
                  </div>
                </div>
              </div>
  
              <div className="aside-options">
                <div className="clearfix mt-3">
                  <small><b>Option 4</b></small>
                  <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} defaultChecked size={'sm'} />
                </div>
              </div>
  
              <hr />
              <h6>System Utilization</h6>
  
              <div className="text-uppercase mb-1 mt-4">
                <small><b>CPU Usage</b></small>
              </div>
              <Progress className="progress-xs" color="info" value="25" />
              <small className="text-muted">348 Processes. 1/4 Cores.</small>
  
              <div className="text-uppercase mb-1 mt-2">
                <small><b>Memory Usage</b></small>
              </div>
              <Progress className="progress-xs" color="warning" value="70" />
              <small className="text-muted">11444GB/16384MB</small>
  
              <div className="text-uppercase mb-1 mt-2">
                <small><b>SSD 1 Usage</b></small>
              </div>
              <Progress className="progress-xs" color="danger" value="95" />
              <small className="text-muted">243GB/256GB</small>
  
              <div className="text-uppercase mb-1 mt-2">
                <small><b>SSD 2 Usage</b></small>
              </div>
              <Progress className="progress-xs" color="success" value="10" />
              <small className="text-muted">25GB/256GB</small> */}
            </TabPane>
          </TabContent>
        </React.Fragment>
      );
    }
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
