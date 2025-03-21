
let box = document.querySelector(".box")
let tbody = document.querySelector(".tbody")
let add = document.querySelector(".add")
let addModal = document.querySelector(".addModal")
let addForm = document.querySelector(".addForm")
let editModal = document.querySelector(".editModal")
let editForm = document.querySelector(".editForm")
let save = document.querySelector(".save")
let xclose = document.querySelector(".xclose")
let searchvalue = document.querySelector(".searchvalue")
let edclose = document.querySelector(".edclose")
let idx = null;
let API = "http://localhost:3000/data";
/////categoriyclicks

add.onclick = () => {
    addModal.showModal()
}

xclose.onclick = () => {
    addModal.close()
}
edclose.onclick = () => {
    editModal.close()
}
/////function categoriy

////searc
searchvalue.oninput = async () => {
    try {
        let response = await axios.get(`${API}?name=${searchvalue.value}`)
        getData(response.data)
    } catch (error) {
        console.error(error);
    }
}


////delfunc
async function functionBtn(id) {
    try {
        await axios.delete(`${API}/${id}`)
    } catch (error) {
        console.error(error);

    }
}
/////editfunct
function functionEdit(user) {
    editModal.showModal()
    editForm["editName"].value = user.name
    editForm["editCompany"].value = user.company
    editForm["editUserphoto"].value = user.userphoto
    editForm["editage"].value = user.age
    idx = user.id
}
editForm.onsubmit = async (event) => {
    event.preventDefault()
    let data = {
        name: editForm["editName"].value,
        company: editForm["editCompany"].value,
        userphoto: editForm["editUserphoto"].value,
        age: editForm["editage"].value,

    }
    try {
        await axios.put(`${API}/${idx}`, data)
        editModal.close()
        get()
    } catch (error) {
        console.error(error);
    }
}






/////addfunc
addForm.onsubmit = async (event) => {
    event.preventDefault()
    let form = event.target;
    let addUser = {
        name: form["addName"].value,
        company: form["addCompany"].value,
        userphoto: form["addUserphoto"].value,
        age: form["addage"].value
    }

    try {
        await axios.post(API, addUser)
        addModal.close()
        get()
    } catch (error) {
        console.error(error);
    }
}

/////funtgetasync
async function get() {
    try {
        let response = await axios.get(API)
        getData(response.data)
    } catch (error) {
        console.error(error);

    }
}
get()
///syncgetData
function getData(data) {
    tbody.innerHTML = ""
    data.forEach((e) => {
        let tr = document.createElement("tr")
        let name = document.createElement("td")
        let company = document.createElement("td")
        let userphoto = document.createElement("td")
        let age = document.createElement("td")
        let id = document.createElement("td")
        let btntr = document.createElement("td")
        let btnedit = document.createElement("button")
        let btndelete = document.createElement("button")
        let delimg = document.createElement("img")
        delimg.type = "image"
        delimg.style.width = "20px"
        delimg.style.background = "white"
        delimg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROAE_y0AR86cR8szmqBlXYBEaLT_NI2SHf5g&s";
        btndelete.appendChild(delimg)
        btndelete.style.background = "white"
        btndelete.style.border = "none"
        btndelete.style.outline = "none"



       

        let editimg = document.createElement("img")
        editimg.type = "image"
        editimg.style.width = "20px"
        editimg.style.background = "white"
        editimg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8hISEAAADJycn4+PjOzs6Pj48uLi4XFxfDw8Pf398EBAStra0QEBBtbW0aGhq6urpPT08SEhLy8vJmZmaysrInJydCQkJ7e3uBgYHq6up0dHSHh4enp6cZGRnX19eYmJhcXFw1NTU+Pj5HR0e0iDzQAAAE1UlEQVR4nO3d23baMBAFUDHhDsbEXBsCaRL+/xtrU5oFCbYla0YzUue89kV72ccyklIbE1/6g/lw8fyx7fVG5/Wv4+SFe0C4GQw/AGbZKe9VyfMiAygOyz73uJAyfc0g+2u7SwGwnnAPDiFPz5D91F0zht6Re4CeGezgVOu7BLI59yA9slrDg7vzh3E04B5o12ygaPeVyWHPPdRuWYOVr0q2nXKP1j0v2/oHzKPLuOQesGvebBp4G/jNPWS3DOzv0C/iK/egXfLkDoyL2AkY043aEVgSI3ncdAaWxCgmDQ9gL99yj94iPsBy6pf/duMHLO9T6e+ovsBePuImNMcbWF5E0T8YEYBlFbkVDUEBSr6IExRgGW5IXZZYQJC6PPWKJRyvuSl1GaJdRLHrqFhEwS/gSMTiwA2pDxaR29EQHCJI3rZBIYqdLy7BIGZyX2uqIBCLX9yI5vgTc7Fz/jX+xDM3oS3eROE/gw0CkRtwzWRV+0++xICKhkxgVP+K7EkMyKhP+YN3TEX8COiozeUXPRExfw4Iqct1yYKGeFoElNTka02GhFgMA1Ie52bRiYI4Yz+AcreqRkBkX9r/tmyIT+ReqPmxLopNzJkniwcLv8jEjPdB83BlG5fIW8OapXtUIuveTO3mCyIx4zx10rC7hEfkPK7QuH2GRTwxvpS27A8iEeEpIOk+rRugKMR8F5B0H4sdXgwi31RhtYXtTyzYFhIt9+i9iVC/9kMb60MInkTYBETdxuGUhRcx47pHnY6ReBDZDu45npPpTuTaN3Q+CNSVCG8BVTfpcNKpG5HrZabTUa4uxKiAXYiRAd2J0QFdiREC3YhRAl2IkQLtidECbYlcvwhRjjTbEKMG2hAjB7YTowe2ERMANhNf432K2hJ5ggyUR0QHSiMSAGURSYCSiERAOUQyoBQiIVAGkRQogUgM5CeSA7mJAYC8xCDAiih+f9A3Ea/JWAJT+D2oQAUqUIEKVKACFahABSpQgQpUoAIVqEAFKlCBClSgAhWoQAUqUIEKVKACFahABSpQgQpUoAIVqMD/GJj8iV8FKlCBClSgAuUBO3wqOi7gNHXgS+pAM3L8XHt0wHWWOPAY6B5lA4YqId9/1LwLU0I+YKB7lA/YTx1o9kGeo4zAMI8ZRqA5FIkDg1xCTqAZBmghK9AEuIS8QLRvmksFmvdT4kD62Z4ZSH+TcgPJJ0N2oCGeKviBxMtP/EAznyUONItx4kBDeQlFAClrKAJIWUMZQMIaCgHSzYZSgGQ1lAIkq6EYIFUN5QCJaigISFNDQUCaGkoCktRQFJCihrKABDWUBSSooTAgfg2lAdFrKA6IXUNxQOwaygMi11AgELeGEoGoNZQIRK2hSCBmDWUCEWsoFIhXQ6FAvBpKBaLVUCwQq4Zcf17XHpwa5lwf+7YISg2zEdPn2m2CUUNYcyua4l/DHI7ciKb41xA+Bd+hxr+GmewLaHxrWMCe+xNorfGpYQYH2Tdole41PAEM5fuM2XSr4Rjgfck9drvs3Ws4nkF2WIqv37+c3f5EptTNFvMp96hdsk1aV+UzaV2VRfvJ54h1VY7Nz9LIdVVW9fNh9cyMXHfJ8CExFd0lu+/Hu5PSVenv4E4Xe+8eZQiz8omaJ6q7ZHVcfG7P+02Kuj8PTWa8enB2PwAAAABJRU5ErkJggg==";
        btnedit.style.background = "white"
        btnedit.appendChild(editimg);
        btnedit.style.border = "none"


        let imgd = document.createElement("img")
        imgd.type = "image"
         imgd.src=e.userphoto
         userphoto.appendChild(imgd)
         imgd.style.borderRadius="90%"
         imgd.style.width="70px"
          imgd.style.height="70px"

        ////elem
        id.innerHTML = e.id;
        name.innerHTML = e.name;
        company.innerHTML = e.company;
        age.innerHTML = e.age;

        ////function 
        btndelete.onclick = () => {
            functionBtn(e.id)
        }

        btnedit.onclick = () => {
            functionEdit(e)
        }
        btntr.append(btnedit, btndelete)
        tr.append(id, name, company, userphoto, age, btntr)
        tbody.append(tr)

    })
}
