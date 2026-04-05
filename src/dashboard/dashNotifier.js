const DashEvent = {
  System: 'system',
  Login: 'userLogin',
  Watchlist: 'addToWatchList',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class DashEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('Dashboard', DashEvent.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('Dashboard', DashEvent.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
          // If it's a Blob, convert to text; otherwise use as is
          const text = typeof msg.data.text === 'function' ? await msg.data.text() : msg.data;
          const event = JSON.parse(text);
          this.receiveEvent(event);
      } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
      }
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    this.socket.send(JSON.stringify(event));
    } else {
        console.warn("WebSocket is not open yet. Message queued or dropped.");
    }
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const DashNotifier = new DashEventNotifier();
export { DashEvent, DashNotifier };
