import React, { Component } from 'react';
import {connect} from 'react-redux'
import { AppSwitch } from '@coreui/react'
import {addPrice,removePrice} from './../../actions/'

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
          {
            this.props.action(this.props.Data.priceIos);
            this.props.addPrice(this.props.Data.id,this.props.Data.priceIos,this.props.Data.name,this.props.operatingSystem)
          }
        else if (this.props.operatingSystem === "android")
          {
            this.props.action(this.props.Data.priceAndroid);
            this.props.addPrice(this.props.Data.id,this.props.Data.priceAndroid,this.props.Data.name,this.props.operatingSystem)
          }
        else
        {
          this.props.action(this.props.Data.priceCross);
          this.props.addPrice(this.props.Data.id,this.props.Data.priceCross,this.props.Data.name,this.props.operatingSystem)
        }
      }
      else {
        if (this.props.operatingSystem === "ios")
          {
            this.props.action(parseInt(this.props.Data.priceIos) * -1);
            this.props.removePrice(this.props.Data.id)
          }
        else if (this.props.operatingSystem === "android")
         
        { this.props.action(parseInt(this.props.Data.priceAndroid) * -1);
          this.props.removePrice(this.props.Data.id)
        }
          else
          {
            this.props.action(parseInt(this.props.Data.priceCross) * -1);
            this.props.removePrice(this.props.Data.id)
          }
      }
      // console.log(this.state.isCheck, prevState);
    }
    else {
      // console.log("don't care !");

    }

  }

  render() {
    const price = (this.props.operatingSystem === "ios") ? this.props.Data.priceIos :(this.props.operatingSystem === "android"? this.props.Data.priceAndroid: this.props.Data.priceCross);
    return (
      <tr style={{ cursor: "pointer" }} >
        <td>
          {this.props.Data.name}
        </td>
        <td className="text-center">
          {this.props.Data.info} روز
        </td>
        <td className="text-center">
          {price.toLocaleString()}
        </td>
        <td className="text-center">
          <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} label dataOn={'\u2713'} dataOff={'\u2715'} checked={this.state.isCheck} onChange={this.handleChangeSwitch.bind(this)} />
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  prices : state.price
})

const mapDispatchToProps = dispatch => ({
  addPrice: (id,price,name,platform) => dispatch(addPrice(id,price,name,platform)),
  removePrice: id => dispatch(removePrice(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(SingleInfo);