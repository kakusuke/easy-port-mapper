import { Group, groupsState } from "../states/groupsState";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DeleteGroupButtonProps {
    group: Group;
}
export default (props: DeleteGroupButtonProps) => {
    const setGroups = useSetRecoilState(groupsState);
    const onClick = useCallback(() => {
        setGroups(old => (old.filter(g => g.id !== props.group.id)));
    }, [props.group]);
    return (<button type="button" onClick={onClick}><FontAwesomeIcon icon={faMinusCircle}/></button>)
}