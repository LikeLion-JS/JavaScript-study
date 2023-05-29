let left = 0;

//setInterval() 함수는 주기적으로 인자를 실행하는 함수입니다.
//setInterval() 메서드를 사용하여 변수 left가 0.3초에 한 번씩 바뀌도록 설정했다.
setInterval(function () {
  if (left === 0) {
    left = "-135px";
  } else if (left === "-135px") {
    left = "-304px";
  } else {
    left = 0;
  }
  document.querySelector("#computer").style.background =
    "url(sprite.png)" + left + " 0";
}, 300);
