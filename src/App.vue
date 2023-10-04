<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SideBar />
        <router-view></router-view>
      </v-col>
      <v-col cols="9">
        <TweetBox @tweetPosted="fetchTweets" />
       
        <TweetsList :tweets="tweets" @removeTweet="removeTweet" />

        <TrendingPosts :topics="trendingTopics" />
        <WhoToFollow :users="usersToFollow" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
//import { onMounted } from 'vue';
import SideBar from './components/SideBar.vue';
import TweetBox from './components/TweetBox.vue';
//import TweetPost from './components/TweetPost.vue';
import TrendingPosts from './components/TrendingPosts.vue';
import WhoToFollow from './components/WhoToFollow.vue';
import TweetsList from './components/TweetsList.vue';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';

export default {
  components: {
    SideBar,
    TweetBox,
   // TweetPost,
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