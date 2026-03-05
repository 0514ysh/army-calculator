function formatNumber(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function unformatNumber(str){
  return Number(str.replace(/,/g,""))
}

function calc(){

    const startDate = document.getElementById("startDate").value

    if(startDate === ""){
        alert("입대 날짜를 입력하세요")
        return
    }

    const serviceInput =
        document.querySelector('input[name="service"]:checked')

    const serviceType = serviceInput.dataset.type

    let color = "#3182f6"

    if(serviceType === "army"){
        color = "#4B5320"   // 국방색
    }
    else if(serviceType === "marine"){
        color = "#c62828"   // 빨강
    }
    else if(serviceType === "navy"){
        color = "#1565c0"   // 파랑
    }
    else if(serviceType === "air"){
        color = "#1e88e5"   // 하늘색
    }
    else if(serviceType === "social"){
        color = "#8e24aa"   // 보라
    }

    const serviceName =
        serviceInput.parentElement.innerText.trim()

    const serviceMonths = Number(serviceInput.value)

    const start = new Date(startDate)

    const discharge = new Date(start)
    discharge.setMonth(discharge.getMonth() + serviceMonths)
    discharge.setDate(discharge.getDate() - 1)

    const today = new Date()

    const totalDays =
        Math.floor((discharge - start)/(1000*60*60*24))

    const passedDays =
        Math.floor((today - start)/(1000*60*60*24))

    const remainDays =
        Math.floor((discharge - today)/(1000*60*60*24))

    let dday

    if(remainDays >= 0){
        dday = "D-" + remainDays
    }else{
        dday = "D+" + Math.abs(remainDays)
    }

    const progress =
        Math.min(100, Math.max(0, Math.floor((passedDays/totalDays)*100)))

    function format(date){
        const y = date.getFullYear()
        const m = String(date.getMonth()+1).padStart(2,"0")
        const d = String(date.getDate()).padStart(2,"0")
        return `${y}-${m}-${d}`
    }

    document.getElementById("resultColor").style.background = color

    const bar = document.getElementById("progressFill")

    bar.style.background = color
    bar.style.width = progress + "%"

    document.getElementById("rService").innerText = serviceName
    document.getElementById("rMonths").innerText = serviceMonths + "개월"
    document.getElementById("rStart").innerText = format(start)
    document.getElementById("rEnd").innerText = format(discharge)
    document.getElementById("rDday").innerText = dday

    document.getElementById("progressText").innerText =
        "복무 진행률 " + progress + "%"

    document.getElementById("resultCard").style.display = "block"

    setTimeout(()=>{
        document.getElementById("progressFill").style.width = progress + "%"
    },100)

}

flatpickr("#startDate",{
  dateFormat:"Y-m-d",
  allowInput:true,
  locale:"ko"
})

const depositInput = document.getElementById("deposit")
const depositSlider = document.getElementById("depositSlider")

/* 슬라이더 움직이면 입력값 변경 */

depositSlider.addEventListener("input", () => {

  const value = Number(depositSlider.value)
  depositInput.value = formatNumber(value)

})

/* 입력값 변경하면 슬라이더 변경 */

depositInput.addEventListener("input", () => {

  let value = unformatNumber(depositInput.value)

  if(value > 1000000) value = 1000000
  if(value < 0) value = 0

  depositSlider.value = value
  depositInput.value = formatNumber(value)

})

depositInput.value = formatNumber(depositSlider.value)

function calcSaving(){

    const startDate = document.getElementById("startDate").value

    if(startDate === ""){
        alert("입대 날짜를 입력하세요")
        return
    }

    const deposit =
        unformatNumber(document.getElementById("deposit").value)

    const serviceInput =
        document.querySelector('input[name="service"]:checked')

    const serviceMonths =
        Number(serviceInput.value)

    const total = deposit * serviceMonths

    const interest = Math.floor(total * 0.05)

    const support = total

    const final = total + interest + support

    const start = new Date(startDate)

    const discharge = new Date(start)
    discharge.setMonth(discharge.getMonth() + serviceMonths)
    discharge.setDate(discharge.getDate() - 1)

    function format(date){
        const y = date.getFullYear()
        const m = String(date.getMonth()+1).padStart(2,"0")
        const d = String(date.getDate()).padStart(2,"0")
        return `${y}-${m}-${d}`
    }

    document.getElementById("rDeposit").innerText =
        formatNumber(deposit) + "원"

    document.getElementById("rTotal").innerText =
        formatNumber(total) + "원"

    document.getElementById("rInterest").innerText =
        formatNumber(interest) + "원"

    document.getElementById("rSupport").innerText =
        formatNumber(support) + "원"
    
    document.getElementById("rEnd").innerText = format(discharge)

    document.getElementById("rFinal").innerText =
        formatNumber(final) + "원"

    document.getElementById("resultCard").style.display = "block"
}
