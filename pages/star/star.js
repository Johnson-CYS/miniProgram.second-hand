// pages/collection/collection.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
  },

  // 商品列表数据获取
  commidtyListShow: function (e) {
    var that = this
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://pm-notes.cn/starListAPI.php',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
    // console.log(that.data.commidtyListInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.commidtyListShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.commidtyListShow()
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