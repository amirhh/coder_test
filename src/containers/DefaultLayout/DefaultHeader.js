import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
// import PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { connect } from 'react-redux'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'

// const propTypes = {
//   children: PropTypes.node,
// };

// const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      isShowProgress: this.props.prices.length > 0 ? true : false,
      price: 0
    };
  }

  componentDidMount = () => {
    // let interval2 =setInterval(() => {
    //   // if(Gstate.percent === 100)
    //   //   clearInterval(interval2);
    //   this.setState({percent:Gstate.percent,isShowProgress:Gstate.isShowProgress,price:Gstate.price});
    // }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.prices.length > 0 ? this.setState({isShowProgress : true , percent : 100 , price : nextProps.prices.reduce((prev, cur) => prev + cur.price, 0)}) : this.setState({isShowProgress : false});

  }
  


  render() {
    // eslint-disable-next-line
    const { children } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'passco Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'passco Logo' }}
        />
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}

        <Nav style={{ textAlign: 'right' }} navbar>
          <NavItem >
            <NavLink style={{ color: 'white' }} href="/"> خانه </NavLink>
          </NavItem>
          <NavItem style={{ width: '75%', display: (this.state.isShowProgress) ? 'list-item' : 'none' }} >
            <NavLink style={{ width: '100%', color: 'white' }} href="/"><Progress percent={this.state.percent} /> {this.state.price.toLocaleString()} تومان </NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

// DefaultHeader.propTypes = propTypes;
// DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  // todos: getVisibleTodos(state.todos, state.visibilityFilter)
  prices: state.price
})


export default connect(mapStateToProps, null)(DefaultHeader);
// export default DefaultHeader;