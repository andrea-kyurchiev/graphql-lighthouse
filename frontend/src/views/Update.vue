<template>
  <div>
    <h1>Update Post</h1>
    <div v-if="$apollo.queries.post.loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
     <form v-if="!$apollo.queries.post.loading" action="#" @submit.prevent="updatePost">
        <div>
          <label for="title">Title</label>
          <input v-model="title" type="text" name="title" id="title">
        </div>
        <div>
          <label for="body">Body</label>
          <textarea v-model="body" name="body" id="body" cols="30" rows="10"></textarea>
        </div>
        <div>
          <button :disabled="loading">Update Post</button>
          <div v-if="loading">Loading...</div>
        </div>
      </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Post',
  data() {
    return {
      loading: false,
      title: '',
      body: '',
      error: null,
    };
  },
  watch: {
    post(newPost) {
      this.title = newPost.title;
      this.body = newPost.body;

      if (newPost.user.id !== this.me.id) {
        window.location.href = '/';
      }
    },
  },
  apollo: {
    me: {
      query: gql`
        query {
          me {
            id
          }
        }
      `,
    },
    // Simple query that will update the 'hello' vue property
    post: {
      query: gql`
        query getPost($id: ID!){
          post(id: $id){
            id
            title
            body
            user {
              id
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  methods: {
    updatePost() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: gql`
          mutation updatePost($id: ID!, $title: String!, $body: String!){
            updatePost(id: $id, title: $title, body: $body){
              id
              title
              body
            }
          }
        `,
        variables: {
          id: this.$route.params.id,
          title: this.title,
          body: this.body,
        },
      })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          this.error = error.graphQLErrors[0].message;
        });
    },
  },
};
</script>
