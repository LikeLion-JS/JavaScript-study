// 카드 생성하기
const $wrapper = document.querySelector("#wrapper");

const total = 20;
const pics = [
  "img/angel.png",
  "img/feces.png",
  "img/ghost.png",
  "img/monster.png",
  "img/princess.png",
  "img/fire.png",
  "img/flowers.png",
  "img/heart.png",
  "img/skull.png",
  "img/soldier.png",
];
let picsCopy = pics.concat(pics);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;

// 피셔에이츠 알고리즘을 사용하여 배열을 무작위로 섞음
// sort()를 이용하여 랜덤정렬을 하면 빈도수가 균일하게 나오지 않음
//shuffled 배열에는 picsCopy 배열에서 randomIndex 위치에 있는 요소를 제거한 후 추가되고 이를 통해 shuffled 배열이 점점 채워지면서 picsCopy 배열은 요소가 제거된 채로 남음
function shuffle() {
  // 피셔 - 에이츠 셔플
  for (let i = 0; picsCopy.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * picsCopy.length);
    shuffled = shuffled.concat(picsCopy.splice(randomIndex, 1));
  }
}

// 카드 요소를 동적으로 생성하는 함수인 createCard(i)
function createCard(i) {
  const card = document.createElement("div");
  card.className = "card"; // .card 태그 설정
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner"; // .card-inner 태그 생성
  const cardFront = document.createElement("div");
  cardFront.className = "card-front"; //.card-front 태그 생성
  const cardBack = document.createElement("div");
  cardBack.className = "card-back"; // .card-back 태그 생성
  cardBack.style.backgroundImage = `url(${shuffled[i]})`;
  //카드의 앞면과 뒷면을 표현하기 위해 cardInner 요소에 cardFront와 cardBack 요소를 자식으로 추가
  cardInner.appendChild(cardFront); //
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

// 클릭이벤트를 처리하는 함수
function onClickCard() {
  // 클릭 가능한 상태인지 확인
  // this는 현재 클릭한 카드를 가리킴
  // 클릭이 불가능한 상태이거나 || 현재 클릭된 카드(짝이 맞춰진 카드)가 포함되거나 || 이미 클릭된 카드(같은 카드 클릭 방지) 라면 함수 종료
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle("flipped"); // 클릭한 카드에 'flipped'클래스를 토글해서 카드가 뒤집히는 에니메이션을 만듬
  clicked.push(this); // 클릭한 카드를 'clicked'배열에 추가
  if (clicked.length !== 2) {
    // 배열의 길이가 2가 아닌 경우, 즉 두개의 카드를 선택하지 않은 경우
    return; // 종료
  }
  // 첫번째 카드와 두번째 카드 비교
  const firstBackImage =
    clicked[0].querySelector(".card-back").style.backgroundImage;
  const secondBackImage =
    clicked[1].querySelector(".card-back").style.backgroundImage;

  // 두 카드가 같으면 completed배열에 추가
  if (firstBackImage === secondBackImage) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = []; // 배열 초기화
    if (completed.length !== total) {
      // 모든 짝을 맞추지 않은 경우 함수 종료
      return;
    }
    setTimeout(() => {
      // 모든 짝을 다 맞춘 경우 함수 종료, 1초 후에 '성공!' 표시하기
      alert(`성공!`);
      resetGame(); // 게임을 초기화하는 resetGame함수 호출
    }, 1000);
    return;
  }

  // 두 카드가 다르면
  clickable = false; // false값을 주어 클릭 막기
  setTimeout(() => {
    clicked[0].classList.remove("flipped"); // remmove를 주어 배열을 다시 초기화
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true; // 다시 클릭 가능한 상태
  }, 500); //0.5초
}

// 게임을 시작하는 함수 _ 카드를 순차적으로 공개하고 뒷면으로 돌리는 동작수행, 클릭에 대한 반응 활성화
// shuffle 함수를 호출하여 카드 순서를 무작위로 섞고 total 변수에 지정된 개수만큼 반복문을 실행
function startGame() {
  shuffle();
  for (let i = 0; i < total; i += 1) {
    const card = createCard(i); //createCard 함수를 호출하여 카드를 생성하고
    card.addEventListener("click", onClickCard); // 생성된 카드에 click 이벤트를 감지하여 onClickCard 함수를 실행
    $wrapper.appendChild(card); // for 반복문을 통해 생성된 각각의 카드(card)를 $wrapper에 추가함으로써, 카드들이 컨테이너에 정상적으로 표시되고 보여질 수 있도록 하는 역할
  }

  // 초반 카드 공개
  // 모든 카드 요소를 선택하고, forEach 메서드를 사용하여 동작 수행
  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      // 일정한 시간 간격으로 순차적으로 실행되도록 함
      card.classList.add("flipped"); // flipped 클래스를 추가하여 앞면을 보여줌
    }, 1000 + 100 * index); // 순차적인 카드 공개를 위해 1000 + 100 * index ms 만큼의 딜레이를 가지도록 설정
  });

  setTimeout(() => {
    // 카드 감추기
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped"); //  flipped 클래스를 제거하여 다시 뒷면을 보여줌
    });
    clickable = true; // true값을 주어 클릭을 활성화
  }, 5000); // 5초 후에 동작을 수행함
}

function resetGame() {
  // 게임을 초기화하여 새로운 게임 시작 준비
  $wrapper.innerHTML = ""; // $wrapper 요소의 내용을 비웁니다. 즉, 이전에 생성된 모든 카드 요소를 삭제.
  picsCopy = pics.concat(pics);
  shuffled = []; //shuffled 배열을 초기화. shuffled 배열은 카드의 순서를 랜덤하게 섞은 결과를 저장하는 배열.
  completed = []; //completed 배열을 초기화합니다. completed 배열은 이미 짝이 맞춰진 카드를 저장하는 배열.
  clickable = false;
  startGame(); //startGame 함수는 새로운 카드를 생성하고 섞어주는 역할.
}
//게임이 시작되고 카드가 순차적으로 공개되며, 일정 시간 후에 다시 뒷면으로 돌아가는 startGame 함수를 호출.
startGame();
