<template>
  <div class="home">
    <div>
      <div v-if="$apollo.queries.posts.loading">Loading...</div>
      <ul v-else>
        <li v-for="post in posts.data" :key="post.id">
          <router-link :to="{ name:'Post', params: { id: post.id} }">
            {{ post.title }}
          </router-link>
        </li>
      </ul>
      <div>
        <h2>Apollo Query Component</h2>
        <ApolloQuery
          :query="gql => gql`
            query{
              posts{
                data{
                  id
                  title
                  body
                }
              }
            }
          `"
          :variables="{ name }"
        >
          <template v-slot="{ result: { loading, error, data } }">
            <!-- Loading -->
            <div v-if="loading" class="loading apollo">Loading...</div>

            <!-- Error -->
            <div v-else-if="error" class="error apollo">An error occurred</div>

            <ul class="result apollo" v-else-if="data">
              <li v-for="post in data.posts.data" :key="post.id">
                <router-link :to="{ name:'Post', params: { id: post.id} }">
                  {{ post.title }}
                </router-link>
              </li>
            </ul>

            <!-- No result -->
            <div v-else class="no-result apollo">No result :(</div>
          </template>
        </ApolloQuery>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Home',
  components: {
  },
  apollo: {
  // Simple query that will update the 'hello' vue property
    posts: gql`
    query{
      posts{
        data{
          id
          title
          body
        }
      }
    }
    `,
  },

};
</script>
