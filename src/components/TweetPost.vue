<template>
  <div v-if="tweetData.content" class="tweet-post">
  

 <router-link :to="{ name: 'profile', params: { username: actualUsername } }">
      <v-avatar v-if="actualProfileImage">
        <img :src="actualProfileImage">
      </v-avatar>
        </router-link>
        
        &nbsp; 
        <strong v-if="actualUsername">
        <router-link :to="{ name: 'profile', params: { username: actualUsername } }">@{{ actualUsername }}
    </router-link>
    </strong>

    <p v-if="tweetData.content">{{ tweetData.content }}</p>

    <!-- Display media based on its type -->
    <v-img v-if="isImage(tweetData.imageUrl) || isGif(tweetData.imageUrl)" :src="tweetData.imageUrl" aspect-ratio="2"></v-img>

    <!-- Display Video -->
    <video v-if="isVideo(tweetData.imageUrl)" controls preload="auto" playsinline>
      <source :src="tweetData.imageUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <button v-if="tweetData.content" @click="deleteTweet">Delete</button>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export default {
  props: {
    tweetData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      localTweetData: { ...this.tweetData }, // Create a local copy
      videoURL: '',
      actualUsername: '',
      actualProfileImage: ''
    };
  },
  mounted() {
    // Fetch video URL
    const storagePath = this.tweetData.imageUrl;

    if (storagePath) {
      const storage = getStorage();
      const videoRef = storageRef(storage, storagePath);

      getDownloadURL(videoRef)
        .then((url) => {
          this.videoURL = url;
        })
        .catch((error) => {
          console.error("Error fetching video URL:", error);
        });
    }

    // Fetch user data
    this.fetchUserData();
  },
  methods: {
    isImage(url) {
      return /.*\.(jpeg|jpg|png)/i.test(url);
    },
    isGif(url) {
      return /.*\.gif/i.test(url);
    },
    isVideo(url) {
      return /.*\.(mp4|webm|ogg|mov)/i.test(url);
    },
async fetchUserData() {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', this.localTweetData.userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      this.actualUsername = userData.username;
      this.actualProfileImage = userData.profileImage;
    } else {
      console.error('User document does not exist');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
},

    async deleteTweet() {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "tweets", this.tweetData.id));
        this.$emit('tweetDeleted', this.tweetData.id);
      } catch (error) {
        console.error("Error deleting tweet:", error);
      }
    }
  }
}
</script>

<style scoped>
.tweet-post {
  margin-bottom: 90px;
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-top: 30px;
  border-radius: 5px;
}
.tweet-post button {
  display: block;
  background-color: red;
  color: white;
}
</style>
