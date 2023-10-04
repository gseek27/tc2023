<template>
<div v-if="tweetData.content" class="tweet-post">
    <v-avatar v-if="tweetData.profileImage">
          <img :src="tweetData.profileImage">
    </v-avatar>
    <strong v-if="tweetData.username">@{{ tweetData.username }}</strong>
    <p v-if="tweetData.content">{{ tweetData.content }}</p>
    <v-img v-if="tweetData.imageUrl" :src="tweetData.imageUrl" aspect-ratio="2"> </v-img>  
    <button v-if="tweetData.content" @click="deleteTweet">Delete</button>     
  </div>
</template>

<script>
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

export default {
  props: {
    tweetData: {
      type: Object,
     // default: ''
           required: true,
     default: () => ({})  // Default is now an empty object
      //  username: "bazooka_joe",
     //   content: "first!",
     //   profileImage: 'https://source.unsplash.com/random/50x50',
     //   imageUrl: 'https://source.unsplash.com/random/200x100'
    }
  }
  ,
  methods: {
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
  //... rest of the component script
}
</script>

<style scoped>
.tweet-post {
  margin-bottom: 90px; /* adjust as needed */
  border: 1px solid #e0e0e0;  /* You can adjust the color and thickness as you like */
  padding: 10px;              /* Add some padding inside the border for better appearance */
  margin-top: 30px;        /* Add some space between posts if you have multiple posts in a list */
  border-radius: 5px;    
}
.tweet-post button {
  display: block; 
  background-color: red; 
  color: white;   
}
</style>
