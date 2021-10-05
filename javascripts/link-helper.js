const headers_h2 = document.getElementsByTagName("h2");
const headers_h3 = document.getElementsByTagName("h3");
const headers = [...headers_h2, ...headers_h3];

headers.filter((header) => header.id).forEach((header) => {
    header.innerHTML += "<a class='header-link' aria-hidden='true' href='#" + header.id + "'><i class='fas fa-paperclip'></i></a>"
});