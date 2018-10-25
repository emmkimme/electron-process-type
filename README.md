# electron-process-type
A simple helper for having the process type running your code :
- 'node'
- 'browser' / 'main'
- 'renderer'

Dependencies
* http://nodejs.org/

# API
## v1/GetElectronProcessType(): 'node' | 'browser' | 'renderer';
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
        default: {
            const { EnvironmentNode } = require('./envNode');
            localInstance = new EnvironmentNode();
            break;
        }
    }
    return localInstance;
}
```

## v2/GetElectronProcessType(): 'node' | 'main' | 'renderer';
The process.type *'browser'* introduces a lot of confusions as the notion of 'browser' process is more considered as a 'renderer' process : browserify, index-browser, [Browser or Node](https://github.com/flexdinesh/browser-or-node), ...  
As Electron documentation, we use the term of 'main' rather than 'browser'. We keep 'renderer'.

```ts
import { GetElectronProcessType } from 'electron-process-type/lib/v2';

export function CreateEnvironment(): Environment {
    const processType = GetElectronProcessType();
    switch (processType) {
        case 'renderer': {
...
            break;
        }
        case 'main': {
...
            break;
        }
        default: {
...
            break;
        }
    }
    return localInstance;
}
```

## v3/GetElectronProcessType(): 'node' | 'main' | 'browser';
*BEWARE 'renderer' becomes 'browser' !!*

```ts
import * as electronProcessType from 'electron-process-type';

export function CreateEnvironment(): Environment {
    const processType = electronProcessType.v3.GetElectronProcessType();
    switch (processType) {
        case 'browser': {
...
            break;
        }
        case 'main': {
...
            break;
        }
        default: {
...
            break;
        }
    }
    return localInstance;
}
```