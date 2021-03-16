import { axios } from "./axios";
import { __next } from "@jx3box/jx3box-common/data/jx3box.json";

const API = __next + 'api/question/'  //TODO:
// const API = "/api/question/";
function checkQuestion(id, action) {
    return axios
        .put(API + id + "/check", "", {
            params: {
                action: action,
            },
            withCredentials: true,
        })
}

function getQuestions(query) {
    return axios
        .get(API + "list", {
            params: query,
            withCredentials: true,
        })
}

function getPapers(query) {
    return axios
        .get(API + "exam-paper", {
            params: query,
            withCredentials: true,
        })
}

function checkPaper(id, action) {
    return axios
        .put(API + "exam-paper/" + id + "/opt", "", {
            params: {
                action: action,
            },
            withCredentials: true,
        })
}

export { checkQuestion, getQuestions, getPapers,checkPaper };
