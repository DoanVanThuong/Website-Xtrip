import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ScriptStore} from '../../script.store';
import {isPlatformBrowser} from '@angular/common';

declare var document: any;

@Injectable()
export class Script {

  protected static scriptList: any = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      ScriptStore.forEach((script: any) => {
        if (!Script.scriptList[script.name]) {
          Script.scriptList[script.name] = {
            loaded: false,
            src: script.src
          };
        }
      });
    }
  }

  // fn load
  load = (scripts: string[] = []) => {
    let promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));

    return Promise.all(promises);
  };

  // fn load script
  loadScript = (name: string) => {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (Script.scriptList[name].loaded) {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      } else {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = Script.scriptList[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              Script.scriptList[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  //Others
          script.onload = () => {
            Script.scriptList[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  };
}
