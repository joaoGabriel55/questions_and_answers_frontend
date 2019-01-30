<template>
     <div class="home">
          <PageTitle icon="fa fa-home" main="Timeline" sub="Your questions and answers."/>
          <div class="timeline">
              <b-card no-body class="card-tabs-questions">
                <b-tabs card>
                  <b-tab title="My Questions" active>
                    <QuestionAndAnswers :isUserLogged="true"/>
                  </b-tab>
                  <b-tab title="All Questions">
                    <QuestionAndAnswers :isUserLogged="false"/>
                  </b-tab>
                </b-tabs>

              </b-card>
          </div>
     </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import QuestionAndAnswers from "../questionsAndAnswers/QuestionAndAnswers";
import axios from "axios";
import { baseApiURL } from "@/global";

export default {
    name: "Home",
    components: { PageTitle, QuestionAndAnswers }
};
</script>

<style>
.timeline {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
}

.card-tabs-questions {
    width: 50%;
}
</style>
