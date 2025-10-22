import EventEmitter from "events";

class Core extends EventEmitter {
  constructor() {
    super();
    this.plugins = [];
  }

  registerPlugin(plugin) {
    this.plugins.push(plugin);
    plugin.init(this); // give plugin access to core
  }

  triggerEvent(eventName, payload) {
    this.emit(eventName, payload);
  }
}

export default new Core();