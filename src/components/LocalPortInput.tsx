import { PortMapping, portMappingState } from "../states/groupsState";
import React, { ChangeEvent, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import AutoResizeInput from "./AutoResizeInput";
import styles from "./Input.module.css";

interface LocalPortInputProps {
    port: PortMapping
}

export default (props: LocalPortInputProps) => {
    const setPort = useSetRecoilState(portMappingState(props.port.id));
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const port = parseInt(e.target.value.trim());
        setPort(old => ({...old, localPort: Number.isNaN(port) ? 0 : port}));
    }, []);
    return (
        <AutoResizeInput type="number" className={styles.port} value={props.port.localPort || ''}
                         onInput={onInput}/>)
}