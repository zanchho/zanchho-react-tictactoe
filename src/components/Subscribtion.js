class Subscription {
  constructor(type, callback) {
    this.type = type
    this.callback = callback
  }

  static getTypes() {
    return {
      win: "win",
      gameState: "gameState",
      playground: "playground",
    }
  }
}

export default Subscription

/*
TODO: improvements according to chatGPT 

Type Safety with Enums: As mentioned previously, using an enum or constants 
for subscription types can improve type safety and code readability.
This ensures that you don't accidentally use invalid subscription types.

Validation: You might want to add some basic validation to the constructor 
to ensure that valid subscription types are provided. This can help catch 
errors early during development.

Documentation: Providing comments or documentation for your class and 
methods can help other developers understand how to use your code effectively.

Consistent Naming: Consider using a consistent naming convention for your constants. 
You've used both camelCase and uppercase with underscores. Choose one convention and 
stick with it for clarity.

Static Method Usage: Since getTypes is a static method, you can call it directly 
on the class without creating an instance of Subscription. This can make the code 
more concise when accessing subscription types.


*/
