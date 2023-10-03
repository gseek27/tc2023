<template>
  <v-list>
    <v-list-item v-for="item in menuItems" :key="item" link>
      <v-list-item-content>
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    menuItems: ["Home", "Explore", "Notifications", "Messages", "Lists", "Communities", "Verified Orgs", "Profile", "Bookmarks", "Top Articles"]
  })
}
</script>
