import { Item, itemState, PortMapping, portMappingState } from "../states/groupsState";
import React, { ChangeEvent, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import * as uuid from 'uuid';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PortMappingAddButtonProps {
    item: Item;
}
export default (props: PortMappingAddButtonProps) => {
    const setItem = useSetRecoilState(itemState(props.item.id));
    const onClick = useCallback(() => {
        setItem(old => ({
            ...old,
            ports: old.ports.concat([{
                id: uuid.v4(),
                localPort: 8080,
                remotePort: 8080
            }])
        }));
    }, []);
    return (<button type="button" onClick={onClick}><FontAwesomeIcon icon={faPlusCircle}/></button>)
}