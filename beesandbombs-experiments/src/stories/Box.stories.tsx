// YourComponent.stories.js|jsx

import {Setup} from "./Setup";
import {Box} from "../components/Box";
import {ComponentMeta, ComponentStory} from "@storybook/react";

interface BoxProps {
    backgroundColor?: string;
}

const BoxScene = ({backgroundColor}: BoxProps) => {
    return <Box color={backgroundColor}/>
}


export default {
    title: 'Main/Box',
    storyName: 'Box',
    component: BoxScene,
    decorators: [(storyFn) => <Setup> {storyFn()}</Setup>],
} as ComponentMeta<typeof BoxScene>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof BoxScene> = (args) => <BoxScene {...args}/>;

export const FirstStory = {
    args: {
        backgroundColor: 'red',
    },
    argTypes: {
        backgroundColor: {control: 'color'},
    }
};
