import { mount } from 'svelte';
import App from './App.svelte';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
