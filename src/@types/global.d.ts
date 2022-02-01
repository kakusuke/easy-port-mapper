declare module "*.module.css";

interface DockerComposeMapping {
    name: string;
    mappings: {
        service: string;
        ports: {
            localPort: number;
            remotePort: number;
        }[];
    }[];
}

interface ConnectionItem {
    id: string;
    remoteAddr?: string;
    ports: {
        id: string;
        localPort: number;
        remotePort: number;
    }[];
}

interface ConnectionState {
    id: string;
    state: 'unknown' | 'active' | 'inactive' | 'pending'
}

type OnConnectionChangeListener = (state: ConnectionState, msg? : string) => void;

interface Api {
    openDockerCompose: (dir?: string) => Promise<DockerComposeMapping>;
    connect: (item: ConnectionItem) => void;
    disconnect: (item: ConnectionItem) => void;
    onConnectionChange: (listener: OnConnectionChangeListener) => () => void;
}
// eslint-disable-next-line no-var
declare var api: Api;