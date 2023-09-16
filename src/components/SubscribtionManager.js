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

/*
TODO: improvements according to chatGPT 

Type Safety with Enums: Similar to what was suggested for the Subscription class, 
you can define constants or an enum for subscription types to ensure type safety 
when subscribing and notifying subscribers.

Documentation: Add comments or documentation for your class and methods to explain 
their purpose and usage.

Error Handling: You can add error handling to the subscribe and unsubscribe 
methods to handle cases where subscribers are added or removed incorrectly.

Consistent Naming: Ensure that you use consistent naming conventions for your 
variables and methods for clarity. For example, you can use SubscriptionManager 
instead of SubscribtionManager to match the class name.

Handling Multiple Subscriptions: Depending on your use case, you might want to consider 
allowing multiple subscribers for the same event type. You can adapt your data structure 
to handle this scenario, such as using an object with arrays for each event type.

Consider Using Map: Instead of using an object for subscriptions, you might consider 
using a Map data structure for better performance and maintainability when handling 
multiple subscriptions.

*/
