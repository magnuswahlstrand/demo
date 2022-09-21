// YourComponent.stories.js|jsx

import {Setup} from "./Setup";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {L} from "../components/L";

interface SceneProps {
    rotX?: number;
    rotY?: number;
    rotZ?: number;
}

const TetrisBlockScene = ({rotX, rotY, rotZ}: SceneProps) => {
    return <L/>
}


export default {
    title: 'Main/Tetris',
    component: TetrisBlockScene,
    decorators: [(storyFn) => <Setup cameraPosition={[1,10,1]}> {storyFn()}</Setup>],
} as ComponentMeta<typeof TetrisBlockScene>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof TetrisBlockScene> = (args) => <TetrisBlockScene {...args}/>;

export const LShape = Template.bind({})
LShape.args = {}
LShape.storyName = 'L Shape'
