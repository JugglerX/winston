<template>
  <div class="header">
    <g-link class="header-logo" to="/">{{ $static.metadata.siteName }}</g-link>
    <div id="toggle-main-menu-mobile" class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  name: 'Header',
};
</script>