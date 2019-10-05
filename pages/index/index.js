// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImage: [
      "../../images/swiper1.jpg",
      "../../images/swiper2.jpg",
      "../../images/swiper3.jpg"
    ],
    typeImage: [{
        imgSrc: "../../icons/free.png",
        typeSearch: "freeSearch",
      },
      {
        imgSrc: "../../icons/sport.png",
        typeSearch: "sportSearch",
      },
      {
        imgSrc: "../../icons/makeup.png",
        typeSearch: "makeupSearch",
      },
      {
        imgSrc: "../../icons/digital.png",
        typeSearch: "digitalSearch",
      },
      {
        imgSrc: "../../icons/book.png",
        typeSearch: "studySearch",
      },
      {
        imgSrc: "../../icons/life.png",
        typeSearch: "lifeSearch",
      },
      {
        imgSrc: "../../icons/home.png",
        typeSearch: "homeSearch",
      },
    ],
    tapStyle:"",
    searchValue: "",
    typeSearchValue: "",
    commidtyListInfo: "",

  },

  //搜索功能
  searchInput: function(e) {
    var that = this
    that.setData({
      searchValue: e.detail.value,
    })
  },
  searchConfirm: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/request_search.php',
      data: {
        searchValue: that.data.searchValue
      },
      // 此header极其重要！！！
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
          searchValue: '',
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 类别筛选功能
  freeSearch: function(e) {
    var that = this
    wx.request({
      url: '',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: 'https://pm-notes.cn/request_type_search.php',
      method: 'POST',
      data: {
        typeSearchValue: "free",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
    })
  },
  sportSearch: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/request_type_search.php',
      method: 'POST',
      data: {
        typeSearchValue: "运动用品",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
    })
  },
  makeupSearch: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/request_type_search.php',
      method: 'POST',
      data: {
        typeSearchValue: "化妆用品",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
    })
  },
  digitalSearch: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/request_type_search.php',
      method: 'POST',
      data: {
        typeSearchValue: "电子产品",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
    })
  },
  studySearch: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/request_type_search.php',
      method: 'POST',
      data: {
        typeSearchValue: "学习用品",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
    })
  },
  lifeSearch: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/request_type_search.php',
      method: 'POST',
      data: {
        typeSearchValue: "生活用品",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
    })
  },
  homeSearch:function(e){
    this.commidtyListShow()
  },

  // 商品列表数据获取
  commidtyListShow: function(e) {
    var that = this
    wx.request({
      url: 'https://pm-notes.cn/commodityListAPI.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          commidtyListInfo: res.data,
        })
      },
      fail: function(res) {
        console.log(res.data)
      }
    })
    console.log(that.data.commidtyListInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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