<script lang="ts">
  import type { Paralogue } from '../../types/paralogue.js';
  import TooltipContent from './ui/tooltip/tooltip-content.svelte';
  import TooltipProvider from './ui/tooltip/tooltip-provider.svelte';
  import TooltipTrigger from './ui/tooltip/tooltip-trigger.svelte';
  import Tooltip from './ui/tooltip/tooltip.svelte';

  import MaterialSymbolsHelp from '~icons/material-symbols/help';

  interface Props {
    paralogue: Paralogue;
  }

  let { paralogue }: Props = $props();

  let spoilerNames = ['Gilbert', 'Jeritza'];

  let spoiler = spoilerNames.includes(paralogue.characters[1]?.name);
</script>

{#snippet header(paralogue: Paralogue)}
  <span class={paralogue.characters[0].required ? 'font-bold' : 'font-normal'}>
    {paralogue.characters[0].name}
  </span>
  {#if paralogue.characters[1]}
    /
    <span
      class={[
        paralogue.characters[1].required ? 'font-bold' : 'font-normal',
        spoiler ? 'bg-black' : '',
        spoiler ? 'text-black' : '',
      ]}
    >
      {paralogue.characters[1].name}
    </span>
  {/if}
  {#if paralogue.notes}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger><MaterialSymbolsHelp /></TooltipTrigger>
        <TooltipContent>
          <p>{paralogue.notes}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  {/if}
{/snippet}

{#snippet chapter(chapter?: { start: number; end: number })}
  {#if chapter}
    {chapter.start}-{chapter.end}
  {:else}
    N/A
  {/if}
{/snippet}

<div class="w-50 min-w-min">
  {#if paralogue.chapters.wc}
    <div class="text-center">
      {@render header(paralogue)}
      (Ch. {paralogue.chapters.wc.start} - {paralogue.chapters.wc.end})
    </div>
  {:else}
    <div class="grid grid-cols-4 grid-rows-[repeat(2,20px)]">
      <div class="col-span-4 text-center">
        {@render header(paralogue)}
      </div>
      <div class="text-center">CF</div>
      <div class="text-center">SS</div>
      <div class="text-center">AM</div>
      <div class="text-center">VW</div>
      <div class="text-center">{@render chapter(paralogue.chapters.cf)}</div>
      <div class="text-center">{@render chapter(paralogue.chapters.ss)}</div>
      <div class="text-center">{@render chapter(paralogue.chapters.am)}</div>
      <div class="text-center">{@render chapter(paralogue.chapters.vw)}</div>
    </div>
  {/if}
</div>
