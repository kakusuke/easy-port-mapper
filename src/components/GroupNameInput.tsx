import { Group, groupState } from "../states/groupsState";
import React, { ChangeEvent, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import AutoResizeInput from "./AutoResizeInput";

interface GroupNameInputProps {
    group: Group
}

export default (props: GroupNameInputProps) => {
    const setGroup = useSetRecoilState(groupState(props.group.id));
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setGroup(old => ({...old, name: e.target.value.trim()}));
    }, []);
    return (<AutoResizeInput type="text" value={props.group.name || ''} onInput={onInput}/>)
}