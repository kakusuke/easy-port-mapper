import { atom, selectorFamily } from "recoil";

export interface Connection {
    id: string;
    state: 'active' | 'inactive' | 'pending' | 'unknown';
}

export const connectionsState = atom<Connection[]>({
    key: 'connectionsState',
    default: []
});

export const connectionState = selectorFamily<Connection, string>({
    key: 'connectionState',
    get: id => ({get}) => {
        const connections = get(connectionsState);
        const con = connections.find(c => c.id === id);
        return con != null ? con : {id, state: 'unknown'};
    },
    set: id => ({get, set}, newVal) => {
        const connections = get(connectionsState);
        const newConnections = connections.filter(c => c.id !== id).concat('__tag' in newVal ? [] : [newVal]);
        set(connectionsState, newConnections);
    },
});