<<<<<<< HEAD
<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:815e8ee331097d117801601b3fad0abc2a44dacde4bbdef75e2284219a0a66ca
size 1119
=======
=======
>>>>>>> faea81d2 (Fix git fls errors)
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
      
        { title: "Logout", link: "/login" }
      ];
  
      return {
        menuItems,
        handleLogout,
      };
    }
  }
  </script>
<<<<<<< HEAD
  
>>>>>>> 2190573f (wed14)
=======
  
>>>>>>> faea81d2 (Fix git fls errors)
