<template>
  <div>
    <MainMenu />
    <div id="wrapper" class="wrapper">
      <Header />
      <slot />
      <!-- {{ partial "footer.html" . }} -->
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import MainMenu from '~/components/MainMenu.vue';

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Header,
    MainMenu,
  },
};
</script>