<template>
  <div>
    <v-subheader>What's happening</v-subheader>
    <v-list>
      <v-list-item v-for="topic in topics" :key="topic.title" link>
        <v-list-item-content>
          <v-list-item-title>{{ topic.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ topic.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    topics: Array
  }
}
</script>