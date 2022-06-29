<template>
  <div class="main">
    <v-card elevation="2" rounded class="main__inner">
      <v-card-title class="d-flex justify-center main__inner--title"
        >Log In</v-card-title
      >
      <v-card-text class="pt-10 px-15">
        <v-form ref="form" class="main__inner--form" @submit.prevent="onSubmit">
          <v-text-field
            color="#111d30"
            label="Username"
            v-model="payload.username"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            color="#111d30"
            label="Password"
            v-model="payload.password"
            outlined
            :rules="[rules.required]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-divider class="my-5"></v-divider>
          <div class="d-flex justify-center">
            <v-btn
              color="#111d30"
              class="main__inner--form__action"
              type="submit"
              rounded
              :loading="submitLoading"
              >Sign In</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="isShowErrorSnackbar" timeout="2000" color="red">
      <span class="error-message">{{ errorMessage }}</span>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: () => ({
    payload: {
      username: null,
      password: null,
    },
    rules: {
      required: (v) => !!v || "Field is required",
    },
    showPassword: false,
    submitLoading: false,
    errorMessage: null,
    isShowErrorSnackbar: false,
  }),
  methods: {
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.submitLoading = true;
        const formData = new FormData();
        for (let i in this.payload) {
          formData.append(i, this.payload[i]);
        }
        this.axios
          .post("login/access-token", formData)
          .then(({ data }) => {
            localStorage.setItem("token", data.access_token);
            this.$router.push("/");
          })
          .catch((e) => {
            this.errorMessage = e.response.data.detail;
            this.isShowErrorSnackbar = true;
          })
          .finally(() => {
            this.submitLoading = false;
          });
      } else return false;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding-top: 130px;

  &__inner {
    width: 35%;
    margin: 0 auto;

    &--title {
      font-size: 32px;
      color: #111d30;
      font-weight: 700;
    }
    &--form {
      &__action {
        color: white;
        text-transform: capitalize;
      }
    }
  }
  .error-message {
    color: white;
  }
}
</style>
