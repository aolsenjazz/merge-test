import { BasePluginManifest } from '../../core/base-plugin-manifest';

const Manifest: BasePluginManifest = {
  title: 'Share Sustain',
  description:
    'Whenever a sustain event is received from the controller, send an identical sustain event through other selected controllers.',
  gui: 'share-sustain/renderer/ShareSustainPlugin.tsx',
  plugin: 'share-sustain/index.ts',
};

export default Manifest;
