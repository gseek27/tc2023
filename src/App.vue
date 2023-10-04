<template>
  <v-container>
    
    <v-row>
     
      <v-col cols="3">
        <SideBar />
        <router-view></router-view>
      </v-col>
     
      <v-col cols="6">
        <TweetBox @tweetPosted="fetchTweets" />
        <TweetsList :tweets="tweets" @removeTweet="removeTweet" />
     <!--    <TrendingPosts :topics="trendingTopics" /> -->
   <!--      <WhoToFollow :users="usersToFollow" />  -->
      </v-col>

      <v-col cols="3">
        <TrendingPosts :topics="trendingTopics" class="sideB" /> 
         <router-view></router-view> 
      <WhoToFollow :users="usersToFollow" class="sideB"/> 
       <router-view></router-view>
      </v-col>

    </v-row>
  </v-container>
</template>


<script>
import SideBar from './components/SideBar.vue';
import TweetBox from './components/TweetBox.vue';
import TrendingPosts from './components/TrendingPosts.vue';
import WhoToFollow from './components/WhoToFollow.vue';
import TweetsList from './components/TweetsList.vue';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';

export default {
  components: {
    SideBar,
    TweetBox,
    TrendingPosts,
    WhoToFollow,
    TweetsList
  },
  data: () => ({
    tweets: [],
    trendingTopics: [
      { title: "MLB", subtitle: "2 hours ago" },
      { title: "Anthony Davis", subtitle: "1,032 posts" }
    ],
    usersToFollow: [
      { name: "AmazingAyo" }
    ]
  }),
  methods: {
    removeTweet(tweetId) {
      this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
    },
    async fetchTweets() {
      const db = getFirestore();
      const tweetsCollection = collection(db, 'tweets');
      const tweetsQuery = query(tweetsCollection, orderBy('timestamp', 'desc')); 
      const tweetDocs = await getDocs(tweetsQuery);
      
      this.tweets = tweetDocs.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      console.log("Fetched tweets in parent:", this.tweets);
    }
  },
  mounted() {
    this.fetchTweets();
  }
}
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