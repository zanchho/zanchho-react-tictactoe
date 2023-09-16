//TODO OUTSOURCE OTHER SUBS TO HERE

class SubscribtionManager {
  constructor() {
    this.subscriptions = []
  }
  subscribe(subscriptionObj) {
    this.subscriptions.push(subscriptionObj)
  }
  unsubscribe(subscriptionObj) {
    this.subscriptions = this.subscriptions.filter(
      subobj => subobj !== subscriptionObj
    )
  }
  notifysubscribers(type, value) {
    this.subscriptions.forEach(subobj => {
      if (subobj.type === type) {
        const cb = subobj.callback
        cb(value) // Invoke the callback with an optional value.
      }
    })
  }
}

const subscriptionManagerInstance = new SubscribtionManager()

export default subscriptionManagerInstance
