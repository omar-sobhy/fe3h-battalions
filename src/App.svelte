<script lang="ts">
  import {
    createGrid,
    type GridOptions,
    themeQuartz,
    type ColDef,
    type ICellRendererParams,
    type GridApi,
    type ColGroupDef,
    type ValueGetterParams,
  } from 'ag-grid-community';

  import data from './assets/battalions.json';
  import { mount, onMount } from 'svelte';
  import type { Battalion } from './types/battalion.js';
  import ParalogueDef from './lib/components/ParalogueDef.svelte';
  import { mode, ModeWatcher, toggleMode } from 'mode-watcher';
  import MaterialSymbolsHelp from '~icons/material-symbols/help';
  import MaterialSymbolsDarkMode from '~icons/material-symbols/dark-mode';
  import Menubar from './lib/components/ui/menubar/menubar.svelte';
  import MenubarContent from './lib/components/ui/menubar/menubar-content.svelte';
  import MenubarMenu from './lib/components/ui/menubar/menubar-menu.svelte';
  import MenubarTrigger from './lib/components/ui/menubar/menubar-trigger.svelte';
  import Button from './lib/components/ui/button/button.svelte';
  import DropdownMenuCheckboxItem from './lib/components/ui/dropdown-menu/dropdown-menu-checkbox-item.svelte';
  import BattalionDef from './lib/components/BattalionDef.svelte';

  let table: HTMLDivElement;

  const paralogueColDef: ColDef<Battalion> = {
    headerName: 'Paralogue',
    autoHeight: true,
    width: 300,
    suppressAutoSize: true,
    cellStyle: {
      display: 'flex',
      justifyContent: 'center',
    },
    cellRenderer(p: ICellRendererParams<Battalion, string>) {
      const paralogue = p.data?.paralogue;

      if (!paralogue) {
        return '';
      }

      const el = document.createElement('div');
      mount(ParalogueDef, {
        target: el,
        props: {
          paralogue,
        },
      });

      return el;
    },
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  });

  function formatPrice(price?: number) {
    if (!price) {
      return '';
    }

    return formatter.format(price);
  }

  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      field: 'battalion',
      colId: 'battalion',
      sort: 'asc',
      pinned: 'left',
      filter: true,
      cellRenderer(p: ICellRendererParams<Battalion>) {
        if (!p.data) {
          return '';
        }

        const el = document.createElement('div');

        mount(BattalionDef, {
          target: el,
          props: {
            name: p.data.battalion,
            notes: p.data.notes,
          },
        });

        return el;
      },
    },
    { sortable: true, filter: true, field: 'authority', colId: 'authority' },
    { sortable: true, filter: true, field: 'phys', colId: 'phys' },
    { sortable: true, filter: true, field: 'mag', colId: 'mag' },
    { sortable: true, filter: true, field: 'hit', colId: 'hit' },
    { sortable: true, filter: true, field: 'crit', colId: 'crit' },
    { sortable: true, filter: true, field: 'avo', colId: 'avo' },
    { sortable: true, filter: true, field: 'prot', colId: 'prot' },
    { sortable: true, filter: true, field: 'res', colId: 'res' },
    { sortable: true, filter: true, field: 'cha', colId: 'cha' },
    { sortable: true, filter: true, field: 'movement', colId: 'movement' },
    { sortable: true, filter: true, field: 'gambit', colId: 'gambit' },
    {
      sortable: true,
      filter: true,
      field: 'cf',
      headerName: 'CF',
      colId: 'cf',
    },
    {
      sortable: true,
      filter: true,
      field: 'ss',
      headerName: 'SS',
      colId: 'ss',
    },
    {
      sortable: true,
      filter: true,
      field: 'am',
      headerName: 'AM',
      colId: 'am',
    },
    {
      sortable: true,
      filter: true,
      field: 'vw',
      headerName: 'VW',
      colId: 'vw',
    },
    paralogueColDef,
    {
      headerName: 'Shop',
      headerStyle: {
        'text-align': 'center',
      },
      children: [
        {
          valueGetter(p: ValueGetterParams<Battalion>) {
            return formatPrice(
              p.data?.shop?.find((s) => s.chapter === 3)?.price,
            );
          },
          headerName: 'Ch. 3',
        },
        {
          valueGetter(p: ValueGetterParams<Battalion>) {
            return formatPrice(
              p.data?.shop?.find((s) => s.chapter === 8)?.price,
            );
          },
          headerName: 'Ch. 8',
        },
        {
          valueGetter(p: ValueGetterParams<Battalion>) {
            return formatPrice(
              p.data?.shop?.find((s) => s.chapter === 12)?.price,
            );
          },
          headerName: 'Ch. 12',
        },
        {
          valueGetter(p: ValueGetterParams<Battalion>) {
            return formatPrice(
              p.data?.shop?.find((s) => s.chapter === 14)?.price,
            );
          },
          headerName: 'Ch. 14',
        },
      ],
    },
    {
      headerName: 'Quest',
      autoHeight: true,
      cellRenderer(p: ICellRendererParams<Battalion>) {
        const special = p.data?.special;
        if (special) {
          const el = document.createElement('p');
          el.classList.add('italic');
          el.textContent = special;
          return el;
        }

        const quest = p.data?.quest;
        if (!quest) {
          return '';
        }

        const entries = Object.entries(quest);

        const formatted = entries.map(([k, v]) => {
          if ('chapter' in v) {
            return `${k} (Ch. ${v.chapter})`;
          }

          const chapters = v.map(
            (v) => `Ch. ${v.chapter} ${v.route.toUpperCase()}`,
          );

          return `${k} (${chapters.join(', ')})`;
        });

        const elements = formatted.map((f) => {
          const el = document.createElement('p');
          el.textContent = f;
          return el;
        });

        const cell = document.createElement('div');
        cell.append(...elements);

        return cell;
      },
    },
  ];

  const gridOptions: GridOptions = {
    rowData: data,
    theme: themeQuartz.withParams({ wrapperBorderRadius: 0 }),
    suppressCellFocus: true,
    autoSizeStrategy: {
      type: 'fitCellContents',
    },
    suppressColumnVirtualisation: true,
    suppressRowVirtualisation: true,
    enableCellSpan: true,
    suppressRowHoverHighlight: true,
    columnDefs,
    enableCellTextSelection: true,
  };

  let api: GridApi;

  onMount(() => {
    table!.setAttribute(
      'data-ag-theme-mode',
      mode.current === 'dark' ? 'dark-blue' : 'lignt',
    );
    api = createGrid(table!, gridOptions);
  });

  const columns = $state([
    { include: true, name: 'Battalion' },
    { include: true, name: 'Authority' },
    { include: true, name: 'Phys' },
    { include: true, name: 'Mag' },
    { include: true, name: 'Hit' },
    { include: true, name: 'Crit' },
    { include: true, name: 'Avo' },
    { include: true, name: 'Prot' },
    { include: true, name: 'Res' },
    { include: true, name: 'Cha' },
    { include: true, name: 'Movement' },
    { include: true, name: 'Gambit' },
    { include: true, name: 'Paralogue' },
    { include: true, name: 'Quest' },
    { include: true, name: 'Shop' },
  ]);

  function toggleColumn(name: string, visible: boolean) {
    const cols = api.getColumns();

    const col = cols?.find((c) => c.getColId() === name.toLowerCase());

    if (!col) {
      return;
    }

    api.setColumnsVisible([col], visible);
  }

  function toggleTheme() {
    toggleMode();

    table!.setAttribute(
      'data-ag-theme-mode',
      mode.current === 'dark' ? 'dark-blue' : 'lignt',
    );
  }
</script>

<ModeWatcher defaultMode={'dark'} />
<main class="flex flex-col grow-[1_90] w-full h-full p-5">
  <div class="flex justify-center">
    <Menubar
      class="w-85/100 bg-[#bbbbbb] dark:bg-[#1f324d] rounded-none rounded-t-lg rounded-tr-lg"
    >
      <Button variant="ghost" onclick={toggleTheme}>
        <MaterialSymbolsDarkMode />
      </Button>
      <MenubarMenu>
        <MenubarTrigger>Columns</MenubarTrigger>
        <MenubarContent>
          {#each columns as column}
            <DropdownMenuCheckboxItem
              closeOnSelect={false}
              bind:checked={column.include}
              onCheckedChange={(checked: boolean) =>
                toggleColumn(column.name, checked)}
            >
              <option>{column.name}</option>
            </DropdownMenuCheckboxItem>
          {/each}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>
  <div class="w-full h-full flex justify-center">
    <div id="table" bind:this={table} class="w-85/100 h-full"></div>
  </div>
</main>
