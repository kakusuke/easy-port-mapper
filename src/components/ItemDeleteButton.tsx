import { Group, groupState, Item } from "../states/groupsState";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ItemDeleteButtonProps {
    group: Group;
    item: Item;
}

export default (props: ItemDeleteButtonProps) => {
    const setGroup = useSetRecoilState(groupState(props.group.id));
    const onClick = useCallback(() => {
        setGroup(old => {
            console.log(old)
            return ({...old, list: old.list.filter(p => p.id !== props.item.id)})
        });
    }, [props.item]);
    return (
        <button type="button" onClick={onClick}><FontAwesomeIcon icon={faMinusCircle}/></button>)
}