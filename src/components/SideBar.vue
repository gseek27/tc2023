<template>
  <v-list> 
    <div> 
      <nav>
        <router-link :to="item.link" v-for="item in menuItems" :key="item.title">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </nav>
    </div>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
      { title: "Home", link: "/" },
      { title: "Profile", link: "/profile" },
       { title: "Login", link: "/login" }
    ]
  })
}
</script>
