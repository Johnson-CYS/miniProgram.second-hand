//app.js
App({
  globalData: {
    tempFilePaths: null,
    openid: "",
  },
  onLaunch: function() {
    var that = this
    // 登陆授权弹窗
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
          wx.openSetting({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else { // 没有弹出过授权弹窗
          wx.getUserInfo({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
              wx.openSetting({
                success: res => {
                  console.log(res)
                },
                fail: res => {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })

  // 获取openid
  wx.login({
    success: function(res) {
      if (res.code) {
        console.log(res.code)
        //发起网络请求
        wx.request({
          url: 'https://pm-notes.cn/request_id.php',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: {
            code: res.code
          },
          success: function(res) {
            // 1.创建openid全局变量
            // 1.1通过JSON.parse()将字符串json化
            console.log(JSON.parse(res.data).openid)
            var openid = JSON.parse(res.data).openid
            // 1.2通过that.globalData.openid赋值
            that.globalData.openid = openid
            console.log(that.globalData.openid)

            // 2.将openid传入数据库，创建user身份
            wx.request({
              url: 'https://pm-notes.cn/request_openid.php',
              data: {
                openid: that.globalData.openid
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
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}
})