# JavaScript Execution Context (electron-process-type)
A function which returns the execution context of your code.

You know the engine which is executing your code:
- NodeJS runtime
- Browser runtime
- Electron runtime (NodeJS and Chromium, depends of the environment)

You know which are the environments / api available :
- NodeJS
- Browser
- Worker
- Electron

Runtime / Environment | Node | Browser | Electron
----------- |:----:|:-------:|:--------:|
Node        | X |   | X |
Browser     |   | X | X |
Worker      | WorkerThread | WebWorker | X |
Electron    |   |   | X |

Few examples :
- Electron runtime + Browser env = Electron renderer
- Electron runtime + Node env + Electron env = Electron main process
- Electron runtime + Node env = Electron NodeJS process
- Browser runtime + Browser env = Pure browser
- NodeJS runtime + NodeJS env = Pure NodeJS process
- ...

Worker, ServiceWorker, SharedWorker detection is still experimental/partial


This API works in any kind of processes (not only Electron): Electron, Node, Browser, ...

In Electron, the detection uses the Electron API [process.type](https://electronjs.org/docs/api/process#processversionschrome) but there is some limitations.  
It does not work properly in following contexts :
* in a node process
* in a renderer when Chromium is in sandbox (--enable-sandbox=true)
* in a renderer when Renderer is in sandbox=true
* in a renderer when nodeIntegration=false
* in preload file of a renderer


Dependencies
* http://nodejs.org/


# API
## function GetExecutionContext(): ExecutionContext;
```ts
export enum ExecutionContext {
    Undefined         = 0,
    Node              = NodeEnv | NodeRuntime,
    Browser           = BrowserEnv | BrowserRuntime,
    WebWorker         = WorkerEnv | BrowserRuntime,
    WorkerThread      = WorkerEnv | NodeRuntime,
    ElectronThread    = WorkerEnv | ElectronRuntime,
    ElectronNode      = NodeEnv | ElectronRuntime,
    ElectronBrowser   = BrowserEnv | ElectronRuntime,
    ElectronMain      = NodeEnv | ElectronEnv | ElectronRuntime
}
```
return the current execution context.

## function IsContextNode(): boolean
Check if you are running in a NodeJS context: pure NodeJS process, Electron NodeJS process, Electron Main NodeJS process.

## function IsContextBrowser(): boolean;
Check if you are running in a Browser (Navigator) context: pure Browser, Electron browser.

## function IsContextWorker(): boolean;
Check if you are running in a Worker.

## function IsProcessElectron(): boolean;
Check if you are running in a Electron process: Electron NodeJS process, Electron Main NodeJS process, Electron browser.
