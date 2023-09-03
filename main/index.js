let BASEURL = "http://localhost:3500/"
let prime = document.querySelector(".prime")
let totalStaff = document.querySelector(".totalStaff")
let tBody = document.querySelector("tbody")
let starIcon = document.querySelector("i")
let addFm = document.forms.add
let search = document.querySelector(".find")
let allbtn = document.querySelector(".all")
let toUpbtn = document.querySelector(".toH")
let salarybtn = document.querySelector(".salary")
primeCount = []
toUp = []

console.log(prime);

const fetchUsers = () => {
    axios.get(BASEURL + "users ")
        .then(res => reload(res.data, tBody))
}
fetchUsers()







function reload(arr, place) {
    let totalSt = arr.length
    totalStaff.innerHTML = `Общее число сотрудников: ${totalSt}`


    //search
    search.onkeyup = () => {

        let filtered = arr.filter(st => {
            let value = search.value.toLowerCase().trim()
            let title = st.name.toLowerCase()
            if (title.includes(value)) {
                return st
            }


        })
        reload(filtered, tBody)
    }

    //Кнопка,Все сотрудники
    allbtn.onclick = () => {
        salarybtn.classList.remove("active")
        toUpbtn.classList.remove("active")
        allbtn.classList.add("active")
        fetchUsers()
    }

    //Кнопка, повышение
    toUpbtn.onclick = () => {

        allbtn.classList.remove("active")
        salarybtn.classList.remove("active")
        toUpbtn.classList.add("active")
        let filteredUp = arr.filter(up => {
            if (up.rise === true) {
                return up
            }
        })
        reload(filteredUp, tBody)
    }
    //Кнопка,З/П больше 1000$
    salarybtn.onclick = () => {
        allbtn.classList.remove("active")
        toUpbtn.classList.remove("active")
        salarybtn.classList.add("active")
        let filteredSlr = arr.filter(sl => {
            if (sl.salary >= 1000) {
                return sl
            }
        })
        reload(filteredSlr, tBody)
    }



    //adding
    addFm.onsubmit = (e) => {
        e.preventDefault()

        let name = {
            increase: false,
            rise: false,
        }

        let fm = new FormData(addFm)

        fm.forEach((value, key) => {
            name[key] = value
        });

        axios.post(BASEURL + "users", name)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    fetchUsers()
                }
            })

    }







    place.innerHTML = ""

    for (let item of arr) {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let img1 = document.createElement('img')
        let img2 = document.createElement('img')
        let img3 = document.createElement('img')

        img1.src = "./icons/icons8-biscuits-35.png"
        img1.style = "width: 35px"
        img1.style.marginRight = "5px"
        img1.style.backgroundColor = "#F0F0F0FF"
        img1.style.borderRadius = "5px"
        img2.src = "https://cdn1.iconfinder.com/data/icons/circle-outlines-colored/512/Trash_Bin_Remove_Recycle_Delete_Trashcan1_Can-512.png"
        img2.style = "width: 35px"
        img2.style.marginRight = "5px"
        img2.style.backgroundColor = "#F0F0F0FF"
        img2.style.borderRadius = "5px"
        img3.src = "./icons/star.png"
        img3.style = "width: 22px"


        tr.classList.add("tr")
        td4.classList.add("td")


        td1.innerHTML = item.name
        td4.innerHTML = item.salary + `$`

        td5.append(img1, img2)
        tr.append(td1, td4, td5)
        place.append(tr)




        inc(item, tr)
        star(item, td5, img3)


        //name click
        td1.onclick = () => {
            if (item.rise === false) {
                axios.patch(BASEURL + "users/" + item.id, {
                    rise: true
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            fetchUsers()
                        }
                    })
            } else {
                axios.patch(BASEURL + "users/" + item.id, {
                    rise: false
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            fetchUsers()
                        }
                    })
            }

        }


        //cookie
        img1.onclick = () => {

            if (item.increase === false) {
                axios.patch(BASEURL + "users/" + item.id, {
                    increase: true
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            fetchUsers()
                        }
                    })
            } else {
                axios.patch(BASEURL + "users/" + item.id, {
                    increase: false
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            fetchUsers()
                        }
                    })
            }

        }


        //delete
        img2.onclick = () => {

            axios.delete(BASEURL + "users/" + item.id,)
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        fetchUsers()
                    }
                })

        }


    }

}

//Премия
function inc(param, place) {
    if (param.increase === true) {
        place.style.color = "#D6A251FF"
        primeCount.push(param)
        prime.innerHTML = `Премию получат: ${primeCount.length}`
    }
}


//повышение
function star(param1, place, img) {
    if (param1.rise === true) {
        toUp.push(param1)
        place.append(img)
    }
}









