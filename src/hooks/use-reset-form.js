import { useEffect } from "react";
import { useStore } from "react-redux";

export const useResetForm = (reset) => {
    const store = useStore();

    useEffect(() => {
        let previousWasLogout = store.getState().app.wasLogout;

        return store.subscribe(() => {
            let currentWasLogout = previousWasLogout;
            currentWasLogout = store.getState().app.wasLogout;

            if (currentWasLogout != previousWasLogout) {
                reset();
            }
        });
    }, [reset, store]);
};
