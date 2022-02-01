import { Item, itemState, PortMapping, portMappingState } from "../states/groupsState";
import React, { ChangeEvent, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PortMappingDeleteButtonProps {
    item: Item;
    port: PortMapping;
}
export default (props: PortMappingDeleteButtonProps) => {
    const setItem = useSetRecoilState(itemState(props.item.id));
    const onClick = useCallback(() => {
        setItem(old => ({...old, ports: old.ports.filter(p => p.id !== props.port.id)}));
    }, [props.port]);
    return (<button type="button" onClick={onClick}><FontAwesomeIcon icon={faMinusCircle}/></button>)
}