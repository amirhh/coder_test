import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gstate from './../GlobalState/Gstate'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children } = this.props;

    return (
      <React.Fragment >
        <div style={{display:'flex',flex:1,lineHeight:'22px',padding:'0 20px 0 20px',height:'100%',alignItems:'center',justifyContent:'center'}} data-dark="true" data-bg={Gstate.darkBg_default} >
          <span style={{direction:'rtl'}} >تمامی حقوق متعلق به شرکت نواکو می‌باشد</span>
          {/* <span id="footer_version" style={{position:'absolute',left:10,direction:'ltr',color:'rgb(0,0,0,0.4)'}} >version : {packageJson.version} </span> */}
        </div>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
