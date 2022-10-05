import { Application, Description, Example, Heading } from "r3f-stage"


import Clump from "./examples/Clump"
/* r3f-stage provides a global stylesheet. Please import it in your application and remove any other global styles you may have defined. */
import "r3f-stage/styles.css"

function App() {
  return (
    <Application>
      <Example path="one" title="Example 1" makeDefault>
        <Description>This is a very simple example.</Description>

        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="green" />
        </mesh>
      </Example>

      <Example path="clump" title="Clumping">
        <Description>Move the cursor or click the screen to break the formation.</Description>
        <Clump />
      </Example>
    </Application>
  )
}

export default App;
