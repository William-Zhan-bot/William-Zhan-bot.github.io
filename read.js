function speaker() {
  // 監聽全部語音以設定語音包
  let voice_set;
  speechSynthesis.addEventListener("voiceschanged", function (e) {
    const voices = e.target.getVoices();
    console.log(voices);
    //找出 Google 語音
    voice_set = voices.find(
      (voice) =>
        voice.voiceURI === "Microsoft Hanhan - Chinese (Traditional, Taiwan)"
    );
  });

  // 語言設定
  let t = document.querySelector("div.sug");
  console.log(t);
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
}
