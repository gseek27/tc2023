<template>
  <v-row>
    <!-- This column will take the majority of the space -->
    <v-col cols="12">
      <v-textarea v-model="tweetContent" placeholder="What is happening?!"></v-textarea>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="10">
      <!-- Upload icon triggering the file input -->
      <label>
        <v-icon>mdi-image</v-icon>
        <input type="file" @change="onFileChange" style="display: none;">
      </label>
    </v-col>

    <!-- This column will be for the Post button -->
    <v-col cols="1" class="text-end">
      <v-btn @click="postTweet">Post</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '/src/firebase/index.js';
import { auth } from '/src/firebase/index.js';

export default {
  data() {
    return {
      tweetContent: '',
      tweetImage: null,
    };
  },
  methods: {
    async postTweet() {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        if (this.tweetImage) {
          const storage = getStorage();
          const imageRef = storageRef(storage, 'tweets/' + this.tweetImage.name);
          await uploadBytes(imageRef, this.tweetImage);
        }

        await this.createTweet(this.tweetContent, user);
        this.tweetContent = ''; // Clear the textarea after posting
        this.tweetImage = null;
        this.$emit('tweetPosted');
        // No need to call fetchTweets here as it's not defined in this component
      } catch (error) {
        console.error('Error posting tweet:', error);
      }
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.tweetImage = file;
      }
    },

    async createTweet(content, user) {
      const tweet = {
        content: content,
        timestamp: serverTimestamp(),
        userId: user.uid,
        username: user.username || '', // Include the username from the user object
      };

      // Only add profileImage to tweet if it's defined
      if (user.profileImage) {
        tweet.profileImage = user.profileImage;
      }

      const tweetsCollection = collection(db, 'tweets');
      await addDoc(tweetsCollection, tweet);
    },
  },
};
</script>
