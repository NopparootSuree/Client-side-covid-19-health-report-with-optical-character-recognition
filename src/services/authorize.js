//เก็บข้อมูล หรือ token ,username ใน seesion storage 
export const authenticate = (response) => {
    if(window !== "undefined"){
        //เก็บข้อมูลลง seesion storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
}

//ดึงข้อมูล token
export const getToken = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem('token'))
        } else {
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem('user'))
        } else {
            return false
        }
    }
}

export const logout = () => {
    if(window !== "undefined") {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }
}
