import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';

import helmet from 'helmet';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler';


// Expressアプリケーションの設定
const app = express();
const PORT = process.env.PORT || 8080;

// セキュリティヘッダー設定
app.use(helmet({
  contentSecurityPolicy: false,  // WebSocket接続のためにCSPを無効化
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// WebSocketのアップグレードリクエストを許可
app.use((req, res, next) => {
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  next();
});

// エラーハンドラ
app.use(errorHandler);
// JSON ボディのパース
app.use(express.json({ limit: '1mb' }));
// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '../public')));

// HTTPサーバーの作成
const server = http.createServer(app);

// WebSocketサーバーの作成
const wss = new WebSocket.Server({
  server,
  path: '/ws',
  perMessageDeflate: false,
  clientTracking: true,
  verifyClient: (info, callback) => {
    console.log('WebSocket接続試行:', info.req.url);
    callback(true); // すべての接続を許可
  }
});

// クライアント接続を管理
const clients: WebSocket[] = [];

// WebSocket接続イベントの処理
wss.on('connection', (ws: WebSocket, req) => {
  const clientIp = req.socket.remoteAddress;
  clients.push(ws);
  console.log(`新しいクライアントが接続しました、ID:${ clients.indexOf(ws) }、接続数${clients.length}/${wss.clients.size}`, clients.length);

  // 接続成功時にIDを送信
  ws.send(JSON.stringify({ type: 'connected', message: clients.indexOf(ws) }));

  // メッセージ受信時の処理
  ws.onmessage = (event) => {
    const message = event.data;
    console.log(`受信メッセージ: ${event.data}`);
    const author = clients.indexOf(ws);

    // 今のタイムスタンプを取得
    const timestamp = Date.now();

    // 他のすべてのクライアントにメッセージを送信
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        const data = { type: 'message', message: message.toString(), date: timestamp, author: author };
        client.send(JSON.stringify(data));
      }
    });
  }

  // エラー発生時の処理
  ws.onerror = (error) => {
    console.error('WebSocketエラー:', error);
  }

  // 接続切断時の処理
  ws.onclose = () => {
    console.log(`クライアントが切断しました: ${clientIp}`);
    // const index = clients.indexOf(ws);
    // if (index !== -1) {
    //   clients.splice(index, 1);
    // }
  }
});


export default server;
