// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { AddressApi } from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var addressapi = new AddressApi();
    addressapi.addresslist({
      
    }, (add) => {
      this.Base.setMyData({
        add
      })
    })
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的地址',
    });
  }
  bindaddressadd() {
    wx.navigateTo({
      url: '/pages/addressadd/addressadd',
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindaddressadd = content.bindaddressadd;
Page(body)