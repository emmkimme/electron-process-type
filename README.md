# electron-process-type
This API works in any kind of processes (not only Electron): Electron, Node, Browser, ...

The Electron process.type has some limitations.
It does not work in following context :
* in a node process
* in a renderer when Chromium is in sandbox (--enable-sandbox=true)
* in a renderer when Renderer is in sandbox=true
* in a renderer when nodeIntegration=false
* in preload file of a renderer

This is a simple helper which returns the process type hosting your code whatever the context :
- 'node' / 'electron-node' (NodeJS API but No Electron API available)
- 'browser' / 'main' / 'electron-main-node' (NodeJS and Electron APIs available)
- 'renderer' / 'browser' / 'electron-browser' (Browser API)
- 'worker'

There are different versions which use either Electron semantic (renderer, main) or Browser semantic (browser, electron-main-node).

Dependencies
* http://nodejs.org/


# API
## v1/GetElectronProcessType(): 'undefined' | 'node' | 'browser' | 'renderer' | 'worker';
Returns a string compatible with Electron [process.type](https://electronjs.org/docs/api/process#processversionschrome)

```ts
import { GetElectronProcessType } from 'electron-process-type';

export function CreateEnvironment(): Environment {
    const processType = GetElectronProcessType();
    switch (processType) {
        case 'renderer': {
            const { EnvironmentRenderer } = require('./envRenderer');
            localInstance = new EnvironmentRenderer();
            break;
        }
        case 'browser': {
            const { EnvironmentMaster } = require('./envMaster');
            localInstance = new EnvironmentMaster();
            break;
        }
        case 'worker': {
            const { EnvironmentMaster } = require('./envWorker');
            localInstance = new EnvironmentMaster();
            break;
        }
        default: {
            const { EnvironmentNode } = require('./envNode');
            localInstance = new EnvironmentNode();
            break;
        }
    }
    return localInstance;
}
```

## v2/GetElectronProcessType(): 'undefined' | 'node' | 'main' | 'renderer' | 'worker';
The process.type *'browser'* introduces a lot of confusions as the notion of 'browser' process is more considered as a 'renderer' process : browserify, index-browser, [Browser or Node](https://github.com/flexdinesh/browser-or-node), ...  
As Electron documentation, we use the term of 'main' rather than 'browser'. We keep 'renderer'.

```ts
import { GetElectronProcessType } from 'electron-process-type/lib/v2';

export function CreateEnvironment(): Environment {
    const processType = GetElectronProcessType();
    switch (processType) {
        case 'renderer':
            ...
            break;

        case 'node':
        case 'main':
            ...
            break;

        default:
            ...
            break;
    }
    return localInstance;
}
```

## v3/GetElectronProcessType(): 'undefined' | 'node' | 'main' | 'browser' | 'worker';
*BEWARE 'renderer' becomes 'browser' !!*

```ts
import * as electronProcessType from 'electron-process-type';

export function CreateEnvironment(): Environment {
    const processType = electronProcessType.v3.GetElectronProcessType();
    switch (processType) {
        case 'browser':
            ...
            break;

        case 'node':
        case 'main':
            ...
            break;

        default:
            ...
            break;
    }
    return localInstance;
}
```

## v4/GetElectronProcessType(): 'undefined' | 'electron-node' | 'electron-main-node' | 'electron-browser' | 'browser' | 'node' | 'worker';
Identify node process running under Electron ('electron-node' / 'electron-main-node') vs pure node process ('node')
```ts
import * as electronProcessType from 'electron-process-type';

export function CreateEnvironment(): Environment {
    const processType = electronProcessType.v4.GetElectronProcessType();
    switch (processType) {
        case 'browser':
            ...
            break;

        case 'node':
        case 'electron-node':
        case 'electron-main-node':
            ...
            break;
    
        case 'worker':
            ...
            break;

        default:
            ...
            break;
    }
    return localInstance;
}
```

