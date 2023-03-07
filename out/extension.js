"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const commandHandler_1 = require("./commandHandler");
const optimazeImg_1 = require("./optimazeImg");
function activate(context) {
    let redimCloud_20 = vscode.commands.registerCommand(commandHandler_1.COMMAND_TYPES.redim_20.command, async () => { (0, optimazeImg_1.optimazeImg)(commandHandler_1.COMMAND_TYPES.redim_20.quality); });
    let redimCloud_40 = vscode.commands.registerCommand(commandHandler_1.COMMAND_TYPES.redim_40.command, async () => { (0, optimazeImg_1.optimazeImg)(commandHandler_1.COMMAND_TYPES.redim_40.quality); });
    let redimCloud_60 = vscode.commands.registerCommand(commandHandler_1.COMMAND_TYPES.redim_60.command, async () => { (0, optimazeImg_1.optimazeImg)(commandHandler_1.COMMAND_TYPES.redim_60.quality); });
    let redimCloud_80 = vscode.commands.registerCommand(commandHandler_1.COMMAND_TYPES.redim_80.command, async () => { (0, optimazeImg_1.optimazeImg)(commandHandler_1.COMMAND_TYPES.redim_80.quality); });
    let redimCloud_90 = vscode.commands.registerCommand(commandHandler_1.COMMAND_TYPES.redim_90.command, async () => { (0, optimazeImg_1.optimazeImg)(commandHandler_1.COMMAND_TYPES.redim_90.quality); });
    context.subscriptions.push(redimCloud_20, redimCloud_40, redimCloud_60, redimCloud_80, redimCloud_90);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map