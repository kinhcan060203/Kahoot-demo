import axios from 'axios'

let API = axios.create({
    baseURL: `http://localhost:8080`
});


export const handleRegister = async (data) => {
    let res = await API.post('/api/register', data)
    return res.data
}
export const handleLogin = async (data) => {
    let res = await API.post('/api/login', data)
    return res.data
}
export const saveQuiz = async (data) => {
    console.log("check", data)
    let res = await API.post('/api/save-quiz', data)
    return res.data
}
export const editQuiz = async (data) => {
    let res = await API.post('/api/edit-quiz', data)
    return res.data
}
export const getAllQuiz = async (id) => {
    let res = await API.post(`/api/get-all-quiz/${id}`)
    return res.data
}

export const getOneQuiz = async (creatorId, id) => {
    let res = await API.post(`/api/get-one-quiz`, { creatorId, id })
    return res.data
}
export const confirmPIN = async (pin) => {
    console.log(pin)
    let res = await API.post(`/api/play_game/${pin}`)
    return res.data
}
// export const handleGetUser = async (email) => {
//     let res = await API.post('/api/get-user-by-email', email)
//     return res.data
// }




