## Installation

### Standalone build (독립형 빌드)

- Socket.IO 서버는 client bundle을 `/socket.io/socket.io.js`에 디폴트로 노출시킴
- io는 전역 변수(global variable)로 등록이 됨
    1. 
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
    </script>
    - 위 기능이 필요하지 않은 경우, 서버 측에서 기능을 비활성화 할 수 있음
        const { Server } = require("socket.io");

        const io = new Server({
            serverClient: false
        })
    2. CDN을 이용
        <script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossorigin="anonymous"></script>
    3. npm or yarn
        - npm install socket.io-client
        - yarn add socket.io-client


## Initialization
- CommonJS
    const { io } = require("socket.io-client");
- ES modules
    import { io } from "socket.io-client";
- TypeScript
    import { io } from "socket.io-client";

### 같은 Domain에서 사용할 때
- const socket = io();

### 다른 Domain에서 사용할 때 -> 서버 url을 전달해야 함!
- const socket = io("https://server-domain.com");
- CORS 주의!
- 유사 형태
    - const socket = io("https://server-domain.com");
    - const socket = io("wss://server-domain.com");
    - const socket = io("server-domain.com");
        - 페이지가 https를 통해 제공되는 경우 브라우저에서만 작동.(Node.js에서 작동 X)


### custom namespace
// same origin version
const socket = io("/admin");
// cross origin version
const socket = io("https://server-domain.com/admin");








