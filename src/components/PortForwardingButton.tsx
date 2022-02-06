import React, { useCallback, useEffect, useState } from 'react';
import { Item } from "../states/groupsState";
import { useRecoilState } from "recoil";
import { connectionState } from "../states/connectionState";
import styles from './Button.module.css';

interface PortForwardingButtonProps {
    item: Item;
}

export default (props: PortForwardingButtonProps) => {
    const [conn, setConn] = useRecoilState(connectionState(props.item.id));
    const [msg, setMsg] = useState<string>();
    const toggle = useCallback(() => {
        switch (conn.state) {
            case 'unknown':
            case 'inactive':
                api.connect(props.item);
                break;
            case 'active':
                api.disconnect(props.item);
                break;
        }
    }, [conn.state, props.item]);

    useEffect(() => {
        return api.onConnectionChange((state, message) => {
            if (state.id !== props.item.id) return;
            if (message) {
                setMsg(message);
            }
            setConn(state);
        });
    }, [props.item.id]);

    const buttonClass = `${styles.switch} ${(() => {
        switch (conn.state) {
            case('unknown'):
            case('inactive'):
                return styles.switchInactive;
            case('pending'):
                return styles.switchPending;
            case('active'):
                return styles.switchActive;
        }
    })()}`;
    return (
        <span>
          <span className={styles.switchWrapper}>
              OFF <button onClick={toggle} className={buttonClass}/> ON
          </span>
            {msg ? <p>{msg}</p> : ''}
      </span>
    );
}