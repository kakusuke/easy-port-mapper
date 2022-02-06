import { Group, groupState } from "../states/groupsState";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import * as uuid from 'uuid';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PortMappingAddButtonProps {
    group: Group;
}

export default (props: PortMappingAddButtonProps) => {
    const setGroup = useSetRecoilState(groupState(props.group.id));
    const onClick = useCallback(() => {
        setGroup(old => ({
            ...old,
            list: old.list.concat([{
                id: uuid.v4(),
                service: '',
                remoteAddr: '',
                ports: []
            }])
        }));
    }, []);
    return (<button type="button" onClick={onClick}><FontAwesomeIcon icon={faPlusCircle}/></button>)
}