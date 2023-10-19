<template>
    <div>
      <v-row v-if="loading">
        <v-col class="text-center"> Loading... </v-col>
      </v-row>
  
      <!-- Your existing content wrapped in a v-else -->
      <v-row v-else>
        <v-row>
          <v-col cols="3">
            <SideBar />
          </v-col>
          <v-col cols="6">
            <br />
  
            <v-row>
              <!-- Profile Picture -->
              <v-avatar v-if="profileImage">
                <img :src="profileImage" alt="Profile" width="100" />
              </v-avatar>
            </v-row>
            <v-row>
              <!-- Username -->
              <strong>@{{ username }}</strong>
            </v-row>
  
            <br /><br />
  
            <!-- Row for Username input, Image Upload icon, and Update button -->
            <v-row>
              <!-- Column for Image Upload icon -->
              <v-col cols="1">
                <label>
                  <v-icon>mdi-image</v-icon>
                  <input
                    type="file"
                    @change="onFileChange"
                    style="display: none"
                  />
                </label>
              </v-col>
  
              <!-- Column for Username input -->
              <v-col cols="4">
                <input v-model="tempUsername" placeholder="Choose a username" />
              </v-col>
  
              <!-- Column for Update button -->
              <v-col cols="3">
                <button @click="updateProfile">Update Profile</button>
              </v-col>
            </v-row>
  
            <TweetsList
              :tweets="tweets"
              @tweetLikedStatusUpdated="updateTweetLikedStatus"
              @tweetCommentedStatusUpdated="updateTweetCommentedStatus"
              @tweetRepeatStatusUpdated="updateTweetRepeatStatus"
              @removeTweet="removeTweet"
              :key="tweetsUpdateTime"
            />
          </v-col>
  
          <v-col cols="3">
            <TrendingPosts :topics="trendingTopics" class="sideB" />
            <WhoToFollow :users="usersToFollow" class="sideB" />
          </v-col>
        </v-row>
      </v-row>
    </div>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import {
    getFirestore,
    collection,
    doc,
    getDoc,
    updateDoc,
    writeBatch,
    query,
    orderBy,
    getDocs,
    where,
  } from 'firebase/firestore'
  
  import SideBar from './SideBar.vue'
  import TrendingPosts from './TrendingPosts.vue'
  import WhoToFollow from './WhoToFollow.vue'
  import TweetsList from './TweetsList.vue'
  
  export default {
    components: {
      SideBar,
      TrendingPosts,
      WhoToFollow,
      TweetsList,
    },
    name: 'ProfilePage',
    data() {
      return {
        tweets: [],
        loading: true,
        userID: null,
        tweetsUpdateTime: Date.now(),
        username: '',
        updatingProfile: false,
        tempUsername: '',
        profileImage: '',
        trendingTopics: [
          { title: 'MLB', subtitle: '2 hours ago' },
          { title: 'Anthony Davis', subtitle: '1,032 posts' },
        ],
        usersToFollow: [{ name: 'AmazingAyo' }],
      }
    },
    methods: {
      updateTweetLikedStatus({ tweetId, status }) {
        const tweetToUpdate = this.tweets.find((tweet) => tweet.id === tweetId)
        if (tweetToUpdate) {
          tweetToUpdate.liked = status
        }
      },
      updateTweetCommentedStatus({ tweetId, status }) {
        const tweetToUpdate = this.tweets.find((tweet) => tweet.id === tweetId)
        if (tweetToUpdate) {
          tweetToUpdate.commented = status
        }
      },
      updateTweetRepeatStatus({ tweetId, status }) {
        const tweetToUpdate = this.tweets.find((tweet) => tweet.id === tweetId)
        if (tweetToUpdate) {
          tweetToUpdate.repeated = status // Make sure it's "repeated" not "repeatd"
        }
      },
  
      async updateProfile() {
        try {
          this.updatingProfile = true
  
          const db = getFirestore()
          const userDocRef = doc(db, 'users', this.userID)
  
          // Update the username in Firestore
          await updateDoc(userDocRef, {
            username: this.tempUsername,
          })
  
          // Update username in all the user's tweets
          await this.updateUsernameInTweets(this.tempUsername)
  
          // Update the local username property and re-fetch data
          this.username = this.tempUsername
          await this.fetchTweets()
  
          // Reset the tempUsername property
          this.tempUsername = ''
        } catch (error) {
          console.error('Error updating profile:', error)
          // Handle the error, e.g., show an error message to the user
        } finally {
          this.updatingProfile = false
        }
        await this.fetchTweets()
        this.tweetsUpdateTime = Date.now()
      },
  
      async updateUsernameInTweets(newUsername) {
        const db = getFirestore()
        const tweetsQuery = query(
          collection(db, 'tweets'),
          where('userId', '==', this.userID)
        )
  
        const tweetDocs = await getDocs(tweetsQuery)
  
        const batch = writeBatch(db) // Use a batch to update multiple documents at once
  
        tweetDocs.forEach((docSnapshot) => {
          const tweetRef = doc(db, 'tweets', docSnapshot.id)
          batch.update(tweetRef, { username: newUsername }) // Assuming 'username' is the field's name in tweets
        })
  
        await batch.commit()
      },
      async fetchUserProfile(userId) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', userId) // Adjust the path as needed
        const userProfile = await getDoc(userDocRef)
  
        if (userProfile.exists()) {
          this.username = userProfile.data().username || '' // Handle undefined username
          this.profileImage = userProfile.data().profileImage || '' // Handle undefined profileImage
        } else {
          console.error('User profile does not exist:', userId)
        }
      },
      async fetchTweets() {
        const db = getFirestore()
        const tweetsCollection = collection(db, 'tweets')
        const tweetsQuery = query(
          tweetsCollection,
          where('userId', '==', this.userID), // Filter tweets by user ID
          orderBy('timestamp', 'desc')
        )
  
        const tweetDocs = await getDocs(tweetsQuery)
        this.tweets = tweetDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log('Fetched tweets in parent:', this.tweets)
      },
    },
    mounted() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.userID = user.uid
  
          // Fetch user profile and tweets
          await this.fetchUserProfile(user.uid)
          this.fetchTweets()
  
          this.loading = false
        } else {
          this.loading = false
          console.log('User is not authenticated')
        }
      })
    },
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
  
  /* ... other styles ... */
  
  button {
    background-color: gray;
    color: white;
    padding: 5px 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  

  </style>