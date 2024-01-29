import { server } from "../bff";
import { useCallback } from "react";
import { selectUserSession } from "../selectors";
import { useSelector } from "react-redux";

export const useServerRequest = (operation, ...params) => {
    const session = useSelector(selectUserSession);

    return useCallback(
        (operation, ...params) => {
            const request = ["register", "authorize"].includes(operation)
                ? params
                : [session, ...params];

            return server[operation](...request);
        },
        [session]
    );
};
