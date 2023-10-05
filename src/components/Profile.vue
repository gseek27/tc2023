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
import SideBar from './SideBar.vue';
import TrendingPosts from './TrendingPosts.vue';
import WhoToFollow from './WhoToFollow.vue';
import TweetsList from './TweetsList.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, orderBy, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  name: 'ProfilePage',
  components: {
    SideBar,
    TrendingPosts,
    WhoToFollow,
    TweetsList
  },
  data: () => ({
    tweets: [],
    loading: true,
    tempUsername: '',
    userDocId: null,
    trendingTopics: [
      { title: "MLB", subtitle: "2 hours ago" },
      { title: "Anthony Davis", subtitle: "1,032 posts" }
    ],
    usersToFollow: [
      { name: "AmazingAyo" }
    ],
    username: '',
    profileImage: ''
  }),
  methods: {
  async fetchUserProfile() {
      const db = getFirestore();

      // Check if userDocId is available
      if (!this.userDocId) {
        console.error("User document ID is not available");
        return;
      }

      try {
        const userDocRef = doc(db, "users", this.userDocId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          this.username = userDoc.data().username;
          this.tempUsername = userDoc.data().username;
          this.profileImage = userDoc.data().profileImage;
        } else {
          console.error("User document not found:", this.userDocId);
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }

      // Set loading to false after fetching the profile (or realizing the profile doesn't exist)
      this.loading = false;
    },


    removeTweet(tweetId) {
      this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
    },

    async fetchTweets() {
      const db = getFirestore();
      try {
        const tweetsQuery = query(
          collection(db, 'tweets'),
          where('userId', '==', this.userDocId), // Filter by user document ID
          orderBy('timestamp', 'desc')
        );

        const tweetDocs = await getDocs(tweetsQuery);
        this.tweets = tweetDocs.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });

        console.log("Fetched tweets in parent:", this.tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    },

    async uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = file; // store the file in the data property
      }
    },

    async uploadImageToStorage(file) {
      const storage = getStorage();
      const storageRef = ref(storage, 'profileImages/' + file.name); // create a reference in Firebase storage
      await uploadBytes(storageRef, file); // upload the file to the reference
      return await getDownloadURL(storageRef); // get the download URL
    },

    async updateProfile() {
      if (this.profileImage && typeof this.profileImage !== 'string') {
        const imageUrl = await this.uploadImageToStorage(this.profileImage);
        this.profileImage = imageUrl; // set profileImage data property to the image link
      }

      const db = getFirestore();
      const userDocRef = doc(collection(db, "users"), this.userDocId); // Use the userDocId to update the correct user document

      await setDoc(userDocRef, {
        username: this.tempUsername,
        profileImage: this.profileImage
      }, { merge: true }); // this will merge the new data with existing, or create a new doc if doesn't exist
      this.username = this.tempUsername; // Update the displayed username after saving to Firestore
    }
  },

  mounted() {
    this.fetchTweets();

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userDocId = user.uid; // Set the userDocId based on the user's UID
          this.fetchUserProfile(); // Fetch the user profile
        } else {
          // User is not logged in
          console.log("User is not authenticated");
          this.loading = false;
        }
    });
  }
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
