<template>
  <div>
    <v-textarea v-model="tweetContent" placeholder="What is happening?!"></v-textarea>
    <input type="file" @change="onFileChange">
    <v-btn @click="postTweet">Post</v-btn>
  </div>
</template>

<script>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';  // <-- Import FieldValue
import { serverTimestamp } from 'firebase/firestore';
import { db } from "/src/firebase/index.js"; // adjust the path according to your project structure

/*
const firebaseConfig = {

    apiKey: "AIzaSyAxG3LGCtQHwZLxIxvFoaplouY5HlNU6JM",
  
    authDomain: "tc2023-21859.firebaseapp.com",
  
    projectId: "tc2023-21859",
  
    storageBucket: "tc2023-21859.appspot.com",
  
    messagingSenderId: "960022654133",
  
    appId: "1:960022654133:web:79b8495bce163d7f3322fc",
  
    measurementId: "G-589259DH29"
  
  };
  */



export default {
  data() {
    return {
      tweetContent: "",
      tweetImage: null
    };
  },
  methods: { 
    async postTweet() {
      try {
          if (this.tweetImage) {
          const storage = getStorage();
          const imageRef = storageRef(storage, 'tweets/' + this.tweetImage.name);
          await uploadBytes(imageRef, this.tweetImage);
          const imageUrl = await getDownloadURL(imageRef);


        await addDoc(collection(db, "tweets"), {
          content: this.tweetContent,
          timestamp: serverTimestamp(), // to add a server-generated timestamp
          imageUrl
        });
        } else {
          await addDoc(collection(db, "tweets"), {
            content: this.tweetContent,
            timestamp: serverTimestamp()
          });
        }
        this.tweetContent = ""; // clear the textarea after posting
        this.tweetImage = null;
        this.$emit('tweetPosted');
        this.fetchTweets(); 
      } catch (error) {
        console.error("Error posting tweet:", error);
      }
    },
        onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.tweetImage = file;
      }
    }
  }
};
</script>