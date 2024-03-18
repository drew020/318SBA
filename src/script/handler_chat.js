const v_body = document.body;
const v_chat = document.getElementById("chat_box_section");
const v_chat_item = document.getElementById("chat_item_container") || console.log("error");
const v_template = document.querySelector("#chatItemTemplate");

const v_local_api = "http://127.0.0.1:5000/api/"
const v_local_api_users = "http://127.0.0.1:5000/api/users"



const f_fetch = new Promise((resolve, reject) => {
    console.log(`f_fetch has STARTED.`);

    fetch(v_local_api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return v_response = response.json();

        })
        .then(data => {
            console.log(data); // Log the fetched data
            resolve(data); // Resolve the promise with the fetched data
            v_data = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            reject(error); // Reject the promise with the error
        });
});

f_fetch.then(data => {
    console.log(`f_fetch has ENDED. Data is obtained`);
    // Assuming f_populate_selector is defined somewhere
    if (data !== undefined) {
        f_populate_chat(data);
    }
}).catch(error => {
    console.error('Data not obtained:', error.message);
});

const f_populate_chat = async () => {
    console.log(`f_populate_chat has STARTED.`)


        for (let chat_item of v_data.chat) {
            f_appendChat(f_createChatItem(chat_item.username, chat_item.message));
        }

    console.log(`f_populate_chat has ENDED.`)
}

/* ----------------------------------------------------------------------------- */
function f_createChatItem(l_username, l_message) {
    let l_clone = v_template.content.firstElementChild.cloneNode(true);

    l_clone.querySelector("#text").textContent = l_username;
    l_clone.querySelector("#chat_Item_message").textContent = l_message;

    return l_clone;
}

function f_clear() {
    while (v_chat.firstChild) {
        v_chat.removeChild(v_chat.firstChild);
    }
}

// function addEvents() {
//     a_Attribute_Element[i].addEventListener('input', stepEventInput);
//     console.log(`${a_Attribute_Element[i]} stepEventinput listening`)
// }

// addEvents();

// function stepEventInput(event) {
//     let l_index = 0;
//     event.preventDefault();
//     // Which attribute index is it?
//     for (let i = 0; i > a_Attribute_Element.length; i++) {
//         if (event.target === a_Attribute_Element[i]) {
//             l_index = i;
//         }
//         console.log(`Detected ${a_Attribute_Element[i]} change`);
//     }
//     if (f_point.value >= 0 && Number(sumAttribute()) <= 40) {
//         f_point.value = 40 - sumAttribute();
//     }

//     else if (f_point.value == 0) {
//         event.target.value--
//     }
//     console.log(`input event on ${event.target}`)
// }


function f_appendChat(element) {

    // if (!activeItem) element.classList.add("active");

    v_chat.appendChild(element);
}
