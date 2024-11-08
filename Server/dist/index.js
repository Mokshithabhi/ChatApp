"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const auth_1 = __importDefault(require("@/Routes/auth"));
const messages_1 = __importDefault(require("@/Routes/messages"));
const connection_1 = __importDefault(require("./Db/connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express();
const cors = require("cors");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '4000';
dotenv_1.default.config();
app.use(cors());
app.use(express.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', auth_1.default);
app.use('/api/messages', messages_1.default);
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, { cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    } });
io.on("connect", (clients) => {
    console.log("user Connected");
    console.log("id", clients.id);
    clients.broadcast.emit('welcome', `welcome to the server:${clients.id}`);
    clients.on("disconnect", () => console.log(`user Disconnected :${clients === null || clients === void 0 ? void 0 : clients.id}`));
});
server.listen(PORT, () => {
    (0, connection_1.default)();
    console.log('connected');
});
