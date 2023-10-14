<template>
  <div class="tweet-post">
    <router-link
      :to="{ name: 'profile', params: { username: actualUsername } }"
    >
      <v-avatar v-if="actualProfileImage">
        <img :src="actualProfileImage" />
      </v-avatar>
    </router-link>
    &nbsp;
    <strong v-if="actualUsername">
      <router-link
        :to="{ name: 'profile', params: { username: actualUsername } }"
        >@{{ actualUsername }}</router-link
      >
    </strong>

    <p v-if="tweetData.content">{{ tweetData.content }}</p>

    <!-- Display media based on its type -->
    <v-img
      v-if="isImage(tweetData.imageUrl) || isGif(tweetData.imageUrl)"
      :src="tweetData.imageUrl"
      aspect-ratio="2"
    ></v-img>

    <!-- Display Video -->
    <video
      v-if="isVideo(tweetData.imageUrl)"
      controls
      preload="auto"
      playsinline
    >
      <source :src="tweetData.imageUrl" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="actions-row">

     <!--  Comment Icon -->
      <v-icon
        @click="toggleComment"
        :color="tweetData.commented ? 'blue' : 'gray'"
        class="comment-icon"
      >
        mdi-comment
      </v-icon>


      <!-- Heart (Like) Icon -->
      <v-icon
        @click="toggleLike"
        :color="tweetData.liked ? 'red' : 'gray'"
        class="heart-icon"
      >
        mdi-heart
      </v-icon>

      <!-- Repeat (Retweet) Icon -->
      <v-icon
        @click="toggleRepeat"
        :color="tweetData.repeated ? 'green' : 'gray'"
        class="repeat-icon"
      >
        mdi-repeat
      </v-icon>

      <!-- Delete Button (Show if the current user has the same userId) -->
      <button v-if="userId === currentUserId" @click="deleteTweet">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { auth } from '/src/firebase/index.js'

export default {
  computed: {
    currentUserId() {
      return auth.currentUser?.uid
    },
  },
  props: {
    tweetData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      videoURL: '',
      actualUsername: '',
      actualProfileImage: '',
    }
  },
  mounted() {
    // Fetch video URL
    const storagePath = this.tweetData.imageUrl
    if (storagePath) {
      const storage = getStorage()
      const videoRef = storageRef(storage, storagePath)
      getDownloadURL(videoRef)
        .then((url) => {
          this.videoURL = url
        })
        .catch((error) => {
          console.error('Error fetching video URL:', error)
        })
    }

    // Fetch user data
    this.fetchUserData()
  },
  methods: {
    isImage(url) {
      return /.*\.(jpeg|jpg|png)/i.test(url)
    },
    isGif(url) {
      return /.*\.gif/i.test(url)
    },
    isVideo(url) {
      return /.*\.(mp4|webm|ogg|mov)/i.test(url)
    },
    async fetchUserData() {
      try {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', this.tweetData.userId)
        const userDocSnapshot = await getDoc(userDocRef)
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data()
          this.actualUsername = userData.username
          this.actualProfileImage = userData.profileImage
        } else {
          console.error('User document does not exist')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },

    async toggleLike() {
      const db = getFirestore()
      const tweetRef = doc(db, 'tweets', this.tweetData.id)
      const newStatus = !this.tweetData.liked
      await updateDoc(tweetRef, { liked: newStatus })
      this.$emit('tweetLikedStatusUpdated', {
        tweetId: this.tweetData.id,
        status: newStatus,
      })
    },
    async toggleRepeat() {
      const db = getFirestore()
      const tweetRef = doc(db, 'tweets', this.tweetData.id)
      const newStatus = !this.tweetData.repeated
      await updateDoc(tweetRef, { repeated: newStatus })
      this.$emit('tweetRepeatStatusUpdated', {
        tweetId: this.tweetData.id,
        status: newStatus,
      })
    },
    async toggleComment() {
      const db = getFirestore()
      const tweetRef = doc(db, 'tweets', this.tweetData.id)
      const newStatus = !this.tweetData.commented
      await updateDoc(tweetRef, { commented: newStatus })
      this.$emit('tweetCommentedStatusUpdated', {
        tweetId: this.tweetData.id,
        status: newStatus,
      })
    },
    async deleteTweet() {
      try {
        const db = getFirestore()
        await deleteDoc(doc(db, 'tweets', this.tweetData.id))
        this.$emit('tweetDeleted', this.tweetData.id)
      } catch (error) {
        console.error('Error deleting tweet:', error)
      }
    },
  },
}
</script>

<style scoped>
.tweet-post {
  margin-bottom: 30px;
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
.actions-row {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.heart-icon,
.repeat-icon,
.comment-icon {
  margin-right: 20px;
}
.actions-row > *:last-child {
  margin-right: 0;
}
</style>
