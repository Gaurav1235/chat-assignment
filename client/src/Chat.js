"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_scroll_to_bottom_1 = __importDefault(require("react-scroll-to-bottom"));
const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = (0, react_1.useState)("");
    const [messageList, setMessageList] = (0, react_1.useState)([]);
    const sendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            yield socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    });
    (0, react_1.useEffect)(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    return (react_1.default.createElement("div", { className: "chat-window" },
        react_1.default.createElement("div", { className: "chat-header" },
            react_1.default.createElement("p", null, "Live Chat")),
        react_1.default.createElement("div", { className: "chat-body" },
            react_1.default.createElement(react_scroll_to_bottom_1.default, { className: "message-container" }, messageList.map((messageContent, index) => (react_1.default.createElement("div", { className: "message", id: username === messageContent.author ? "you" : "other", key: index },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: "message-content" },
                        react_1.default.createElement("p", null, messageContent.message)),
                    react_1.default.createElement("div", { className: "message-meta" },
                        react_1.default.createElement("p", { id: "time" }, messageContent.time),
                        react_1.default.createElement("p", { id: "author" }, messageContent.author)))))))),
        react_1.default.createElement("div", { className: "chat-footer" },
            react_1.default.createElement("input", { type: "text", value: currentMessage, placeholder: "Hey...", onChange: (event) => {
                    setCurrentMessage(event.target.value);
                }, onKeyPress: (event) => {
                    event.key === "Enter" && sendMessage();
                } }),
            react_1.default.createElement("button", { onClick: sendMessage }, "\u25BA"))));
};
exports.default = Chat;
