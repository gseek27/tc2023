<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:50ac3a0b344b515c92ba35ef75f4abd37bc9701c826eb14d1f8347c02c3d90a8
size 490
=======
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
>>>>>>> 2190573f (wed14)
