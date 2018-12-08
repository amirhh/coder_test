import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/logo.svg'
import Gstate from '../GlobalState';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent:0,
      isShowProgress:false,
      price:0
    };
  }

  componentDidMount = () => {
    let interval2 =setInterval(() => {
      // if(Gstate.percent === 100)
      //   clearInterval(interval2);
      this.setState({percent:Gstate.percent,isShowProgress:Gstate.isShowProgress,price:Gstate.price});
    }, 1000);
  }
  render() {
    

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'passco Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'passco Logo' }}
        />
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}

        <Nav style={{textAlign:'right'}} navbar>
          <NavItem >
            <NavLink style={{color:'white'}} href="/">قیمت ها</NavLink>
          </NavItem>
          <NavItem style={{width:'75%',display:(this.state.isShowProgress)?'list-item':'none'}} >
            <NavLink style={{width:'100%',color:'white'}} href="/"><Progress percent={this.state.percent} /> {this.state.price}تومان</NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
