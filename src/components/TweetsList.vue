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
