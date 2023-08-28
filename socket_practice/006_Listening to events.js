// 서버와 클라이언트 간 전송되는 events를 다루는 몇 가지의 방법이 있다.
// EventEmitter methods /////////////////////////////////////////////////////

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


// Catch-all listeners /////////////////////////////////////////////////////

// socket.onAny(listener)
// 이벤트가 발생하면 실행될 리스너를 등록한다.
socket.onAny((eventName, ...args) => {
  // ...
})

// socket.prependAny(listener)
// 어떤 이벤트가 emit되어도 실행될 리스너를 등록하라. 이 리스너는 리스너 배열의 초반에 더해져야 한다.
socket.prependAny((eventName, ...args) => {
  // ...
})

// socket.offAny([listener])
// 모든 catch-all 리스너들 혹은 지정된 리스너를 제거한다.
const listener2 = (eventName, ...args) => {
  console.log(eventName, args);
}
socket.onAny(listener2);
// and then later...
socket.offAny(listener2);
// or all listeners
socket.offAny();

