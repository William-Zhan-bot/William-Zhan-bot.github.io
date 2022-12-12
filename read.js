// 監聽全部語音以設定語音包
let voice_set;
speechSynthesis.addEventListener("voiceschanged", function (e) {
  const voices = e.target.getVoices();
  //找出 Google 語音
  voice_set = voices.find(
    (voice) =>
      voice.voiceURI === "Microsoft Yating - Chinese (Traditional, Taiwan)"
  );
});

// 語言設定
setTimeout((e) => {
  let t = document.querySelector("h1");
  let string = t.innerText;
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = string;
  // 英文會自動修正語音
  utterance.lang = "zh-TW";
  utterance.pitch = 1;
  utterance.rate = 0.73;
  utterance.volume = 1;
  utterance.voice = voice_set;
  speechSynthesis.speak(utterance);
}, 2000);
