const f_name = document.forms["myForm"]["fname"];
const f_sex = document.forms["myForm"]["fsex"];
const f_class = document.forms["myForm"]["fclass"];
const f_element = document.forms["myForm"]["felement"];
const f_point = document.forms["myForm"]["fpoint"];

const f_disabledNext = document.getElementById("disabledNext");

let f_point_stored = document.forms["myForm"]["fpoint"].value;

const a_Attribute_Element = [];
a_Attribute_Element[0] = document.forms["myForm"]["fstrength"];
a_Attribute_Element[1] = document.forms["myForm"]["fintelligence"];
a_Attribute_Element[2] = document.forms["myForm"]["fagility"];
a_Attribute_Element[3] = document.forms["myForm"]["fwisdom"];

const a_Attribute_Stored = [];
a_Attribute_Stored[0] = a_Attribute_Element[0].value;
a_Attribute_Stored[1] = a_Attribute_Element[1].value;
a_Attribute_Stored[2] = a_Attribute_Element[2].value;
a_Attribute_Stored[3] = a_Attribute_Element[3].value;

// loop through the attribut array to add eventlisterner to each attribute
function addEvents() {
  for (let i = 0; i < a_Attribute_Element.length; i++) {
    a_Attribute_Element[i].addEventListener('input', stepEventInput);
    console.log(`${a_Attribute_Element[i]} stepEventinput listening`)

    resetAttributePoints();
  }
}

addEvents();

function stepEventInput(event) {
  let l_index = 0;
  event.preventDefault();
  // Which attribute index is it?
  for (let i = 0; i > a_Attribute_Element.length; i++) {
    if (event.target === a_Attribute_Element[i]) {
      l_index = i;
    }
    console.log(`Detected ${a_Attribute_Element[i]} change`);
  }
  if (f_point.value >= 0 && Number(sumAttribute()) <= 40) {
    f_point.value = 40 - sumAttribute();
  }

  else if (f_point.value == 0) {
    event.target.value--
  }
  console.log(`input event on ${event.target}`)
}

function validateForm() {

  let l_v = false;
  const l_check = [];
  const l_message = [];

  l_check[0] = false;
  l_message[0] = "Name must be filled out and less than 12 character";

  l_check[1] = false;
  l_message[1] = "Most use all 40 Attribute points";

  if (f_name.value.length === 0 || f_name.value.length > 12) {
    l_v = true;
    l_check[0] = true;
  }

  if (sumAttribute() != 40) {
    l_v = true;
    l_check[1] = true;
  }

  if (l_v == true) {
    for (let i = 0; i < l_message.length; i++) {
      if (l_check[i]) {
        alert(l_message[i].toString());
      }
    }
  }
  else {
    f_disabledNext.style.filter = "saturate(" + 1 + ")";
    f_disabledNext.removeAttribute('disabled');

    //window.open('/316SBA/prologue.html')//open a new window


    alert("Character is created, please click NEXT");
  }
}

function updateAttributePoints() {

  try {
    f_point = 40 - sumAttribute();
  } catch (error) {
    console.log(" Can not updateAttributePoints")
  }
  console.log(`Attribut point value updated.`)
  return f_point;
}

//i got paranoid with Number()...i'll fix it later. just letting it sink in...hours wasted debugging
function sumAttribute() {
  let r = Number(Number(a_Attribute_Element[0].value) + Number(a_Attribute_Element[1].value) + Number(a_Attribute_Element[2].value) + Number(a_Attribute_Element[3].value));
  console.log(`Attribut point spent total = ${Number(r)}`);

  return Number(r);
}

function resetAttributePoints() {
  f_point.value = 40;
  f_point_stored = 40;

  a_Attribute_Element[0].value = 0;
  a_Attribute_Stored[0] = 0;

  a_Attribute_Element[1].value = 0;
  a_Attribute_Stored[1] = 0;

  a_Attribute_Element[2].value = 0;
  a_Attribute_Stored[2] = 0;

  a_Attribute_Element[3].value = 0;
  a_Attribute_Stored[3] = 0;

  console.log("Attribute points Reset")
}

function replaceLocation() {

  // Replace the current location
  // with new location
  let newloc = "/index.html";
  window.location.replace(newloc);
}