<template>
     <div class="user-admin">
        <b-form>
          <input id="user-id" type="hidden" v-model="user.id"/>

          <b-row>
            <b-col md="6" sm="12">
              <b-form-group label="Name:" label-for="user-name">
                <b-form-input id="user-name" type="text"
                    v-model="user.nome" 
                    :readonly="mode === 'remove'"
                    required 
                    placeholder="Type Name..."/>
              </b-form-group>
            </b-col>

            <b-col md="6" sm="12">
              <b-form-group label="Email:" label-for="user-email">
                <b-form-input id="user-email" type="email"
                    v-model="user.email" 
                    :readonly="mode === 'remove'"
                    required 
                    placeholder="Type Email..."/>
              </b-form-group>
            </b-col>
          </b-row>

          <div class="form-check form-check-inline mt-3 mb-3" v-show="mode==='save'" id="user-profile">
            <input class="form-check-input" type="radio" 
              name="inlineRadioOptions"
              id="inlineRadio1" 
              value="" 
              v-model="user.profile"
              checked>
            <label class="form-check-label" for="inlineRadio1">USER</label>
          </div>
          <div class="form-check form-check-inline"  v-show="mode==='save'">
            <input class="form-check-input" type="radio" 
              name="inlineRadioOptions" 
              id="inlineRadio2"
              v-model="user.profile" 
              value="ROLE_ADMIN">
            <label class="form-check-label" for="inlineRadio2">ADMIN</label>
          </div>

          <b-row v-show="mode==='save'">
            <b-col md="6" sm="12">
              <b-form-group label="Password:" label-for="user-password">
                <b-form-input id="user-password" type="password"
                    v-model="user.password" required placeholder="Type Password..."/>
              </b-form-group>
            </b-col>

            <b-col md="6" sm="12">
              <b-form-group label="Confirm password:" label-for="user-confirm-password">
                <b-form-input id="user-confirm-password" type="password"
                    v-model="user.confirmPassword" required placeholder="Type confirm Password..."/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col xs="12">
              <b-button variant="primary" v-if="mode == 'save'" @click="save">
                Save
              </b-button>
              <b-button variant="danger" v-if="mode == 'remove'" @click="remove">
                Delete
              </b-button>
              <b-button class="ml-2" @click="reset">Cancel</b-button>
            </b-col>
          </b-row>
        </b-form> 
        <hr>
        <b-table hover striped :items="users" :fields="fields">
          <template slot="actions" slot-scope="data">
            <div align="center">
              <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadUser(data.item, 'remove')" >
                <i class="fa fa-trash"></i>
              </b-button>
            </div>
          </template>
        </b-table>
     </div>
</template>

<script>
import axios from "axios";
import { baseApiURL, showError, userKey } from "@/global";

export default {
    name: "UserAdmin",
    data: function() {
        return {
            mode: "save",
            user: {},
            users: [],
            fields: [
                { key: "id", label: "#", sortable: true },
                { key: "nome", label: "Name", sortable: true },
                { key: "email", label: "E-mail", sortable: true },
                {
                    key: "profile",
                    label: "Profile",
                    sortable: true,
                    formatter: value => (value ? "ADMIN" : "USER")
                },
                { key: "actions", label: "Actions", class: "text-center" }
            ]
        };
    },
    methods: {
        loadUsers() {
            console.log(axios.defaults.headers.common["Authorization"]);

            const url = `${baseApiURL}/users`;
            axios.get(url).then(res => {
                this.users = res.data;
            });
        },
        reset() {
            (this.mode = "save"), (this.user = {}), this.loadUsers();
        },
        save() {
            // const method = this.user.id ? "put" : "post";

            if (this.user.password !== this.user.confirmPassword) {
                this.$toasted.global.passwordNotMatch();
                return;
            }

            if (this.user.profile === "") this.user.profile = null;

            const id = this.user.id ? `${this.user.id}` : "";
            axios
                .post(`${baseApiURL}/users`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.user.id;
            axios
                .delete(`${baseApiURL}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        loadUser(user, mode = "save") {
            this.mode = mode;
            this.user = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                password: user.password,
                confirmPassword: user.password,
                profile: user.profile ? "ROLE_ADMIN" : ""
            };
        }
    },
    mounted() {
        this.loadUsers();
    }
};
</script>

<style>
input {
    outline: none;
}
</style>
