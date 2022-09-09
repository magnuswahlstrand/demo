// @flow
import * as React from 'react';
import {useReducer, useState} from 'react';
import * as Prism from 'prismjs';
import {useCopyToClipboard} from "react-use";

export interface Props {
    class?: string;
    lang?: string;
    code: string;
}

function useShowForDuration(duration: number) {
    const [lastClicked, setLastClicked] = useState(0);
    const [, forceRefresh] = useReducer(x => x + 1, 0);

    const markAsClicked = () => {
        setLastClicked(() => new Date().getTime());
        setTimeout(() => {
            forceRefresh();
        }, duration)
    }

    return {
        isClicked: new Date().getTime() - lastClicked < (duration - 50),
        markAsClicked,
    }
}

export function BetterCodeSnippet(props: Props) {
    const {isClicked, markAsClicked} = useShowForDuration(900);


    const [apiKey, setApiKey] = useState('');
    const [projectId, setProjectId] = useState('');

    let replacedCode = props.code

    if (apiKey) {
        replacedCode = replacedCode.replace('$API_KEY', apiKey)
    }

    if (projectId) {
        replacedCode = replacedCode.replace('$PROJECT_ID', projectId)
    }

    const handleCopy = () => {
        copyToClipboard(replacedCode)
        markAsClicked()
    }
    const [state, copyToClipboard] = useCopyToClipboard();


    const html = Prism.highlight(replacedCode, Prism.languages.javascript, 'bash');

    return (
        <>
            <h3>Replace inline code</h3>
            <div className="grid grid-cols-3 gap-y-2 items-center">
                <label className="block grid-row- text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                       htmlFor="inline-full-name">
                    $API_KEY
                </label>
                <input
                    className="col-span-2 bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}/>

                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                       htmlFor="inline-full-name">
                    $PROJECT_ID
                </label>
                <input
                    className="col-span-2 bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    value={projectId}
                    onChange={(event) => setProjectId(event.target.value)}/>
            </div>
            <pre>
                <div className={"relative"}>
                    <div className={"absolute right-0"}>
                        <button type="button" onClick={handleCopy}>
                            {isClicked ? <CheckMarkIcon/> : <CopyIcon/>}
                        </button>
                        </div>
                </div>
            <code dangerouslySetInnerHTML={{__html: html}}/>
        </pre>
        </>
    )
}


function CopyIcon() {

    return (
        <div className="border border-transparent hover:border-blue-500 rounded p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                 viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M14 22H4a1.934 1.934 0 0 1-2-2V10a1.934 1.934 0 0 1 2-2h4V4a1.934 1.934 0 0 1 2-2h10a1.934 1.934 0 0 1 2 2v10a1.935 1.935 0 0 1-2 2h-4v4a1.935 1.935 0 0 1-2 2ZM4 10v10h10v-4h-4a1.935 1.935 0 0 1-2-2v-4H4Zm6-6v10h10V4H10Z"/>
            </svg>
        </div>
    );
};

function CheckMarkIcon() {
    return (
        <div className="border border-green-600 rounded p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                 viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor"
                      d="m4 12l6 6L20 6"/>
            </svg>
        </div>
    );
};
