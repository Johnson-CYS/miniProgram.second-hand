Page({
  data: {
    hasUserInfo: false,
    userInfo: {},
  },

  // 获取用户信息和openid
  getUserInfo: function(e) {
    var that = this
    // 获取用户信息
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  }
})