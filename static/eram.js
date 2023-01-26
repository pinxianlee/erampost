const addBtn = document.querySelector(".addBtn")
const field = document.querySelector("#field") //用來確認按下刪除鈕用及增加資料在filed裡
const select = document.querySelector("#select")
const submit = document.querySelector("#submit")
const co = document.querySelector("#co")
const devno = document.querySelector("#devno")
const cb_changetime = document.querySelector("#change_time")
const cb_changepost = document.querySelector("#change_post")

//checkbox勾選時,value設為on,並顯示div內容
cb_changetime.addEventListener("click", (e) => {
    if (cb_changetime.value === "off") {
        cb_changetime.value = "on"
        const div_time = document.querySelectorAll(".div_time")
        div_time.forEach(e => {
            e.style.display = "block"
        });
        const now = new Date()
        const bdate = document.querySelector("#begindate")
        const edate = document.querySelector("#enddate")
        const btime = document.querySelector("#begintime")
        const etime = document.querySelector("#endtime")
        //利用Date()函數取得年月日及時間,轉換成string後放進list再用join函數取得所需字串
        nowdate = [now.getFullYear().toString(), (now.getMonth() + 1).toString().padStart(2, "0"), now.getDate().toString().padStart(2, "0")].join("-")
        nextdate = [now.getFullYear().toString(), (now.getMonth() + 1).toString().padStart(2, "0"), (now.getDate() + 1).toString().padStart(2, "0")].join("-")
        nowtime = [now.getHours().toString().padStart(2, "0"), now.getMinutes().toString().padStart(2, "0")].join(":")
        //限制日曆可點選日期,並預設起始日期時間為現在時間
        bdate.value = bdate.min = bdate.max = nowdate
        edate.value = edate.min = nowdate
        edate.max = nextdate
        btime.value = nowtime
    }
    else {
        cb_changetime.value = "off"
        const div_time = document.querySelectorAll(".div_time")
        div_time.forEach(e => {
            e.style.display = "none"
        });
    }
})

//checkbox勾選時,value設為on,並顯示span及textarea內容
cb_changepost.addEventListener("click", (e) => {
    if (cb_changepost.value === "off") {
        cb_changepost.value = "on"
        const span = document.querySelectorAll(".span")
        const div_textarea = document.querySelectorAll(".div_textarea")
        div_textarea.forEach(e => {
            e.style.display = "block"
        });
        span.forEach(e => {
            e.style.display = "block"
        });
    }
    else {
        cb_changepost.value = "off"
        const span = document.querySelectorAll(".span")
        const div_textarea = document.querySelectorAll(".div_textarea")
        div_textarea.forEach(e => {
            e.style.display = "none"
        });
        span.forEach(e => {
            e.style.display = "none"
            console.log("none")
        });
    }
})

//按下送出時,若無資料就不動作並顯示alert
submit.addEventListener("click", (e) => {
    const inputnums = document.querySelectorAll(".indata")
    const selectnums = document.querySelectorAll(".newselect")
    const ta = document.querySelectorAll(".textarea")
    const bdate = document.querySelector("#begindate")
    const edate = document.querySelector("#enddate")
    const btime = document.querySelector("#begintime")
    const etime = document.querySelector("#endtime")
    console.log(ta[0].value)
    console.log(ta[1].value)
    //無資料時,發出alert
    if (inputnums.length === 0) {
        alert("請至少新增一筆資料")
        e.preventDefault()
    }
    //回傳資料需將input及option欄位的disable設為false,不然submit不會帶資料回傳
    else {
        inputnums.forEach(e => {
            e.disabled = false
        })
        selectnums.forEach(e => {
            e.childNodes[1].disabled = false
        })
    }
    //當核選cb_changetime時,判斷完整日期時間及時間限制有無問題,有問題時顯示alert    
    if (cb_changetime.value === "on") {
        const now = new Date()
        if (bdate.value === "" || edate.value === "" || btime.value === "" || etime.value === "") {
            p = true
            alert("請填入完整日期及時間")
            e.preventDefault()
        }
        else {
            theresult = ((((Date.parse([edate.value, etime.value].join(" "))))) - (((Date.parse([bdate.value, btime.value].join(" ")))))) / 1000 / 3600
            if (theresult > 24) {
                alert("公告時間不超過24小時")
                e.preventDefault()
            }
            if (theresult < 0) {
                alert("結束時間要大於開始時間")
                e.preventDefault()
            }
        }
    }
    //若無核選cb_changetime時,將所有時間清除
    else {
        bdate.value = edate.value = btime.value = etime.value = ""
    }
    //有核選cb_changepost但資料為空時或無核選cb_changepost時,設定textarea為預設資料
    if (cb_changepost.value === "on") {
        ta.forEach(e => {
            if (ta[0].value === "") {
                ta[0].value = "設備障礙處理中"
            }
            if (ta[1].value === "") {
                ta[1].value = "障礙修復後,若無法使用請重開數據機"
            }
        })
    }
    else {
        ta[0].value = "設備障礙處理中"
        ta[1].value = "障礙修復後,若無法使用請重開數據機"
    }
})

//當在field裡按下刪除時,會將整列資料刪除
field.addEventListener("click", (e) => {
    // console.log(e.target.nodeName)            
    if (e.target.nodeName === "BUTTON") {
        e.target.parentNode.remove() //取得刪除鈕的父節點資料,刪除整個<div>       
    }
})

//增加新列
function createnewrow() {
    if (select.value === "1") {
        devtype = "GESW"
    }
    else if (select.value === "2") {
        devtype = "MSAN"
    }
    else if (select.value === "3") {
        devtype = "OLT"
    }
    const newrow =
        `<div>
        <label for="">地點<input type="input" name = "input1" class = indata value = ${co.value} disabled></label>                
        <select class="newselect" name = "useroption">                            
            <option value=${select.value} selected disabled>${devtype}</option>        
        </select>                
        <input type="input" name= "input2" class = indata value = ${devno.value} disabled><label for="">流水號</label>    
        <button type="button" class ="delBtn" onclick="">刪除</button>
    </div>
    <br>`
    //插入新欄位
    field.insertAdjacentHTML("afterbegin", newrow)
    //清空輸入欄位資料並設定欄位焦點
    co.value = ""
    devno.value = ""
    select.selectedIndex = "0"
    co.focus()
}

//按下新增鍵呼叫函數createnewrow增加新列
addBtn.addEventListener("click", () => {
    if ((co.value === "") || (devno.value === "")) {
        alert("請填入資料")
    }
    else {
        createnewrow()
    }
})
