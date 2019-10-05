// pages/collection/collection.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    uniqueID: "",
  },

  // 商品列表数据获取
  commidtyListShow: function(e) {
    var that = this
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://pm-notes.cn/salesListAPI.php',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
      fail: function(res) {
        console.log(res.data)
      }
    })
    // console.log(that.data.commidtyListInfo)
  },

  // 修改功能（过复杂，改为wxml设置navigator）
  // commodityUpdate: function(e) {
  //   console.log(e)
  //   var pre = e.currentTarget.dataset
  //   wx.navigateTo({
  //     url: '../update/update?name'+pre.name,
  //     success: function(res) {},
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // },
  // 删除功能
  commodityDelete: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.uniqueid)
    var uniqueID = e.currentTarget.dataset.uniqueid
    wx.request({
      url: 'https://pm-notes.cn/request_sales_cancel.php',
      data: {
        openid: app.globalData.openid,
        uniqueID: uniqueID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.commidtyListShow()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.navigateTo({
      url: '../sales/sales',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取商品信息列表
    this.commidtyListShow()

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
    this.commidtyListShow()

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
    this.commidtyListShow()
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