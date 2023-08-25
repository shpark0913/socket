// 서버와 클라이언트 간 전송되는 events를 다루는 몇 가지의 방법이 있다.
// EventEmitter methods

// socket.on(evnetName, listener)
// eventName이라는 이벤트에 대한 리스너 배열 끝에 리스너 함수를 추가한다.
socket.on("details", (...args) => {
  // ...
})

// socket.once(eventName, listener)
// eventName이라는 이벤트에 대한 one-time(일회성) 리스너 함수를 추가한다.
socket.once("details", (...args) => {
  // ...
})

// socket.off(evnetName, listener)
// eventName이라는 이벤트의 리스터 배열에 있는 특정 함수를 제거한다.
const listener = (...args) => {
  console.log(args);
}
socket.on("details", listener);
// and then later...
socket.off("details", listener);

// socket.removeAllListeners([eventName])
// 모든 리스너를 지우거나, 특정 eventName의 모든 리스너를 지운다.
// for a specific event
socket.removeAllListeners("details");
// for all events
socket.removeAllListeners();



// https://socket.io/docs/v4/listening-to-events/ 의 Catch-all listeners 부터 마저 학습