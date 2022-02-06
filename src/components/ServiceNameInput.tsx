import { Item, itemState } from "../states/groupsState";
import React, { ChangeEvent, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import AutoResizeInput from "./AutoResizeInput";
import styles from './Input.module.css';

interface ServiceNameInputProps {
    item: Item
}

export default (props: ServiceNameInputProps) => {
    const setItem = useSetRecoilState(itemState(props.item.id));
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setItem(old => ({...old, service: e.target.value.trim()}));
    }, []);
    return (<AutoResizeInput type="text" className={styles.full} value={props.item.service || ''}
                             onInput={onInput}/>)
}