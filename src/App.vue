<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section columns">
      <main class="column">
        <Index />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar';
import Index from '@/components/index';

export default {
  name: 'App',
  components: { HeaderBar, Index },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
