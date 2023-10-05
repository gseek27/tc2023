<template>
  <div>
    <v-row v-if="loading">
      <v-col class="text-center">
        Loading...
      </v-col>
    </v-row>

    <!-- Your existing content wrapped in a v-else -->
    <v-row v-else>
      <v-row>
        <v-col cols="3">
          <SideBar />
        </v-col>
        <v-col cols="6">
          <h1>Your profile page</h1>

          <!-- Profile Picture -->
          <img :src="profileImage" alt="Profile" width="100" v-if="profileImage" />
          <input type="file" @change="uploadImage" />

          <!-- Username -->
          <p>@{{ username }}</p>
          <input v-model="tempUsername" placeholder="Choose a username" />

          <!-- Submit Button -->
          <button @click="updateProfile">Update Profile</button>

          <TweetsList :tweets="tweets" @removeTweet="removeTweet" />
        </v-col>

        <v-col cols="3">
          <TrendingPosts :topics="trendingTopics" class="sideB" />
          <WhoToFollow :users="usersToFollow" class="sideB" />
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>


<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  getDocs,
  where
} from 'firebase/firestore';

import SideBar from './SideBar.vue';
import TrendingPosts from './TrendingPosts.vue';
import WhoToFollow from './WhoToFollow.vue';
import TweetsList from './TweetsList.vue';





export default {
  components: {
    SideBar,
    TrendingPosts,
    WhoToFollow,
    TweetsList
  },
  name: 'ProfilePage',
  data() {
    return {
      tweets: [],
      loading: true,
      userID: null,
      username: '',
      profileImage: '',
      trendingTopics: [
        { title: 'MLB', subtitle: '2 hours ago' },
        { title: 'Anthony Davis', subtitle: '1,032 posts' },
      ],
      usersToFollow: [{ name: 'AmazingAyo' }],
    };
  },
  methods: {
    async fetchUserProfile(userId) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId); // Adjust the path as needed
      const userProfile = await getDoc(userDocRef);

      if (userProfile.exists()) {
        this.username = userProfile.data().username || ''; // Handle undefined username
        this.profileImage = userProfile.data().profileImage || ''; // Handle undefined profileImage
      } else {
        console.error('User profile does not exist:', userId);
      }
    },
  async fetchTweets() {
  const db = getFirestore();
  const tweetsCollection = collection(db, 'tweets');
  const tweetsQuery = query(
    tweetsCollection,
    where('userId', '==', this.userID), // Filter tweets by user ID
    orderBy('timestamp', 'desc')
  );

  const tweetDocs = await getDocs(tweetsQuery);
  this.tweets = tweetDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log('Fetched tweets in parent:', this.tweets);
},

  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userID = user.uid;

        // Fetch user profile and tweets
        await this.fetchUserProfile(user.uid);
        this.fetchTweets();

        this.loading = false;
      } else {
        this.loading = false;
        console.log('User is not authenticated');
      }
    });
  },
};
</script>



<style scoped>
.sideB {
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
  padding: 0px 10px;
  margin-top: 0px;
  border-radius: 5px;
}
</style>
