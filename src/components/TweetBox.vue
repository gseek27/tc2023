<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:69976e302ff2fe62e75e2d5e711b01e5b5154df4a91d1f45324f6083a10978a7
size 2998
=======
<template>
    <v-row>
      <!-- This column will take the majority of the space -->
      <v-col cols="12">
        <v-textarea
          v-model="tweetContent"
          placeholder="What is happening?!"
        ></v-textarea>
      </v-col>
    </v-row>
  
    <v-row>
      <v-col cols="10">
        <!-- Upload icon triggering the file input -->
        <label>
          <v-icon>mdi-image</v-icon>
          <input type="file" @change="onFileChange" style="display: none" />
        </label>
      </v-col>
  
      <!-- This column will be for the Post button -->
      <v-col cols="1" class="text-end">
        <v-btn @click="postTweet">Post</v-btn>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
  } from 'firebase/storage'
  import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc,
  } from 'firebase/firestore'
  import { db } from '/src/firebase/index.js'
  import { auth } from '/src/firebase/index.js'
  
  export default {
    data() {
      return {
        tweetContent: '',
        tweetImage: null,
      }
    },
    methods: {
      async postTweet() {
        try {
          const user = auth.currentUser
          if (!user) throw new Error('User not authenticated')
  
          // Fetch the user's profile data, including the username
          const profileDoc = await this.fetchUserProfile(user.uid)
  
          // Ensure that the username is available in the profile
          if (!profileDoc.exists() || !profileDoc.data().username) {
            throw new Error('Username is missing')
          }
  
          let imageUrl = null
          if (this.tweetImage) {
            const storage = getStorage()
            const imageRef = storageRef(storage, 'tweets/' + this.tweetImage.name)
            await uploadBytes(imageRef, this.tweetImage)
            imageUrl = await getDownloadURL(imageRef)
          }
  
          const username = profileDoc.data().username // Get the username from the profile
  
          await this.createTweet(this.tweetContent, user, imageUrl, username)
          this.tweetContent = '' // Clear the textarea after posting
          this.tweetImage = null
          this.$emit('tweetPosted')
        } catch (error) {
          console.error('Error posting tweet:', error)
        }
      },
  
      onFileChange(e) {
        const file = e.target.files[0]
        if (file) {
          this.tweetImage = file
        }
      },
  
      async fetchUserProfile(userId) {
        const profileDocRef = doc(collection(db, 'users'), userId)
        return await getDoc(profileDocRef)
      },
  
      async createTweet(content, user, imageUrl, username) {
        const tweet = {
          content: content,
          timestamp: serverTimestamp(),
          userId: user.uid,
          username: username, // Set the username from the profile
        }
  
        // Only add profileImage to tweet if it's defined
        if (user.profileImage) {
          tweet.profileImage = user.profileImage
        }
  
        const tweetsCollection = collection(db, 'tweets')
        await addDoc(tweetsCollection, tweet)
      },
    },
  }
  </script>
>>>>>>> 2190573f (wed14)
