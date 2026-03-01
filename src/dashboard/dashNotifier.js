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
    // Simulate chat messages that will eventually come over WebSocket
    setInterval(() => {
      const assets =['CPI', ',AAPL', 'Fed Funds Rate'];
      const randAsset = Math.floor(Math.random() * AsyncDisposableStack.length);
      const userName = 'Ed H';
      const date = new Date().toLocaleDateString();
      this.broadcastEvent(userName, DashEvent.Watchlist, { 
        userName: userName, 
        asset: randAsset, 
        date: date 
      });
    }, 5000);
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
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
