import { useEffect } from "react"
import brain from "brain.js"

const TicTacToeAI = () => {
  const [network, setNetwork] = useState(null)
  useEffect(() => {
    setNetwork(new brain.NeuralNetwork())

    const trainingData = [
      //TODO
    ]

    // Train the neural network
    network.train(trainingData)
  }, [])

  const askForMove = (board, player) => {
    //TODO
    //return network.run(data)
  }
}
export default TicTacToeAI
