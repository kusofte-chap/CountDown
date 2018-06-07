const fnTimeCountDown = function (start,end,scallback) {
    let f = {
      start,
      zero: function (num) {
        let n = parseInt(num, 10)
        if (n > 0) {
          if (n <= 9) {
            n = '0' + n
          }
          return String(n)
        } else {
          return '00'
        }
      },
      next: function(){
        let now = new Date(f.start*1000)
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()
  
        //获取下一场的开始时间
        if (month ===6) {
          return Date.UTC(year, month, add(day,30),19,0,0)
        }
  
        if(month===7 || month===8) {
          return Date.UTC(year, month, add(day,31),19,0,0)
        }
  
        function add (d,line) {
          if (d >=line) {
            return 1
          }else {
            return d + 1
          }
        }
      },
      countTime: function (end) {
        let d = end || Date.UTC(2018, 6, 2, 16, 30, 40)
        let future = new Date(d)
        f.start += 1
        let now  = new Date(f.start*1000)
        let dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60
  
        let sec = 0
        let mini = 0
        let hour = 0
        let day = 0
        let month = 0
        let year = 0
  
        if (dur > 0) {
          sec = dur % 60
          mini = Math.floor((dur / 60)) > 0 ? (Math.floor((dur / 60)) % 60) : 0
          hour = Math.floor((dur / 3600)) > 0 ? (Math.floor((dur / 3600)) % 24) : 0
          day = Math.floor((dur / 86400)) > 0 ? (Math.floor((dur / 86400)) % 30) : 0
          month = Math.floor((dur / 2629744)) > 0 ? (Math.floor((dur / 2629744)) % 12) : 0
          year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : 0
        }
  
        return {
          end: (sec + mini + hour + day + month + year) === 0,
          date: day>0?`${f.zero(day)} ${f.zero(hour)}:${f.zero(mini)}:${f.zero(sec)}`: `${f.zero(hour)}:${f.zero(mini)}:${f.zero(sec)}`
        }
      },
      init: function (t) {
        f.timeID = setInterval(function(){
          let timeObj = f.countTime(t)
          if(timeObj.end) {
            clearInterval(f.timeID)
            if(callback && typeof callback==='function') {
              callback()
            }
            f.init(f.next())
          }
        },1000)
      }
    }
    f.init(t)
  }
  
  fnTimeCountDown()