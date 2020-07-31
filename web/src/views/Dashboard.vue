<template>
<div>

<el-menu default-active="1" class="el-menu-vertical-demo" :collapse="true">
  <el-menu-item index="1">
    <i class="el-icon-money"></i>
    <span slot="title">Consent</span>
  </el-menu-item>
  <el-menu-item index="2" @click="signOut">
    <i class="el-icon-switch-button"></i>
    <span slot="title">Logout</span>
  </el-menu-item>
</el-menu>
<el-form :inline="true" ref="form" :model="form" label-width="120px">
  <el-form-item label="ARN Number">
    <el-input v-model="form.arn"></el-input>
  </el-form-item>
  <el-form-item label="Phone Number">
    <el-input v-model="form.phoneNo"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<style>
  
</style>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
  export default {
    data() {
        return {
          form:{
            arn:'',
            phoneNo: ''
          }
        }
      },
    methods: {
      signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    },

    onSubmit(){
      const data = {
        username: this.form.arn,
        mobile:  this.form.phoneNo
      };
      console.log(data)
      fetch('http://localhost:3000/api/registerFromBank', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body : JSON.stringify({...data})
      })
      .then(res => console.log(res)) 
    }
    }
  }
</script>