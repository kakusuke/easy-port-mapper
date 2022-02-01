import React, { useCallback } from "react";
import { groupsState } from "../states/groupsState";
import { useSetRecoilState } from "recoil";
import * as uuid from "uuid";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
    const setGroupsState = useSetRecoilState(groupsState);
    const onClick = useCallback(async () => {
        const compose = await api.openDockerCompose();
        setGroupsState(old => old.concat({
            id: uuid.v4(),
            name: compose.name,
            list: compose.mappings.map(mapping => ({
                id: uuid.v4(),
                service: mapping.service,
                ports: mapping.ports.map(p => ({id: uuid.v4(), ...p}))
            }))
        }));
    }, []);
    return (<button onClick={onClick}><FontAwesomeIcon icon={faDocker}/> Import</button>);
}