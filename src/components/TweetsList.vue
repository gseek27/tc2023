<<<<<<< HEAD
<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:9aec2dd7acaa1ddf816c2a10cf818d038e4ed6e96de8e93585db6cb6011a7e85
size 1809
=======
=======
>>>>>>> faea81d2 (Fix git fls errors)
<template>
    <div>
      <div v-for="tweet in sortedTweets" :key="tweet.id">
        <TweetPost
          v-if="tweet.content"
          :tweetData="tweet"
          @tweetLikedStatusUpdated="$emit('tweetLikedStatusUpdated', $event)"
          @tweetRepeatStatusUpdated="$emit('tweetRepeatStatusUpdated', $event)"
          @tweetCommentedStatusUpdated="$emit('tweetCommentedStatusUpdated', $event)"
          :userId="tweet.userId"
          @tweetDeleted="handleTweetDeleted"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import TweetPost from './TweetPost.vue'
  
  export default {
    name: 'TweetsList',
    components: {
      TweetPost,
    },
    props: {
      tweets: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    setup(props) {
      console.log('Tweets prop in TweetsList:', props.tweets)
      const sortedTweets = computed(() => {
        return [...props.tweets].sort((a, b) => b.timestamp - a.timestamp)
      })
  
      return {
        sortedTweets,
      }
    },
    methods: {
    updateTweetCommentedStatus({ tweetId, status }) {
        const tweetToUpdate = this.tweets.find((tweet) => tweet.id === tweetId)
        if (tweetToUpdate) {
          tweetToUpdate.commented = status
        }
      },
      updateTweetLikedStatus({ tweetId, status }) {
        const tweetToUpdate = this.tweets.find((tweet) => tweet.id === tweetId)
        if (tweetToUpdate) {
          tweetToUpdate.liked = status
        }
      },
      updateTweetRepeatStatus({ tweetId, status }) {
        const tweetToUpdate = this.tweets.find((tweet) => tweet.id === tweetId)
        if (tweetToUpdate) {
          tweetToUpdate.repeated = status
        }
      },
      handleTweetDeleted(tweetId) {
        // Emitting an event so parent component can handle it
        this.$emit('removeTweet', tweetId)
      },
    },
  }
  </script>
<<<<<<< HEAD
  
>>>>>>> 2190573f (wed14)
=======
  
>>>>>>> faea81d2 (Fix git fls errors)
