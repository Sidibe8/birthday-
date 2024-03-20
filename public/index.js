const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const apiUrl = 'http://127.0.0.1:9000/api/messages';

let isUpdate = false,
    updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    // titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});



function showNotes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data, 'daatt');
            document.querySelectorAll(".note").forEach(li => li.remove());
            data.forEach((note, id) => {
                let filterDesc = note.content ? note.content.replaceAll("\n", '<br/>') : '';
                let createdAt = new Date(note.createdAt);
                let formattedDate = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
                console.log('note?.user?.username', note?.user?.username);
                function getRandomEmoji() {
                    const emojis = ['🎉', '🎈', '🎂', '🥳', '😄', '😊', '🥂', '🎁', '🌟', '🎊'];
                    const randomIndex = Math.floor(Math.random() * emojis.length);
                    return emojis[randomIndex];
                }

                // Ensuite, utilisez cette fonction pour obtenir un émoji aléatoire à afficher dans votre élément HTML
                let randomEmoji = getRandomEmoji();
                let liTag = `<li class="note">
                                <div class="details">
                                <p>${randomEmoji}</p>
                                  <!--  <p>${note?.user?.username}</p>-->
                                    <span>${filterDesc}</span>
                                </div>
                                <div class="bottom-content">
                                <span>${formattedDate}</span>
                                    <div class="settings">
                                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                        <ul class="menu">
                                            <li onclick="updateNote('${note._id}', '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                            <li onclick="deleteNote('${note._id}')"><i class="uil uil-trash"></i>Delete</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>`;
                addBox.insertAdjacentHTML("afterend", liTag);
            });
        })
        .catch(error => console.error('Error fetching notes:', error));
}
showNotes();


function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;

    fetch(`${apiUrl}/${noteId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            showNotes();
        })
        .catch(error => console.error('Error deleting note:', error));
}

// function updateNote(noteId, title, filterDesc) {
//     let description = filterDesc.replaceAll('<br/>', '\r\n');
//     updateId = noteId;
//     isUpdate = true;
//     addBox.click();
//     titleTag.value = title;
//     descTag.value = description;
//     popupTitle.innerText = "Update a Note";
//     addBtn.innerText = "Update Note";
// }

addBtn.addEventListener("click", e => {

    // const userId = JSON.parse(localStorage.getItem("userData"));
    // console.log(userId._id);
    e.preventDefault();
    // let title = titleTag.value.trim(),
    let content = descTag.value.trim();

    if (content) {
        let currentDate = new Date(),
            month = months[currentDate.getMonth()],
            day = currentDate.getDate(),
            year = currentDate.getFullYear();

        let noteInfo = {
            // user: userId._id, // Ajoutez l'ID de l'utilisateur ici
            content,
            date: `${month} ${day}, ${year}`
        }
        if (!isUpdate) {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteInfo)
            })
                .then(response => response.json())
                .then(data => {
                    showNotes();
                    closeIcon.click();
                })
                .catch(error => console.error('Error adding note:', error));
        } else {
            isUpdate = false;
            fetch(`${apiUrl}/${updateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteInfo)
            })
                .then(response => response.json())
                .then(data => {
                    showNotes();
                    closeIcon.click();
                })
                .catch(error => console.error('Error updating note:', error));
        }
    }
});
