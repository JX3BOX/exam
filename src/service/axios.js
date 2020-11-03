import axios from "axios";
import { __server, __next } from "@jx3box/jx3box-common/js/jx3box.json";
const $ = axios.create({
    baseURL: __server,
    withCredentials: true,
});

const $next = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __next : "/",
});

export { $, axios, $next };
