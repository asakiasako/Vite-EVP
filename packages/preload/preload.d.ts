interface ElectronAPI {
    app: {
        getName(): Promise<string>;
        getVersion(): Promise<string>;
    },
    shell: {
        openExternal(url?: string): void;
    },
    dialog: {
        showErrorBox(title: string, content: string): void;
    }
}

interface RpcClient {
    waitForReady(timeout: number = Infinity): Promise<void>;
    listApis(timeout?: number): Promise<Array<string>>;
    request(options: object, timeout?: number): any;
}

declare interface Exposed {
    electronAPI: ElectronAPI;
    rpcClient: RpcClient;
}

interface Window extends Exposed {}
