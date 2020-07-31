<template>
    <el-container>
        <el-row>
            <el-col class="desc" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <img src="../assets/meeting.svg" alt="meeting-image" class="image"/>
                <div>
                    <h1 class="image-caption">{{$t('welcomeMsg')}}</h1>
                    <p class="image-sub-caption">{{$t('subHeading')}}</p>
                    <ul class="feature-list">
                        <li>Click <a href="#">here</a> to know more about AA</li>
                        <li>Click <a href="#">here</a> to know about RBIT specs</li>
                        <li>Click here</li>
                    </ul>
                </div>
            </el-col>

            <el-col class="form-div" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            
              <!-- Login -->
              <el-form 
                :class="{'show':isLogin, 'hide':!isLogin}"
                @submit.prevent.native="pressedLogin" 
                ref="form" 
                :model="form" 
                label-width="120px">
                  <h1>Login</h1>
                  <!-- Email -->
                  <el-input
                          name="email"
                          prefix-icon="el-icon-message"
                          class="form-input"
                          placeholder="Email"
                          type="email"
                          v-model="form.email"/>

                  <!-- Password -->
                  <el-input
                          name="password"
                          prefix-icon="el-icon-lock"
                          class="form-input"
                          placeholder="Password"
                          type="password"
                          v-model="form.password"/>

                  <!-- Submit -->
                  <el-row>
                      <el-button
                              class="button"
                              type="primary"
                              native-type="submit"
                              round>Login <i class="el-icon-arrow-right"></i>
                      </el-button>
                  </el-row>

                  <p style="padding-top:2rem; cursor: pointer" @click="goToRegister">Doesn't have an account. Click here to register</p>
              </el-form>

              <!-- Register -->
              <el-form 
                :class="{'show':!isLogin, 'hide':isLogin}" 
                @submit.prevent.native="pressedRegister" 
                ref="form" 
                :model="form" 
                label-width="120px">
                  <h1>Register</h1>
                  <!-- Email -->
                  <el-input
                          name="email"
                          prefix-icon="el-icon-message"
                          class="form-input"
                          placeholder="Email"
                          type="email"
                          v-model="form.email"/>

                  <!-- Passowrd -->
                  <el-input
                          name="password"
                          prefix-icon="el-icon-lock"
                          class="form-input"
                          placeholder="Password"
                          type="password"
                          v-model="form.password"/>

                  <!-- Submit -->
                  <el-button
                          class="button"
                          type="primary"
                          native-type="submit"
                          round>Register <i class="el-icon-arrow-right"></i>
                  </el-button>

                  <p style="padding-top:2rem; cursor: pointer" @click="goToLogin">Already have an account. Click here to login</p>
              </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      form:{
        email: "",
        password: "",
      },
      isLogin: true
    };
  },
  methods: {
    pressedLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: "dashboard" });
        })
        .catch(error => {
          this.error = error;
        });
    },

    pressedRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          console.log("here");
          this.$router.replace({ name: "dashboard" });
        })
        .catch(error => (this.error = error));
    },

    goToRegister(){
      this.isLogin = false
    },

    goToLogin(){
      this.isLogin = true
    }
  }
};
</script>

<style lang="css">
    .show {
        display: block;
    }
    .hide {
        display: none;
    }
    .image {
        width: 80%;
        margin: 1rem auto;
    }
    .steps {
        margin: 0 0 1rem 0;
    }
    .image-sub-caption {
        color: rgb(120, 120, 120);
        font-weight: 600;
        padding-bottom: 1rem;
    }
    .feature-list {
        margin: 1rem;
        list-style: none;
    }
    .feature-list > li {
        font-weight: 400;
        color: rgb(120, 120, 120);
        padding: 0.4rem 0;
    }
    .desc, .confirmation{
        text-align: center;
    }
    .desc {
        background-color: #e6f1ff;
    }
    .registration-error-message {
        color: #f56c6c;
        font-size: 13px;
        line-height: 1;
        padding-top: 4px;
        position: relative;
        margin: -1rem 0 1rem 0;
        top: 100%;
        left: 0;
    }
    .form-div {
        display: flex;
        height: 100%;
        justify-content: center;
        padding: 3rem;
        text-align: center
    }
    .form-input {
        border: none !important;
        margin: 1rem 0;
    }
    .button {
        margin: 2rem 0;
    }
</style>