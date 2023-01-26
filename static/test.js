const addBtn = document.querySelector(".addBtn")
const delBtn = document.querySelectorAll(".delBtn")
const field = document.querySelector("#field")
const indata  = document.querySelectorAll(".indata")
const select = document.querySelector(".select")
const submitbtn = document.querySelector("#submit")

//document.addEventListener("DOMContentLoaded", ()=>{
    
//})

//將欄位資料清空
indata.forEach(e => {
    e.value = ""
})

submitbtn.addEventListener("click", (e)=>{
    const spacenum = document.querySelectorAll(".indata")
    alarm = false
    spacenum.forEach(i =>{
        if (i.value === "" && spacenum.length <= 2){
            e.preventDefault()
            alarm = true            
        }        
    })
        if (alarm === true){
            alert("請填入資料")
            alarm = false
        }
})

//監聽<fieldset>裡判斷當按下刪除按鈕會刪除整列
field.addEventListener("click", (e)=>{
    // console.log(e.target.nodeName)    
    const indatanum = document.querySelectorAll(".indata")    
    //按下刪除按鈕,會刪除整列,只剩一列時(indatanum.length=2)按刪除按鈕不動作
    if (e.target.nodeName == "BUTTON" && indatanum.length > 2) {        
        aaa = e.target.nodeName
        // console.log(aaa)
        e.target.parentNode.remove()
    }
})

//增加新欄位函數
function createnewrow() {
    const newrow = 
    `<div class = "div_line">
    <label for="">地點<input type="input" class = "indata" name = "input1" size = "8" placeholder="請輸入局名"></label>                
    <select class="select" name = "useroption">                    
        <option value="1" selected name = "useroption">GESW</option>
        <option value="2">MSAN</option>
        <option value="3">OLT</option>                    
    </select>
    <input type="input" class = "indata" name = "input2" size = "15" placeholder="請輸入設備流水"><label for="">流水號</label>                
    <button type="button" class ="delBtn" onclick="">刪除</button>
    </div>                    
    <br>`    
    //插入新欄位
    field.insertAdjacentHTML("afterbegin",newrow)    
}

//按下新增鍵呼叫函數增加新欄位
addBtn.addEventListener("click", ()=>{            
    let shouldSkip = false
    let nospace = false
    const verify_space  = document.querySelectorAll(".indata")
    
    verify_space.forEach(e => {        
        if (shouldSkip) return        
        if (e.value === ""){
            shouldSkip = true
            nospace = false
        }
        if (shouldSkip === false) nospace = true
        
        console.log(verify_space.length)
    });
        if (nospace === true) createnewrow()
        else alert("請填入資料")                
})
