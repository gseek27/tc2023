<<<<<<< HEAD
<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:27f18bc1a624d49cabcba201ebc83de737c8d9878b317b302b8f995e78d6a966
size 479
=======
=======
>>>>>>> faea81d2 (Fix git fls errors)
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
<<<<<<< HEAD
  </script>
>>>>>>> 2190573f (wed14)
=======
  </script>
>>>>>>> faea81d2 (Fix git fls errors)
