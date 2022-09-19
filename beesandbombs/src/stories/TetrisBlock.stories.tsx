// YourComponent.stories.js|jsx

import {Setup} from "./Setup";
import TetrisBlock from "../components/TetrisBlock";
import {ComponentMeta, ComponentStory} from "@storybook/react";

interface SceneProps {
    rotX?: number;
    rotY?: number;
    rotZ?: number;
}

const TetrisBlockScene = ({rotX, rotY, rotZ}: SceneProps) => {
    return <TetrisBlock/>
}


export default {
    title: 'Main/Tetris',
    component: TetrisBlockScene,
    decorators: [(storyFn) => <Setup> {storyFn()}</Setup>],
} as ComponentMeta<typeof TetrisBlockScene>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof TetrisBlockScene> = (args) => <TetrisBlockScene {...args}/>;

export const LShape = Template.bind({})
LShape.args = {}
LShape.storyName = 'L Shape'
