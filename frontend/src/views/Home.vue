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
      <div v-if="posts && !$apollo.queries.posts.loading">
        <div>
          {{ posts.paginatorInfo.total }} total results
        </div>
        <div>
          Page {{ posts.paginatorInfo.currentPage }} of {{ posts.paginatorInfo.lastPage }}
        </div>
        <div>
          <router-link
          v-if="posts.paginatorInfo.currentPage > 1"
          :to="`/?page=${ posts.paginatorInfo.currentPage - 1 }`" >
            Previous
          </router-link>
          &nbsp;
          <router-link
          v-if="posts.paginatorInfo.hasMorePages"
          :to="`/?page=${ posts.paginatorInfo.currentPage + 1 }`" >
            Next
          </router-link>
        </div>
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
    posts: {
      query: gql`
        query getPosts($page: Int!) {
          posts(page: $page) {
            paginatorInfo {
              currentPage
              lastPage
              total
              hasMorePages
            }
            data {
              id
              title
              body
            }
          }
        }
      `,
      variables() {
        return {
          // eslint-disable-next-line radix
          page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        };
      },
    },
  },

};
</script>
