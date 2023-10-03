<template>
  <div>
    <div v-for="tweet in sortedTweets" :key="tweet.id">
      <TweetPost :tweetData="tweet" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
//import { ref, onMounted } from 'vue';
import TweetPost from './TweetPost.vue'; // Assuming tweet.vue is in the same directory
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';

export default {
  name: 'TweetsList',
  components: {
    TweetPost
  },
  setup() {
    const tweets = ref([]);

    onMounted(async () => {
      const db = getFirestore();
      const tweetsCollection = collection(db, 'tweets');
      const tweetsQuery = query(tweetsCollection, orderBy('timestamp', 'desc')); // Sorting by timestamp in descending order
      const tweetDocs = await getDocs(tweetsQuery);
      tweets.value = tweetDocs.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
    });

const sortedTweets = computed(() => {
  return [...tweets.value].sort((a, b) => b.timestamp - a.timestamp);
});


    return {
      sortedTweets
    }
  }
};
</script>
