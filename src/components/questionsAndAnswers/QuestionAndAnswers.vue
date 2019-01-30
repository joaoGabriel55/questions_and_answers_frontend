<template>
     <div class="questions">
     
     <QuestionForm/> 
     
     <b-card class="mb-3" v-for="question in questions" :key="question.questionId">
          <p class="card-text">
               {{question.questionContent}}
          </p>

          <div>
               <div class="row justify-content-between">
                    <div class="col-5">
                         <button :id="isUserLogged ? `${question.questionId}-btn` : `${question.questionId}-q-btn-al`"
                         @click="showAnswers(
                                isUserLogged ? `${question.questionId}-q` : `${question.questionId}-q-al`, question.questionId
                            )"
                         class="btn btn-sm btn-outline-primary">See answers</button> 
                    </div>
                    <div class="col-3 author mt-2">
                         <span><strong>Author: </strong>{{question.userName}}</span>
                    </div>
               </div>
               <div :id="isUserLogged ? `${question.questionId}-q` : `${question.questionId}-q-al`" class="answers" v-show="isHidden">
                    <hr>
                    <span><strong>Answers</strong></span>
                    <b-card class="mt-2" v-for="answer in answers" :key="answer.answerId">
                         <p class="card-text">{{answer.answerContent}}</p>
                         <p class="content-answer"><span><strong>Author: </strong>{{answer.author}}</span></p>
                    </b-card>

                    <div class="form-group mt-3">
                         <textarea class="form-control" rows="3" 
                            placeholder="Type your answer..." v-model="answer.content"></textarea>
                    </div>

                    <div class="btn-add-answer">
                         <template>
                              <div>
                                <button class="btn btn-sm btn-sm btn-info" @click="sendAnswer(question.questionId)">Send answer</button>
                              </div>
                         </template>
                    </div>
               </div>
          </div>       
     </b-card>
     <div class="load-more">
          <button v-if="loadMore" class="btn btn-sm btn-outline-primary mt-5 btn-block"
               @click="getQuestions">
               Load more
          </button>
     </div>
     </div>
</template>

<script>
import { baseApiURL } from "@/global";
import QuestionForm from "./QuestionForm";
import axios from "axios";

export default {
    name: "QuestionAndAnswers",
    components: { QuestionForm },
    props: {
        isUserLogged: Boolean
    },
    data: function() {
        return {
            userIdLogged: this.$store.state.user.user.id,
            question: {},
            questions: [],
            answer: {},
            answers: [],
            page: 0,
            pageAnswers: 0,
            loadMore: true,
            isHidden: false
        };
    },
    methods: {
        showAnswers(elem, idQuestion) {
            let content = document.getElementById(elem);
            if (content.style.display === "none") {
                this.answers = [];
                document.getElementById(elem).style.display = "";
                this.getAnswers(idQuestion);
                //  document.getElementById("31-btn").textContent = "Show answers"
            } else {
                document.getElementById(elem).style.display = "none";
                this.pageAnswers = 0;
                this.answers = [];
            }
        },
        getQuestions() {
            const url = `${baseApiURL}/questions?page=${
                this.page
            }&size=6&userId=${this.isUserLogged ? this.userIdLogged : "0"}`;
            axios.get(url).then(res => {
                this.questions = this.questions.concat(res.data.data);
                this.page++;
                if (res.data.data.length === 0) this.loadMore = false;
            });
        },
        getAnswers(idQuestion) {
            const url = `${baseApiURL}/answers?page=${
                this.pageAnswers
            }&size=6&questionId=${idQuestion}`;
            axios.get(url).then(res => {
                this.answers = this.answers.concat(res.data.data);
                console.log(this.answers);
                this.pageAnswers++;
                if (res.data.data.length === 0) this.loadMore = false;
            });
        },
        sendAnswer(idQuestion) {
            if (!this.answer.content) {
                alert("Please Type the answer");
            } else {
                axios
                    .post(
                        `${baseApiURL}/answers/${
                            this.userIdLogged
                        }/${idQuestion}`,
                        this.answer
                    )
                    .then(() => {
                        this.answer = {};
                    })
                    .catch(showError);
            }
        }
    },
    mounted() {
        this.getQuestions();
    }
};
</script>

<style>
.questions > .card {
    justify-content: center;
    width: 100%;
}

.btn-add-question {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
}

.btn-add-answer {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
}

.author {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding-left: 50px;
    font-size: 12px;
}

.answers > .card {
    justify-content: center;
    width: 100%;
}
.content-answer {
    text-align: end;
    font-size: 12px;
}
</style>
