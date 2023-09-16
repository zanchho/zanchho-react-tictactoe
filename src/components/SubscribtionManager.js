//TODO OUTSOURCE OTHER SUBS TO HERE

class SubscribtionManager {
  constructor() {
    this.subscriptions = []
  }
  //tests
  log(...e) {
    console.log("SubscribtionManager:", ...e)
  }
  subscribe(subscriptionObj) {
    this.log("subscribe:", subscriptionObj) //tests
    this.subscriptions.push(subscriptionObj)
  }
  unsubscribe(subscriptionObj) {
    this.log("unsubscribe:", subscriptionObj) //tests
    this.subscriptions = this.subscriptions.filter(
      subobj => subobj !== subscriptionObj
    )
  }
  notifysubscribers(type, value) {
    this.log("notifysubscribers:", type, value) //tests
    this.subscriptions.forEach(subobj => {
      if (subobj.type === type) {
        const cb = subobj.callback
        cb(value)
      }
    })
  }
}

const subscriptionManagerInstance = new SubscribtionManager()

export default subscriptionManagerInstance
