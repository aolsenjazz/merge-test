/* eslint-disable @typescript-eslint/no-explicit-any */

// v1 imports
import { SupportedDeviceConfig } from '@shared/hardware-config';
import { PadConfig } from '@shared/hardware-config/input-config';
import { Project } from '@shared/project';
import { parse } from '@shared/util';
import { upgradeToV1 } from './upgrades/v0';
import { upgradeToV2 } from './upgrades/v1';
import { upgradeToV3 } from './upgrades/v2';
import { upgradeToV4 } from './upgrades/v3';
import { upgradeToV5 } from './upgrades/v4';

const upgradeFns = new Map<number, (projectString: string) => string>();

export function upgradeProject(projectString: string) {
  const asObj = JSON.parse(projectString);
  if (asObj.version === Project.CURRENT_VERSION) {
    return parse<Project>(projectString);
  }

  // saves files originally didn't store any version number
  if (!asObj.version) {
    asObj.version = 0;
  }

  // apply sequential updates to Project objects
  let upgradedProject = projectString;
  for (let i = asObj.version; i < Project.CURRENT_VERSION; i++) {
    upgradedProject = upgradeFns.get(i)!(upgradedProject);
  }

  const p = parse<Project>(upgradedProject);

  p.devices
    .filter((d) => d.driverName === 'APC Key 25')
    .forEach((d) => {
      (d as SupportedDeviceConfig).inputs.forEach((i) => {
        if (i instanceof PadConfig && i.defaults.number === 32) {
          console.log(i.devicePropagator);
        }
      });
    });
  return p;
}

upgradeFns.set(0, upgradeToV1);
upgradeFns.set(1, upgradeToV2);
upgradeFns.set(2, upgradeToV3);
upgradeFns.set(3, upgradeToV4);
upgradeFns.set(4, upgradeToV5);
