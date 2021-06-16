import { $next } from "@jx3box/jx3box-common/js/https.js";

function getExam(examid) {
    return $next({proxy: true}).get("api/question/user-exam-paper/" + examid + "?details")
}

function submitAnswer(examid, answers, force=false) {
    return $next({proxy: true}).post(`api/question/user-exam-paper/${examid}/i-finish-all${force ? '?force' : ''}`, answers)
}

function getAnswer(examid) {
    return $next({proxy: true}).post(`api/question/user-exam-paper/${examid}/i-need-answer`)
}

export {
    getExam,
    submitAnswer,
    getAnswer
};