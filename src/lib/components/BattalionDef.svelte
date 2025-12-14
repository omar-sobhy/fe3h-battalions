<script lang="ts">
  import MaterialSymbolsHelp from '~icons/material-symbols/help';
  import TooltipContent from './ui/tooltip/tooltip-content.svelte';
  import TooltipProvider from './ui/tooltip/tooltip-provider.svelte';
  import TooltipTrigger from './ui/tooltip/tooltip-trigger.svelte';
  import Tooltip from './ui/tooltip/tooltip.svelte';

  interface Props {
    name: string;
    notes?: string;
  }

  const { name, notes }: Props = $props();
</script>

<span>
  {name}
</span>
{#if notes}
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger><MaterialSymbolsHelp /></TooltipTrigger>
      <TooltipContent>{notes}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
{/if}
