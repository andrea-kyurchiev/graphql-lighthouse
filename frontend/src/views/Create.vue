<template>
  <div>
    <h1>Create Post</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div>
      <form action="#" @submit.prevent="createPost">
        <div>
          <label for="title">Title</label>
          <input v-model="title" type="text" name="title" id="title">
        </div>
        <div>
          <label for="body">Body</label>
          <textarea v-model="body" name="body" id="body" cols="30" rows="10"></textarea>
        </div>
        <div>
          <button :disabled="loading">Create Post</button>
          <div v-if="loading">Loading...</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Create',
  data() {
    return {
      title: '',
      body: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    createPost() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: gql`
          mutation createPost($title: String!, $body: String!){
            createPost(title: $title, body: $body){
              title
              body
            }
          }
        `,
        variables: {
          title: this.title,
          body: this.body,
        },
      })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          const key = Object.keys(error.graphQLErrors[0].extensions.validation)[0];
          // eslint-disable-next-line prefer-destructuring
          this.error = error.graphQLErrors[0].extensions.validation[key][0];
        });
    },
  },
};
</script>

<style>
.error{
  color:red;
  margin-bottom: 1rem;
}
</style>
