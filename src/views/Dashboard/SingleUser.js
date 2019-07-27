import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react'

class SingleUser extends Component {
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
      if (this.state.isCheck){
        if(this.props.operatingSystem === "ios")
          this.props.action(this.props.Data.priceIos);
        else
        this.props.action(this.props.Data.priceAndroid);
      }
      else{
        if(this.props.operatingSystem === "ios")
        this.props.action(parseInt(this.props.Data.priceIos) * -1);
        else
          this.props.action(parseInt(this.props.Data.priceAndroid) * -1);
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
          {(this.props.operatingSystem === "ios")?this.props.Data.priceIos:this.props.Data.priceAndroid}
        </td>
        <td className="text-center">
          <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} label dataOn={'\u2713'} dataOff={'\u2715'} Checked={this.state.isCheck} onChange={this.handleChangeSwitch.bind(this)} />
        </td>
      </tr>
    );
  }
}

export default SingleUser;