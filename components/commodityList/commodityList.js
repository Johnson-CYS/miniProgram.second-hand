// commodityList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    commidtyListInfo:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.methods.commidtyListShow()

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      this.methods.commidtyListShow()
    },

  },
  
  


})