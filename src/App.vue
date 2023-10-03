<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SideBar />
        <router-view></router-view>
      </v-col>
      <v-col cols="9">
        <TweetBox />
        <TweetPost v-for="tweet in sampleTweets" :key="tweet.username" v-bind="tweet" />
        <TweetsList />
        <TrendingPosts :topics="trendingTopics" />
        <WhoToFollow :users="usersToFollow" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from './components/SideBar.vue';
import TweetBox from './components/TweetBox.vue';
import TweetPost from './components/TweetPost.vue';
import TrendingPosts from './components/TrendingPosts.vue';
import WhoToFollow from './components/WhoToFollow.vue';
import TweetsList from './components/TweetsList.vue';


export default {
  components: {
    SideBar,
    TweetBox,
    TweetPost,
    TrendingPosts,
    WhoToFollow,
    TweetsList
  },
  data: () => ({
    sampleTweets: [
      { username: "powerbeast", content: "7 Ways to Train your Brain..." }
    ],
    trendingTopics: [
      { title: "MLB", subtitle: "2 hours ago" },
      { title: "Anthony Davis", subtitle: "1,032 posts" }
    ],
    usersToFollow: [
      { name: "AmazingAyo" }
    ]
  })
}
</script>