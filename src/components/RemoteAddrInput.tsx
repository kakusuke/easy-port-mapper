import { Item, itemState } from "../states/groupsState";
import React, { ChangeEvent, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import AutoResizeInput from "./AutoResizeInput";
import styles from './Input.module.css';


interface RemoteAddrInputProps {
    item: Item
}

export default (props: RemoteAddrInputProps) => {
    const setItem = useSetRecoilState(itemState(props.item.id));
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setItem(old => ({...old, remoteAddr: e.target.value.trim()}));
    }, []);
    return (<AutoResizeInput type="text" className={styles.full} placeholder="Enter host name"
                             value={props.item.remoteAddr || ''} onInput={onInput}/>)
}