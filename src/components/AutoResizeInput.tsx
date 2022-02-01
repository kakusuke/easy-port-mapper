import React, {
    CSSProperties,
    DetailedHTMLProps,
    InputHTMLAttributes, useEffect, useLayoutEffect,
    useMemo,
    useRef, useState
} from "react";

import styles from './AutoResizeInput.module.css';

export default (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const ref = useRef<HTMLSpanElement>();
    const target = useRef<HTMLInputElement>();
    useEffect(() => {
        target.current.style.width = Math.max(ref.current.offsetWidth, 12) + 'px';
        const observer = new ResizeObserver(() => {
            target.current.style.width = Math.max(ref.current.offsetWidth, 12) + 'px';
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (<>
        <span ref={ref} className={`shadow ${styles.shadow}`}>{props.value}</span>
        <input {...props} ref={target} className={`${props.className || ''} ${styles.target}`} />
    </>)
}