// There are several ways to send events between the server and the client.

/* 
Basic emit : 한쪽에서 event를 emit하고, 다른 쪽에 listener를 등록하자.
*/ 

// Example 1
// Server
io.on("connection", (socket) => {
    socket.emit("hello", "world");
})
// Client
socket.on("hello", (arg) => {
    console.log(arg)          // world
})

// Example 2
// Server
io.on("connection", (socket) => {
    socket.on("hello", (arg) => {
        console.log(arg)      // world
    }) 
})
// Client
socket.emit("hello", "world");

// Example 3
// Server
io.on("connection", (socket) => {
    socket.emit("hello", 1, "2", { 3: '4', 5: Buffer.from([6]) })
})
// Client
socket.on("hello", (arg1, arg2, arg3) => {
    console.log(arg1);   //  1
    console.log(arg2);   // "2"
    console.log(arg3);   // { 3: '4', 5: Buffer.from([6]) }) 
})

// 굳이 JSON.stringfy() 사용하지 않아도 된다.
// BAD
socket.emit("hello", JSON.stringify({ name: "John" }));
// GOOD
socket.emit("hello", { name: "John" });


// 날짜 객체는 문자열 표현으로 변환(및 수신)된다. ex) 1970-01-01T00:00:00.000Z

// Map 및 Set은 수동으로 직렬화되어야 한다.
const serializedMap = [...myMap.entries()];
const serializedSet = [...mySet.keys()];


/*
Acknowledgements : emit()의 마지막 인자로 callback을 넣을 수 있다.
    반대쪽이 승인하면, callback이 실행된다.
*/
// Server
io.on("connection", (socket) => {
    socket.on("update item", (arg1, arg2, callback) => {
        console.log(arg1);   // 1
        console.log(arg2);   // {name: "updated"}
        callback({
            status: "ok"
        });
    });
});
// Client
socket.emit("update item", "1", { name: "updated" }, (response) => {
    console.log(response.status);   // ok
})


/*
With timeout : 각 emit마다 timeout을 설정할 수 있다.
*/
socket.timeout(5000).emit("my-event", (err) => {
    if (err) {
        // the other side did not acknowledge the event in the given delay
    }
})
// timeout과 acknowledge를 동시에 사용할 수도 있다.
socket.timeout(5000).emit("my-event", (err, response) => {
    if (err) {
        // the other side did not acknowledge the event in the given delay
    } else {
        console.log(response);
    }
})


/*
Volatile events : underlying event가 미비되었을 때 전송되지 않는 이벤트
*/
socket.volatile.emit("hello", "might or might not be received");
// 다른 예시 : client가 연결되지 않았을 때 이벤트 버리기 (디폴트 : reconnection 동안 events는 buffered 됨.)
// Server
io.on("connection", (socket) => {
    console.log("connection");

    socket.on("ping", (count) => {
        console.log(count);
    });
});
// Client
let count = 0;
setInterval(() => {
    socket.volatile.emit("ping", ++count);
}, 1000)
/*
Result:
connect
1
2
3
4
# the server is restarted, the client automatically reconnects
connect
9
10
11

Without the volatile flag Result:
connect
1
2
3
4
# the server is restarted, the client automatically reconnects and sends its buffered events
connect
5
6
7
8
9
10
11
*/
