// Socket#id
// 새 connection에는 20자리의 랜덤 문자로 구성된 식별값이 주어진다.
// 이 식별값은 서버와 동기화된다.

// server-side
io.on("connection", (socket) => {
    console.log(socket.id)     // x8WIv7-mJelg7on_ALbx
})

// client-side
socket.on("connect", () => {
    console.log(socket.id)     // x8WIv7-mJelg7on_ALbx
})

socket.on("disconnect", () => {
    console.log(socket.id)     // undefined
})


// Socket#connected
// socket이 현재 server와 연결되어 있는지 여부를 말해준다.
socket.on("connect", () => {
    console.log(socket.connected);   // true
})

socket.on("disconnect", () => {
    console.log(socket.connected);   // false
})