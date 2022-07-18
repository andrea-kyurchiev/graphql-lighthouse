<template>
    <div>
        <div v-if="error" class="error">{{ error }}</div>
        <form action="#" @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="email" v-model="email" name="email" id="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" name="password" id="password">
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      password: null,
      email: null,
      error: null,
    };
  },
  methods: {
    login() {
      this.$apollo.mutate({
        mutation: gql`
          mutation login($input: LoginInput!){
            login(input: $input){
              token
            }
          }
        `,
        variables: {
          input: {
            email: this.email,
            password: this.password,
          },
        },
      })
        .then((data) => {
          localStorage.setItem('apollo-token', data.data.login.token);
          this.$router.push({ name: 'Me' });
        })
        .catch((error) => {
          //   const key = Object.keys(error.graphQLErrors[0].extensions.validation)[0];
          // eslint-disable-next-line prefer-destructuring
          this.error = error.graphQLErrors[0].message;
        });
    },
  },
};
</script>
