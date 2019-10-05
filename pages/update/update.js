// pages/sales/sales.js
var app = getApp() //获取全局变量
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: ["学习用品", "电子产品", "运动用品", "生活用品", "美妆用品"],
    typeIndex: 0,
    free: false,
    photo: [],
    nameBool: true,
    nameValue: "",
    wrongNameStyle: "",
    typeValue: "学习用品",
    priceBool: true,
    priceValue: "",
    wrongPhoto: "",
    wrongPhotoStyle: "",
    detailValue: "",
    wrongDetail: "",
    publisherContactBool: true,
    publisherContactValue: "",
    wrongPublisherContactStyle: "",
    uniqueID: "",

  },

  // 表单数据绑定
  nameInput: function (e) {
    this.setData({
      nameValue: e.detail.value
    })
  },
  priceInput: function (e) {
    this.setData({
      priceValue: e.detail.value
    })
  },
  detailInput: function (e) {
    this.setData({
      detailValue: e.detail.value
    })
  },
  publisherNameInput: function (e) {
    this.setData({
      publisherNameValue: e.detail.value
    })
  },
  publisherContactInput: function (e) {
    this.setData({
      publisherContactValue: e.detail.value
    })
  },
  // 商品类别,单选下拉框数据传递，value是内置参数
  bindPickerChange: function (e) {
    console.log(e.detail)
    this.setData({
      typeIndex: e.detail.value
    })
    this.setData({
      typeValue: this.data.type[this.data.typeIndex],
    })
    console.log(this.data.typeValue)
  },

  // 是否free按钮，如果是则将priceValue设为free
  bindSwitchChange: function (e) {
    var that = this
    console.log(e.detail)
    if (e.detail.value == true) {
      this.setData({
        free: true,
        priceValue: "free"
      })
      console.log(that.data.priceValue)
    } else {
      this.setData({
        free: false,
        priceValue: ""
      })
    }
  },

  // 图片选择
  photoReserve: function (e) {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        app.globalData.tempFilePaths = tempFilePaths //局部变量全局化
        that.setData({
          photo: tempFilePaths,
        })
      },
    })
  },

  // 图片删除
  deleteImage: function (e) {
    var that = this;
    var images = that.data.photo;
    var index = e.currentTarget.id; //获取当前长按图片下标
    console.log(e.currentTarget);
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photo: images
        });
      }
    })
  },

  // 表单验证
  formCheck: function (e) {
    var that = this
    console.log(e.detail.value)
    if (that.data.nameValue == "") {
      that.setData({
        nameBool: false,
        wrongNameStyle: "border:5rpx solid #65dcd1"
      })
    } else {
      that.setData({
        nameBool: true,
        wrongNameStyle: ""
      })
      console.log(that.data.nameValue)
    }
    if (that.data.photo.length == 0) {
      that.setData({
        wrongPhoto: "请至少选择一张图片",
        wrongPhotoStyle: "border:5rpx solid #65dcd1"
      })
    } else {
      that.setData({
        wrongPhoto: "",
        wrongPhotoStyle: ""
      })
    }
    if (that.data.priceValue == "") {
      that.setData({
        priceBool: false,
        wrongPriceStyle: "border:5rpx solid #65dcd1"
      })
    } else {
      that.setData({
        priceBool: true,
        wrongPriceStyle: ""
      })
    }
    if (that.data.publisherContactValue == "") {
      that.setData({
        publisherContactBool: false,
        wrongPublisherContactStyle: "border:5rpx solid #65dcd1"
      })
    } else {
      that.setData({
        publisherContactBool: true,
        wrongPublisherContactStyle: ""
      })
    }
  },

  // 表单判断无误后提交
  formSubmit: function (e) {
    var that = this
    if (that.data.nameValue != "" && that.data.photo.length !== 0 && that.data.priceValue != "" && that.data.publisherContactValue != "") {
      // 提交文本信息
      wx.request({
        url: 'https://pm-notes.cn/request_update.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          nameValue: that.data.nameValue,
          typeValue: that.data.typeValue,
          priceValue: that.data.priceValue,
          detailValue: that.data.detailValue,
          publisherNameValue: that.data.publisherNameValue,
          publisherContactValue: that.data.publisherContactValue,
          uniqueID: that.data.uniqueID,
        },
        method: "POST",
        success: function (res) { //收到开发者服务成功返回的回调函数
          console.log("success")
          console.log(res.data)
          console.log(res.statusCode)
          that.setData({
            nameValue: "",
            priceValue: "",
            publisherNameValue: "",
            publisherContactValue: "",
          })
        },
        fail: function (res) { //接口调用失败的回调函数
          console.log("fail")
        },
        complete: function () { //接口调用结束的回调函数（调用成功、失败都会执行）
          console.log("complete")
        }
      })
      // 提交静态资源
      for (let i = 0; i < that.data.photo.length; i++) {
        wx.uploadFile({
          url: 'https://pm-notes.cn/request_update.php',
          filePath: app.globalData.tempFilePaths[i], //应用全局变量
          name: 'file',
          formData: {
            'user': 'test',
            uniqueID: that.data.uniqueID,
            index: i,
          },
          success: function (res) {
            const data = res.data
            console.log(data)
          },
          fail: function (res) {
            console.log(res.data)
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载，制作uniqueID
   */
  onLoad: function (options) {
    var that = this
    // 商品数据传入
    if (options.photo2 == "null" && options.photo3 == "null") {
      this.setData({
        photo: [options.photo1],
      })
    } else if (options.photo3 == "null") {
      this.setData({
        photo: [options.photo1, options.photo2],
      })
    } else {
      this.setData({
        photo: [options.photo1, options.photo2, options.photo3],
      })
    }
    if (options.detail !== "") {
      this.setData({
        detailValue: options.detail,
      })
    }
    if (options.publisherName !== "") {
      this.setData({
        publisherNameValue: options.publisherName,
      })
    }
    if (options.price =="free"){
      this.setData({
        free:true
      })
    }else{
      this.setData({
        priceValue:options.price
      })
    }
    this.setData({
      nameValue: options.name,
      typeValue: options.type,
      publisherContactValue: options.publisherContact,
      uniqueID: options.uniqueID,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})