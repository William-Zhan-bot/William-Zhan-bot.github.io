// 以靜態方式掛在index 不用導入node-fetch
// import fetch from "node-fetch";
let start = document.querySelector("a.clickbox");
let line = document.querySelector("img.startline");
let cb = document.querySelector("a.clickbox");

// 按鈕的觸發事件
start.addEventListener("click", (e) => {
  // 縮線動畫
  let back_time = 1000;
  line.className = "movetoback";

  // 按鈕縮進去 後撥放聲音
  setTimeout((e) => {
    audiotest();
  }, 300);

  // 移除clickbox => 防止重複點取
  let cb_p = cb.parentNode;
  cb_p.removeChild(cb);

  // 拉線動畫
  setTimeout((e) => {
    // line.className = "linego";
    anime({
      targets: line,
      translateX: 250,
      duration: 1200,
    });

    // 海螺動畫
    setTimeout((e) => {
      // 海螺閃光
      let ctn_nodes = document.querySelector("div.container");
      let light = document.createElement("div");
      light.classList.add("light");
      ctn_nodes.appendChild(light);
      // 海螺動畫
      let conch = document.querySelector("div.img");
      anime({
        targets: conch,
        rotate: {
          value: 1080,
          duration: 4500,
          easing: "easeInOutSine",
        },
        scale: {
          value: 4,
          duration: 4500,
          delay: 800,
          easing: "easeInOutQuart",
        },
        delay: 250, // All properties except 'scale' inherit 250ms delay
      });

      // 後續node處理
      setTimeout((e) => {
        // 建立read link
        let readApp = document.createElement("script");
        readApp.setAttribute("src", "read.js");
        let html = document.querySelector("html");
        html.appendChild(readApp);
        // 移除container 所有node
        ctn_nodes.innerHTML = "";

        // 主要頁面
        let flash = document.createElement("div");
        // 主要資訊
        let sug = document.createElement("div");
        sug.classList.add("sug");

        // 按鈕
        let again = document.createElement("a");
        again.setAttribute("href", ".");
        let dedicate = document.createElement("a");
        dedicate.setAttribute("href", "#");
        let btn_box = document.createElement("div");
        // 內部按鈕資訊
        again.innerText = "再問海螺";
        dedicate.innerText = "我要納貢";

        // classes
        // 按鈕
        again.classList.add("btn");
        dedicate.classList.add("btn");
        dedicate.classList.add("dedicate");
        btn_box.classList.add("bbox");
        // 訊息
        flash.classList.add("flash");

        // 新頁面與訊息框放入網頁中
        document.querySelector("div.container").appendChild(flash);
        document.querySelector("div.flash").appendChild(sug);
        document.querySelector("div.flash").appendChild(btn_box);
        // 更新 footer樣式
        let footer = document.querySelector("footer");
        footer.className = "flashfooter";

        // fetch資料
        fetch("http://localhost:3000/result")
          .then(async (res) => {
            // 必須解析回傳的json格式promise
            let json = await res.json();
            // 避免資料庫空白資訊
            let message = json.message;
            // 避免資料庫空白資訊
            if (message.length < 4) {
              message = "坐下";
            }
            sug.innerHTML = "<h1>" + message + "</h1>";

            // 確定上方資訊之後再進行新增按鈕 不然會被洗掉
            // 裝進按鈕箱子
            document.querySelector("div.bbox").appendChild(again);
            document.querySelector("div.bbox").appendChild(dedicate);

            // donate
            let donate = document.querySelector("a.dedicate");
            console.log(donate);
            donate.addEventListener("click", (e) => {
              window.alert("謝謝虔誠，敬請期待!");
            });
          })
          .catch((err) => {
            console.log(err);
            flash.innerHTML = "fail!";
          });
      }, 3500); // 海螺動畫執行時間
    }, 1000); // 線往外拉
  }, back_time); // 線往內縮
});

// 啟用音效
function audiotest() {
  const audio = new Audio("./src/bubbling.wav");
  audio.play();
}
