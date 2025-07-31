import { io, Socket } from 'socket.io-client';

export interface AdviceData {
  advice: string;
  timestamp: string;
  operation?: 'transaction' | 'history' | 'default';
}

export interface WebSocketEvents {
  connected: (data: any) => void;
  new_advice: (data: AdviceData) => void;
  message: (data: any) => void;
  pong: (data: any) => void;
  disconnect: () => void;
  connect_error: (error: any) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private eventHandlers: Partial<WebSocketEvents> = {};
  private isConnected = false;

  connect(token: string) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io('http://192.168.0.135:4200', {
      auth: {
        token: token
      },
      transports: ['polling', 'websocket'],
      timeout: 20000,
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connected', (data) => {
      console.log('WebSocket connected:', data);
      this.isConnected = true;
      this.eventHandlers.connected?.(data);
    });

    this.socket.on('advice', (data: AdviceData) => {
      console.log('Advice received:', data);
      this.eventHandlers.new_advice?.(data);
    });

    this.socket.on('new_advice', (data: AdviceData) => {
      console.log('New advice received:', data);
      this.eventHandlers.new_advice?.(data);
    });

    this.socket.on('message', (data: any) => {
      console.log('Message received:', data);
      this.eventHandlers.message?.(data);
    });

    this.socket.on('pong', (data) => {
      console.log('Pong received:', data);
      this.eventHandlers.pong?.(data);
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.isConnected = false;
      this.eventHandlers.disconnect?.();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.isConnected = false;
      this.eventHandlers.connect_error?.(error);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.isConnected = false;
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('WebSocket reconnect error:', error);
      this.isConnected = false;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnected = false;
  }

  ping() {
    if (this.socket && this.isConnected) {
      this.socket.emit('ping');
    }
  }

  on<K extends keyof WebSocketEvents>(event: K, handler: WebSocketEvents[K]) {
    this.eventHandlers[event] = handler;
  }

  off<K extends keyof WebSocketEvents>(event: K) {
    delete this.eventHandlers[event];
  }

  getConnectedStatus(): boolean {
    return this.isConnected;
  }
}

export const websocketService = new WebSocketService(); 