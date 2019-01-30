<template>
     <div class="btn-add-question">
          <template>
          <div>
          <b-btn v-b-modal.modal-center variant="info" class="mb-3">New question</b-btn>
          <!-- Modal Component -->
          <b-modal id="modal-center"
             ref="modal"
             centered
             title="Share new question"
             @ok="handleOk"
             @shown="clearName">
               <form @submit.stop.prevent="handleSubmit">
                    <textarea class="form-control" rows="3" 
                         placeholder="Type your answer..." v-model="question.content"></textarea>
               </form>
          </b-modal>
          </div>
          </template>
     </div>
</template>

<script>
import axios from "axios";
import { baseApiURL } from "@/global";
export default {
    name: "QuestionForm",
    data: function() {
        return {
            userIdLogged: this.$store.state.user.user.id,
            question: {}
        };
    },
    methods: {
        clearName() {
            this.question = {};
        },
        handleOk(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.question.content) {
                alert("Please Type any question");
            } else {
                this.handleSubmit();
            }
        },
        handleSubmit() {
            axios
                .post(
                    `${baseApiURL}/questions/${this.userIdLogged}`,
                    this.question
                )
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.clearName();
                    this.$refs.modal.hide();
                })
                .catch(showError);
        }
    }
};
</script>

<style>
</style>
