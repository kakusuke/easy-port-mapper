import { atom, AtomEffect, selectorFamily } from "recoil";

export interface PortMapping {
    id: string;
    localPort: number;
    remotePort: number;
}

export interface Item {
    id: string;
    service: string;
    remoteAddr?: string;
    ports: PortMapping[];
}

export interface Group {
    id: string;
    name: string;
    list: Item[];
}

const localStorageEffect: (key: string) => AtomEffect<Group[]> = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const groupsState = atom<Group[]>({
    key: 'groups',
    default: [],
    effects: [
        localStorageEffect('groupsState')
    ]
});

export const groupState = selectorFamily<Group, string>({
    key: 'group',
    get: (id: string) => ({get}) => {
        const groups = get(groupsState);
        return groups.find(g => g.id === id);
    },
    set: (id: string) => ({get, set}, newValue) => {
        const groups = get(groupsState);
        set(groupsState, groups.map(g => g.id === id ? newValue : g));
    }
});

export const itemState = selectorFamily<Item, string>({
    key: 'item',
    get: (id: string) => ({get}) => {
        const groups = get(groupsState);
        return groups.flatMap(g => g.list).find(i => i.id === id);
    },
    set: (id: string) => ({get, set}, newValue) => {
        const groups = get(groupsState);
        const group = groups.find(g => g.list.some(i => i.id === id));
        set(groupState(group.id), {...group, list: group.list.map(i => i.id === id ? newValue : i)});
    }
});

export const portMappingState = selectorFamily<PortMapping, string>({
    key: 'portMapping',
    get: (id: string) => ({get}) => {
        const groups = get(groupsState);
        return groups.flatMap(g => g.list).flatMap(i => i.ports).find(p => p.id === id);
    },
    set: (id: string) => ({get, set}, newValue) => {
        const groups = get(groupsState);
        const port = groups.flatMap(g => g.list).flatMap(i => i.ports).find(p => p.id === id);
        const item = groups.flatMap(g => g.list).find(i => i.ports.includes(port));
        set(itemState(item.id), {...item, ports: item.ports.map(p => p === port ? newValue : port)})
    }
});