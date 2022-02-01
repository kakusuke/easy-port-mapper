import { contextBridge, ipcRenderer } from "electron";

const connectionChangeListeners: OnConnectionChangeListener[] = [];
const api: Api = {
    openDockerCompose: async (dir?: string): Promise<DockerComposeMapping> => {
        return await ipcRenderer.invoke('openDockerComposeConfig', dir);
    },
    connect: (item: ConnectionItem) => {
        ipcRenderer.send('connect', item);
    },
    disconnect: (item: ConnectionItem) => {
        ipcRenderer.send('disconnect', item);
    },
    onConnectionChange: listener => {
        connectionChangeListeners.push(listener);
        return () => connectionChangeListeners.slice(connectionChangeListeners.indexOf(listener), 1);
    }
};

ipcRenderer.on('connectionChange', (e, state, msg) => {
    connectionChangeListeners.forEach(l => {
        l(state, msg);
    });
});

contextBridge.exposeInMainWorld('api', api)