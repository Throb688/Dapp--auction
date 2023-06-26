 function time12(time2,time1) {
    var beg = time1;
    //设置结束时间
    var end = time2;
    // var end = endDate.getTime(); // 结束秒数
    // var beg = begDate.getTime(); // 开始秒数
    function countTime() {
      //获取当前时间
      var date = new Date();
      // 当前时间秒数
      var now = date.getTime() / 1000;
      //时间差
      var leftTime = end - now; // 结束秒数 - 现在秒数
      var begTime = beg - now;  // 开始秒数 - 现在秒数
      //leftTime -1636806378464 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
      console.log("left",leftTime);
      //定义变量 d,h,m,s保存倒计时的时间
      var d, h, m, s;
      var timeTit = document.getElementById('timeTit'); // 时间前文档
      if(begTime>=0){ //  如果开始时间大于等于0 的时候 执行
        timeTit.innerHTML = '距离活动开始'
        d = Math.floor(begTime / 1000 / 60 / 60 / 24);
        h = Math.floor(begTime / 1000 / 60 / 60 % 24);
        m = Math.floor(begTime / 1000 / 60 % 60);
        s = Math.floor(begTime / 1000 % 60);

        document.getElementById("_d").innerHTML = d + "天";
        document.getElementById("_h").innerHTML = h + "时";
        document.getElementById("_m").innerHTML = m + "分";
        document.getElementById("_s").innerHTML = s + "秒";
      }else if (leftTime >= 0) { // 当结束时间大于等于0 的时候执行这里
        timeTit.innerHTML = '距离活动结束'
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        //将倒计时赋值到div中
        document.getElementById("_d").innerHTML = d + "天";
        document.getElementById("_h").innerHTML = h + "时";
        document.getElementById("_m").innerHTML = m + "分";
        document.getElementById("_s").innerHTML = s + "秒";
        //递归每秒调用countTime方法，显示动态时间效果

      } else {  // 结束的时候执行这里
        timeTit.innerHTML = '活动已经结束';
        document.getElementById("_d").innerHTML = 0 + "天";
        document.getElementById("_h").innerHTML = 0 + "时";
        document.getElementById("_m").innerHTML = 0 + "分";
        document.getElementById("_s").innerHTML = 0 + "秒";
        clearTimeout(countTime); //  结束的时候清除定时器
        return;  // 并停止这个函数
      }
      setTimeout(countTime, 1000); // 每一秒执行一次这个函数
    }
    countTime(); // 执行函数
}
    //设置开始时间
