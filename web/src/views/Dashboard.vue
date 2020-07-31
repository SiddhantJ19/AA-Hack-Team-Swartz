<template>

<el-container>
  <div>
    <el-menu style="min-height:100%" mode="vertical" default-active="1" :collapse="true">
      <el-menu-item index="1">
        <i class="el-icon-money"></i>
        <span slot="title">Consent</span>
      </el-menu-item>
      <el-menu-item index="2" @click="signOut">
        <i class="el-icon-switch-button"></i>
        <span slot="title">Logout</span>
      </el-menu-item>
    </el-menu>
  </div>

  <el-container>
    <el-header>
      <span style="margin: 1rem 1rem">Consent Applicant List</span>
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="arn" label="ARN">
          <template slot-scope="scope">
            <el-input v-model="scope.row.arn" :disabled="scope.row.status == 1"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNo" label="Phone Number">
          <template slot-scope="scope">
            <el-input v-model="scope.row.phoneNo" :disabled="scope.row.status == 1"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Status" align="center">
          <template slot-scope="scope">
            <el-badge v-if="scope.row.status == 1" type="primary" class="item" value="Applied"></el-badge>
            <el-button v-else type="success" round @click="onSubmit(scope.$index)">Create</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button style="margin:2rem auto; display:block;" type="primary" icon="el-icon-plus" round @click="addRow">Add Applicant</el-button>
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
            arn: 'XXXX-03',
            phoneNo: 'XXXX4',
            status: 1,
          }, {
            arn: 'XXXX-02',
            phoneNo: 'XXXX4',
            status: 1,
          }, {
            arn: 'XXXX-04',
            phoneNo: 'XXXX4',
            status: 1,
          }, {
            arn: 'XXXX-01',
            phoneNo: 'XXXX4',
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

      onSubmit(index){
        const applicant = this.tableData[index]
        applicant.status = 1
      },

      addRow(){
        this.tableData.push({arn: '', phoneNo: '', status: 0})
      }
    }
  }
</script>
