// pages/obligations/obligations.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '待付款',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var sumprice = 0;
    var orderapi = new OrderApi();
    orderapi.detail({
      order_status: 'W',
      id: this.Base.options.id
    }, (detail) => {
      this.Base.setMyData({
        detail
      })
    })
  }

  bindbuy(e) {
    var that = this;
    var orderapi = new OrderApi();
    var price = e.currentTarget.id;
    var detail = this.Base.getMyData().detail;
    var enmoney = this.Base.getMyData().employeeinfo.enterprise.account_money;
    console.log(detail.totalamount,'price')
    wx.showModal({
      title: '购买',
      content: '确认购买？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          if (Number(detail.totalamount) > Number(enmoney)) {
            wx.showToast({
              title: '余额不足，请及时充值！',
              icon: 'none'
            })
            return;
          }

          orderapi.updatemoney({
            id: that.Base.getMyData().employeeinfo.enterprise.id,
            ent_id: detail.enterprise_id,
            money: detail.totalamount,
            em_id: detail.baojia,

          }, (updatemoney) => {

            orderapi.updatestatus({
              id: that.Base.options.id,
              order_status: "L",
              quote_id: detail.quote_id
            }, (updatestatus) => {

            })

            orderapi.editquotation({
              quotecompan_id: detail.enterprise_id,
              quote_id: detail.quote_id,
              quotestatus: 'W',
              quoteper: detail.baojia,
            }, (editquotation) => {

            })

           

            var list = {
              enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              employee_id: that.Base.getMyData().employeeinfo.id,
              amount: detail.totalamount,
              type: 'G',
              order_id: detail.id,
              enterprise_id2: detail.enterprise_id,
              employee_id2: detail.baojia,
              type2: 'S'
            }

            orderapi.addconsume(list, (addconsume) => {

              wx.navigateBack({ 

              })

            })
   
          })
        }
      }
    })





  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindbuy = content.bindbuy;
Page(body)