import { Application, Description, Example, Heading } from "r3f-stage"


import Clump from "./examples/Clump"
import ColoredLines from "./examples/ColoredLine"
import RotatingSquares from "./examples/RotatingSquares"
import RepeatingTetris from "./examples/RepeatingTetris/RepeatingTetris"
import Bread from "./examples/Bread"
/* r3f-stage provides a global stylesheet. Please import it in your application and remove any other global styles you may have defined. */
import "r3f-stage/styles.css"

function App() {
  return (

    <Application>

      <Heading>Physics</Heading>

      <Example path="clump" title="Clumping" makeDefault>
        <Description>Move the cursor or click the screen to break the formation.</Description>
        <Clump />
      </Example>

      <Heading>Graphics</Heading>
      <Example path="repeating-tetris" title="Repeating Tetris">
        <RepeatingTetris />
      </Example>

      <Example path="colored-lines" title="Colored Lines">
        <ColoredLines />
      </Example>

      <Example path="rotating-squares" title="Rotating Squares">
        <Description>Move the cursor or click the screen to break the formation.</Description>
        <RotatingSquares />
      </Example>

      <Heading>3D Models</Heading>
      <Example path="bread" title="bread">
        <Bread />
      </Example>

    </Application>
  )
}

export default App;
