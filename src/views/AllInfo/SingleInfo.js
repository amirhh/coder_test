import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import moment from 'moment-jalaali';
import { AppSwitch } from '@coreui/react'

class SingleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Display_user_info: 'none',
      isCheck: false
    }
  }
  handleChangeSwitch() {
    this.setState(prevState => ({ isCheck: !prevState.isCheck }));
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isCheck !== this.state.isCheck) {
      if (this.state.isCheck) {
        if (this.props.operatingSystem === "ios")
          this.props.action(this.props.Data.priceIos);
        else if (this.props.operatingSystem === "android")
          this.props.action(this.props.Data.priceAndroid);
        else
        this.props.action(this.props.Data.priceCross);
      }
      else {
        if (this.props.operatingSystem === "ios")
          this.props.action(parseInt(this.props.Data.priceIos) * -1);
        else if (this.props.operatingSystem === "android")
          this.props.action(parseInt(this.props.Data.priceAndroid) * -1);
          else
          this.props.action(parseInt(this.props.Data.priceCross) * -1);
      }
      // console.log(this.state.isCheck, prevState);
    }
    else {
      // console.log("don't care !");

    }

  }

  render() {
    return (
      <tr style={{ cursor: "pointer" }} >
        <td>
          {this.props.Data.name}
        </td>
        <td className="text-center">
          {this.props.Data.info}
        </td>
        <td className="text-center">
          {(this.props.operatingSystem === "ios") ? this.props.Data.priceIos :(this.props.operatingSystem === "android"? this.props.Data.priceAndroid: this.props.Data.priceCross)}
        </td>
        <td className="text-center">
          <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} label dataOn={'\u2713'} dataOff={'\u2715'} checked={this.state.isCheck} onChange={this.handleChangeSwitch.bind(this)} />
        </td>
      </tr>
    );
  }
}

export default SingleInfo;