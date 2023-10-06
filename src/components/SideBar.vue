<template>
  <v-list> 
    <div> 
      <nav>
               <router-link :to="item.link" v-for="item in menuItems" :key="item.title" @click="item.title === 'Logout' ? handleLogout() : null">

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
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  setup() {
    const router = useRouter();

    const handleLogout = async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    const menuItems = [
      { title: "Home", link: "/" },
      { title: "Profile", link: "/profile" },
      { title: "Login", link: "/login" },
      { title: "Logout", link: "/login" }
    ];

    return {
      menuItems,
      handleLogout,
    };
  }
}
</script>
