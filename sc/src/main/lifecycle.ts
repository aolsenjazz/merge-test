import { app, Event } from 'electron';
import os from 'os';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-extension-installer';

import { WindowProvider } from './window-provider';
import { dialogs } from './dialogs';
import { AppMenu as am } from './menu';

import './port-service';
import './ipc';
import { loadProject, save } from './project';

const { MainWindow } = WindowProvider;

/**
 * As of 10/29/2024, devtools extensions constantly complain in the terminal.
 * No library has fixed this yet, but maybe the next time this is revisited,
 * there will be a more robust solution offered by someone.
 */
async function installRDT() {
  const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

  if (isDebug) {
    await installExtension(REACT_DEVELOPER_TOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    });
    await installExtension(REDUX_DEVTOOLS);
  }
}

class LifecycleSingleton {
  private static instance: LifecycleSingleton;

  private constructor() {
    this.subscribeToWindowAllClosed();
    this.subscribeToOpenFile();
    this.subscribeToBeforeQuit();
    this.subscribeToActivate();
  }

  public static getInstance() {
    if (!LifecycleSingleton.instance) {
      LifecycleSingleton.instance = new LifecycleSingleton();
    }

    return LifecycleSingleton.instance;
  }

  public start() {
    app
      .whenReady()
      .then(async () => {
        await installRDT();

        am.buildMenu(null);
        MainWindow.create();
        return true;
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }

  private subscribeToWindowAllClosed() {
    app.on('window-all-closed', () => {}); // do nothing, continue to run
  }

  /**
   * OSX: Invoked when opening a recent document from File->Open recent submenu
   */
  private subscribeToOpenFile() {
    app.on('open-file', async (_event: Event, filePath: string) => {
      if (MainWindow.edited === true) {
        const doSave = dialogs.unsavedCheck();
        if (doSave === true) await save();
      }
      loadProject(filePath);
    });
  }

  private subscribeToBeforeQuit() {
    app.on('before-quit', async () => {
      if (MainWindow.edited === true) {
        const doSave = dialogs.unsavedCheck();
        if (doSave === true) await save();
      }
    });
  }

  /**
   * OSX: Invoked when user clicks on app icon in system tray
   * Windows: Does nothing
   * Linux: Does nothing
   */
  private subscribeToActivate() {
    return app.on('activate', () => {
      if (os.platform() === 'darwin') {
        MainWindow.create();
      }
    });
  }
}

export const Lifecycle = LifecycleSingleton.getInstance();
