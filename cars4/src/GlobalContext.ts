import {createContext, MutableRefObject, useContext} from "react"

type contextType = {
    controls: MutableRefObject<Record<string, boolean>>
    controlPressed: (k: string) => void
    controlReleased: (k: string) => void
}

export const ControlContext = createContext<contextType | undefined>(undefined)

export const useControlContext = () => {
    const context = useContext(ControlContext)
    if (context === undefined) {
        throw new Error("useGlobalContext must be within GlobalProvider")
    }

    return context
}
