/* 
    Socket instance는 3가지 특별한 event를 방출한다. 
    connect, connect_error, disconnect
*/

// 1. connect : connection, reconnection 시 socket instance에 의해 시작된다.
socket.on("connection", () => {
    // ...
})
// 주의사항: 소켓이 reconnect될 때마다 새 핸들러가 등록되므로, 이벤트 핸들러를 내부에 등록하지 말자.
// BAD
socket.on("connection", () => {
    socket.on("data", () => { /* ... */ })
});
// GOOD
socket.on("connection", () => {
    // ...
})
socket.on("data", () => { /* ... */ })

/* 2. connect_error : 
low_level connection 설정 불가 시      ->  given delay 이후, Socket이 자동으로 reconnect 
미들웨어기능에서 서버에 의해 연결 거부될 시    ->  수동으로 reconnect
*/
// either by directly modifying the `auth` attribute
socket.on("connect_error", () => {
    socket.auth.token = "abcd";
    socket.connect();
  });
  
  // or if the `auth` attribute is a function
  const socket = io({
    auth: (cb) => {
      cb(localStorage.getItem("token"));
    }
  });
  
  socket.on("connect_error", () => {
    setTimeout(() => {
      socket.connect();
    }, 1000);
  });


  /*
  3. disconnect : disconnection되면 실행
  */
  socket.on("disconnect", (reason) => {
    // ...
  });
  
  