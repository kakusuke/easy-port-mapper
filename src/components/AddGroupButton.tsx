import React, { useCallback } from "react";
import { groupsState } from "../states/groupsState";
import { useSetRecoilState } from "recoil";
import * as uuid from "uuid";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
    const setGroupsState = useSetRecoilState(groupsState);
    const onClick = useCallback(async () => {
        setGroupsState(old => old.concat({
            id: uuid.v4(),
            name: 'New Group',
            list: []
        }));
    }, []);
    return (<button onClick={onClick}><FontAwesomeIcon icon={faPlusCircle}/></button>);
}