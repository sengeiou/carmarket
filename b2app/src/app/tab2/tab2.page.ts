import { Component, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [EnterpriseApi, OrderApi]
})
export class Tab2Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute, enterpriseApi,orderApi);
    this.headerscroptshow = 480;
    this.currentpage = "tab2";

    // AppBase.TABName = "tab1";
    // AppBase.LASTTAB = this;
  }
  classifylist = [];
  list = [];
  list2 = [];
  ignore = null;

  length = null;

  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = null;
  setData = null;

  isquote = true;
  isshow = true

  distinctlist = null;

  enterprise_id = '';
  enterprise_id_name = '';
  employee_id = '';
  employee_id_name = '';
  onMyLoad() {
      this.params;
      
  }
  onMyShow() {
    console.log('kkkk')
    console.log(this.aa,'aaaaaaaaaaaaa')
    AppBase.TABName = "tab2";
    AppBase.LASTTAB = this;

    var a = this.orderApi;
    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
      console.log(employeeinfo)
      this.enterprise_id = employeeinfo.enterprise_id
      this.employee_id = employeeinfo.id
      this.employee_id_name = employeeinfo.name
      this.enterprise_id_name = employeeinfo.enterprise.name
      if(this.aa==1){
        this.quoteHandle();
      }else {
        this.change(this.aa)
      }
     

      a.distinctlist({}).then((distinctlist: any) => {
        console.log(distinctlist, "33333")
        this.distinctlist = distinctlist.filter((item) => {
          item.chodis = 'N';
          return item
        })
      })


      //   setInterval(() => {
      //     if(this.aa==1){
      //       this.quoteHandle();
      //     }

      //     console.log(11122334455)
      // }, 10*1000);
    })
  }


  aa = 1;
  change(e) {
    this.aa = e;
    if (e == 1) {
      this.quoteHandle();
    } else if (e == 2) {
      this.quotedPrice();
    } else if (e == 3) {
      this.neglected();
    } else if (e == 4) {
      this.expired();
    } else if (e == 5) {
      this.allQuote()
    }
  }
  compare(pro) {
    return function (a, b) {
      return b[pro] - a[pro]
    }
  }

  notinignore4(item, arr) {
    for (let yiitem of arr) {
      if (yiitem.quote_id == item.id) {
        if (yiitem.quotecompan_id == this.enterprise_id && yiitem.quoteper == this.employee_id) {
          return false
        }
      }
    }
    return true;
  }

  notinignore(item, ignore) {
    for (let igitem of ignore) {
      if (item.id == igitem.quote_id) {
        return false;
      }
    }
    return true;
  }

  notinignore2(item, ignore) {
    for (let igitem of ignore) {
      if (item.quote_id == igitem.quote_id) {
        return false;
      }
    }
    return true;
  }


  distinct = []
  choquan = 'Y';
  choose(dis) {
    console.log(dis);
    if (dis == '全部') {
      this.distinct = []

      if (this.choquan == 'Y') {
        this.choquan = 'N';
      } else {
        this.choquan = 'Y';
        this.distinct.push('全部')
      }
      if (this.choquan == 'Y') {
        for (var i = 0; i < this.distinctlist.length; i++) {
          // if(this.distinctlist[i].chodis=='Y'){
          this.distinctlist[i].chodis = 'N';
          // }
        }
      }


    } else {
      for (let i = 0; i < this.distinct.length; i++) {
        if (this.distinct[i] == "全部") {
          this.distinct.splice(i, 1)
        }
      }

      if (this.choquan == 'Y') {
        this.choquan = 'N'
      } else {
        this.choquan = 'N'
      }
      console.log('ooooo')
      console.log(this.choquan, 'ooooo')

      // dis.chodis=='Y'?'N':'Y';

      for (var j = 0; j < this.distinctlist.length; j++) {
        if (this.distinctlist[j].id == dis.id) {
          if (dis.chodis == 'Y') {
            this.distinctlist[j].chodis = 'N';

            for (let k = 0; k < this.distinct.length; k++) {
              if (this.distinct[k] == dis.name) {
                this.distinct.splice(k, 1)
              }
            }

          } else {
            this.distinctlist[j].chodis = 'Y';
            this.distinct.push(dis.name);
          }
        }

      }
      console.log(dis.chodis, 'ooooo')
      console.log(this.distinctlist, 'ooooo')
      // for(var i=0;i<this.distinctlist.length;i++){
      //   if(this.distinctlist[i].id==dis.id){
      //     this.distinctlist[i].chodis=='Y'?'N':'Y';
      //   }
      // }
    }
    console.log(this.distinct, 'dizhi')


  }

  hasClass(obj, cls) {
    var cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) {
      return false;//当cls没有参数时,返回false;
    } else {
      return new RegExp(' ' + cls + '').test(' ' + obj.className);
    }
  }

  reset() {
    this.distinct = []
    // console.log(e)
    // var others = e.target.parentElement.parentElement.parentElement.parentElement.childNodes[1].childNodes
    // console.log(others)
    // if (this.hasClass(others[1], 'disname-active')) {

    // } else {
    //   others[1].classList.add('disname-active')
    // }

    // others[0].classList.remove('disname-active')
    // for (let i = 2; i < others.length; i++) {
    //   if (this.hasClass(others[i], 'disname-active')) {
    //     others[i].classList.remove('disname-active')
    //   }
    // }
    this.choquan='Y';
    for(var i=0;i<this.distinctlist.length;i++){
      this.distinctlist[i].chodis='N';
    }
    this.distinct = ['全部']
  }
  disshow = false;
  screening() {
    this.disshow = true;
    console.log(this.yishou, 'lll')
    if (this.yishou == true) {
      for (var i = 0; i < this.distinct.length; i++) {
        this.choose(this.distinct[i]);
      }

    }
  }
  disscree() {

    console.log(this.yishou, 'ppp')
    if (this.yishou == false) {
      this.choquan = 'Y';

      for (var j = 0; j < this.distinctlist.length; j++) {

        for (let k = 0; k < this.distinct.length; k++) {
          if (this.distinct[k] == this.distinctlist[j].name) {
            this.distinctlist[j].chodis = 'N';
            this.distinct.splice(k, 1)
          }
        }

      }
    }
    console.log(this.distinct)
    this.disshow = false;
  }
  yishou = false;
  save() {
    this.pageList = [];
    this.disshow = false;
    console.log(this.distinct)
    console.log(this.list, '555555');
    this.yishou = true;
    let temp = []
    for (let i = 0; i < this.templist.length; i++) {
      for (let j = 0; j < this.distinct.length; j++) {

        if (this.distinct[j] == "全部") {

          temp.push(this.templist[i])

        } else {

          // if (this.hasClass(this.distinct[j], 'disname-active')) {
            // console.log(this.distinct[j].innerText)

            if (this.templist[i].enterprise_corporate_address.indexOf(this.distinct[j]) != -1) {
              // console.log(this.distinct[j])
              temp.push(this.templist[i])
              console.log('kkkkk')

            } else {
              console.log(false)
            }

          // }



        }

      }
    }

    console.log(temp, '6666')

    this.length = temp.length;
    this.list = temp;

    // this.pagination(temp, this.length)
    console.log(temp)

  }


  photoshow = false
  imgs = []
  showPhoto(item) {
    console.log(item)
    this.imgs = []
    this.photoshow = true
    console.log(item)

    this.imgs.push(item)
    var arr = []
    this.imgs = this.imgs.filter((item, index) => {

      console.log(item.photo1, 'lllll')
      if (item.photo1.indexOf(',') > -1) {
        arr = item.photo1.split(',')
      } else {
        arr.push(item.photo1)
      }

      console.log(arr, '急急急')

      item.arr = arr

      if (item.frontofcar == "" && item.namesplate != "") {
        item.frontofcar = item.namesplate
        item.namesplate = ""
      }
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar != "") {
        item.frontofcar = item.rearofcar
        item.rearofcar = ""
      }
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar == "" && item.photo1 != "") {

        item.frontofcar = item.photo1
        item.photo1 = ""
      }

      return item
    })
    // var iamg =  this.imgs.concat(arr)
    console.log(this.imgs, 'llll')

  }




  ignoreHandle(item) {
    this.list = [];
    console.log(item, '已忽略')
    this.pageList = [];
    // item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.quoteemployee_id = this.employee_id
    item.quoteenterprise_id = this.enterprise_id
    console.log(item)
    this.orderApi.editisread({ quote_id: item.quote_id, enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.orderApi.addignore(item).then((searchignore: any) => {

          if (searchignore.code == "0") {

            this.onMyShow()


          }
        })
      }
    })



  }



  daibaolen = 0;
  yibaolen = 0;
  yihulen = 0;
  yishilen = 0;
  alllen = 0;
  templist = [];
  // 待报价
  quoteHandle() {
    this.list = [];
    this.pageList = [];
    this.isquote = true;
    this.isshow = false
    // this.daibaolen=0;
    // this.yibaolen=0;
    // this.yihulen=0;
    // this.yishilen=0;
    // this.alllen=0;
    this.exp = true;
    // let current = e.target
    // current.classList.add('btn-active')
    // let others = e.target.parentElement.childNodes

    // for (let i = 0; i < others.length; i++) {
    //   if (others[i] != current) {
    //     others[i].classList.remove('btn-active')
    //   }
    // }
    var a = this.orderApi;
    a.quotelist({}).then((list: any) => {

      console.log(list, 'list')

      a.ignore({ quoteenterprise_id: this.enterprise_id, quoteemployee_id: this.employee_id }).then((ignore: any) => {
        // this.ignore = ignore
        this.yihulen = ignore.length;
        console.log(ignore, 'ignore')
        console.log(ignore.length, 'ignore.length')

        if (ignore.length == 0) {
          a.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((yiquotelist: any) => {
            console.log(yiquotelist, 'yiquotelist')
            console.log(yiquotelist.length, 'yiquotelist.length')

            if (yiquotelist.length == 0) {

              a.quotationlist({ quotecompan_id: this.enterprise_id, quoteper: this.employee_id }).then((list: any) => {
                console.log(list, 'lsit')
                list = list.filter(item => {
                  return item.quote_id != '';
                })
                for (let item of list) {
                  if (item.quotestatus == 'Q') {

                    item.photoLen = 0
                    console.log(item)

                    if (item.frontofcar != '' && item.frontofcar != "undefined") {
                      item.photoLen++
                    }
                    if (item.namesplate != '' && item.namesplate != "undefined") {
                      item.photoLen++
                    }
                    if (item.rearofcar != '' && item.rearofcar != "undefined") {
                      item.photoLen++
                    }
                    if (item.photo1 != '' && item.photo1 != "undefined") {
                      var arr = item.photo1.split(/[, ，]/)
                      item.photoLen += arr.length
                    }
                    // if (item.photo2 != ''&& item.photo2!="undefined") {
                    //   item.photoLen++
                    // }
                    this.list.push(item)
                  }
                }
                this.list = this.list.sort(this.compare("quote_time_timespan"))

                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].index = i
                }
                this.daibaolen = this.list.length;
                this.alllen = this.daibaolen + this.yibaolen + this.yihulen + this.yishilen;
                this.length = this.list.length;
                this.templist = this.list;
                // this.pagination(this.list, this.length);
                console.log(this.list)

              })
            } else {
              var yibao = [];
              var shi = [];
              yiquotelist.filter(item => {
                if (item.invalid == '是') {
                  // this.yishilen ++ ;
                  shi.push(item);
                } else if (item.invalid == '否') {
                  // this.yibaolen ++;
                  yibao.push(item);
                }
              })
              this.yibaolen = yibao.length;
              this.yishilen = shi.length
              // this.yibaolen = yiquotelist.length;
              a.quotationlist({ quotecompan_id: this.enterprise_id, quoteper: this.employee_id }).then((list: any) => {
                console.log(list, 'bbb')
                list = list.filter(item => {
                  return item.quote_id != ''
                })
                var result = [];
                for (let item of list) {
                  if (item.quotestatus === 'Q') {
                    if (this.notinignore2(item, yiquotelist)) {

                      item.photoLen = 0
                      if (item.frontofcar != '' && item.frontofcar != "undefined") {
                        item.photoLen++
                      }
                      if (item.namesplate != '' && item.namesplate != "undefined") {
                        item.photoLen++
                      }
                      if (item.rearofcar != '' && item.rearofcar != "undefined") {
                        item.photoLen++
                      }
                      if (item.photo1 != '' && item.photo1 != "undefined") {
                        var arr = item.photo1.split(',')
                        item.photoLen += arr.length
                      }
                      // if (item.photo2 != '' && item.photo2 !="undefined") {
                      //   item.photoLen++
                      // }

                      result.push(item);
                    }
                  }

                }

                this.list = result.sort(this.compare("quote_time_timespan"));
                this.daibaolen = this.list.length
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].index = i
                }
                this.templist = this.list;
                this.alllen = this.daibaolen + this.yibaolen + this.yihulen + this.yishilen;
                this.length = this.list.length;
                // this.pagination(this.list, this.length);

              });
            }

          })

        } else {

          a.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((yiquotelist: any) => {
            console.log(yiquotelist, 'yyyyy')
            // this.yibaolen = yiquotelist.length;
            if (yiquotelist.length == 0) {

              a.quotationlist({ quotecompan_id: this.enterprise_id, quoteper: this.employee_id }).then((list: any) => {
                console.log(list, 'list')
                list = list.filter(item => {
                  return item.quote_id != ''
                })
                var result = [];
                for (let item of list) {
                  if (item.quotestatus == 'Q') {

                    if (this.notinignore2(item, ignore)) {
                      item.photoLen = 0
                      console.log(item)

                      if (item.frontofcar != '' && item.frontofcar != "undefined") {
                        item.photoLen++
                      }
                      if (item.namesplate != '' && item.namesplate != "undefined") {
                        item.photoLen++
                      }
                      if (item.rearofcar != '' && item.rearofcar != "undefined") {
                        item.photoLen++
                      }
                      if (item.photo1 != '' && item.photo1 != "undefined") {
                        var arr = item.photo1.split(/[, ，]/)
                        item.photoLen += arr.length
                      }
                      // if (item.photo2 != '' && item.photo2 !="undefined") {
                      //   item.photoLen++
                      // }
                      result.push(item);

                    }


                    // this.list.push(item)

                  }
                }
                this.list = result.sort(this.compare("quote_time_timespan"));
                this.daibaolen = this.list.length;
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].index = i
                }
                this.templist = this.list;
                this.alllen = this.daibaolen + this.yibaolen + this.yihulen + this.yishilen;
                this.length = this.list.length;
                // this.pagination(this.list, this.length);
                console.log(this.list)

              })
            } else {
              var shi = [];
              var yibao = [];
              yiquotelist.filter(item => {
                if (item.invalid == '是') {
                  // this.yishilen ++ ;
                  shi.push(item);
                } else if (item.invalid == '否') {
                  // this.yibaolen ++;
                  yibao.push(item);
                }
              })
              this.yibaolen = yibao.length;
              this.yishilen = shi.length
              a.quotationlist({ quotecompan_id: this.enterprise_id, quoteper: this.employee_id }).then((list: any) => {
                console.log(list, 'list')
                list = list.filter(item => {
                  return item.quote_id != ''
                })
                var result = [];
                for (let item of list) {
                  if (item.quotestatus === 'Q') {
                    item.photoLen = 0

                    if (item.frontofcar != '' && item.frontofcar != "undefined") {
                      item.photoLen++
                    }
                    if (item.namesplate != '' && item.namesplate != "undefined") {
                      item.photoLen++
                    }
                    if (item.rearofcar != '' && item.rearofcar != "undefined") {
                      item.photoLen++
                    }
                    if (item.photo1 != '' && item.photo1 != "undefined") {
                      var arr = item.photo1.split(/[, ，]/)
                      item.photoLen += arr.length
                    }
                    // if (item.photo2 != '' && item.photo2 !="undefined") {
                    //   item.photoLen++
                    // }

                    console.log('尽快发货方')
                    console.log(this.notinignore2(item, yiquotelist), 'jjjjdddddd')
                    if (this.notinignore2(item, yiquotelist)) {
                      console.log('斤斤计较')
                      if (this.notinignore2(item, ignore)) {
                        console.log('jjjjj')
                        result.push(item);
                      }
                    }

                  }

                }
                console.log(result, 'kkkkk')

                this.list = result.sort(this.compare("quote_time_timespan"));
                this.daibaolen = this.list.length;
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].index = i
                }
                this.templist = this.list;
                this.alllen = this.daibaolen + this.yibaolen + this.yihulen + this.yishilen;
                this.length = this.list.length;
                // this.pagination(this.list, this.length);

              });
            }

          })

        }

      })



    })




  }



  // 已忽略
  neglected() {
    this.list = [];
    this.pageList = [];
    this.isshow = false
    this.isquote = false;
    this.exp = true;
    // let current = e.target
    // current.classList.add('btn-active')
    // let others = e.target.parentElement.childNodes

    // for (let i = 0; i < others.length; i++) {
    //   if (others[i] != current) {
    //     others[i].classList.remove('btn-active')
    //   }
    // }

    this.orderApi.ignore({ quoteenterprise_id: this.enterprise_id, quoteemployee_id: this.employee_id }).then((ignore: any) => {
      this.list = ignore;
      this.length = ignore.length;


      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }
      this.list = this.list.sort(this.compare("quote_time_timespan"));
      // this.pagination(this.list, this.length);

    })

  }

  exp = true
  // 已过期
  expired() {

    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false
    this.exp = false;
    // let current = e.target
    // current.classList.add('btn-active')
    // let others = e.target.parentElement.childNodes

    // for (let i = 0; i < others.length; i++) {
    //   if (others[i] != current) {
    //     others[i].classList.remove('btn-active')
    //   }
    // }



    this.orderApi.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((list: any) => {

      for (let i = 0; i < list.length; i++) {

        if (list[i].quotestatus == 'E' || list[i].invalid == '是') {
          this.list.push(list[i])
        }
      }

      for (let i = 0; i < this.list.length; i++) {

        this.list[i].index = i

      }

      console.log(this.list, '888')
      this.length = this.list.length;
      this.list = this.list.sort(this.compare("quote_time_timespan"));
      // this.pagination(this.list, this.length);
    });


  }

  // 已报价
  quotedPrice() {
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false
    this.exp = true;
    // let current = e.target
    // current.classList.add('btn-active')
    // let others = e.target.parentElement.childNodes

    // for (let i = 0; i < others.length; i++) {
    //   if (others[i] != current) {
    //     others[i].classList.remove('btn-active')
    //   }
    // }


    this.orderApi.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((list: any) => {
      console.log(list, 'pppp')

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();

      let nowtime = year + '-' + month + '-' + day + " " + hh + ":" + mm
      console.log(nowtime, '5555')
      let shijian = date.getTime()
      console.log(shijian)
      for (let i = 0; i < list.length; i++) {
        if (list[i].invalid == '否' || list[i].quotestatus == 'C') {
          console.log(list[i], '哈哈哈')
          let newDate = new Date(list[i].expired_time)
          list[i].times = newDate.getTime()
          if (list[i].times < shijian && list[i].quotestatus == "W") {
            console.log('西喜爱', list[i].times)
            this.orderApi.editquotestatus({ quoteenterprise_id: this.enterprise_id, quotestatus: 'E', quote_id: list[i].quote_id }).then((editquotestatus: any) => {
              console.log(editquotestatus)
              if (editquotestatus) {

              }
            })

          }
          if (list[i].quotestatus == "W" || list[i].quotestatus == "C") {
            console.log('哈哈哈')
            this.list.push(list[i])
          }
        }
        //break;

      }

      for (let i = 0; i < this.list.length; i++) {
        this.list[i].index = i
      }

      this.length = this.list.length;
      this.list = this.list.sort(this.compare("quote_time_timespan"));
      // this.pagination(this.list, this.length);
    });

  }

  // 全部
  allQuote() {
    console.log(event)
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = true;
    this.exp = true;
    // let current = e.target;
    // current.classList.add('btn-active')
    // let others = e.target.parentElement.childNodes

    // for (let i = 0; i < others.length; i++) {
    //   if (others[i] != current) {
    //     others[i].classList.remove('btn-active')
    //   }
    // }

    var a = this.orderApi


    a.yiquotelist({ quoteenterprise_id: this.enterprise_id }).then((yiquotelist: any) => {
      console.log(yiquotelist, 'yiquotelist')
      // let yiquotelists = yiquotelist
      if (yiquotelist.length == 0) {
        let result = []
        a.quotationlist({ quotecompan_id: this.enterprise_id, quoteper: this.employee_id }).then((quotelist: any) => {
          quotelist = quotelist.filter(item => {
            return item.quote_id != ''
          })
          console.log(quotelist)
          // for(let item of quotelist){
          //   if(item.quotestatus=='Q'){
          //     result.push(item)
          //   }
          // }
          a.ignore({ quoteenterprise_id: this.enterprise_id, quoteemployee_id: this.employee_id }).then((ignore: any) => {
            console.log(ignore)
            if (ignore.length == 0) {
              for (let item of quotelist) {
                if (item.quotestatus == 'Q') {
                  result.push(item);
                }
              }

            } else {
              result = ignore;
              for (let item of quotelist) {
                if (item.quotestatus == 'Q') {
                  if(this.notinignore2(item,result)){

                    result.push(item);
                  }

                }

              }
            }
            this.list = result
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].index = i
            }
            this.length = this.list.length;
            this.list = this.list.sort(this.compare("quote_time_timespan"));
            // this.pagination(this.list,this.length)
          })

        })
      } else {
        let result = [];
        result = yiquotelist;
        a.quotationlist({ quoteenterprise_id: this.enterprise_id, quoteper: this.employee_id, }).then((quotelist: any) => {
          quotelist = quotelist.filter(item => {
            return item.quote_id != ''
          })
          console.log(quotelist, 'quotelsit')
          quotelist.filter(item => {
            item.quote_id > 0
          })

          a.ignore({ quoteenterprise_id: this.enterprise_id, quoteemployee_id: this.employee_id }).then((ignore: any) => {
            // this.ignore = ignore

            console.log(ignore, 'ignore')
            console.log(ignore.length, 'ignore.length')
            if (ignore.length == 0) {
              for (let item of quotelist) {
                if (item.quotestatus == 'Q') {
                  result.push(item);
                }
              }

            } else {
              for (let iignore of ignore) {
                result.push(iignore)
              }
              for (let item of quotelist) {
                if (item.quotestatus == 'Q') {
                  if(this.notinignore2(item,result))
                  result.push(item)
                  // result.push(this.panduan(item, ignore));
                  }

                }
              }
            

            this.list = result
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].index = i
            }
            console.log(this.list, 'list')
            this.length = this.list.length;
            this.list = this.list.sort(this.compare("quote_time_timespan"));
            // this.pagination(this.list,this.length)

          })



        })
      }

    })


  }

  panduan(item, yiquote) {
    for (let yiitem of yiquote) {
      if (item.quote_id == yiitem.quote_id) {
        console.log('1111')
        return yiitem
      } else {
        console.log('222')
        return item
      }
    }

  }



  tiaozhuan(itemId, quote_id) {
    this.orderApi.editisread({ quote_id: quote_id, enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['quotation-detail'], {
          queryParams: {
            id: itemId,
            quote_id: quote_id,
            employee_id: this.employee_id,
            employee_id_name: this.employee_id_name,
            enterprise_id_name: this.enterprise_id_name
          }
        })
      }
    })

  }

  tiaozhuan2(itemId) {
    this.orderApi.editisread({ quote_id: itemId, enterprise_id: this.enterprise_id, employee_id: this.employee_id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.router.navigate(['yibaojia'], {
          queryParams: {
            quote_id: itemId,

          }
        })
      }
    })

  }

  pagination(list, length) {
    this.pageSize = 10;
    // if()
    this.pages = Math.ceil(length / this.pageSize)
    this.newPage = this.pages > 10 ? 10 : this.pages;
    this.selPage = 1;

    this.setData = function () {
      this.data = list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
    }
    this.data = list.slice(0, this.pageSize);


    for (var i = 0; i < this.newPage; i++) {
      this.pageList.push(i + 1);
    }

  }

  selectPage(page) {
    if (page < 1 || page > this.pages) return;

    if (page > 2) {
      var newpageList = [];
      for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
        newpageList.push(i + 1);
      }
      this.pageList = newpageList;
    }
    this.selPage = page;
    this.setData();
    this.isActivePage(page);
  }

  isActivePage(page) {
    return this.selPage == page;
  }


  Previous() {
    this.selectPage(this.selPage - 1);
  }

  Next() {
    this.selectPage(this.selPage + 1);
  }

  fristPage() {
    this.selectPage(this.selPage = 1)
  }

  lastPage() {
    this.selectPage(this.selPage = this.pages)
  }

}






