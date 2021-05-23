const timer = {
  pomodoro: 0.2,
  shortBreak: 0.1,
  longBreak: 0.2,
  longBreakInterval: 4,
  sessions: 0,
};

// 再代入できるようにしておく
let interval;

console.log("ここはclickイベントの上です" + timer.sessions);

// let { 変数 } = hogehoge みたいになってるのは、hogehogeに入る値が配列の分割構文が代入されるから。
const btnStartSound = new Audio('/mp3/kiran.mp3');
const pomoSound = new Audio('/mp3/bg_sounds.mp3');
const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {

  const { action } = mainButton.dataset;
  if (action === 'start') {
    startTimer();
    btnStartSound.play();
    if (timer.mode === 'pomodoro') {
      pomoSound.play();
      pomoSound.loop = true;
    }
  } else {
    stopTimer();
    pomoSound.pause();
  }
});

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

//タイムスタンプを引数にとり、現在の時刻と終了時刻の差をミリ秒単位で求める。
function getRemainingTime(endTime) {
  //現在の時刻を取得
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  // Number.parseInt()メソッドで基数10の整数に変換する
  const total = Number.parseInt(difference / 1000, 10); //1000で割って残りの総秒数を計算するのに使われる
  const minutes = Number.parseInt((total / 60) % 60, 10); //残りの分数をtotalに格納
  const seconds = Number.parseInt(total % 60, 10); //残りの秒数をtotalに格納
  //totalが1500の場合、分は25、秒は0になる。

  return {
    total,
    minutes,
    seconds,
  };
}

function startTimer() {
  let { total } = timer.remainingTime;
  //Date.parseメソッド = 日時を表す文字列を解釈し、協定世界時 (UTC) 1970 年 1 月 1 日 00:00:00 からの経過時間を表すミリ秒単位の数値を返す
  // タイマーを開始する前に、タイマーが終了する未来の正確な時間を取得する。modeごとの残りの総秒数であるtotalに1000をかけ、1sに。
  const endTime = Date.parse(new Date()) + total * 1000;
  //現在のモードがpomodoroかチェック。真ならtimer.sessionsプロパティを1ずつ増やす
  // if (timer.mode === 'pomodoro') timer.sessions++;
  if (timer.mode === 'pomodoro') {
    timer.sessions++;
    // alert(timer.sessions);
    // const sessionCounts = timer.sessions++;
    // sessionCounts;
    // alert(sessionCounts);
  }


  // alert(sessionCounts + 'と' + interval + ' total: ' + total);
  //19, 36, 45, 65, 71, 93

  //ここでカウントダウンがスタートしたら、data-actionの値がstopに変更されるようにする
  mainButton.dataset.action = 'stop';
  mainButton.textContent = 'stop';
  mainButton.classList.add('active');

  //1秒(1000ミリ秒)ごとにコールバック関数を実行するsetInterval()メソッドを設定。
  interval = setInterval(function () {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);

      //ここで、指定時間が過ぎたらモードが勝手に切り替えられるように設定
      // switch 文は式を評価し、その式の値が case 節と一致したらcase に関連付けられた文を実行し、一致した case の後にある文も同様に実行する。
      // timer.modeの値に応じて、切り替わる
      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break; //break と遭遇したとき、プログラムは switch から抜け出し、 switch に続く文を実行する。
        default:
          switchMode('pomodoro');
      }

      if (Notification.permission === 'granted') {
        const text =
          timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
        new Notification(text);
      }
      // モード毎の音設定
      document.querySelector(`[data-sound="${timer.mode}"]`).play();

      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  //startTimer()で起動したsetInterval()メソットをキャンセル
  clearInterval(interval);

  // タイマーがストップされたらボタンの表示がstartに切り替わるようにする
  mainButton.dataset.action = 'start';
  mainButton.textContent = 'start';
  mainButton.classList.remove('active');
}
// カウントダウンを更新する関数
function updateClock() {
  // remainingTimeオブジェクトの分と秒のプロパティの値を抽出し、必要に応じてゼロで埋め、数字が常に2の幅を持つようにする
  // padStart() メソッド = 結果の文字列が指定した長さになるように、現在の文字列を他の文字列で (必要に応じて繰り返して) 延長するメソッド
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  const min = document.getElementById('js-minutes');
  const sec = document.getElementById('js-seconds');
  min.textContent = minutes;
  sec.textContent = seconds;

  // タブ内の文字をカウントダウンと連動させる。
  const text =
    timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
  document.title = `${minutes}:${seconds} — ${text}`;
}

// timerオブジェクトに2つの新しいプロパティを追加する
function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60, // modeごとの残りの総秒数。shortBreakなら5x60=300
    minutes: timer[mode], // mode毎の分数。pomodoroなら25
    seconds: 0,
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.body.style.backgroundColor = `var(--${mode})`;

  updateClock();
}

function handleMode(event) {
  // event.target = イベントを発生させたオブジェクトへの参照。
  // .dataset = 要素の全カスタムデータ属性 (data-*) への読み取り/書き込みアクセスを可能に。
  //ここではjs-mode-buttonsへのクリックイベントが発生した時のdata-modeを取得しmodeに格納している。
  const { mode } = event.target.dataset;
  // ここでreturnを使うことによって『要素が見つからなかった場合は処理を終了(エスケープ)させる』という処理が可能になっている。
  // returnの半分はこんな感じで処理を停止するために使われるらしい。
  if (!mode) return;

  // swichMode関数を呼び出す
  switchMode(mode);
  stopTimer();
}

// ページロード時にモードと remainingTime プロパティがタイマーオブジェクトに設定されていることを確認するために、DOMContentLoadedイベントが発生した時点で、switchMode()プロパティを実行する.
document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window) {
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification(
            'Awesome! You will be notified at the start of each session'
          );
        }
      });
    }
  }

  switchMode('pomodoro'); //デフォルトモードがポモドーロになる
});
