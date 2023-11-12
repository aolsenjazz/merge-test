import { app } from 'electron';
import os from 'os';

import { ProjectManager as pm } from './project-manager';
import { WindowService as ws } from './window-service';
import { SaveOpenService as sos } from './save-open-service';
import { DialogService as ds } from './dialog-service';
import { MenuProvider as mp } from './menu';
import { projectFromFile } from './util-main';
import './port-service';

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
      .then(() => {
        mp.buildMenu(null);
        ws.createMainWindow();
        return true;
      })
      .catch(console.log);
  }

  private subscribeToWindowAllClosed() {
    app.on('window-all-closed', () => {}); // do nothing, continue to run
  }

  private subscribeToOpenFile() {
    app.on('open-file', (_event: Event, filePath: string) => {
      // TODO: this will be untested until packaged
      app.addRecentDocument(filePath);

      const proj = projectFromFile(filePath);

      // ws.sendTitle(path.basename(filePath));
      pm.setProject(proj);
      ws.setEdited(false);

      sos.currentPath = filePath;
    });
  }

  private subscribeToBeforeQuit() {
    app.on('before-quit', () => {
      if (ws.edited === true) {
        const doSave = ds.unsavedCheckSync();
        if (doSave === true) sos.saveSync(pm.getProject());
      }
    });
  }

  /**
   * OSX: Invoked when user clicks on app icon in system tray
   * Windows: TODO: unknown
   * Linux: TODO: unknown
   */
  private subscribeToActivate() {
    return app.on('activate', () => {
      if (os.platform() === 'darwin') {
        ws.createMainWindow();
      }
    });
  }
}

export const Lifecycle = LifecycleSingleton.getInstance();

// export const Background = {
//   /* Invoked when a new window has opened and finished loading index.html */
//   onDidFinishLoad() {
//     ws.sendProject(pm.getProject());
//     ws.setEdited(ws.edited);
//   },

//   /* MENU/KEYBINDS */

//   /* File->New or cmd+N */
//   onNew() {
//     sos.currentPath = undefined;

//     // return unsavedCheck().then(() => {
//     //   // this.project = new Project(); TODO: this needs to be changed
//     //   // ps.project = this.project; TODO: this needs to go
//     //   ws.sendProject(new Project()); // TODO: this isn't correct anymore
//     //   ws.setEdited(false);
//     //   return ws.sendTitle('Untitled Project');
//     // });
//   },

//   /* File->SaveAs or shift+cmd+s */
//   onSaveAs() {
//     return sos
//       .saveAs(pm.getProject())
//       .then(() => path.basename(sos.currentPath!))
//       .then((fName: string) => ws.sendTitle(fName))
//       .then(() => ws.setEdited(false));
//   },

//   /* File->Save or cmd+s */
//   onSave() {
//     return sos
//       .save(pm.getProject())
//       .then(() => path.basename(sos.currentPath!))
//       .then((fName: string) => ws.sendTitle(fName))
//       .then(() => ws.setEdited(false));
//   },

//   /* File->Open or cmd+O */
//   onOpen() {
//     sos
//       .open()
//       .then((fPath: string) => this.onOpenFile(fPath))
//       .catch(() => {}); // ignore cancel dialogs
//   },
// };
