<template>
    <div>
        <h1>Admin</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} ({{ user.email }}) Admin: {{ user.is_admin }}
            </li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  components: {
  },
  apollo: {
  // Simple query that will update the 'hello' vue property
    users: {
      query: gql`
        query {
          users {
            id
            name
            email
            is_admin
          }
        }
      `,
    },
  },

};
</script>
