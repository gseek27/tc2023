<template>
  <div v-if="tweetData.content" class="tweet-post">
    <v-avatar v-if="tweetData.profileImage">
      <img :src="tweetData.profileImage">
    </v-avatar>
    <strong v-if="tweetData.username">@{{ tweetData.username }}</strong>
    <p v-if="tweetData.content">{{ tweetData.content }}</p>

    <!-- Display media based on its type -->
    <v-img v-if="isImage(tweetData.imageUrl) || isGif(tweetData.imageUrl)" :src="tweetData.imageUrl" aspect-ratio="2"></v-img>
  
   <!--<video v-if="videoURL" controls preload="auto" playsinline> -->
    <!-- <source :src="videoURL" type="video/mp4"> -->
  <!-- Display Video -->
    <video v-if="isVideo(tweetData.imageUrl)" controls preload="auto" playsinline>
      <source :src="tweetData.imageUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <button v-if="tweetData.content" @click="deleteTweet">Delete</button>
  </div>
</template>

<script>
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export default {
  props: {
    tweetData: {
      type: Object,
      required: true,
      default: () => ({})  // Default is now an empty object
    }
  },
  data() {
    return {
      videoURL: '' // This will be set after fetching from Firebase
    };
  },
  mounted() {
    // Assuming `tweetData.imageUrl` contains the path to the video in Firebase Storage
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
  },
  methods: {
    isImage(url) {
      // Updated to detect .jpeg, .jpg, .png anywhere in the URL string
      return /.*\.(jpeg|jpg|png)/i.test(url);
    },
      isGif(url) {
      // Updated to detect .gif anywhere in the URL string
      return /.*\.gif/i.test(url);
    },
    isVideo(url) {
      // Updated to detect .mp4, .webm, and .ogg anywhere in the URL string
      return /.*\.(mp4|webm|ogg)/i.test(url);
    },
    async deleteTweet() {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "tweets", this.tweetData.id)); // "tweets" should match your collection name
        // Optionally emit an event to parent component or show a notification
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
