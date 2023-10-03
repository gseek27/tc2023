<template>
  <div>
    <v-subheader>Who to follow</v-subheader>
    <v-list>
      <v-list-item v-for="user in users" :key="user.name" link>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn text>Follow</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    users: Array
  }
}
</script>
