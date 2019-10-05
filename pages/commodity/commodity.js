// pages/commodity/commodity.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [],
    name: "",
    price: "",
    type: "",
    publisherName: "unkown",
    detail: "unkown",
    publisherContact: "",
    starBool: false,
    starImg: ["../../icons/star-selected.png", "../../icons/star-unselected.png"],
    imgHeight: "",
    uniqueID: "",
  },

  //获取图片高度
  imgHeight: function(e) {
    var that = this
    const query = wx.createSelectorQuery();
    query.select('.imgList').boundingClientRect(function(res) {
      console.log(res);
      that.setData({
        imgHeight: res.height,
      })
    }).exec();
  },

  // 收藏
  star: function(e) {
    var that = this
    if (that.data.starBool === false) {
      // 设定数据
      that.setData({
        starBool: true,
      })
      // 浮现弹窗
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
      })
      // 发送插入star信息
      wx.request({
        url: 'https://pm-notes.cn/request_star_insert.php',
        data: {
          openid: app.globalData.openid,
          uniqueID: that.data.uniqueID
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (that.data.starBool === true) {
      that.setData({
        starBool: false,
      })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 1500,
      })
      // 发送取消star信息
      wx.request({
        url: 'https://pm-notes.cn/request_star_cancel.php',
        data: {
          openid: app.globalData.openid,
          uniqueID: that.data.uniqueID
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  // 复制联系方式
  copy: function() {
    var that = this;
    wx.setClipboardData({
      data: that.data.publisherContact,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500,
        })
        console.log(that.data.publisherContact)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
        detail: options.detail,
      })
    }
    if (options.publisherName !== "") {
      this.setData({
        publisherName: options.publisherName,
      })
    }
    this.setData({
      name: options.name,
      price: options.price,
      type: options.type,
      publisherContact: options.publisherContact,
      uniqueID: options.uniqueID,
    })
    // 是否star验证
    wx.request({
      url: 'https://pm-notes.cn/request_star_check.php',
      data: {
        openid: app.globalData.openid,
        uniqueID: that.data.uniqueID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        var starList = res.data.split(",")
        console.log(starList)
        for (var i in starList){
          console.log(starList[i])
          if (starList[i] == that.data.uniqueID){
            that.setData({
              starBool : true,
              })
          }
        }
        console.log(that.data.starBool) 
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})