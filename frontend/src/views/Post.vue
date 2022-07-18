<template>
  <div>
    <h1>This is the post page for id: {{ $route.params.id }}</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="$apollo.queries.post.loading">Loading...</div>
    <div v-else-if="post">
      <h2>{{ post.title }}</h2>
      <p> {{ post.body }}</p>
    </div>
    <div v-else>
      No post found
    </div>
    <div v-if="post.user.id === me.id">
      <div>
        <router-link :to="{ name:'Update', params: { id: $route.params.id} }">
          Update
        </router-link>
      </div>
      <button @click="deletePost">Delete Post</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Post',
  data() {
    return {
      loading: false,
      error: null,
    };
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
    deletePost() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: gql`
          mutation deletePost($id: ID!){
            deletePost(id: $id){
              id
              title
              body
            }
          }
        `,
        variables: {
          id: this.$route.params.id,
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
