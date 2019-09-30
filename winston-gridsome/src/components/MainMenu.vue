<template>
  <div>
    asdasdasdad
    <div v-for="edge in $static.menuItems.edges" :key="edge.node.id">{{ edge.node.name }}</div>
  </div>
</template>

<static-query>
query MainMenu {
  menuItems: allMainMenu {
    edges {
      node {
        id
        name
        url
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'MainMenu',
};
</script>