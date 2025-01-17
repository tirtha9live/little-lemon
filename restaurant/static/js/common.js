// _headers
 loginlogout = document.getElementById('loginlogout')

if (localStorage.authtoken){
    loginlogout.innerHTML = `<a href="#" onclick="logout(event)" style="text-decoration: none;">Logout</a>`
  }else{
  loginlogout.innerHTML = `<a href="/login/" style="text-decoration: none ;">Login</a>`

}

async function logout(event){
    event.preventDefault()
    let endpoint = '/api/auth/token/logout/'
    let response = await fetch(endpoint, {
        method: 'POST',
        headers:{
            'Content-Type': "application/json",
            Authorization: `Token ${localStorage.authtoken}`
        }})

    if(response.status >= 204){
        localStorage.clear()
        alert('Logout Successful')
        window.location.href='/'
        return response.status
    }

}

function is_staff_status(){
    let is_staff_flag = localStorage.getItem('is_staff')
    if(!is_staff_flag || is_staff_flag==='false'){
        let rnav = document.getElementById("reservations-nav")
        rnav.innerHTML = ''
        return false
    }return true
}is_staff_status()
