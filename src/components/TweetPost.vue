<template>
<div class="tweet-post">
  <div>
    <v-avatar v-if="tweetData.profileImage">
          <img :src="tweetData.profileImage" alt="Profile">
    </v-avatar>
        <strong v-if="tweetData.username">@{{ tweetData.username }}</strong>
    <p v-if="tweetData.content">{{ tweetData.content }}</p>
        <v-img v-if="tweetData.imageUrl" :src="tweetData.imageUrl" aspect-ratio="2"></v-img>  </div>
  </div>
</template>

<script>
export default {
  props: {
    tweetData: {
      type: Object,
      default: () => ({})  // Default is now an empty object
      //  username: "bazooka_joe",
     //   content: "first!",
     //   profileImage: 'https://source.unsplash.com/random/50x50',
     //   imageUrl: 'https://source.unsplash.com/random/200x100'
    }
  }
}
</script>

<style scoped>
.tweet-post {
  margin-bottom: 80px; /* adjust as needed */
  border: 1px solid #e0e0e0;  /* You can adjust the color and thickness as you like */
  padding: 10px;              /* Add some padding inside the border for better appearance */
  margin-bottom: 10px;        /* Add some space between posts if you have multiple posts in a list */
  border-radius: 5px;    
}
</style>
