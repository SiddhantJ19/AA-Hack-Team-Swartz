<template>

<el-container>
  <div>
    <el-menu style="min-height:100%" mode="vertical" default-active="1" :collapse="true">
      <el-menu-item index="1">
        <i class="el-icon-money"></i>
        <span slot="title">{{$t('dashboardHeader')}}</span>
      </el-menu-item>
      <el-menu-item index="2" @click="signOut">
        <i class="el-icon-switch-button"></i>
        <span slot="title">{{$t('logout')}}</span>
      </el-menu-item>
    </el-menu>
  </div>

  <el-container>
    <el-header>
      <span style="margin: 1rem 1rem">{{$t('dashboardHeader')}}</span>
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="arn" :label="ARN">
          <template slot-scope="scope">
            <el-input v-model="scope.row.arn" :disabled="scope.row.status == 1"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNo" :label="$t('phoneNo')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.phoneNo" :disabled="scope.row.status == 1"></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('statusText')" align="center">
          <template slot-scope="scope">
            <el-badge v-if="scope.row.status == 1" type="primary" class="item" :value="$t('status')"></el-badge>
            <el-button v-else type="success" round @click="onSubmit(scope.$index)">{{$t('btnText')}}</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button style="margin:2rem auto; display:block;" type="primary" icon="el-icon-plus" round @click="addRow">{{$t('createApplicantBtn')}}</el-button>
    </el-main>
  </el-container>
</el-container>

</template>
<style>
  .el-header{
    display:flex;
    justify-content: center;
    background-color: #00f;
    color: #fff;
    font-weight: bold;
  }
</style>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
  export default {
    data() {
        return {
          tableData: [{
            arn: '84672674191@finvu',
            phoneNo: '84672674191',
            status: 1,
          }, {
            arn: '7840839201@onemoney',
            phoneNo: '7840839201',
            status: 1,
          }, {
            arn: '8929010929@finvu',
            phoneNo: '8929010929',
            status: 1,
          }, {
            arn: '',
            phoneNo: '',
            status: 0,
          }],
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
        username: this.tableData[3].arn,
        mobile:  this.tableData[3].phoneNo
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
    },

      addRow(){
        this.tableData.push({arn: '', phoneNo: '', status: 0})
      }
    }
  }
</script>
