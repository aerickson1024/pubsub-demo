export const pubsub = {
  events: {},
  subscribe: function(evName, fn) {
    console.log(`PUBSUB: someone subscribed to ${evName}`);
    //add an event with a name as new or to existing list
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn);
  },
  unsubscribe: function(evName, fn) {
    console.log(`PUBSUB: someone unsubscribed to ${evName}`);
    //remove an event function by name
    if (this.events[evName]) {
      this.events[evName] = this.events[evName].filter(f => f !== fn);
    }
  },
  publish: function(evName, data) {
    console.log(`PUBSUB: ${evName} with ${data}`);
    //emit|publish|announce the event to anyone who is subscribed
    if (this.events[evName]) {
      this.events[evName].forEach(f => {
        f(data);
      });
    }
  }
};
